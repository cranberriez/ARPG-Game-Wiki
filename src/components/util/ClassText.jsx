import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter"

const ClassText = ({children}) => {
    return (
        <span className={children}>{capitalizeFirstLetter(children)}</span>
    )
}

export default ClassText;