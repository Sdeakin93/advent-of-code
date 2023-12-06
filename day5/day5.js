const inputReader = require('../inputReader'); // Since we were using it constantly I just pulled it out

// Function to apply a mapping from one category to another
function applyMapping(sourceNumber, mapping) {
    for (let [destStart, sourceStart, length] of mapping) {
        if (sourceStart <= sourceNumber && sourceNumber < sourceStart + length) {
            return destStart + (sourceNumber - sourceStart);
        }
    }
    return sourceNumber; // If not mapped, return the same number
}

// Function to process each seed through all mappings
function processSeed(seed, maps) {
    let [soilMap, fertilizerMap, waterMap, lightMap, temperatureMap, humidityMap, locationMap] = maps;
    let soil = applyMapping(seed, soilMap);
    let fertilizer = applyMapping(soil, fertilizerMap);
    let water = applyMapping(fertilizer, waterMap);
    let light = applyMapping(water, lightMap);
    let temperature = applyMapping(light, temperatureMap);
    let humidity = applyMapping(temperature, humidityMap);
    let location = applyMapping(humidity, locationMap);
    return location;
}

// Function to parse the data from the input file
function parseData(data) {
    const lines = data.split(/\r?\n/);
    let seeds = [];
    let maps = [];
    let currentMap = [];

    lines.forEach(line => {
        if (line.startsWith('seeds:')) {
            seeds = line.split(':')[1].trim().split(' ').map(Number);
        } else if (line.includes('map:')) {
            if (currentMap.length > 0) {
                maps.push(currentMap);
                currentMap = [];
            }
        } else {
            const parts = line.split(' ').map(Number);
            if (parts.length === 3) {
                currentMap.push(parts);
            }
        }
    });

    if (currentMap.length > 0) {
        maps.push(currentMap);
    }

    return { seeds, maps };
}

// Use inputReader to read file and process data
inputReader('input.txt', __dirname)
    .then(data => {
        const { seeds, maps } = parseData(data);

        // Process each seed and find the lowest location number
        const lowestLocation = Math.min(...seeds.map(seed => processSeed(seed, maps)));
        console.log(`Lowest Location Number: ${lowestLocation}`);
    })
    .catch(err => {
        console.error(err);
    });
