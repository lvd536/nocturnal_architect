import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { AddTask } from "@/types/board.types";
import { Info, Plus } from "lucide-react";

interface IProps {
    addTask: (
        data: AddTask,
        position?: {
            x: number;
            y: number;
        },
    ) => void;
}

export default function CanvasBoardHelp({ addTask }: IProps) {
    return (
        <HoverCard openDelay={250}>
            <HoverCardTrigger asChild>
                <Button
                    className="absolute top-2 right-2 h-10 w-10"
                    variant="secondary"
                >
                    <Info />
                </Button>
            </HoverCardTrigger>
            <HoverCardContent
                side="left"
                align="start"
                className="z-50 w-85 space-y-4 rounded-3xl border border-white/10 bg-black/90 p-4 backdrop-blur-xl"
            >
                <div>
                    <h2 className="text-lg font-semibold">Quick actions</h2>
                    <p className="mt-1 text-sm text-white/55">
                        This panel can later become a board inspector.
                    </p>
                </div>

                <Card className="border-white/10 bg-white/5">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base text-white">
                            How it works
                        </CardTitle>
                        <CardDescription className="text-white/50">
                            This version is intentionally simple and buildable.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm text-white/70">
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5 h-2.5 w-2.5 rounded-full bg-violet-400" />
                            Create todos from the top form.
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5 h-2.5 w-2.5 rounded-full bg-cyan-400" />
                            Double-click anywhere on the canvas to place a todo
                            there.
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400" />
                            Drag cards freely with Pragmatic drag and drop.
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-white/10 bg-white/5">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base text-white">
                            Seed ideas
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {[
                            "Design system",
                            "Invite flow",
                            "Realtime sync",
                            "Stats view",
                        ].map((item) => (
                            <Button
                                key={item}
                                variant="ghost"
                                className="h-10 w-full justify-start rounded-2xl border border-white/10 bg-white/5 px-3 text-white/75 hover:bg-white/10 hover:text-white"
                                onClick={() =>
                                    addTask({
                                        title: item,
                                        color: "#fff",
                                        done: false,
                                    })
                                }
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                {item}
                            </Button>
                        ))}
                    </CardContent>
                </Card>
            </HoverCardContent>
        </HoverCard>
    );
}
