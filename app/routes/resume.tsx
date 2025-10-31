import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import type { Route } from './+types/resume';
import { Link } from 'react-router';
import { usePuterStore } from '~/lib/puter';
import { useNavigate } from 'react-router';
import Summary from '~/components/Summary';
import ATS from '~/components/ATS';
import Details from '~/components/Details';

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Resume | Review" },
        { name: "description", content: "Detail overview of the resume analysis" },
    ];
}

const resume = () => {
    const { id } = useParams();
    const { auth, isLoading, fs, kv } = usePuterStore();

    const [resumeUrl, setResumeUrl] = React.useState<string | null>(null);
    const [imageUrl, setImageUrl] = React.useState<string | null>(null);
    const [feedback, setFeedback] = React.useState<Feedback | null>(null);
    const [statusMessage, setStatusMessage] = React.useState<string>("");

    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to /auth if not authenticated
        if (!isLoading && !auth.isAuthenticated) {
            navigate(`/auth?next=/resume/${id}`);
        }
    }, [isLoading, auth.isAuthenticated]);

    useEffect(() => {
        // Fetch resume details using the id
        const fetchResumeDetails = async (resumeId: string) => {
            // Simulate an API call
            const resume = await kv.get(`resume:${resumeId}`);
            if (!resume) {
                setStatusMessage("Resume not found");
                return;
            }

            const data = JSON.parse(resume);

            const resumeBlob = await fs.read(data.resumePath);
            if (!resumeBlob) return;

            const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
            const resumeUrl = URL.createObjectURL(pdfBlob);
            setResumeUrl(resumeUrl);

            const imageBlob = await fs.read(data.imagePath);
            if (!imageBlob) return;

            const imageUrl = URL.createObjectURL(new Blob([imageBlob], { type: 'image/png' }));
            setImageUrl(imageUrl);

            setFeedback(data.feedback);
        };

        if (id) {
            fetchResumeDetails(id);
        }
    }, [id]);

    return (
        <main className='pt-0!'>
            <nav className="resume-nav">
                <Link to={`/`} className='back-button'><img src="/icons/back.svg" alt="Back" className='w-2.5 h-2.5' /><span className='text-gray-800 text-sm font-semibold'>Back to Homepage</span></Link>
            </nav>

            <div className="flex flex-row w-full max-lg:flex-col-reverse">
                {/* Resume Preview */}
                <section className="feedback-section bg-[url('/images/bg-small.svg')] bg-cover sticky top-0 h-screen items-center justify-center">
                    {imageUrl && resumeUrl && (
                        <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-w-xl:h-fit w-fit[90%]">
                            <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                                <img src={imageUrl} alt="Resume Preview" className='w-full h-full object-contain rounded-2xl' title='resume' />
                            </a>
                        </div>
                    )}
                </section>

                {/* Feedback Section */}
                <section className="feedback-section">
                    <h2 className='text-4xl text-black! font-bold'>Resume Review</h2>
                    {feedback ? (<div className='flex flex-col gap-8 animate-in fade-in duration-1000'>
                        <Summary feedback={feedback} />
                        <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
                        <Details feedback={feedback} />
                    </div>) : (statusMessage ? <p className='text-red-500'>{statusMessage}</p> : <img src='/images/resume-scan-2.gif' alt='loading' className='w-full' />)}
                </section>
            </div>
        </main>
    )
}

export default resume