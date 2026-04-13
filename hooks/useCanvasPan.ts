import { RefObject, useCallback, useEffect, useState } from "react";

interface UseCanvasPanOptions {
    containerRef: RefObject<HTMLDivElement | null>;
}

interface Point {
    x: number;
    y: number;
}

export function useCanvasPan({ containerRef }: UseCanvasPanOptions) {
    const [isPanning, setIsPanning] = useState(false);
    const [isSpacePressed, setIsSpacePressed] = useState(false);
    const [startPoint, setStartPoint] = useState<Point>({
        x: 0,
        y: 0,
    });

    const handlePointerDown = useCallback(
        (e: React.PointerEvent<HTMLDivElement>) => {
            const target = e.target as HTMLElement;

            if (target.closest("[data-card]")) return;

            const shouldStartPan =
                e.pointerType === "touch" ||
                e.button === 1 ||
                (e.button === 0 && isSpacePressed);

            if (!shouldStartPan) return;

            setIsPanning(true);

            setStartPoint({
                x: e.clientX,
                y: e.clientY,
            });
        },
        [isSpacePressed],
    );

    const handlePointerMove = useCallback(
        (e: React.PointerEvent<HTMLDivElement>) => {
            if (!isPanning || !containerRef.current) return;

            const dx = e.clientX - startPoint.x;
            const dy = e.clientY - startPoint.y;

            containerRef.current.scrollLeft -= dx;
            containerRef.current.scrollTop -= dy;

            setStartPoint({
                x: e.clientX,
                y: e.clientY,
            });
        },
        [containerRef, isPanning, startPoint],
    );

    const stopPanning = useCallback(() => {
        setIsPanning(false);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === "Space") {
                setIsSpacePressed(true);
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.code === "Space") {
                setIsSpacePressed(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    return {
        isPanning,
        isSpacePressed,

        panHandlers: {
            onPointerDown: handlePointerDown,
            onPointerMove: handlePointerMove,
            onPointerUp: stopPanning,
            onPointerCancel: stopPanning,
            onPointerLeave: stopPanning,
        },
    };
}
