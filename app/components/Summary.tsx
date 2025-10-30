import ScoreGauge from './ScoreGauge';
import ScoreBadge from './ScoreBadge';

const Category = ({ title, score }: { title: string; score: number }) => {
    const textColor = score > 70 ? 'text-green-600' : score > 49 ? 'text-yellow-600' : 'text-red-600';

    return (
        <div className='resume-summary'>
            <div className="category">
                <div className="flex flex-row gap-2 items-center justify-center">
                    <p>{title}</p>
                    <ScoreBadge score={score} />
                </div>
                <p className="text-2xl">
                    <span className={textColor}>{score}/100</span>
                </p>
            </div>
            {/* <h3 className='text-lg font-semibold'>{title}</h3> */}
            {/* <ScoreGauge score={score} /> */}
        </div>
    )
}

const Summary = ({ feedback }: { feedback: Feedback }) => {
    return (
        <div className='bg-white rounded-2xl shadow-md w-full'>
            <div className="flex flex-row items-center p-4 gap-8">
                <ScoreGauge score={feedback.overallScore || 0} />

                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold">Overall Score</h2>
                    <p className="text-gray-500 text-sm">This score is calculated based on various factors as listed below.</p>
                    {/* <p className="text-gray-600 text-sm">{feedback.overallScore || 0}</p> */}
                </div>
            </div>
            <Category title="Tone & Style" score={feedback.toneAndStyle?.score || 0} />
            <Category title="Content Quality" score={feedback.content?.score || 0} />
            <Category title="Formatting" score={feedback.structure?.score || 0} />
            <Category title="Skills" score={feedback.skills?.score || 0} />
        </div>
    )
}

export default Summary