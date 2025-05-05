const generateRandomArrayOfNumbers = function (count, itemsCount) {
    let indices = [];
    while (indices.length < count) {
        const index = Math.floor(Math.random() * itemsCount);
        if (!indices.includes(index)) {
            indices.push(index);
        }
    }
    indices = indices.sort((a, b) => b - a);
    return indices;
};
export { generateRandomArrayOfNumbers };
