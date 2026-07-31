"use client";

import { useEffect, useRef } from "react";
import type { ImageAsset, Origin } from "@/lib/assets";
import Image from "next/image";
import { newTab_foreground } from "@/lib/icons";

const CreditLine = ({ origin }: { origin: Origin }) => (
    <>
        <a
            href={origin.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 underline"
        >
            {origin.title}
            {newTab_foreground}
        </a>
        {origin.author && <> by {origin.author}</>}
        {", "}
        {origin.license.href ? (
            <a href={origin.license.href} target="_blank" rel="noreferrer" className="underline">
                {origin.license.name}
            </a>
        ) : (
            <span>{origin.license.name}</span>
        )}
        {origin.modified && " (modified)"}
    </>
);

const SourceModal = ({
    onClose,
    assets,
}: {
    onClose: () => void;
    assets: Record<string, ImageAsset>;
}) => {
    const closeRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const previouslyFocused = document.activeElement as HTMLElement | null;
        closeRef.current?.focus();

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKeyDown);

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            previouslyFocused?.focus();
        };
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/60"
            onClick={onClose}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="source-modal-title"
                className="max-h-[80vh] w-[90vw] max-w-lg overflow-y-auto bg-background p-4"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-row justify-between items-center">
                    <h2 id="source-modal-title" className="font-bold">
                        image sources
                    </h2>
                    <button
                        ref={closeRef}
                        type="button"
                        onClick={onClose}
                        className="underline hover:cursor-pointer"
                    >
                        close
                    </button>
                </div>
                <ul className="mt-3 flex flex-col gap-4">
                    {Object.entries(assets).map(([key, asset]) => {
                        const origins = Array.isArray(asset.origin) ? asset.origin : [asset.origin];
                        return (
                            <li key={key} className="flex flex-row justify-start items-start gap-2">
                                <Image
                                    {...asset.img}
                                    alt={asset.img.alt}
                                    unoptimized
                                    className="w-15 h-auto shrink-0"
                                />
                                {origins.length === 1 ? (
                                    <p>
                                        <CreditLine origin={origins[0]} />
                                    </p>
                                ) : (
                                    <ul className="list-disc pl-4 flex flex-col gap-1">
                                        {origins.map((o) => (
                                            <li key={o.href}>
                                                <CreditLine origin={o} />
                                                {o.note && (
                                                    <span className="opacity-70">
                                                        {" — "}
                                                        {o.note}
                                                    </span>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default SourceModal;
