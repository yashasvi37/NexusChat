import { MessageSquare, Send, Sparkles, Users, Shield, Lock, Image, Heart, Zap } from "lucide-react";

const AuthImagePattern = ({ title, subtitle }) => {
    const gridItems = [
        { icon: MessageSquare, color: "text-primary bg-primary/10", delay: "animate-pulse [animation-duration:2s]" },
        { icon: Send, color: "text-secondary bg-secondary/10", delay: "animate-pulse [animation-duration:2.4s]" },
        { icon: Sparkles, color: "text-accent bg-accent/10", delay: "animate-pulse [animation-duration:2.8s]" },
        { icon: Users, color: "text-success bg-success/10", delay: "animate-pulse [animation-duration:2.2s]" },
        { icon: Shield, color: "text-warning bg-warning/10", delay: "animate-pulse [animation-duration:3s]" },
        { icon: Lock, color: "text-info bg-info/10", delay: "animate-pulse [animation-duration:2.6s]" },
        { icon: Image, color: "text-error bg-error/10", delay: "animate-pulse [animation-duration:2.5s]" },
        { icon: Heart, color: "text-primary bg-primary/10", delay: "animate-pulse [animation-duration:2.1s]" },
        { icon: Zap, color: "text-accent bg-accent/10", delay: "animate-pulse [animation-duration:2.7s]" },
    ];

    return (
        <div className="hidden lg:flex items-center justify-center bg-base-200/50 p-12 relative overflow-hidden h-full min-h-screen">
            {/* Radial glow background blobs */}
            <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/15 rounded-full blur-3xl animate-pulse pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse pointer-events-none [animation-delay:1.5s]" />

            <div className="max-w-md w-full text-center space-y-8 z-10">
                {/* 3x3 Staggered Grid */}
                <div className="grid grid-cols-3 gap-4 bg-base-100/40 p-6 rounded-3xl border border-base-content/5 backdrop-blur-md shadow-2xl">
                    {gridItems.map((item, i) => (
                        <div
                            key={i}
                            className={`aspect-square rounded-2xl ${item.color} flex items-center justify-center border border-base-content/5 transition-all duration-500 hover:scale-110 hover:-rotate-6 hover:border-primary/40 hover:bg-base-100 hover:shadow-xl hover:shadow-primary/5 cursor-pointer ${item.delay}`}
                        >
                            <item.icon className="size-8" />
                        </div>
                    ))}
                </div>

                {/* Typography Block */}
                <div className="space-y-3">
                    <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient-x">
                        {title}
                    </h2>
                    <p className="text-base-content/75 leading-relaxed text-sm font-medium">
                        {subtitle}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthImagePattern;
