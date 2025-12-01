'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, Mail, Lock, Eye, EyeOff, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            const res = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                setError('Invalid email or password');
                setIsLoading(false);
            } else {
                router.push('/');
                router.refresh();
            }
        } catch (error) {
            setError('Something went wrong');
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
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">Welcome back</h1>
                        <p className="text-gray-500">Enter your details to access your account</p>
                    </div>

                    <form className="space-y-6" onSubmit={onSubmit}>
                        <div className="space-y-4">
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
                                <div className="flex items-center justify-between ml-1">
                                    <label htmlFor="password" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Password
                                    </label>
                                    <Link href="#" className="text-xs font-medium text-primary hover:text-primary-light transition-colors">
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock size={18} className="text-gray-400 group-focus-within:text-primary transition-colors" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        required
                                        className="block w-full pl-11 pr-11 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all focus:bg-white"
                                        placeholder="••••••••"
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
                                    <Loader2 className="animate-spin" size={18} /> Signing in...
                                </span>
                            ) : (
                                'Sign In'
                            )}
                        </button>

                        <div className="relative py-2">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-100" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase tracking-wider">
                                <span className="px-2 bg-white/80 backdrop-blur-xl text-gray-400">Or continue with</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-2xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all hover:border-gray-300 hover:-translate-y-0.5"
                            >
                                <svg className="h-5 w-5 mr-2" aria-hidden="true" viewBox="0 0 24 24">
                                    <path d="M12.0003 20.45c4.6667 0 8.45-3.7833 8.45-8.45 0-.4167-.0333-.8167-.1-1.2h-8.35v2.4h4.8c-.2 1.1333-1.2167 3.25-4.8 3.25-2.8833 0-5.2333-2.35-5.2333-5.2333s2.35-5.2333 5.2333-5.2333c1.3667 0 2.5833.5 3.5333 1.3333l1.85-1.85C16.1836 4.2667 14.2336 3.55 12.0003 3.55c-4.6667 0-8.45 3.7833-8.45 8.45s3.7833 8.45 8.45 8.45z" fill="currentColor" />
                                </svg>
                                Google
                            </button>
                            <button
                                type="button"
                                className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-2xl shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all hover:border-gray-300 hover:-translate-y-0.5"
                            >
                                <svg className="h-5 w-5 mr-2 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                                </svg>
                                Facebook
                            </button>
                        </div>
                    </form>

                    <p className="text-center text-sm text-gray-600 mt-8">
                        Don't have an account?{' '}
                        <Link href="/register" className="font-semibold text-primary hover:text-primary-light transition-colors">
                            Create account
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
