import React from 'react';
import { useParams } from 'react-router-dom';
import classData from '@/data/classes.json';
import terminology from '@/data/terminology.json';

import '@/components/css/classDetails.css';
import '@/components/css/stats.css';

import insertKeywordsIntoDescription from '@/helpers/keywordWrapping';

// Function to convert keys, values, and types based on terminology mapping
const convertTerminology = (key, type) => {
    return terminology[type] && terminology[type][key] ? terminology[type][key] : key;
};

// Function to capitalize the first letter of a word
const capitalizeFirstLetter = (word) => {
    if (!word) return '';
    return word.charAt(0).toUpperCase() + word.slice(1);
};

// Main component to display class details
const ClassDetail = () => {
    const { className } = useParams();
    const classInfo = classData[className];

    if (!classInfo) {
        return <div className="class-not-found">Class not found</div>;
    }

    return (
        <div className="class-detail">
            <h2 className="class-name">{capitalizeFirstLetter(className)} Class</h2>
            <Keywords keywords={classInfo.keywords} />
            <AbilitiesList abilities={classInfo.abilities} keywords={classInfo.keywords} />
            <UltimatesList ultimates={classInfo.ultimates} keywords={classInfo.keywords} />
        </div>
    );
};

// Component to display a list of keywords
const Keywords = ({ keywords }) => (
    <div className="keywords-section">
        <h3 className="section-title">Keywords</h3>
        <ul className="keywords-list">
            {Object.entries(keywords).map(([key, keyword]) => (
                <Keyword key={key} keyword={keyword} />
            ))}
        </ul>
    </div>
);

// Component to display a single keyword and its details
const Keyword = ({ keyword }) => (
    <li className="keyword-item">
        <strong className="keyword-name">{keyword.name}</strong>: <span className="keyword-description">{keyword.description}</span>
        {keyword.stats && <StatsList stats={keyword.stats} />}
    </li>
);

// Component to display a list of abilities grouped by type
const AbilitiesList = ({ abilities, keywords }) => (
    <>
        {['offensive', 'defensive', 'passive', 'support'].map((category) => (
            <div key={category} className={`abilities-section ${category}-abilities`}>
                <h3 className="section-title">{capitalizeFirstLetter(category)} Abilities</h3>
                <ul className="abilities-list">
                    {abilities[category].map((ability, index) => (
                        <Ability key={index} ability={ability} keywords={keywords} />
                    ))}
                </ul>
            </div>
        ))}
    </>
);

// Component to display a single ability and its details
const Ability = ({ ability, keywords }) => (
    <li className="ability-item">
        <strong className="ability-name">{ability.name}</strong>: <span className="ability-description">{insertKeywordsIntoDescription(ability.description, keywords)}</span>
        {ability.stats && <StatsList stats={ability.stats} />}
        {/* {ability.secondary_effects && (
            <div className="secondary-effects">
                <p>
                    <strong>Secondary Effects:</strong>
                </p>
                <StatsList stats={ability.secondary_effects} />
            </div>
        )} */}
    </li>
);


// Component to display a list of ultimate abilities
const UltimatesList = ({ ultimates, keywords }) => (
    <div className="ultimates-section">
        <h3 className="section-title">Ultimates</h3>
        <ul className="ultimates-list">
            {ultimates.map((ultimate, index) => (
                <li key={index} className="ultimate-item">
                    <strong className="ultimate-name">{ultimate.name}</strong>: <span className="ultimate-description">{insertKeywordsIntoDescription(ultimate.description, keywords)}</span>
                    {ultimate.stats && <StatsList stats={ultimate.stats} />}
                    {ultimate.synergy && (
                        <p className="ultimate-synergy">
                            <strong>Synergy:</strong> {insertKeywordsIntoDescription(ultimate.synergy, keywords)} 
                        </p>
                    )}
                    {ultimate.subtext && (
                        <p className="ultimate-subtext">
                            <strong>Subtext:</strong> {ultimate.subtext}
                        </p>
                    )}
                </li>
            ))}
        </ul>
    </div>
);

export default ClassDetail;
