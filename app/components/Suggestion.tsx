
const Suggestion = ({ suggestion, key }: { suggestion: Suggestion, key: number }) => {
    return (
        <div className="flex flex-row gap-2 items-center" key={key}>
            <img src={suggestion.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"} alt="score" className='size-5' />
            <li className={`text-lg ${suggestion.type === "good" ? "text-green-600" : "text-yellow-600"}`}>
                {suggestion.tip}
            </li>
        </div>
    )
}

export default Suggestion