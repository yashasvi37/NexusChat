import { MessageSquare, ShieldCheck, Sparkles, Zap } from "lucide-react";

const features = [
    {
        icon: Zap,
        title: "Instant Sync",
        description: "Experience ultra-fast real-time messaging powered by Socket.io.",
        color: "text-primary bg-primary/10",
    },
    {
        icon: ShieldCheck,
        title: "Arcjet Guarded",
        description: "Enterprise-grade rate limiting and bot detection protect your conversations.",
        color: "text-secondary bg-secondary/10",
    },
    {
        icon: Sparkles,
        title: "Cloud Sharing",
        description: "Upload images, edit profiles, and share media securely using Cloudinary.",
        color: "text-accent bg-accent/10",
    },
];

const NoChatSelected = () => {
    return (
        <div className="w-full flex-1 flex flex-col items-center justify-center p-8 lg:p-16 bg-base-100/30 relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="max-w-xl w-full text-center space-y-10 z-10">
                {/* Visual Bouncing/Glow Hub */}
                <div className="flex justify-center">
                    <div className="relative">
                        {/* Outer Glow Ring */}
                        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary to-secondary opacity-30 blur-lg animate-pulse" />
                        
                        {/* Core Icon Container */}
                        <div className="relative w-20 h-20 rounded-3xl bg-base-100 flex items-center justify-center border border-base-content/10 shadow-xl animate-bounce [animation-duration:2.5s]">
                            <MessageSquare className="w-10 h-10 text-primary animate-pulse" />
                        </div>
                    </div>
                </div>

                {/* Typography Header */}
                <div className="space-y-3">
                    <h2 className="text-3xl font-extrabold tracking-tight">
                        Welcome to <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">NexusChat</span>
                    </h2>
                    <p className="text-base-content/65 max-w-sm mx-auto text-sm font-medium">
                        Select a conversation from the sidebar on the left to start chatting and sharing moments instantly.
                    </p>
                </div>

                {/* Visual Feature Micro-Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="bg-base-100/50 border border-base-content/5 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 flex flex-col items-start gap-3 backdrop-blur-sm cursor-default"
                        >
                            <div className={`p-2 rounded-xl ${feature.color} inline-flex`}>
                                <feature.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-base-content">{feature.title}</h4>
                                <p className="text-xs text-base-content/60 mt-1 leading-relaxed">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NoChatSelected;

