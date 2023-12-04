// really like that I can just copy and paste this code again
const fs = require('fs');
const path = require('path');

// 
fs.readFile(path.join(__dirname, 'input.txt'), 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    // so we can calculate our points
    let part1 = 0, part2 = 0;
    // Splitting input content into individual lines
    const lines = data.split(/\r?\n/);

    // creates an array of all of the lines, with a length equal to the number of lines in the input file. Each element of the array is initially set to 1.
    const scratchcardInstances = new Array(lines.length).fill(1);
    
    // iterating over each line
    lines.forEach((line, idx) => {
        // splitting each line at the "|" point
        const [, winning, card] = line.split(/[:|]/g);
        // declaring the winning numbers before the split
        const winningNumbers = winning.trim().split(/\s+/).map(Number);
        // declaring my numbers after the split
        const myNumbers = card.trim().split(/\s+/).map(Number);
        // calculating how many of my numbers are winning
        const totalPoints = myNumbers.filter((num) => winningNumbers.includes(num)).length;
       
        // If totalPoints is greater than 0, it calculates the score for part 1 as a power of 2 based on totalPoints. It then updates scratchcardInstances for subsequent lines based on current and past values.
       // the power of 2? more like the power of love by huey lewis and the news
        if (totalPoints) {
            const points = 2 ** (totalPoints - 1);
            part1 += points;

            for (let i = idx + 1; i <= idx + totalPoints; i++) {
                scratchcardInstances[i] += scratchcardInstances[idx];
            }
        }
    });
    // reduce, reuse, recycle (the same code from the past few days)
    part2 = scratchcardInstances.reduce((acc, v) => acc + v, 0);
  
// Log the results
console.log(part1, part2)
 
});
