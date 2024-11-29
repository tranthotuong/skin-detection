"use client";
import { useState, useEffect } from "react";
import { HEADER_SIGN, SIGN_UP, SIGN_IN_URL, DETECTION_URL } from "@/lib/constants";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const SignUp: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();
    const { isAuthenticated, signup } = useAuth();

    //init
    if (isAuthenticated) {
        router.push(DETECTION_URL);
        return null;
    }

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== rePassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            await signup(email, password);
            setSuccess("Sign-up successful!");
            router.push(SIGN_IN_URL);
        } catch (err: any) {
            setError(err.message || "Sign-up failed. Please try again.");
        }
    };

    return (
        <div className="container mx-auto px-4 max-w-[1024px]">
            <div className="px-6 pt-14 lg:px-8">
                <div className="mx-auto max-w-2xl">
                    <div className="text-center">
                        <div className="mt-10 flex items-center justify-center">
                            <img
                                className="w-48"
                                src="/icon512_rounded.png"
                                alt=""
                            />
                        </div>
                        <h1
                            className="text-balance text-3xl font-semibold tracking-tight text-gray-900"
                        >
                            {HEADER_SIGN.title}
                        </h1>
                        <p className="mt-2 text-lg text-[#757893]">
                            {HEADER_SIGN.description}
                        </p>
                        <form onSubmit={handleSignUp}>
                            <div className="mt-8 flex items-center justify-center">
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    className="min-w-0 h-12 flex-auto rounded-3xl bg-white/5 px-3.5 py-2 text-black text-base 
                                border border-[#edebf7] outline-0 outline-[#edebf7]"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mt-5 flex items-center justify-center">
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    className="min-w-0 h-12 flex-auto rounded-3xl bg-white/5 px-3.5 py-2 text-black 
                                text-base sm:text-sm/6 border border-[#edebf7] outline-0 outline-[#edebf7]"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="mt-5 flex items-center justify-center">
                                <input
                                    name="repassword"
                                    type="password"
                                    required
                                    className="min-w-0 h-12 flex-auto rounded-3xl bg-white/5 px-3.5 py-2 text-black text-base 
                                sm:text-sm/6 border border-[#edebf7] outline-0 outline-[#edebf7]"
                                    placeholder="Confirm Password"
                                    value={rePassword}
                                    onChange={(e) => setRePassword(e.target.value)}
                                />
                            </div>
                            <div className="mt-10">
                                {error && <p className="error">{error}</p>}
                                <button
                                    type="submit"
                                    className="block w-full h-12 rounded-full bg-[#2bafa2] px-3.5 py-2.5 text-center text-base 
                                font-semibold text-white shadow-sm hover:bg-[#44a6a3] focus-visible:outline focus-visible:outline-2 
                                focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    {SIGN_UP.signUp}
                                </button>
                            </div>
                        </form>
                        <div className="relative flex py-5 items-center">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="flex-shrink mx-4 text-black">or</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>
                        <Link href={SIGN_IN_URL} className="text-base text-[#757893] font-semibold">
                            {SIGN_UP.contextSignIn}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;