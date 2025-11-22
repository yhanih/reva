import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from "components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";
import { supabase } from '../../supabaseClient';

export default function SignUp() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('marketer');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        // Validate passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        // Validate password length
        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            setLoading(false);
            return;
        }

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${window.location.origin}/admin/default`,
                    data: {
                        full_name: fullName,
                        role: role,
                    },
                },
            });

            if (error) throw error;

            // Check if email confirmation is required
            if (data?.user?.identities?.length === 0) {
                setError('This email is already registered. Please sign in instead.');
            } else {
                setSuccess('Account created! Please check your email to verify your account.');
                setTimeout(() => {
                    navigate('/auth/sign-in');
                }, 3000);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/admin/default`,
                },
            });

            if (error) throw error;
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
            {/* Sign up section */}
            <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
                <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
                    Sign Up
                </h4>
                <p className="mb-9 ml-1 text-base text-gray-600">
                    Create your account to get started!
                </p>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                        {success}
                    </div>
                )}

                <div
                    onClick={handleGoogleSignUp}
                    className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800"
                >
                    <div className="rounded-full text-xl">
                        <FcGoogle />
                    </div>
                    <h5 className="text-sm font-medium text-navy-700 dark:text-white">
                        Sign Up with Google
                    </h5>
                </div>

                <div className="mb-6 flex items-center gap-3">
                    <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
                    <p className="text-base text-gray-600 dark:text-white">or</p>
                    <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
                </div>

                <form onSubmit={handleSignUp}>
                    {/* Full Name */}
                    <InputField
                        variant="auth"
                        extra="mb-3"
                        label="Full Name*"
                        placeholder="John Doe"
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />

                    {/* Email */}
                    <InputField
                        variant="auth"
                        extra="mb-3"
                        label="Email*"
                        placeholder="mail@example.com"
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    {/* Password */}
                    <InputField
                        variant="auth"
                        extra="mb-3"
                        label="Password*"
                        placeholder="Min. 8 characters"
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {/* Confirm Password */}
                    <InputField
                        variant="auth"
                        extra="mb-3"
                        label="Confirm Password*"
                        placeholder="Confirm your password"
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    {/* Role Selection */}
                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-bold text-navy-700 dark:text-white">
                            I am a...
                        </label>
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => setRole('marketer')}
                                className={`flex-1 rounded-xl py-3 text-sm font-medium transition-all duration-200 ${role === 'marketer'
                                    ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/50'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-navy-700 dark:text-white'
                                    }`}
                            >
                                Marketer
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('promoter')}
                                className={`flex-1 rounded-xl py-3 text-sm font-medium transition-all duration-200 ${role === 'promoter'
                                    ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/50'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-navy-700 dark:text-white'
                                    }`}
                            >
                                Promoter
                            </button>
                        </div>
                    </div>

                    {/* Terms checkbox */}
                    <div className="mb-4 flex items-center px-2">
                        <Checkbox />
                        <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                            I agree to the{' '}
                            <a href="/terms" className="text-brand-500 hover:text-brand-600">
                                Terms & Conditions
                            </a>
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 disabled:opacity-50"
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <div className="mt-4">
                    <span className="text-sm font-medium text-navy-700 dark:text-gray-600">
                        Already have an account?
                    </span>
                    <a
                        href="/auth/sign-in"
                        className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
                    >
                        Sign In
                    </a>
                </div>
            </div>
        </div>
    );
}
