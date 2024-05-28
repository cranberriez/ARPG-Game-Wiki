import React, { useState, useMemo } from 'react';
import { Outlet, Link, useParams } from 'react-router-dom';
import weaponData from '@/data/generic_weapons.json';
import legendaryData from '@/data/legendary_weapons.json'
import { generatePath } from './utils';

import "./css/weapons.css";

const listLegendaries = (legendaryData) => {
    let weapon_mapping = {}
    Object.keys(legendaryData.weapons).map(key => {
        const weapon = legendaryData.weapons[key]
        const element = weapon.element
        if (weapon_mapping[element] == null)
            weapon_mapping[element] = [key]
        
        else
            weapon_mapping[element].push(key)
    });

    return (weapon_mapping)
}

const Weapons = () => {
    const { weaponName } = useParams();
    const [ openLegendary, setOpenLegendary ] = useState("none");

    // memoize to prevent re-calculating
    const legendaries = useMemo(() => listLegendaries(legendaryData), [legendaryData]);

    const showLegendaries = (tab) => {
        if (tab === openLegendary) setOpenLegendary("none")
        else setOpenLegendary(tab)
    }
    
    // Filter weapons based on handedness
    const oneHandedWeapons = weaponData.weapons.filter(weapon => weapon.handedness === 'one-handed');
    const twoHandedWeapons = weaponData.weapons.filter(weapon => weapon.handedness === 'two-handed');

    return (
        <main className='main-column-cont'>
            <div className='nav-column'>
                <h2>Weapons</h2>
                <h3>One-Handed</h3>
                <ul>
                    {oneHandedWeapons.map((weapon, index) => (
                        <li key={index}>
                            <Link to={generatePath(`/weapons/${weapon.type.toLowerCase()}`)}>{weapon.type.charAt(0).toUpperCase() + weapon.type.slice(1)}</Link> {weapon.short_description}
                        </li>
                    ))}
                </ul>

                <h3>Two-Handed</h3>
                <ul>
                    {twoHandedWeapons.map((weapon, index) => (
                        <li key={index}>
                            <Link to={generatePath(`/weapons/${weapon.type.toLowerCase()}`)}>{weapon.type.charAt(0).toUpperCase() + weapon.type.slice(1)}</Link> {weapon.short_description}
                        </li>
                    ))}
                </ul>

                <h3>Legendary Weapons</h3>
                {Object.keys(legendaries).map((key) => (<>
                    <p key={key} className={`category-label ${openLegendary === key ? "open" : ""}`}>
                        <a onClick={() => showLegendaries(key)}>Void</a>
                    </p>
                    <ul className={openLegendary === key ? "" : "hidden"}>
                        {legendaries[key].map((weapon_name) => (
                            <li key={weapon_name}>
                                <Link to={generatePath(`/weapons/${weapon_name}`)}>{legendaryData.weapons[weapon_name].name}</Link>
                            </li>
                        ))}
                    </ul>
                </>))}
                <p className={`category-label ${openLegendary === "plasma" ? "open" : ""}`}>
                    <a onClick={() => showLegendaries("plasma")}>Plasma</a>
                    </p>
                <ul className={openLegendary === "plasma" ? "" : "hidden"}>
                    <li>Sample plasma legenadry</li>
                    {/* {twoHandedWeapons.map((weapon, index) => (
                        <li key={index}>
                            <Link to={`/weapons/${weapon.type.toLowerCase()}`}>{weapon.type.charAt(0).toUpperCase() + weapon.type.slice(1)}</Link> {weaponName ? weapon.short_description : weapon.description}
                        </li>
                    ))} */}
                </ul>

                <h3>Starter Weapons</h3>
                <ul>
                    {/* {twoHandedWeapons.map((weapon, index) => (
                        <li key={index}>
                            <Link to={`/weapons/${weapon.type.toLowerCase()}`}>{weapon.type.charAt(0).toUpperCase() + weapon.type.slice(1)}</Link> {weaponName ? weapon.short_description : weapon.description}
                        </li>
                    ))} */}
                </ul>

            </div>
            <div className='main-column'>
                {weaponName && (
                    <ul>
                        <li>
                            <Link to={generatePath("/weapons")}>Back to Weapons</Link>
                        </li>
                    </ul>
                )}
                <Outlet />
            </div>
        </main>
    );
};

export default Weapons;
