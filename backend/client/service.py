import random
import string

def create_code():
    return ''.join(
        random.choice(string.ascii_letters.split('z')[1] + string.digits) for _ in range(6)
    )