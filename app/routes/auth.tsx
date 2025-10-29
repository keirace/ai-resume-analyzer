import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export const meta: ({ }: any) => Array<{ title?: string; name?: string; content?: string }> = ({ }) => {
    return [
        { title: "Resume | Auth" },
        { name: "description", content: "Log in to your account" }
    ];
}

const auth = () => {
    const { isLoading, auth } = usePuterStore();
    const location = useLocation(); // Get current location
    const next = location.search.split("next=")[1]; // Extract 'next' query parameter
    const navigate = useNavigate(); // Hook to navigate

    useEffect(() => {
        if (auth.isAuthenticated) {
            navigate(next); // Redirect to the 'next' path after login
        }
    }, [auth.isAuthenticated, navigate, next]);

    return (
        <main className="bg-[url('/images/bg-auth.svg')] bg-cover flex items-center justify-center min-h-screen">
            <div className="gradient-border shadow-lg">
                <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1>Welcome</h1>
                        <h2>Log in to your account to continue your job journey</h2>
                    </div>
                    <div className="flex flex-col items-center">
                        {isLoading ? (<button className="auth-button animate-pulse">Signing you in...</button>) : (
                            <>
                                {
                                    auth.isAuthenticated ? <button className="auth-button" onClick={auth.signOut}><p>Log Out</p></button> : <button className="auth-button" onClick={auth.signIn}><p>Log In</p></button>
                                }
                            </>
                        )}
                    </div>
                </section>
            </div>
        </main>
    )
}

export default auth