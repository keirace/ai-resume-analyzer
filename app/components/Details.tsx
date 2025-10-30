import React from 'react'
import { Accordion, AccordionItem, AccordionHeader, AccordionContent } from './Accordion';
import { cn } from '~/lib/utils';
import ScoreBadge from './ScoreBadge';
import Suggestion from './Suggestion';


const CategoryHeader = ({ title, categoryScore }: { title: string; categoryScore: number }) => {
    return (
        <div className="flex flex-row gap-4 justify-between items-center py-2">
            <p className="text-2xl font-semibold">{title}</p>
            <ScoreBadge score={categoryScore} />
        </div>
    );
};

interface Tips {
    type: "good" | "improve";
    tip: string;
    explanation: string;
}

const CategoryContent = ({ tips }: { tips: Tips[] }) => {
    return (
        <div className="flex flex-col gap-4 items-center w-full">
            <ul className="bg-gray-50 w-full rounded-lg px-5 py-4 grid grid-cols-2 gap-4">
                {tips.map((tip, index) => (
                    <Suggestion suggestion={tip} key={index} />
                ))}
            </ul>
            <div className="flex flex-col gap-4 w-full">
                {tips.map((tip, index) => (
                    <div
                        key={index + tip.tip}
                        className={cn(
                            "flex flex-col gap-2 rounded-2xl p-4",
                            tip.type === "good"
                                ? "bg-green-50 border border-green-200 text-green-700"
                                : "bg-yellow-50 border border-yellow-200 text-yellow-700"
                        )}
                    >
                        <div className="flex flex-row gap-2 items-center">
                            <img
                                src={
                                    tip.type === "good"
                                        ? "/icons/check.svg"
                                        : "/icons/warning.svg"
                                }
                                alt="score"
                                className="size-5"
                            />
                            <p className="text-xl font-semibold">{tip.tip}</p>
                        </div>
                        <p>{tip.explanation}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

const Details: React.FC<{ feedback: Feedback }> = ({ feedback }) => {
    return (
        <div className='flex flex-col gap-4 w-full'>
            <Accordion>
                <AccordionItem id='tone-and-style'>
                    <AccordionHeader id='tone-and-style' >
                        <CategoryHeader
                            title="Tone & Style"
                            categoryScore={feedback.toneAndStyle.score}
                        />
                    </AccordionHeader>
                    <AccordionContent id='tone-and-style'>
                        <CategoryContent tips={feedback.toneAndStyle.tips} />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem id="content">
                    <AccordionHeader id="content">
                        <CategoryHeader
                            title="Content"
                            categoryScore={feedback.content.score}
                        />
                    </AccordionHeader>
                    <AccordionContent id="content">
                        <CategoryContent tips={feedback.content.tips} />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem id="structure">
                    <AccordionHeader id="structure">
                        <CategoryHeader
                            title="Structure"
                            categoryScore={feedback.structure.score}
                        />
                    </AccordionHeader>
                    <AccordionContent id="structure">
                        <CategoryContent tips={feedback.structure.tips} />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem id="skills">
                    <AccordionHeader id="skills">
                        <CategoryHeader
                            title="Skills"
                            categoryScore={feedback.skills.score}
                        />
                    </AccordionHeader>
                    <AccordionContent id="skills">
                        <CategoryContent tips={feedback.skills.tips} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

        </div>
    )
}

export default Details