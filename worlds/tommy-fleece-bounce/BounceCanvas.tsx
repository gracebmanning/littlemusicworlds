"use client";
import { useEffect, useRef } from "react";
import paper from "paper";
import Matter from "matter-js";

const MIN_RADIUS = 25;
const MAX_RADIUS = 75;

const isMobile = () => window.innerWidth < 768;
const MAX_CIRCLES = isMobile() ? 70 : 120;

const COLORS = ["#0020BE", "#C61200", "#127400", "#5F0F80", "#FF9700", "#E4539C"];

export default function BounceCanvas({
    embedSize,
    onCountChange,
    onReset,
}: {
    embedSize: { width: number; height: number };
    onCountChange?: (count: number, max: number) => void;
    onReset?: (callback: () => void) => void;
}) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const circlesRef = useRef<{ paperShape: paper.Path.Circle; matterBody: Matter.Body }[]>([]);
    const colorIndexRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        paper.setup(canvas); // initialize paper.js with the canvas

        const { Engine, Bodies, Composite } = Matter;
        const engine = Engine.create();
        const world = engine.world;
        engine.gravity.y = 1;

        const report = () => onCountChange?.(circlesRef.current.length, MAX_CIRCLES);

        const thickness = 110;
        let bounds: Matter.Body[] = [];
        const buildBounds = () => {
            const width = paper.view.viewSize.width;
            const height = paper.view.viewSize.height;
            if (bounds.length) Composite.remove(world, bounds); // clear current bounds
            bounds = [
                Bodies.rectangle(width / 2, height + thickness / 2, width, thickness, {
                    isStatic: true,
                }),
                Bodies.rectangle(-thickness / 2, height / 2, thickness, height * 2, {
                    isStatic: true,
                }),
                Bodies.rectangle(width + thickness / 2, height / 2, thickness, height * 2, {
                    isStatic: true,
                }),
            ];
            bounds.push(
                Bodies.rectangle(width / 2, height / 2, embedSize.width, embedSize.height, {
                    isStatic: true,
                }),
            );
            Composite.add(world, bounds);
        };
        buildBounds();
        report();

        const resetCircles = () => {
            for (const { matterBody } of circlesRef.current) {
                Composite.remove(world, matterBody);
            }

            for (const { paperShape } of circlesRef.current) {
                paperShape.remove();
            }

            circlesRef.current = [];
            colorIndexRef.current = 0;
            report();
        };
        onReset?.(resetCircles);

        const tool = new paper.Tool();

        tool.onMouseDown = function (event: paper.ToolEvent) {
            if (circlesRef.current.length >= MAX_CIRCLES) return;
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
                fillColor: COLORS[colorIndexRef.current],
            });

            circlesRef.current.push({
                paperShape: paperCircle,
                matterBody: matterCircle,
            });

            colorIndexRef.current =
                colorIndexRef.current === COLORS.length - 1 ? 0 : colorIndexRef.current + 1;
            report();
        };

        paper.view.onFrame = function () {
            Engine.update(engine);

            for (const { paperShape, matterBody } of circlesRef.current) {
                paperShape.position = new paper.Point(matterBody.position.x, matterBody.position.y);
            }
        };

        const resizeObserver = new ResizeObserver(() => {
            paper.view.viewSize = new paper.Size(canvas.clientWidth, canvas.clientHeight); // adjust paper.js canvas size
            buildBounds(); // adjust matter.js bounds
        });
        resizeObserver.observe(canvas);

        return () => {
            resizeObserver.disconnect();
            tool.remove();
            paper.project?.remove();
            paper.view?.remove();
            Engine.clear(engine);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <canvas ref={canvasRef} className="w-full h-full block" />;
}
