import terminology from '@/data/terminology.json';
import capitalizeFirstLetter from '@/helpers/capitalizeFirstLetter';

// Function to convert keys, values, and types based on terminology mapping
const convertTerminology = (key, type) => {
    const term = terminology[type] && terminology[type][key] ? terminology[type][key] : key;
    if (term === key) {
        let terms = term.split("_")
        for (let i = 0; i < terms.length; i++) {
            terms[i] = capitalizeFirstLetter(terms[i]) 
        }
        return terms.join(" ")
    }
    else {
        return term
    }
};

export default convertTerminology;