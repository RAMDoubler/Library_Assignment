from board import *
import numpy as np
import random
from const import *
from square import *
from move import *
from game import *
from AI import *
import time

class Node:

    def __init__(self, state):
        if state == None:
            raise ValueError("There is no state inputted")
        # keeps track of the state of the game
        self.state = state
        # keeps track of a node's children in a 2-D array
        self.children = []
        # keeps track of the node's parent
        self.parent = None
        # keeps track of the mean value of the node
        self.mean = 0
        # keeps track of how many times the node has been visited
        self.visits = 0
        # keeps track of how many times a node's parent has been visited
        self.parent_vistits = 0
    
    # this function just returns a randomly chosen element from the children attribute
    def pick_random(self):
        child = random.choice(self.children)
        return child

    # checks to see whether we have reached the maximum depth, or in other words, the game is over
    def non_terminal(self):
        return True if self.children == [] else False

    # calculates all of the children given a node
    def child(self, node, team_color):
        if node == None:
            raise ValueError("There is no node inputted")
        # assigns board object to board variable
        board = node.state
        # iterates through rows of board
        for row in range(ROWS):
            # iterates through the columns of board
            for col in range(COLS):
                # assigns variable to a square object
                initial = board.squares[row][col]
                # checks to see whether the variable has the desired piece
                if (initial.has_piece() and initial.has_team_piece(team_color)):
                    piece = initial.piece
                    # calculates all possible moves given current state of the board
                    board.calc_moves(piece, row, col, bool=True)
                    # iterates through move list and appends all possible states of the next board into the children attribute
                    for move in piece.moves:
                        final = Square(move.final.row, move.final.col)
                        true_move = Move(initial, final)
                        board.move(piece, true_move)
                        self.children.append(board.squares)

    # calculates the value of the board given the material on it
    def value(self, node):
        if node == None:
            raise ValueError("There is no node inputted")
        value = 0
        for row in range(ROWS):
            for col in range(COLS):
                # excludes king because it has a value of inf
                if (node[row][col].has_piece() and not (isinstance( node[row][col].piece, King))) :
                    piece = node[row][col].piece
                    value = piece.value + value
        return value

# this is the class that will be handling most of the searching
class Tree:
    def __init__(self, root):
        self.root = root
        # keeps track of which leaves belong to which team
        self.team_leaves = []
        self.enemy_leaves = []
        self.game = Game()
        
        # calculate's the upper confidence bound based on a pre-determined formula
    def UCB(self, mean_node_value, number_of_vists_to_node, number_of_visits_to_parent):
        #i need to figure out the best value for the constant
        c = 2
        ucb = mean_node_value + c * np.sqrt((np.log(number_of_visits_to_parent)/number_of_vists_to_node))

        # the selection function 
    def selection(self, root, team_color):
        if root == None:
            raise ValueError("There is no root inputted")
        root.child(root.state, team_color)
        max_ucb = -np.inf
        select_child = None
        for j in root.children:
            root.value = self.UCB(j.mean, j.visits, j.parent_visits)
            if(root.value>max_ucb):
                max_ucb = root
                select_child = j
        return select_child

        # this function will continue to iterate through the passed node's children until a leaf node is reached (a leaf node is a node with no children)
    def expansion(self, node, team_color):
        if node == None:
            raise ValueError("There is no node inputted")
        if (node.non_terminal() == False):
            node.child(node.state, team_color)
            max_ucb = -np.inf
            select_child = None
            # iterates through passed node's children
            for i in node.children:
                curr_value = self.UCB(i.mean, i.visits, i.parent_visits)
                if(curr_value>max_ucb):
                    max_ucb = curr_value
                    select_child = i
                    # checks to see whether the node has no children
                    if (select_child.non_terminal()):
                        return select_child
            
    # the roll_out function deploys the roll_out_policy and returns the result of the policy
    def roll_out(self, node):
        if node == None:
            raise ValueError("There is no node inputted")
        while self.non_terminal(node):
            node = self.roll_out_policy(node)
        return self.result(node)

    # picks a random child from the passed node's children
    def roll_out_policy(self, node):
        if node == None:
            raise ValueError("There is no node inputted")
        return self.pick_random(node.children)

    # passes a node and an update to the value of the parents of the end game node
    def backprop(self, node, update):
        if ((node == None) or update not in (-1, 0, 1)):
            raise ValueError("There is no node or update inputted, and when I say 'or' I mean in the disjunctive sense not the exclusive disjuctive sense :)")
        # iterates through of all of the node's parents until all of this values are accurate (note that this value is different from the board value, when I say value here I am referring to the mean attribute)
        while(node.parent != None):
            node.mean += update
            node = node.parent
        return node

    # this is the function that puts all of the function above together
    def search(self, root):
        if root == None:
            raise ValueError("There is no root inputted")
        # produces a node with the highest upper confidence bound
        node = self.selection(root, AI.color)
        # produces an unexplored node/leaf
        leaf = self.expansion(node, AI.color)
        # outputsthe result of the leaf node
        result = self.roll_out(leaf)
        # updates all of the values of the parent nodes
        choice = self.backprop(leaf, result)
        return choice

    # this function returns a value depending on the state of the node passed
    def result(self, node):
        if node == None:
            raise ValueError("There is no node inputted")
        if(self.game.game_over(node)):
            if (self.game.next_player == self.game.winner):
                return 1
            if ((self.game.next_player != self.game.winner) and (self.game.player != self.game.winner)):
                return 0
            if (self.game.next_player != self.game.winner):
                return -1
