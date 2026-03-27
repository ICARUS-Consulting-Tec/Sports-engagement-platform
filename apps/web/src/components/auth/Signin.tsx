import React, { useState } from "react"
import { Auth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const { signInUser, isAuthEnabled } = Auth();
    const navigate = useNavigate();

    const handleSignIn = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { success, error } = await signInUser(email, password);

        if (error) {
            const errorMessage = typeof error === "string"
                ? error
                : error.message || "No se pudo iniciar sesión.";

            setError(errorMessage);

            setTimeout(() => {
                setError("");
            }, 3000);

        } else {
            navigate("/");
        }

        if (success) {
            setError(""); // Reset the error when there's a session
        }
    }

    return (
        <div>
            <form onSubmit={handleSignIn} className="max-w-md m-auto pt-24">
                <h2 className="font-bold pb-2">Sign in</h2>
                <p>
                Don't have an account yet? <Link to="/signup">Sign up</Link>
                </p>
                {!isAuthEnabled && (
                    <p className="text-red-600 pt-4">
                        El login está desactivado porque faltan las variables de Supabase en `.env`.
                    </p>
                )}
                <div className="flex flex-col py-4">
                {/* <label htmlFor="Email">Email</label> */}
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-3 mt-2"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    disabled={!isAuthEnabled}
                />
                </div>
                <div className="flex flex-col py-4">
                {/* <label htmlFor="Password">Password</label> */}
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-3 mt-2"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    disabled={!isAuthEnabled}
                />
                </div>
                <button className="w-full mt-4" disabled={!isAuthEnabled}>Sign In</button>
                {error && <p className="text-red-600 text-center pt-4">{error}</p>}
            </form>
        </div>
    );
}
