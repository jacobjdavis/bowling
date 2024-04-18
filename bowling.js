const specials = ['X','/'];

// returns 10 for strikes and spares otherwise returns roll value
const getValue = (roll) => {
    return specials.includes(roll) ? 10 : roll;
}

// checks if the first roll in the frame is a strike
const isStrike = (rolls, index) => {
    return getValue(rolls[index]) === 10
}

// checks if the second roll in the frame is a spare or if both rolls would add together to equal a spare
const isSpare = (rolls, index) => {
    return getValue(rolls[index+1]) === 10 || getValue(rolls[index]) + getValue(rolls[index+1]) === 10
}

const calculateRollingScore = (rolls) => {
    let roll = 0;
    let score;
    let prevScore = 0;
    const rollScore = [];
    // loop through each frame
    for (let i = 0; i < 10; i++) {
        if (!rolls[roll]) break;

        if (isStrike(rolls, roll)) {
            score = 10 + getValue(rolls[roll+1]) + getValue(rolls[roll+2]);
            roll++;
        }
        else if (isSpare(rolls, roll)) {
            score = 10 + getValue(rolls[roll+2])
            roll += 2;
        }
        else {
            score = getValue(rolls[roll] ) + getValue(rolls[roll+1]);
            roll += 2;
        }
        const frameScore = prevScore + score;
        if (frameScore) {
            rollScore.push(frameScore);
            prevScore = frameScore;
        }
        else {
            rollScore.push(undefined);
        }

    }

    return rollScore;
}

console.log(calculateRollingScore([4,5,'X',8])); // expects [ 9, undefined, undefined ]
console.log(calculateRollingScore([4, 5, 5, '/', 6])); // expects [ 9, 25, undefined]
console.log(calculateRollingScore([4, 5,'X',8, 1, 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'])); // expects [ 9,  28,  37,  67,  97, 127, 157, 187, 217, 247 ]

