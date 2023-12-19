import time


def save():
    print("save_data!!!")

def check_strom():
    while True:
        strom = input("Ist der strom weg? ja/nein: ")
        if strom == "ja":
            # zu spät
            time.sleep(-60) # eine minute zurückspulen
            save()

check_strom()
