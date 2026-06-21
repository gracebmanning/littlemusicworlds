import React, {
    useLayoutEffect,
    useRef,
    useState,
    useCallback,
    useEffect,
    useImperativeHandle,
} from "react";
import { WORDS } from "./magnetWords";

type Magnet = { id: number; word: string; x: number; y: number; z: number; moved: boolean };
export type MagnetsHandle = { reset: () => void };

const clamp = (v: number, max: number) => Math.max(0, Math.min(v, max));

export default function TreehouseMagnets({ ref }: { ref?: React.Ref<MagnetsHandle> }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const dragRef = useRef<{ id: number; dx: number; dy: number } | null>(null);
    const zCounter = useRef(1);

    const [magnets, setMagnets] = useState<Magnet[]>(() =>
        WORDS.map((word, i) => ({
            id: i,
            word,
            x: 0,
            y: 0,
            z: 1,
            moved: false,
        })),
    );

    const reflow = useCallback((resetAll = false) => {
        const container = containerRef.current;
        if (!container) return;

        const magnetTiles = Array.from(container.children) as HTMLElement[];
        const cw = container.clientWidth;
        const ch = container.clientHeight;
        const gapX = 8;
        const gapY = 8;
        const margin = 16;

        // mobile: use almost full width
        // med/lg: keep the words grouped on the right
        const isNarrow = cw < 768;
        const groupWidth = isNarrow ? cw - margin * 2 : Math.min(cw * 0.42, 560);

        // group anchor (top-right on desktop, top-left on mobile)
        const offsetX = isNarrow ? margin : cw - margin - groupWidth;
        const offsetY = margin;

        setMagnets((prev) => {
            let cx = 0;
            let cy = 0;
            let rowHeight = 0;

            return prev.map((m, i) => {
                const el = magnetTiles[i];
                const w = el?.offsetWidth ?? 0;
                const h = el?.offsetHeight ?? 0;
                const moved = resetAll ? false : m.moved;

                if (moved) {
                    return { ...m, x: clamp(m.x, cw - w), y: clamp(m.y, ch - h) };
                }

                if (cx > 0 && cx + w > groupWidth) {
                    cx = 0;
                    cy += rowHeight + gapY;
                    rowHeight = 0;
                }

                const x = offsetX + cx;
                const y = offsetY + cy;
                cx += w + gapX;
                rowHeight = Math.max(rowHeight, h);
                return { ...m, x, y, moved, z: resetAll ? 1 : m.z };
            });
        });
    }, []);

    useImperativeHandle(
        ref,
        () => ({
            reset() {
                zCounter.current = 1;
                reflow(true);
            },
        }),
        [reflow],
    );

    useLayoutEffect(() => {
        reflow();
    }, [reflow]);

    useEffect(() => {
        let frame = 0;

        function onResize() {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => reflow());
        }
        window.addEventListener("resize", onResize);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("resize", onResize);
        };
    }, [reflow]);

    function onPointerDown(e: React.PointerEvent<HTMLDivElement>, id: number) {
        const tile = e.currentTarget;
        tile.setPointerCapture(e.pointerId);
        const rect = tile.getBoundingClientRect();
        dragRef.current = { id, dx: e.clientX - rect.left, dy: e.clientY - rect.top };
        const z = (zCounter.current += 1);
        setMagnets((prev) => prev.map((m) => (m.id === id ? { ...m, z } : m)));
    }

    function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
        const drag = dragRef.current;
        const container = containerRef.current;
        if (!drag || !container) return;
        const box = container.getBoundingClientRect();
        const x = e.clientX - box.left - drag.dx;
        const y = e.clientY - box.top - drag.dy;
        setMagnets((prev) => prev.map((m) => (m.id === drag.id ? { ...m, x, y, moved: true } : m)));
    }

    function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
        if (!dragRef.current) return;
        e.currentTarget.releasePointerCapture(e.pointerId);
        dragRef.current = null;
    }

    return (
        <div ref={containerRef} className="absolute inset-0 z-20 pointer-events-none select-none">
            {magnets.map((m) => (
                <div
                    key={m.id}
                    onPointerDown={(e) => onPointerDown(e, m.id)}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    onPointerCancel={onPointerUp}
                    style={{
                        transform: `translate(${m.x}px, ${m.y}px)`,
                        zIndex: m.z,
                        touchAction: "none",
                    }}
                    className="pointer-events-auto absolute top-0 left-0 w-fit bg-white text-black px-2 py-0.5 font-['Times_New_Roman'] text-base cursor-grab active:cursor-grabbing shadow-md"
                >
                    {m.word}
                </div>
            ))}
        </div>
    );
}
