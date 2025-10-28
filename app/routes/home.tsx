import type { Route } from "./+types/home";
import Navbar from '../components/Navbar';
import { resumes } from "../../constants";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Resume" },
    { name: "description", content: "Smart Resume Analyzer" },
  ];
}

export default function Home() {
  const { auth } = usePuterStore();
  const navigate = useNavigate(); // Hook to navigate

  useEffect(() => {
    // Redirect to /auth if not authenticated
    if (!auth.isAuthenticated) {
      navigate('/auth?next=/');
    }
  }, [auth.isAuthenticated]);

  return <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen">
    <Navbar />
    <section className="main-section py-16">
      <div className="page-heading">
        <h1>Track your job applications with ease</h1>
        <h2>Review your applications and get insights with AI-powered feedback</h2>
      </div>

      {resumes.length > 0 && (
        <div className="resumes-section">
          {resumes.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      )}
    </section>
  </main>;
}
