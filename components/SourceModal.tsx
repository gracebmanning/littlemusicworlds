"use client";

import { useEffect, useRef } from "react";
import type { ImageAsset } from "@/lib/assets";
import Image from "next/image";

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
                className="max-h-[80vh] w-[90vw] max-w-md overflow-y-auto bg-background p-4"
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
                    {Object.entries(assets).map(([key, asset]) => (
                        <li key={key} className="flex flex-row justify-start items-center gap-2">
                            <Image
                                {...asset.img}
                                alt={asset.img.alt}
                                unoptimized
                                className="w-15 h-auto"
                            />
                            <a
                                href={asset.origin.href}
                                target="_blank"
                                rel="noreferrer"
                                className="flex flex-row justify-start items-center underline gap-1"
                            >
                                {asset.origin.title}
                                <svg
                                    stroke="#d1e231"
                                    fill="none"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    viewBox="0 0 24 24"
                                    height="15px"
                                    width="15px"
                                    className=""
                                >
                                    <path d="M15 3h6v6"></path>
                                    <path d="M10 14 21 3"></path>
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                </svg>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SourceModal;
