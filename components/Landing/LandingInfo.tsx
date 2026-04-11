import { Button } from "../ui/button";

export default function LandingInfo() {
    return (
        <div className="relative rounded-full mt-39" id="info">
            <div className="absolute top-0 left-0 w-full h-full bg-[rgba(208,188,255,0.10)] blur-[120px]" />
            <div className="font-bold text-8xl tracking-tight">
                <p>Plan Together.</p>
                <p className="text-[#d0bcff]">Build Better.</p>
            </div>
            <p className="text-[20px] leading-6 text-center text-[#cbc3d7] my-8">
                Experience atmospheric productivity. A high-fidelity workspace
                designed for deep focus and seamless real-time collaboration.
            </p>
            <Button className="py-6 px-8 bg-[#d0bcff] shadow-[0_0_20px_0_rgba(208,188,255,0.3)] font-bold leading-6 text-center text-[#3c0091]">
                Get Started Free
            </Button>
        </div>
    );
}
