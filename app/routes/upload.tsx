import React, { useState } from 'react'
import Navbar from '~/components/Navbar';
import FileUploader from '../components/FileUploader';
import { usePuterStore } from '~/lib/puter';
import { useNavigate } from "react-router";
import { convertPdfToImage } from '~/lib/pdfToImage';
import { generateUUID } from '~/lib/utils';
import { prepareInstructions } from '../../constants';

const upload = () => {
    const { auth, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState<Boolean>(false);
    const [statusMessage, setStatusMessage] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
        // Handle the selected file
        setSelectedFile(file);
    };

    const handleAnalyze = async ({ companyName, jobTitle, jobDescription, selectedFile }: {
        companyName: string;
        jobTitle: string;
        jobDescription: string;
        selectedFile: File | null;
    }) => {
        // Simulate API call
        setIsProcessing(true);
        setStatusMessage("Uploading the file...");
        const uploadedFile = await fs.upload([selectedFile!]);
        if (!uploadedFile) {
            // setIsProcessing(false);
            setStatusMessage("Failed to upload the resume. Please try again.");
            return;
        }

        setStatusMessage("Converting to image...")
        const imageFile = await convertPdfToImage(selectedFile!);
        if (!imageFile.file) {
            // setIsProcessing(false);
            setStatusMessage("Failed to convert PDF to image. Please try again.");
            return;
        }

        setStatusMessage("Uploading the image...");
        const uploadedImage = await fs.upload([imageFile.file]);
        if (!uploadedImage) {
            // setIsProcessing(false);
            setStatusMessage("Failed to upload the image. Please try again.");
            return;
        }

        setStatusMessage("Preparing data...");

        const uuid = generateUUID();
        const data = {
            id: uuid,
            resumePath: uploadedFile.path,
            imagePath: uploadedImage.path,
            companyName,
            jobTitle,
            jobDescription,
            feedback: '',
        }

        await kv.set(`resume:${uuid}`, JSON.stringify(data));

        setStatusMessage("Getting AI analysis...");
        const feedback = await ai.feedback(uploadedFile.path, prepareInstructions({ jobTitle, jobDescription }));
        if (!feedback) {
            // setIsProcessing(false);
            setStatusMessage("Failed to get AI analysis. Please try again.");
            return;
        }

        const feedbackText = typeof feedback.message.content === 'string' ? feedback.message.content : feedback.message.content[0].text;
        data.feedback = JSON.parse(feedbackText);
        await kv.set(`resume:${uuid}`, JSON.stringify(data));

        setIsProcessing(false);
        setStatusMessage("Resume analyzed successfully!");

    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent refresh
        const form = e.currentTarget; // Get the form element
        const formData = form.closest('form');
        if (!formData) return;

        // Create a FormData object from the form
        const formDataObj = new FormData(form);
        const companyName = formDataObj.get('company-name') as string;
        const jobTitle = formDataObj.get('job-title') as string;
        const jobDescription = formDataObj.get('job-description') as string;

        if (!selectedFile) {
            alert("Please upload a resume file.");
            return;
        }

        handleAnalyze({ companyName, jobTitle, jobDescription, selectedFile });
    };

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover">
            <Navbar />
            <section className="main-section">
                <div className="page-heading py-16">
                    <h1>Upload Your Resume</h1>
                    <h2>{statusMessage}</h2>
                    {/* <h2>Get feedback and improve your chances of landing an interview</h2> */}
                    {isProcessing ? (
                        // Processing State
                        <>
                            <img src="/images/resume-scan.gif" alt="" className='w-lg' />
                        </>
                    ) : (
                        // Upload State
                        <>
                            <h2>Drop your resume for an ATS score and improvement suggestions</h2>
                            <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col items-center gap-4 mt-8">
                                <div className="form-div">
                                    <label htmlFor="company-name">Company Name</label>
                                    <input type="text" id="company-name" name="company-name" className="form-input" required />
                                </div>
                                <div className="form-div">
                                    <label htmlFor="job-title">Job Title</label>
                                    <input type="text" id="job-title" name="job-title" className="form-input" required />
                                </div>
                                <div className="form-div">
                                    <label htmlFor="job-description">Job Description</label>
                                    <textarea id="job-description" name="job-description" className="form-input h-32" rows={5} required></textarea>
                                </div>
                                <div className="form-div">
                                    <label htmlFor="resume-upload">Upload Resume</label>
                                    <FileUploader onFileSelect={handleFileSelect} selectedFile={selectedFile} />
                                </div>
                                <button type="submit" className="primary-button ">Analyze Resume</button>
                            </form>
                        </>
                    )}
                </div>
            </section>
        </main>
    )
}

export default upload;