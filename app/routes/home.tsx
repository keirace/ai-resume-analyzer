import type { Route } from "./+types/home";
import Navbar from '../components/Navbar';
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Resume" },
    { name: "description", content: "Smart Resume Analyzer" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate(); // Hook to navigate
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    const fetchResumes = async () => {
      setLoadingResumes(true);
      const resumes = await kv.list('resume:*', true) as KVItem[];
      const parsedResumes = resumes?.map((resume) => JSON.parse(resume.value) as Resume);
      console.log('Fetched resumes:', parsedResumes);
      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    };

    fetchResumes();
  }, [kv]);

  useEffect(() => {
    // Redirect to /auth if not authenticated
    if (!auth.isAuthenticated) {
      navigate('/auth?next=/');
    }
  }, [auth.isAuthenticated]);


  return <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen">
    <Navbar />
    <section className="main-section">
      <div className="page-heading py-16">
        <h1>Track your job applications with ease</h1>
        {!loadingResumes && resumes.length === 0 ? (
          <h2 className="pt-6">No resumes found. Upload your resume to get started.</h2>
        ) : (
          <h2>Review your applications and get insights with AI-powered feedback</h2>
        )}
      </div>
      {loadingResumes && (
        <div className="loading-resumes flex flex-col items-center justify-center">
          <img src="/images/resume-scan-2.gif" alt="Loading resumes" className="w-[200px]" />
        </div>
      )}

      {!loadingResumes && resumes.length > 0 && (
        <div className="resumes-section">
          {resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      )}

      {!loadingResumes && resumes?.length === 0 && (
        <div className="no-resumes flex flex-col items-center justify-center gap-4 mt-10">
          <Link to="/upload" className="upload-resume-button primary-button">Upload Your First Resume</Link>
          {/* <img src="/images/empty-resume.svg" alt="No resumes" className="w-[150px]" />
          <p className="text-gray-600 text-lg">You haven't uploaded any resumes yet.</p> */}
        </div>
      )}
    </section>
  </main>;
}
