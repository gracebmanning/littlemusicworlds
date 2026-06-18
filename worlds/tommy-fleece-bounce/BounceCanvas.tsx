"use client";
import { useEffect, useRef } from "react";
import paper from "paper";
import Matter from "matter-js";

const MIN_RADIUS = 25;
const MAX_RADIUS = 65;
const COLORS = ["#0020BE", "#C61200", "#127400", "#5F0F80", "#FF9700", "#E4539C"];

export default function BounceCanvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        paper.setup(canvasRef.current); // initialize paper.js with the canvas

        const canvasWidth = paper.view.viewSize.width;
        const canvasHeight = paper.view.viewSize.height;

        const { Engine, Bodies, Composite } = Matter;
        const engine = Engine.create();
        const world = engine.world;
        engine.gravity.y = 1;

        const thickness = 110;
        Composite.add(world, [
            Bodies.rectangle(
                canvasWidth / 2,
                canvasHeight + thickness / 2,
                canvasWidth,
                thickness,
                { isStatic: true },
            ),
            Bodies.rectangle(-thickness / 2, canvasHeight / 2, thickness, canvasHeight * 2, {
                isStatic: true,
            }),
            Bodies.rectangle(
                canvasWidth + thickness / 2,
                canvasHeight / 2,
                thickness,
                canvasHeight * 2,
                { isStatic: true },
            ),
        ]);

        const circles: { paperShape: paper.Path.Circle; matterBody: Matter.Body }[] = [];

        const tool = new paper.Tool();

        let count = 0;
        tool.onMouseDown = function (event: paper.ToolEvent) {
            const x = event.point.x;
            const y = event.point.y;
            const radius = Math.floor(Math.random() * (MAX_RADIUS - MIN_RADIUS + 1)) + MIN_RADIUS;

            const matterCircle = Bodies.circle(x, y, radius, {
                restitution: 1,
            });
            Composite.add(world, matterCircle);

            const paperCircle = new paper.Path.Circle({
                center: event.point,
                radius: radius,
                fillColor: COLORS[count],
            });

            circles.push({
                paperShape: paperCircle,
                matterBody: matterCircle,
            });

            count = count === COLORS.length - 1 ? 0 : count + 1;
        };

        paper.view.onFrame = function (event: paper.Event) {
            Engine.update(engine);

            for (const { paperShape, matterBody } of circles) {
                paperShape.position = new paper.Point(matterBody.position.x, matterBody.position.y);
            }
        };

        return () => {
            tool.remove();
            paper.project?.remove();
            paper.view?.remove();
            Engine.clear(engine);
        };
    }, []);

    return <canvas ref={canvasRef} className="w-full h-full block" />;
}
