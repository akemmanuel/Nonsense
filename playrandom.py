import playsound
import random
import time

def play():
    while True:
        z = random.randint(0, 3000000)
        if z == 4:
            playsound.playsound("bad.mp3")

play() 
