import convertTerminology from "@/helpers/convertTerminology";

// Component to display a list of stats
const StatsList = ({ stats }) => (
    <ul className="stats-list">
        {Object.entries(stats).map(([k, { value, type }]) => (
            <Stat key={k} k={k} value={value} type={type}/>
        ))}
    </ul>
);

const Stat = ({k, value, type}) => {
    let sign = value > 0 ? "+" : ""
    let sign_class = value > 0 ? "pos-stat" : "neg-stat"
    if (k === "duration") {
        [sign, sign_class] = ""
    }

    return (
        <li className="stat-item">
            <strong className="stat-name">{convertTerminology(k, 'keys')}:</strong> <span className={`stat-value ${sign_class}`}>{sign}{value} {convertTerminology(type, 'types')}</span>
        </li>
    )
}

export default StatsList;