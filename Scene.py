from Manim import *
import numpy as np
class ProbabilityDensityFunctions(Scene):
    def construct(self):
        ax = Axes(
            x_range=[0, 100, 5],
            y_range=[0, 20, 1],
            tips = False,
            axis_config={"including_numbers": True},
        )

        graph = ax.plot(lambda x: )

class RandomNumbers(Scene):
    def construct(self):
        numbers = VGroup()
        for x in range(48):
            num = DecimalNumber()
            numbers.add(num)
    
    def radomize_numbers(numbers):
        for num in numbers:
            value = random.uniform()
            num.set_value(value)
            if value <= 0.6:
                num.set_color(RED)
            elif value >= 0.84:
                num.set_color(RED)  
            else:
                num.set_color(GREEN)
        
    randomize_numbers(numbers)

    numbers.set(width=0.38)
    numbers.arrange(RIGHT, buff=0.1)
    numbers.to_edge(UR)

        def get_results(numbers):
            results = VGroup()
                for num in numbers:
                    if num.get_value() <= 0.6:
                        result = (
                            SVGMobject(f"{HOME2}//green_tick.svg")
                        )
