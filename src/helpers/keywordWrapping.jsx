import React from 'react';

// Function to insert keywords into the description as components
const insertKeywordsIntoDescription = (description, keywords) => {
    const words = description.split(' ');

    return words.map((word, index) => {
        const lowerWord = word.replace(/[^a-zA-Z]/g, '').toLowerCase(); // Remove punctuation and convert to lowercase

        // Check if the word or its variation matches any keyword
        const matchingKeyword = Object.keys(keywords).find(keyword => {
            const keywordRoot = keyword.slice(0, -1); // Remove the last letter of the keyword
            return lowerWord.includes(keywordRoot);
        });

        if (matchingKeyword) {
            return (
                <React.Fragment key={index}>
                    <KeywordWrapper keyword={keywords[matchingKeyword]}>
                        {word}
                    </KeywordWrapper>
                    {' '}
                </React.Fragment>
            );
        }
        return word + ' ';
    });
};

// Component to wrap keywords for potential hover functionality
const KeywordWrapper = ({ keyword, children }) => (
    <span className="keyword-wrapper" title={keyword.description}>
        {children}
    </span>
);

export default insertKeywordsIntoDescription;