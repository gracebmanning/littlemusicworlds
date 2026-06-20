import React, { useRef, useState } from "react";
import { WORDS } from "./magnetWords";

type Magnet = { id: number; word: string; x: number; y: number; z: number };

export default function TreehouseMagnets() {
    const containerRef = useRef<HTMLDivElement>(null);
    const dragRef = useRef<{ id: number; dx: number; dy: number } | null>(null);
    const zCounter = useRef(1);

    const [magnets, setMagnets] = useState<Magnet[]>(() =>
        WORDS.map((word, i) => ({
            id: i,
            word,
            x: 24 + (i % 6) * 110,
            y: 24 + Math.floor(i / 6) * 52,
            z: 1,
        })),
    );

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
