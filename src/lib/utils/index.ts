/**
 * Linear Congruential Generator for seeded random numbers.
 * This is a simple pseudorandom number generator which is sufficient for shuffling.
 * 
 * @param {number} seed - The seed value.
 */
function seededRandom(seed: number) {
    return function () {
        seed = (seed * 1664525 + 1013904223) % 4294967296;
        return seed / 4294967296;
    };
}

/**
 * Randomly shuffles the elements of an array using the Fisher-Yates (Knuth) shuffle algorithm
 * and a seeded random number generator for reproducible randomness.
 * 
 * @param {T[]} array - The array to be shuffled. This can be an array of any type.
 * @param {number} seed - The seed number for reproducible randomness.
 * @returns {T[]} A new array with the elements shuffled in a random order.
 * 
 * @example
 * // Shuffling an array of numbers with a specific seed
 * const numbers = [1, 2, 3, 4, 5];
 * const shuffledNumbers = shuffleArray(numbers, 12345);
 * console.log(shuffledNumbers);
 * 
 * @template T - The type of the elements in the array.
 */
export function shuffleArray<T>(array: T[], seed: number): T[] {
    const random = seededRandom(seed);
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

export const intersection = (arr1: string[], arr2: string[]) => {
    return arr1.some(r => arr2.includes(r))
}