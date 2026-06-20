"use client";
import { useEffect, useRef } from "react";
import paper from "paper";
import Matter from "matter-js";

const NAVBAR_HEIGHT = 32;

const TILT_LIMIT = Math.PI / 4; // (+/-) 45 degrees
const ANCHOR_RADIUS = 16;
const GRAB_BUFFER = 14; // handle grab buffer

const COLORS = ["#0020BE", "#C61200", "#127400", "#5F0F80", "#FF9700", "#E4539C"];

export default function BounceCanvas({
    embedSize,
    radiusRange,
    maxCircles,
    onCountChange,
    onTiltChange,
    onReset,
}: {
    embedSize: { width: number; height: number };
    radiusRange: { min: number; max: number };
    maxCircles: number;
    onCountChange?: (count: number, max: number) => void;
    onTiltChange?: (degrees: number) => void;
    onReset?: (callback: () => void) => void;
}) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const circlesRef = useRef<{ paperShape: paper.Path.Circle; matterBody: Matter.Body }[]>([]);
    const colorIndexRef = useRef(0);
    const embedSizeRef = useRef(embedSize);
    const rebuildBoundsRef = useRef<(() => void) | null>(null);
    const radiusRangeRef = useRef(radiusRange);
    const maxCirclesRef = useRef(maxCircles);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const container = canvas.parentElement;
        if (!container) return;
        paper.setup(canvas); // initialize paper.js with the canvas

        const { Engine, Bodies, Composite } = Matter;
        const engine = Engine.create();
        const world = engine.world;

        const report = () => onCountChange?.(circlesRef.current.length, maxCirclesRef.current);

        const circlesLayer = paper.project.activeLayer;
        const tiltLayer = new paper.Layer();

        let tilt = 0;
        let grabbed: "left" | "right" | null = null;

        let centerX = 0;
        let centerY = 0;
        let arm = 0;
        let leftPos = new paper.Point(0, 0);
        let rightPos = new paper.Point(0, 0);

        const recomputeLayout = () => {
            const w = paper.view.viewSize.width;
            const h = paper.view.viewSize.height;
            centerX = w / 2;
            centerY = (h + NAVBAR_HEIGHT) / 2; // embed's visual center
            arm = Math.min(w / 2 - 24, 320); // how far out the handles sit
        };

        const applyGravity = () => {
            engine.gravity.x = Math.sin(tilt);
            engine.gravity.y = Math.cos(tilt);
        };

        const tiltBar = new paper.Path({
            segments: [
                [0, 0],
                [0, 0],
            ],
            strokeColor: "rgba(25, 23, 22, 0.9)",
            strokeWidth: 2,
            dashArray: [6, 6],
        });
        tiltLayer.addChild(tiltBar);

        const makeHandle = () => {
            const ring = new paper.Path.Circle({
                center: [0, 0],
                radius: ANCHOR_RADIUS,
                fillColor: "rgba(25, 23, 22, 0.9)",
            });
            const dots = [-5, 0, 5].map(
                (y) =>
                    new paper.Path.Circle({
                        center: [0, y],
                        radius: 1.6,
                        fillColor: "white",
                    }),
            );
            const group = new paper.Group([ring, ...dots]);
            tiltLayer.addChild(group);
            return group;
        };

        const leftHandle = makeHandle();
        const rightHandle = makeHandle();

        const updateTiltVisuals = () => {
            const dx = arm * Math.cos(tilt); // delta x
            const dy = arm * Math.sin(tilt); // delta y
            rightPos = new paper.Point(centerX + dx, centerY + dy);
            leftPos = new paper.Point(centerX - dx, centerY - dy);

            rightHandle.position = rightPos;
            leftHandle.position = leftPos;

            tiltBar.segments[0].point = leftPos;
            tiltBar.segments[1].point = rightPos;
        };

        const setTiltFromMousePointer = (point: paper.Point) => {
            // angle of the mouse pointer around the pivot
            let raw = Math.atan2(point.y - centerY, point.x - centerX);
            if (grabbed === "left") raw += Math.PI;
            raw = Math.atan2(Math.sin(raw), Math.cos(raw)); // normalize to [-pi, pi]
            tilt = Math.max(-TILT_LIMIT, Math.min(TILT_LIMIT, raw));
            applyGravity();
            updateTiltVisuals();
            onTiltChange?.(Math.round((tilt * 180) / Math.PI));
        };

        const handleHit = (point: paper.Point): "left" | "right" | null => {
            const reach = ANCHOR_RADIUS + GRAB_BUFFER;
            if (point.getDistance(rightPos) <= reach) return "right";
            if (point.getDistance(leftPos) <= reach) return "left";
            return null;
        };

        const thickness = 110;
        let bounds: Matter.Body[] = [];
        const buildBounds = () => {
            const width = paper.view.viewSize.width;
            const height = paper.view.viewSize.height;
            if (bounds.length) Composite.remove(world, bounds); // clear current bounds

            const ceiling = Bodies.rectangle(
                width / 2,
                NAVBAR_HEIGHT - thickness / 2,
                width,
                thickness,
                {
                    isStatic: true,
                },
            );
            const floor = Bodies.rectangle(width / 2, height + thickness / 2, width, thickness, {
                isStatic: true,
            });
            const leftWall = Bodies.rectangle(-thickness / 2, height / 2, thickness, height * 2, {
                isStatic: true,
            });
            const rightWall = Bodies.rectangle(
                width + thickness / 2,
                height / 2,
                thickness,
                height * 2,
                {
                    isStatic: true,
                },
            );
            const embedBarrier = Bodies.rectangle(
                width / 2,
                (height + NAVBAR_HEIGHT) / 2,
                embedSizeRef.current.width + 2,
                embedSizeRef.current.height + 2,
                {
                    isStatic: true,
                },
            );

            bounds = [ceiling, floor, leftWall, rightWall, embedBarrier];
            Composite.add(world, bounds);
        };
        rebuildBoundsRef.current = buildBounds;

        recomputeLayout();
        buildBounds();
        applyGravity();
        updateTiltVisuals();
        report();
        onTiltChange?.(0);

        const createCircle = (point: paper.Point) => {
            if (circlesRef.current.length >= maxCirclesRef.current) return;
            const { min, max } = radiusRangeRef.current;
            const radius = Math.floor(Math.random() * (max - min + 1)) + min;

            const matterCircle = Bodies.circle(point.x, point.y, radius, {
                restitution: 1,
            });
            Composite.add(world, matterCircle);

            const paperCircle = new paper.Path.Circle({
                center: point,
                radius: radius,
                fillColor: COLORS[colorIndexRef.current],
            });
            circlesLayer.addChild(paperCircle);

            circlesRef.current.push({
                paperShape: paperCircle,
                matterBody: matterCircle,
            });

            colorIndexRef.current =
                colorIndexRef.current === COLORS.length - 1 ? 0 : colorIndexRef.current + 1;
            report();
        };

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
            const hit = handleHit(event.point);
            // if a tilt anchor was hit, begin tilting
            if (hit) {
                grabbed = hit;
                canvas.style.cursor = "grabbing";
            }
            // otherwise, create a circle
            else {
                createCircle(event.point);
            }
        };

        tool.onMouseDrag = (event: paper.ToolEvent) => {
            if (!grabbed) return;
            setTiltFromMousePointer(event.point);
        };

        tool.onMouseUp = () => {
            grabbed = null;
            canvas.style.cursor = "default";
        };

        tool.onMouseMove = (event: paper.ToolEvent) => {
            canvas.style.cursor = handleHit(event.point) ? "grab" : "default";
        };

        paper.view.onFrame = function () {
            Engine.update(engine);

            for (const { paperShape, matterBody } of circlesRef.current) {
                paperShape.position = new paper.Point(matterBody.position.x, matterBody.position.y);
            }
        };

        const resizeObserver = new ResizeObserver(() => {
            paper.view.viewSize = new paper.Size(container.clientWidth, container.clientHeight);
            recomputeLayout();
            buildBounds();
            updateTiltVisuals();
        });
        resizeObserver.observe(container);

        return () => {
            resizeObserver.disconnect();
            tool.remove();
            paper.project?.remove();
            paper.view?.remove();
            Engine.clear(engine);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        embedSizeRef.current = embedSize;
        rebuildBoundsRef.current?.();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [embedSize.width, embedSize.height]);

    useEffect(() => {
        radiusRangeRef.current = radiusRange;
        maxCirclesRef.current = maxCircles;
        onCountChange?.(circlesRef.current.length, maxCircles);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [maxCircles, radiusRange.min, radiusRange.max]);

    return <canvas ref={canvasRef} className="w-full h-full block" />;
}
