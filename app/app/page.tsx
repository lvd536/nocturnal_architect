"use server";

import { getBoards } from "@/actions/supabase/board";
import BoardCard from "@/components/App/Dashboard/Board";
import CreateBoard from "@/components/App/Dashboard/CreateBoard";

export default async function App() {
    const data = await getBoards();
    return (
        <div className="px-4 lg:px-6">
            <div>
                <p className="font-bold text-xs leading-[133%] tracking-[0.2em] uppercase text-[#d0bcff]">
                    Overview
                </p>
                <p className="font-extrabold text-3xl leading-[120%] tracking-[-0.03em] text-[#e5e2e3]">
                    Your Boards
                </p>
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
