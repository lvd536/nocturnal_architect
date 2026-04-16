"use client";

import { formatTime } from "@/helpers/date.helpers";
import { Board } from "@/types/board.types";

interface IProps {
    board: Board;
}

export default function BoardCard({ board }: IProps) {
    return (
        <a
            className="flex flex-col ityems-center justify-between order w-46.5 backdrop-blur-xl bg-[rgba(53,52,54,0.4)] p-5 rounded-xl border-solid border-[rgba(73,68,84,0.2)]"
            href={`/app/boards/${board.id}`}
        >
            <h1 className="font-bold text-lg leading-[156%] text-[#e5e2e3]">
                {board.title}
            </h1>
            <p className="font-normal text-sm leading-[143%] text-slate-400">
                {board.description}
            </p>
            <p className="font-bold text-[10px] leading-[150%] tracking-widest uppercase text-slate-500">
                {formatTime(board.createdAt)}
            </p>
        </a>
    );
}
