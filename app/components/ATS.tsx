import React from 'react'
import Suggestion from './Suggestion';

interface ATSProps {
    score: number;
    suggestions: Suggestion[];
}

const ATS = ({ score, suggestions }: ATSProps) => {

    return (
        <div className={`rounded-2xl shadow-md w-full p-8 bg-linear-to-b to-light-white gap-4 flex flex-col ${score >= 70 ? 'from-green-50' : score >= 50 ? 'from-yellow-50' : 'from-red-50'}`}>
            <div className="flex flex-row items-center gap-4">
                <img src={score >= 70 ? '/icons/ats-good.svg' : score >= 50 ? '/icons/ats-warning.svg' : '/icons/ats-bad.svg'} alt="ATS Icon" className='w-10 h-10' />
                <h3 className='text-2xl font-semibold'>ATS Score: {score}/100</h3>
            </div>

            <div className="flex flex-col gap-2">
                <p className="font-medium text-lg">How well does your resume pass through Applicant Tracking Systems (ATS)?</p>
                <p className="text-md text-gray-500">
                    Your resume was scanned like an employer would. Here's how it
                    performed:
                </p>
                <ul className='space-y-3'>
                    {suggestions.map((suggestion, index) => (
                        <Suggestion suggestion={suggestion} key={index} />
                    ))}
                </ul>
            </div>
            <div className="text-gray-700 italic text-sm">
                <p>Note: These suggestions are based on the content of your resume and may not guarantee a specific outcome.</p>
            </div>
        </div>
    )
}

export default ATS