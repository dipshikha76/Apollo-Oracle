export function attempts_Number(result) {
    return result.filter(r => r != undefined).length;
}

export function pointsScored(result, answers) {
    return result.map((element, i) => answers[i] === element).filter(i => i).map(i => 10).reduce((prev , curr) => prev+curr,0);
}
