import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import AuthImagePattern from "../components/AuthImagePattern";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const { login, isLoggingIn } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        login(formData);
    };

    return (
        <div className="h-screen grid lg:grid-cols-2 bg-grid-pattern relative overflow-hidden bg-base-100">
            {/* Ambient Background Glow Blobs */}
            <div className="absolute top-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

            {/* Left Side - Form */}
            <div className="flex flex-col justify-center items-center p-6 sm:p-12 z-10">
                <div className="w-full max-w-md bg-base-100/40 backdrop-blur-xl border border-base-content/10 shadow-2xl p-8 rounded-3xl space-y-6 relative overflow-hidden transition-all duration-300 hover:border-primary/20">
                    
                    {/* Inner subtle glow corners */}
                    <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/15 rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-secondary/10 rounded-full blur-2xl pointer-events-none" />

                    {/* Logo */}
                    <div className="text-center">
                        <div className="flex flex-col items-center gap-2 group">
                            <div className="relative">
                                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary to-secondary opacity-35 blur-sm animate-pulse" />
                                <div className="relative size-12 rounded-2xl bg-base-100 flex items-center justify-center border border-base-content/10 group-hover:border-primary/30 transition-all duration-300">
                                    <MessageSquare className="size-6 text-primary" />
                                </div>
                            </div>
                            <h1 className="text-3xl font-extrabold tracking-tight mt-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                Welcome Back
                            </h1>
                            <p className="text-sm text-base-content/60 font-medium">Sign in to your account</p>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="form-control">
                            <label className="label py-1">
                                <span className="label-text font-bold text-xs uppercase tracking-wider text-base-content/75">Email</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="size-5 text-base-content/40" />
                                </div>
                                <input
                                    type="email"
                                    className="input input-bordered w-full pl-10 bg-base-100/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium text-sm"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label py-1">
                                <span className="label-text font-bold text-xs uppercase tracking-wider text-base-content/75">Password</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="size-5 text-base-content/40" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="input input-bordered w-full pl-10 pr-10 bg-base-100/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium text-sm"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-primary transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="size-5 text-base-content/40" />
                                    ) : (
                                        <Eye className="size-5 text-base-content/40" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className="btn btn-primary w-full shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200" 
                            disabled={isLoggingIn}
                        >
                            {isLoggingIn ? (
                                <>
                                    <Loader2 className="size-5 animate-spin" />
                                    Loading...
                                </>
                            ) : (
                                "Sign in"
                            )}
                        </button>
                    </form>

                    <div className="text-center pt-2 border-t border-base-content/5">
                        <p className="text-xs text-base-content/65 font-medium">
                            Don&apos;t have an account?{" "}
                            <Link to="/signup" className="link link-primary font-bold">
                                Create account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Image/Pattern */}
            <AuthImagePattern
                title="Welcome Back to NexusChat"
                subtitle="Sign in to continue your conversations, collaborate with your groups, and stay connected in real-time."
            />
        </div>
    );
};
export default LoginPage;
