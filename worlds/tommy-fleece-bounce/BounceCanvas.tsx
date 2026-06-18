"use client";
import { useEffect, useRef } from "react";
import paper from "paper";

export default function BounceCanvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const MIN_RADIUS = 25;
    const MAX_RADIUS = 65;

    useEffect(() => {
        let count = 0;
        const colors = ["#0020BE", "#C61200", "#127400", "#5F0F80", "#FF9700", "#E4539C"];

        if (canvasRef.current) {
            paper.setup(canvasRef.current); // initialize paper.js with the canvas

            const tool = new paper.Tool();

            tool.onMouseDown = function (event: paper.ToolEvent) {
                const circle = new paper.Path.Circle({
                    center: event.point,
                    radius: Math.floor(Math.random() * (MAX_RADIUS - MIN_RADIUS + 1)) + MIN_RADIUS,
                    fillColor: colors[count],
                });
                count = count === colors.length - 1 ? 0 : count + 1;
            };
        }

        return () => {
            paper.project?.remove();
            paper.view?.remove();
        };
    }, []);

    return <canvas ref={canvasRef} className="w-full h-full block" />;
}
