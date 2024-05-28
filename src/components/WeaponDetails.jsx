import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import weaponData from '@/data/generic_weapons.json';
import legendaryData from '@/data/legendary_weapons.json';
import weaponPerks from '@/data/weapon_perks.json';
import perkData from '@/data/weapon_perks.json';

import Perk from "@/components/util/Perk.jsx";
import ClassText from '@/components/util/ClassText';

import '@/components/css/weaponDetails.css';
import '@/components/css/stats.css';

import convertTerminology from '@/helpers/convertTerminology';
import capitalizeFirstLetter from '@/helpers/capitalizeFirstLetter';

// Function to convert keys, values, and types based on terminology mapping
const convertPerkName = (perkname) => {
    return weaponPerks.perks[perkname] ? weaponPerks.perks[perkname].name : perkname;
};

// Main component to display weapon details
const WeaponDetail = () => {
    const { weaponName } = useParams();
    const [selectedPerkColumn1, setSelectedPerkColumn1] = useState(null);
    const [selectedPerkColumn2, setSelectedPerkColumn2] = useState(null);
    const [selectedIntrinsicPerk, setSelectedIntrinsicPerk] = useState(null);
    
    const isLegendary = useMemo(() => weaponName in legendaryData.weapons, [weaponName]);
    const specialWepData = useMemo(() => isLegendary ? legendaryData.weapons[weaponName] : null, [isLegendary, weaponName]);
    const weaponType = specialWepData ? specialWepData.type : weaponName;
    const weaponInfo = useMemo(() => weaponData.weapons.find(weapon => weapon.type === weaponType), [weaponType]);

    useEffect(() => {
        setSelectedPerkColumn1(null)
        setSelectedPerkColumn2(null)
        setSelectedIntrinsicPerk(null)
    }, [weaponName])

    return (
        <div className="weapon-detail">
            <h2 className="weapon-name">{convertTerminology(weaponName)}</h2>
            <WeaponDesc info={weaponInfo} specialData={specialWepData} />
            <WeaponStats stats={weaponInfo.stats} />
            <PerkPool 
                perk_pool={weaponInfo.perk_pools} 
                onSelectPerkColumn1={setSelectedPerkColumn1} 
                onSelectPerkColumn2={setSelectedPerkColumn2} 
                onSelectIntrinsicPerk={setSelectedIntrinsicPerk} 
            />
            {
            ( selectedPerkColumn1 || selectedPerkColumn2 || selectedIntrinsicPerk) 
            && <div className="selected-perks">
                <h3>Selected Perks:</h3>
                {selectedPerkColumn1 && (
                    <div className="selected-perk">
                        <h4>Column 1</h4>
                        <Perk perk={selectedPerkColumn1} />
                    </div>
                )}
                {selectedPerkColumn2 && (
                    <div className="selected-perk">
                        <h4>Column 2</h4>
                        <Perk perk={selectedPerkColumn2} />
                    </div>
                )}
                {selectedIntrinsicPerk && (
                    <div className="selected-perk">
                        <h4>Intrinsic</h4>
                        <Perk perk={selectedIntrinsicPerk} />
                    </div>
                )}
            </div>}
        </div>
    );
};

// Component to display weapon description
const WeaponDesc = ({ info, specialData }) => (
    <div>
        <p>{capitalizeFirstLetter(info.handedness)} {specialData ? capitalizeFirstLetter(specialData.type) : ""}</p>
        {specialData && <SpecialDetails specialData={specialData}></SpecialDetails>}
        { !specialData && <p>{info.description}</p>}
    </div>
);

const SpecialDetails = ({specialData}) => (
    <>
        <p>{specialData.description}</p>
        <h2>Legendary Perk</h2>
        <h3>{specialData.special_perk?.name}</h3>
        <p>{specialData.special_perk?.description}</p>
        {/* <Perk perk={specialData.legendary_perk}></Perk> */}
    </>
)

// Component to display weapon stats
const WeaponStats = ({ stats, specialData }) => (
    <div className="weapon-stats">
        <h2>Weapon Stats</h2>
        <ul>
            {Object.entries(stats).map(([key, { value, type }]) => (
                <li key={key} className="stat-item">
                    <strong className='stat-name'>{convertTerminology(key, 'keys')}:</strong> <span className='stat-value'>{value} {convertTerminology(type, 'types')}</span>
                </li>
            ))}
        </ul>
    </div>
);

// PerkPool component to display perk pools
const PerkPool = ({ perk_pool, onSelectPerkColumn1, onSelectPerkColumn2, onSelectIntrinsicPerk }) => (
    <div className="weapon-perk-pool">
        <div className="weapon-perk_col">
            <h2>Column 1</h2>
            <ul className="weapon-perk-list">
                {perk_pool.column1.map((perkname) => (
                    <li key={perkname} className="weapon-perk">
                        <SelectablePerk perkName={perkname} onSelectPerk={onSelectPerkColumn1} />
                    </li>
                ))}
            </ul>
        </div>
        <div className="weapon-perk_col">
            <h2>Column 2</h2>
            <ul className="weapon-perk-list">
                {perk_pool.column2.map((perkname) => (
                    <li key={perkname} className="weapon-perk">
                        <SelectablePerk perkName={perkname} onSelectPerk={onSelectPerkColumn2} />
                    </li>
                ))}
            </ul>
        </div>
        <div className="weapon-perk_col">
            <h2>Intrinsic Perks</h2>
            <p>Intrinsic Perks are based on the weapon type.</p>
            <ul className="weapon-perk-list">
                {perk_pool.intrinsic.map((perkname) => (
                    <li key={perkname} className="weapon-perk">
                        <SelectablePerk perkName={perkname} onSelectPerk={onSelectIntrinsicPerk} />
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

// SelectablePerk component to handle selecting a perk in the perk pool list
const SelectablePerk = ({ perkName, onSelectPerk }) => {
    const perk = perkData.perks[perkName];

    return (
        <span onClick={() => onSelectPerk(perk)}>
            <span className='text-underline'>{convertPerkName(perkName)}</span> <ClassText>{getPerkClass(perkName)}</ClassText>
        </span>
    );
};

const perkClasses = {
    "void": ["void_leech", "abyssal_momentum", "void_infusion", "echo_strike", "void_rebound"],
    "plasma": ["overload_burst", "electrified_guard", "charged_fury", "energy_overflow", "plasma_arc"],
    "crystal": ["reflective_shards", "crystallize", "shard_burst", "piercing_shards", "crystal_harmony"],
    "shadow": ["fear_strike", "umbral_shield", "shadow_step", "nightmare_infusion", "shadows_embrace"]
}

const getPerkClass = (perkName) => {
    for (const [perkClass, perks] of Object.entries(perkClasses)) {
        if (perks.includes(perkName)) {
            return perkClass;
        }
    }
    return null; // Return null if the perkName is not found in any class
};

export default WeaponDetail;