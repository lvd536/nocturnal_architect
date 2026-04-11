import { Button } from "../ui/button";

export default function LandingJoin() {
    return (
        <div
            className="flex flex-col items-center justify-center border h-136.25 max-w-5xl rounded-[48px] border-solid border-[rgba(73,68,84,0.2)] mt-64 px-32 mx-auto bg-[#2a2a2b]"
            id="join"
        >
            <div className="font-black text-6xl leading-[100%] text-center text-[#e5e2e3]">
                <p>Ready to build your</p>
                <p className="text-[#d0bcff]">next masterpiece?</p>
            </div>
            <p className="font-normal text-xl leading-[140%] text-center text-[#cbc3d7] mt-8 mb-6">
                Join 500+ forward-thinking teams using Nocturnal Architect to
                define their future.
            </p>
            <Button className="py-6 px-8 bg-[#d0bcff] shadow-[0_0_20px_0_rgba(208,188,255,0.3)] font-bold leading-6 text-center text-[#3c0091]">
                Get Started Free
            </Button>
        </div>
    );
}
