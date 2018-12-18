// NUMBER ONE
/*
 * Returns an array with the minimum number of U.S. quarters, dimes, nickels, and
 * pennies, respectively, that make the given amount.
 */
function change(amount) {
    if (amount < 0) {
        throw new RangeError("amount cannot be negative");
    }
    const result = [];
    [25, 10, 5, 1].forEach((coin_value) => {
        result.push(Math.floor(amount / coin_value));
        amount %= coin_value;
    });
    return result;
}

// NUMBER TWO
/*
 * Returns a copy of the string with apostrophes and double quotes removed.
 */
function stripQuotes(s) {
    return s.replace(/['"]/g, '');
}

// NUMBER THREE
/*
 * Returns a random permutation of a string
 */
function scramble(s) {
    const array = s.split('');
    const n = s.length;

    for (let i = n - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array.join('');
}

// NUMBER FOUR
/*
 * Produces successive powers of a base, up to the given limit, passing each to a
 * callback.
 */
function powers(base, limit, callback) {
    let exponent = 0;
    while ((base ** exponent) <= limit) {
        callback(base ** exponent);
        exponent++;
    }
}

// NUMBER FIVE
/*
 * A generator that generates successive powers of a base, up to the given limit.
 */
function* powersGenerator(base, limit) {
    let value = 1;
    while (value <= limit) {
        yield value;
        value *= base;
    }
}

// NUMBER SIX
/*
 * Returns a string of words that were passed through the chainable
 * function, say, separated by spaces. The string is returned when nothing
 * is passed into say.
*/
function say(word) {
    if (!word) {
        return '';
    } else {
        return nextWord => !nextWord? word :
            say(word + ' ' + nextWord);
    }
}

// NUMBER SEVEN
/*
 * Returns the interleaving of an array with a bunch of values. The lengths of the
 * array and the number of values do not need to be the same.
 */
function interleave(array, ...values) {
    const result = [];
    const arrayLength = array.length;
    const valuesLength = values.length;
    const max = Math.max(arrayLength, valuesLength);
    for (let i = 0; i < max; i++) {
        if (i < arrayLength) {
            result.push(array[i]);
        }
        if (i < valuesLength) {
            result.push(values[i]);
        }
    }
    return result;
}

// NUMBER EIGHT
/*
 * Creates a cylinder object in the "Crockford Classes" style. There are no units for
 * the radius and height.
 */
function cylinder({radius = 1, height = 1}) {

    const surfaceArea = () => ((2 * Math.PI * radius * height) + (2 * Math.PI * radius * radius));
    const volume = () => (Math.PI * radius * radius * height);
    const widen = (widenFactor) => { radius *= widenFactor; };
    const stretch = (stretchFactor) => { height *= stretchFactor; };
    const toString = () => `Cylinder with radius of ${radius} and height of ${height}`;
    return Object.freeze({
        surfaceArea,
        volume,
        toString,
        get radius() {return radius;},
        get height() {return height;},
        widen,
        stretch
    });
}

// NUMBER NINE
/*
 * Returns an array of two functions, an encyptor and a decryptor, each using a
 * given key and a given encryption algorithm. The encryptor turns a UTF-8 encoded
 * string into a hex-string; the decryptor does the reverse.
 */
function makeCryptoFunctions(key, algorithm) {
    let crypto = require('crypto')
    const encrypt = function(toEnc) {
        let mykey = crypto.createCipher(algorithm, key)
        let mystr = mykey.update(toEnc, 'utf8', 'hex')
        mystr += mykey.final('hex')
        return mystr
    }
    const decrypt = function(toDec) {
        let mykey = crypto.createDecipher(algorithm, key)
        let mystr = mykey.update(toDec, 'hex', 'utf8')
        mystr += mykey.final('utf8')
        return mystr
    }
    return [encrypt, decrypt]
}

// NUMBER TEN
/*
 * Returns a promise for a name of the form "surname, name" obtained from the Uinames
 * API, for the given region and gender.
 */
function randomName({region, gender}) {
    const rp = require('request-promise');
    let options = {
        uri: 'https://uinames.com/api/',
        qs: {
            gender,
            region
        },
        json: true
    };
    return rp(options)
        .then(body => `${body.name}, ${body.surname}`);
}

module.exports = {
    change,
    stripQuotes,
    scramble,
    powers,
    powersGenerator,
    say,
    interleave,
    cylinder,
    makeCryptoFunctions,
    randomName
}
