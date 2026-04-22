"use client";

import { formatTime } from "@/helpers/date.helpers";
import { useBoardStore } from "@/store/boardStore";
import { Board } from "@/types/board.types";

interface IProps {
    board: Board;
}

export default function BoardCard({ board }: IProps) {
    const setBoardId = useBoardStore((s) => s.setBoardId);

    return (
        <a
            className="group flex flex-col justify-between w-46.5 h-53 backdrop-blur-xl bg-[rgba(53,52,54,0.4)] p-5 rounded-2xl border border-solid border-[rgba(73,68,84,0.2)] hover:border-[rgba(208,188,255,0.3)] hover:bg-[rgba(53,52,54,0.6)] hover:shadow-[0_0_25px_-5px_rgba(208,188,255,0.15)] transition-all duration-300 cursor-pointer"
            href={`/app/boards/${board.id}`}
            onClick={() => setBoardId(board.id)}
        >
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-start gap-2">
                    <h1 className="font-bold text-lg leading-[120%] text-[#e5e2e3] group-hover:text-white transition-colors">
                        {board.title}
                    </h1>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#d0bcff] shadow-[0_0_6px_#d0bcff] mt-1.5 shrink-0" />
                </div>
                <p className="font-normal text-xs leading-[133%] text-slate-400 line-clamp-2">
                    {board.description || "No description"}
                </p>
            </div>

            <div className="flex justify-between items-center border-t border-[rgba(73,68,84,0.1)] pt-2">
                <p className="font-bold text-[10px] leading-[150%] tracking-widest uppercase text-slate-500 group-hover:text-slate-400 transition-colors">
                    {formatTime(board.created_at)}
                </p>
            </div>
        </a>
    );
}
