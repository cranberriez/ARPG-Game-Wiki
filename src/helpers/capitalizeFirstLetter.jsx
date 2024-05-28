// Function to capitalize the first letter of a word
const capitalizeFirstLetter = (word) => {
    if (!word) return '';
    return word.charAt(0).toUpperCase() + word.slice(1);
};

export default capitalizeFirstLetter;