import React, { useLayoutEffect, useRef, useState, useCallback, useEffect } from "react";
import { WORDS } from "./magnetWords";

type Magnet = { id: number; word: string; x: number; y: number; z: number };

const clamp = (v: number, max: number) => Math.max(0, Math.min(v, max));

export default function TreehouseMagnets() {
    const containerRef = useRef<HTMLDivElement>(null);
    const dragRef = useRef<{ id: number; dx: number; dy: number } | null>(null);
    const zCounter = useRef(1);
    const interactedRef = useRef(false);

    const [magnets, setMagnets] = useState<Magnet[]>(() =>
        WORDS.map((word, i) => ({
            id: i,
            word,
            x: 24 + (i % 6) * 110,
            y: 24 + Math.floor(i / 6) * 52,
            z: 1,
        })),
    );

    const layout = useCallback(() => {
        const container = containerRef.current;
        if (!container) return;

        const magnetTiles = Array.from(container.children) as HTMLElement[];
        const cw = container.clientWidth;
        const gapX = 8;
        const gapY = 8;
        const margin = 16;

        // mobile: use almost full width
        // med/lg: keep the words grouped on the right
        const isNarrow = cw < 768;
        const groupWidth = isNarrow ? cw - margin * 2 : Math.min(cw * 0.42, 560);

        const rel: { x: number; y: number }[] = [];
        let cx = 0;
        let cy = 0;
        let rowHeight = 0;
        for (const tile of magnetTiles) {
            const w = tile.offsetWidth;
            const h = tile.offsetHeight;
            if (cx > 0 && cx + w > groupWidth) {
                cx = 0;
                cy += rowHeight + gapY;
                rowHeight = 0;
            }
            rel.push({ x: cx, y: cy });
            cx += w + gapX;
            rowHeight = Math.max(rowHeight, h);
        }

        // group anchor (top-right on desktop, top-left on mobile)
        const offsetX = isNarrow ? margin : cw - margin - groupWidth;
        const offsetY = margin;

        setMagnets((prev) =>
            prev.map((m, i) => ({ ...m, x: offsetX + rel[i].x, y: offsetY + rel[i].y })),
        );
    }, []);

    const clampIntoView = useCallback(() => {
        const container = containerRef.current;
        if (!container) return;

        const magnetTiles = Array.from(container.children) as HTMLElement[];
        const cw = container.clientWidth;
        const ch = container.clientHeight;

        setMagnets((prev) =>
            prev.map((m, i) => ({
                ...m,
                x: clamp(m.x, cw - (magnetTiles[i]?.offsetWidth ?? 0)),
                y: clamp(m.y, ch - (magnetTiles[i]?.offsetHeight ?? 0)),
            })),
        );
    }, []);

    useLayoutEffect(() => {
        layout();
    }, [layout]);

    useEffect(() => {
        let frame = 0;

        function onResize() {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                if (interactedRef.current) clampIntoView();
                else layout();
            });
        }
        window.addEventListener("resize", onResize);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("resize", onResize);
        };
    }, [layout, clampIntoView]);

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
        setMagnets((prev) => prev.map((m) => (m.id === drag.id ? { ...m, x, y } : m)));
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
