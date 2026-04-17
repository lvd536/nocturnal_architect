import CanvasBoard from "@/components/App/ProjectBoards/CanvasBoard";
import { RealtimeSync } from "@/components/App/ProjectBoards/RealtimeSync";

export default function Boards() {
    return (
        <>
            <RealtimeSync />
            <CanvasBoard />
        </>
    );
}
