import ClassText from "./ClassText";
import StatsList from "./StatsList";

import convertTerminology from "@/helpers/convertTerminology";

// Perk component to display perk details
const Perk = ({ perk }) => (
    <div className='perk-description'>
        <h4>{perk.name} {perk?.class_restriction !== "none" ? <ClassText>{perk?.class_restriction}</ClassText> : "" ?? ""}</h4>
        <div className='perk-col-cont'>
            <div className='perk-column'>
                <p>{perk.description}</p>
                {perk?.activation !== "none" && <p className='perk-activation'>
                    {convertTerminology(perk.activation, "values")}
                </p>}
            </div>
            { perk?.effects && <div className='perk-column'>
                <StatsList stats={perk?.effects} />
            </div> }
        </div>
    </div>
);

export default Perk;