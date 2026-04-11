import LandingInfo from "@/components/Landing/LandingInfo";
import LandingJoin from "@/components/Landing/LandingJoin";
import LandingNavBar from "@/components/Landing/LandingNavBar";
import LadningTools from "@/components/Landing/LandingTools";

export default function Landing() {
    return (
        <main className="w-full text-center">
            <LandingNavBar />
            <LandingInfo />
            <LadningTools />
            <LandingJoin />
        </main>
    );
}
