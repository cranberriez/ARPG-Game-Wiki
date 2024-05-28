import React from 'react';
import { Outlet, Link, useParams } from 'react-router-dom';
import perkData from '@/data/weapon_perks.json';
import terminology from "@/data/terminology.json";

import "@/components/css/perks.css"

import StatsList from './util/StatsList';

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

// Function to capitalize the first letter of a word
const capitalizeFirstLetter = (word) => {
    if (!word) return '';
    return word.charAt(0).toUpperCase() + word.slice(1);
};

const getPerksByClass = (className) => {
    return Object.keys(perkData.perks).filter(perk => perkData.perks[perk].class_restriction === className)
}

const Perks = () => {
    const genericPerks = getPerksByClass("none")
    const voidPerks = getPerksByClass("void")
    const plasmaPerks = getPerksByClass("plasma")
    const crystalPerks = getPerksByClass("crystal")
    const shadowPerks = getPerksByClass("shadow")

    // console.log(
    //     genericPerks,
    //     voidPerks,
    //     plasmaPerks,
    //     crystalPerks,
    //     shadowPerks
    // )

    return (
        <div>
            <h1>Weapon Perks</h1>
            <p>Each weapon comes with perk pools for what they can randomly acquire once upgraded fully.</p> 

            <h2>Generic Perks</h2>
            <PerkCategory perks={genericPerks}></PerkCategory>
            <h2>Void Perks</h2>
            <PerkCategory perks={voidPerks}></PerkCategory>
            <h2>Plasma Perks</h2>
            <PerkCategory perks={plasmaPerks}></PerkCategory>
            <h2>Crystal Perks</h2>
            <PerkCategory perks={crystalPerks}></PerkCategory>
            <h2>Shadow Perks</h2>
            <PerkCategory perks={shadowPerks}></PerkCategory>
            
            <Outlet />
        </div>
    );
};

const PerkCategory = ({ perks, category }) => (
    <div className='perk-category'>
        {perks.map((perkName) => {
            const perk = perkData.perks[perkName];
            return <Perk key={perkName} perk={perk} />;
        })}
    </div>
)

// Perk component to display perk details
const Perk = ({ perk }) => (
    <div className='perk-description'>
        <h4>{perk.name} {perk.class_restriction !== "none" ? <ClassText>{perk.class_restriction}</ClassText> : ""}</h4>
        <div className='perk-col-cont'>
            <div className='perk-column'>
                <p>{perk.description}</p>
                {perk.activation !== "none" && <p className='perk-activation'>
                    {convertTerminology(perk.activation, "values")}
                </p>}
            </div>
            <div className='perk-column'>
                <StatsList stats={perk.effects} />
            </div>
        </div>
    </div>
);

const ClassText = ({children}) => {
    return (
        <span className={children}>{capitalizeFirstLetter(children)}</span>
    )
}

export default Perks;
