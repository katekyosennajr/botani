'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RegisterPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Something went wrong');
            }

            router.push('/login');
        } catch (error: any) {
            setError(error.message);
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-gray-50">
            {/* Dynamic Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-purple-200/30 blur-[120px] mix-blend-multiply animate-blob" />
                <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full bg-blue-200/30 blur-[120px] mix-blend-multiply animate-blob animation-delay-2000" />
                <div className="absolute bottom-[-20%] left-[20%] w-[70%] h-[70%] rounded-full bg-pink-200/30 blur-[120px] mix-blend-multiply animate-blob animation-delay-4000" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-[440px] z-10 p-4"
            >
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20 p-8 sm:p-10 relative overflow-hidden">
                    {/* Decorative top highlight */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-80" />

                    <div className="text-center mb-8">
                        <Link href="/" className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-light text-white mb-6 shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                            <span className="font-heading font-bold text-xl">B</span>
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">Create Account</h1>
                        <p className="text-gray-500">Join our community of plant lovers</p>
                    </div>

                    <form className="space-y-6" onSubmit={onSubmit}>
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label htmlFor="name" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">
                                    Full Name
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <User size={18} className="text-gray-400 group-focus-within:text-primary transition-colors" />
                                    </div>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        required
                                        className="block w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all focus:bg-white"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor="email" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">
                                    Email
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail size={18} className="text-gray-400 group-focus-within:text-primary transition-colors" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="block w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all focus:bg-white"
                                        placeholder="name@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor="password" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">
                                    Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock size={18} className="text-gray-400 group-focus-within:text-primary transition-colors" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="new-password"
                                        required
                                        className="block w-full pl-11 pr-11 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all focus:bg-white"
                                        placeholder="Create a password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="p-3 rounded-xl bg-red-50 border border-red-100 flex items-center gap-2 text-red-600 text-sm"
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                                {error}
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-2xl shadow-lg shadow-primary/20 text-sm font-semibold text-white bg-gradient-to-r from-primary to-primary-light hover:to-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-70 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="animate-spin" size={18} /> Creating account...
                                </span>
                            ) : (
                                'Sign Up'
                            )}
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-600 mt-8">
                        Already have an account?{' '}
                        <Link href="/login" className="font-semibold text-primary hover:text-primary-light transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>

                <p className="text-center text-xs text-gray-400 mt-8">
                    &copy; {new Date().getFullYear()} Botani. All rights reserved.
                </p>
            </motion.div>
        </div>
    );
}
