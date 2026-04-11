import { Button } from "../ui/button";

export default function FinishForm() {
    return (
        <div className="flex w-full h-full items-center justify-center mt-8">
            <Button
                variant="outline"
                className="w-37.5 h-11 shadow-[0_0_20px_0_rgba(208,188,255,0.2)] bg-[#d0bcff]! px-8 py-3 rounded-lg font-bold text-sm leading-[143%] tracking-widest uppercase text-center text-[#3c0091] hover:text-indigo-600!"
            >
                Finish setup
            </Button>
        </div>
    );
}
