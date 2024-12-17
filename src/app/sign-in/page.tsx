"use client";
import { useState, useEffect } from "react";
import { HEADER_SIGN, DETECTION_URL, SIGN_IN, SIGN_UP_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const SignIn: React.FC = () => {
    //Define variable
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { defaultPage, login, isAuthenticated, email: emailResponses } = useAuth();
    const router = useRouter();

    //init
    useEffect(() => {
        if (emailResponses) {
            setEmail(emailResponses);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            router.push(defaultPage);
        }
    }, [isAuthenticated]);

    //Define Function
    /**
     * Handle Login Page
     * @param e 
     */
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
            router.push(DETECTION_URL);
        } catch (err) {
            setError("Invalid email or password");
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
                        <form onSubmit={handleLogin}>
                            <div className="mt-8 flex items-center justify-center">
                                <input
                                    id="email-address"
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
                                    id="password"
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

                            <p className="text-right mt-1">
                                <a className="text-xs text-blue-600 text-right">
                                    {SIGN_IN.forgot}
                                </a>
                            </p>
                            <div className="mt-10">
                                <button
                                    type="submit"
                                    className="block w-full h-12 rounded-full bg-[#2bafa2] px-3.5 py-2.5 text-center text-base 
                                font-semibold text-white shadow-sm hover:bg-[#44a6a3] focus-visible:outline focus-visible:outline-2 
                                focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    {SIGN_IN.signIn}
                                </button>
                            </div>
                        </form>
                        <div className="relative flex py-5 items-center">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="flex-shrink mx-4 text-black">or</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>
                        {/* <div className="mt-10 flex gap-x-6">
                            <button
                                type="submit"
                                className="block w-full h-14 rounded-full bg-white px-3.5 py-2.5 text-center text-xl font-semibold text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Facebook
                            </button>
                            <button
                                type="submit"
                                className="block w-full h-14 rounded-full border-gray-900 bg-white px-3.5 py-2.5 text-center text-xl font-semibold text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Google
                            </button>
                        </div> */}
                        <Link href={SIGN_UP_URL} className="text-base text-[#757893] font-semibold">
                            {SIGN_IN.register}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;