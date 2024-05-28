import "./css/infoPage.css";

// Weapon Page Information
const WeaponInformation = () => (
    <>
        <h1>Weapons</h1>
        
        <h2>Upgrading</h2>
        <p>Generic weapons go through an upgrade path. Weapons have a chance to drop at any level but can be upgraded.</p>
        <ol>
            <li>
                <p><span className=" tier basic">Basic</span> - The First non-ugpraded Tier</p>
                <p>Has 1 perk, the Intrinsic perk for the weapon type.</p>
            </li>
            <li>
                <p><span className="tier enhanced">Enhanced</span> - The Middle Upgrade Tier</p>
                <p>Has 2 perks, the Intrisic for the type and a random perk among the 1st and 2nd columns.</p>
            </li>
            <li>
                <p><span className="tier finalized">Finalized</span> - The Final Upgrade Tier</p>
                <p>Has all 3 perk columns available. Keeps the Perks from the previous tiers, randomly rolling the remaining perk.</p>
            </li>
        </ol>

        <h2>Weapon Types</h2>
        <p>Each Generic weapon comes with their own perk pools for what they can randomly acquire once upgraded fully.</p>
        <p>The weapons all have 3 columns of perks with 7 perks (4 usable) in each column. 4 perks are elemental and can only drop when using that class.</p>
        <p><em>Legendary and Starter weapons are not upgradeable.</em></p>

        <h3>One-Handed</h3>
        <p>These weapons can be <strong>dual-wielded</strong> enhancing the attack speed but reducing the damage.</p>
        <p>Dual wielded weapons can still be used like 1-handed weapons, with an attack speed increase and damage reduction when alternating weapons.</p>

        <h3>Two-Handed</h3>
        <p>These weapons cannot be dual-wielded but hold their own. With generally higher damage but with less flexibility.</p>

        <h2>Legendary Weapons</h2>
        <p><span className="tier legendary">Legendary</span> weapons have 2 perks versus an enhanced weapons' 3.</p>
        <p>A main Legendary perk that is special to that weapon, alongside a random intrinsic perk for that weapon's type.</p>

        <h2>Starter Weapons</h2>
        <p><span className="tier starter">Starter</span> weapons come for free with each Class. The Starter weapons come with a perk that matches the class they're for.</p>
        <p>Starter Weapons cannot be upgraded and are intended to be replaced</p>
    </>
);

export default WeaponInformation;