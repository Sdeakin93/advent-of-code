const fs = require('fs');
const path = require('path');

function extractNumbers(str) {
    const spelledOutNumbers = {
        'one': '1', 'two': '2', 'three': '3', 'four': '4',
        'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9'
    };

    // Regular expression to match spelled-out numbers and digits
    const pattern = new RegExp(Object.keys(spelledOutNumbers).join("|") + "|\\d", "gi");

    let numericStr = '';
    const matches = str.match(pattern);

    if (matches) {
        for (const match of matches) {
            if (match.toLowerCase() in spelledOutNumbers) {
                numericStr += spelledOutNumbers[match.toLowerCase()];
            } else {
                numericStr += match;
            }
        }
    }

    // Return the first and last numeric characters
    return numericStr.length >= 2 ? numericStr.charAt(0) + numericStr.charAt(numericStr.length - 1) : numericStr;
}

// Read and process the file
fs.readFile(path.join(__dirname, 'input.txt'), 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const allNumbers = data.split(/\r?\n/)
                           .map(extractNumbers)
                           .filter(number => number !== null);

                                
    // THROW IT ALL TOGETHER THAT'S HOW WE ROLL
    const sumOfNumbers = allNumbers.reduce((sum, number) => sum + parseInt(number, 10), 0);
    console.log(allNumbers)
    console.log(sumOfNumbers);
});
