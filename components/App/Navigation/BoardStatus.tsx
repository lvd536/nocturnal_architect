import { deleteBoard } from "@/actions/supabase/board";
import { useBoardStore } from "@/store/boardStore";
import { useRoleStore } from "@/store/roleStore";
import { AlertTriangle, LayoutDashboard, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BoardStatus() {
    const { boardId, setBoardId } = useBoardStore();
    const { isEditor, isOwner, setEditor, setOwner } = useRoleStore();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        if (boardId) {
            const { error } = await deleteBoard(boardId);
            if (error) router.push("/info/error");
            else {
                setBoardId(null);
                setEditor(false);
                setOwner(false);
                router.push("/app");
            }
        }
        setIsDeleteModalOpen(false);
    };
    return (
        <div className="group relative mt-4 mx-2 overflow-hidden rounded-xl border border-white/8 bg-linear-to-b from-white/4 to-transparent px-3 py-3 transition-all duration-300 hover:border-white/20">
            {boardId && (
                <div className="absolute -right-4 -top-4 h-12 w-12 rounded-full bg-violet-500/10 blur-2xl transition-opacity group-hover:opacity-100" />
            )}

            <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                    Active Project
                </p>
                <div
                    className={`h-1 w-1 rounded-full ${boardId ? "bg-violet-400 animate-pulse" : "bg-white/20"}`}
                />
            </div>

            <div className="mt-2.5 flex items-center gap-3">
                <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
                        boardId
                            ? "border-violet-500/30 bg-violet-500/10 text-violet-300"
                            : "border-white/10 bg-white/5 text-white/20"
                    }`}
                >
                    <LayoutDashboard
                        size={14}
                        className={boardId ? "opacity-100" : "opacity-40"}
                    />
                </div>

                <div className="flex flex-col min-w-0">
                    <span
                        className={`truncate text-xs font-semibold leading-none ${boardId ? "text-white/90" : "text-white/40"}`}
                    >
                        {boardId ? "Board ID" : "Offline"}
                    </span>
                    <span className="mt-1 truncate text-[11px] text-white/50 font-mono">
                        {boardId ?? "Select a workspace"}
                    </span>
                </div>
            </div>

            <div className="my-3 h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />

            {boardId && (
                <div className="flex items-center justify-between">
                    <span className="text-[10px] text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded">
                        {isOwner ? "Owner" : isEditor ? "Editor" : "Viewer"}
                    </span>
                    {isOwner && (
                        <button
                            onClick={() => setIsDeleteModalOpen(true)}
                            className="text-white/30 hover:text-red-400 transition-colors"
                        >
                            <Trash2 size={14} />
                        </button>
                    )}
                </div>
            )}

            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-neutral-900 border border-white/10 p-4 rounded-xl w-full max-w-xs shadow-2xl">
                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                            <AlertTriangle size={16} className="text-red-500" />
                            Delete Board?
                        </h3>
                        <p className="text-[11px] text-white/50 mt-2">
                            This action cannot be undone.
                        </p>
                        <div className="flex gap-2 mt-4">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="flex-1 py-1.5 text-xs bg-white/5 rounded hover:bg-white/10"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex-1 py-1.5 text-xs bg-red-500/20 text-red-400 rounded hover:bg-red-500/30"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
