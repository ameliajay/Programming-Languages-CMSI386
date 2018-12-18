import math
from cryptography.fernet import Fernet
import re
import json
import requests
import random

#1
    """
    Returns a tuple with the minimum number of U.S. quarters, dimes, nickels,
    and pennies, respectively, that make the given amount.
    """
def change(number):
    if number < 0:
        raise ValueError('amount cannot be negative')

    quarters, remaining = divmod(amount, 25)
    dimes, remaining = divmod(remaining, 10)
    nickels, pennies = divmod(remaining, 5)
    return (quarters, dimes, nickels, pennies)

#2
    """
    Returns the string like s but with apostrophes and quotation marks removed.
    """
def strip_quotes(s):
    return re.sub('[\'"]', '', s)

#3
    """
    Return a random permutation of a string.
    """
def scramble(string):
    return ''.join(random.sample(string, len(string)))

#4
    """Returns a generator for powers of base up to limit"""
def powers(base, limit):
    value = 1
    while value <= limit:
        yield value
        value *= base

#5
    """
    Return a list of integer Pythagorean triples with max hypotenuse, limit.
    """
def triples(limit):
    return [(x, y, z)
        for x in range(1, limit + 1)
        for y in range(x, limit + 1)
        for z in range(y, limit + 1)
        if x * x + y * y == z * z]

#6
    """Returns a string of words from the famous chainable function problem."""
def say(a = ''):
    if a == '':
        return a
    def sayAgain(b = ''):
        if b == '':
            return a
        return say(a + ' ' + b)
    return sayAgain

#7
    """
    Returns the interleaving of an array with a bunch of values. The lengths
    of the array and the number of values do not need to be the same.
    """
def interleave(array, *argv):
    result = []
    arrayLength = len(array)
    valuesLength = 0
    for arg in argv:
        valuesLength+=1
    max_len = max(arrayLength, valuesLength)
    for i in range(max_len):
        if (i < arrayLength):
            result.append(array[i])
        if (i < valuesLength):
            result.append(argv[i])
    return result

#8
class Cylinder:
    def __init__(self, radius = 1, height = 1):
        self.radius = radius
        self.height = height
    @property
    def volume(self):
        return math.pi * self.radius * self.radius * self.height
    @property
    def surface_area(self):
        return 2 * math.pi * self.radius * self.height + (2 * math.pi * self.radius * self.radius)
    def stretch(self, stretch_factor):
        self.height *= stretch_factor
    def widen(self, widen_factor):
        self.radius *= widen_factor


#9
    """
    Return a tuple of two functions, one for encryption and one for decryption
    """
def make_crypto_functions(key):
    cipher = Fernet(key)
    return (cipher.encrypt, cipher.decrypt)

#10
    """
    Return a random name with the given region and geneder using the uinames API.
    """
def random_name(**k):
    url = 'http://uinames.com/api/'
    info = requests.get(url=url, params=k)
    person = json.loads(info.content)
    if 'error' in person:
        raise ValueError('{"error": "Invalid gender"}')
    result = person.get('surname') + ', ' + person.get('name')
    return result
