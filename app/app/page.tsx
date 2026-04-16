import BoardCard from "@/components/App/Dashboard/Board";
import CreateBoard from "@/components/App/Dashboard/CreateBoard";
import { Board } from "@/types/board.types";
import { ArrowRight } from "lucide-react";

const data: Board[] = [
    {
        id: "board-1",
        title: "Cyberpunk 2077 UI Redesign",
        description: "Exploration of futuristic interfaces…",
        createdAt: new Date().toISOString(),
        tasks: [],
    },
    {
        id: "board-2",
        title: "E-Commerce Brand Identity",
        description: "Developing a premium visual…",
        createdAt: new Date().toISOString(),
        tasks: [],
    },
    {
        id: "board-3",
        title: "board title",
        description: "description",
        createdAt: new Date().toISOString(),
        tasks: [],
    },
];

export default function App() {
    return (
        <div className="px-4 lg:px-6">
            <div className="flex items-end justify-between">
                <div>
                    <p className="font-bold text-xs leading-[133%] tracking-[0.2em] uppercase text-[#d0bcff]">
                        Overview
                    </p>
                    <p className="font-extrabold text-3xl leading-[120%] tracking-[-0.03em] text-[#e5e2e3]">
                        Your Boards
                    </p>
                </div>
                <div className="flex items-center gap-1 font-semibold text-sm leading-[143%] text-center text-[#4fdbc8]">
                    View all boards
                    <ArrowRight className="p-1" />
                </div>
            </div>
            <div className="flex flex-wrap gap-6 mt-6">
                <CreateBoard />
                {data.map((board) => (
                    <BoardCard board={board} key={board.id} />
                ))}
            </div>
        </div>
    );
}
