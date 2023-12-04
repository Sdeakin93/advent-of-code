// Importing modules for, once again, more parsing
const fs = require("fs")
 
let part1 = 0
let part2 = 0

// Basically the same code as yesterday
const parts = readPartNumbers('./input.txt');
function readPartNumbers(filePath) {
    return fs.readFileSync(filePath, 'utf8').split('\n');
  }

// checks is the number is in range and returns true if it is
const isWithinRange = (number, min, max) => number >= min && number <= max;

// popping it in an object
const generateNumberDetails = (num, index, y) => ({
    x: index, 
    y, 
    length: num.length, 
    num: +num, 
    used: false
});

// what's an engineer's favourite root vegetable? 
// a parse-nip
const parseNumbers = (item, y) => {
    let index = 0;
    return item.match(/\d+/g).map(num => {
        index = item.indexOf(num, index);
        const numberData = generateNumberDetails(num, index, y);
        index += num.length;
        return numberData;
    });
};
// flatMap doesn't sound like a real thing
function flattenAndExtractNumbers(parts) {
    return parts.flatMap((item, y) => parseNumbers(item, y));
}

// generates the list
const numbersList = flattenAndExtractNumbers(parts);

// helps us define the newList 
function updateNumbersList(char, x, y) {
    let newList = [];
    numbersList.filter(v => {
        const valid = isWithinRange(x, v.x - 1, v.x + v.length) &&
                      isWithinRange(v.y, y - 1, y + 1) && !v.used;
        if (valid) {
            v.used = true;
            if (char == "*") newList.push(v.num);
        }
        return valid;
    });
    return newList;
}
// Calculating when it's adjacent to two numbers - solve for part 2
function calculatePart2(newList) {
    if (newList.length == 2) {
        part2 += newList[0] * newList[1];
    }
}

// iterates over the array and updates the numbers list 
parts.forEach((item, y) => {
    [...item].forEach((char, x) => {
        if (/[^0-9.]/.test(char)) {
            let newList = updateNumbersList(char, x, y);
            calculatePart2(newList);
        }
    });
});

// Declaring part 1 
part1 = numbersList.reduce((sum, obj) => (obj.used ? sum + obj.num : sum), 0)

// Log the results
console.log(part1, part2)
 