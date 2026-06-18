"use client";
import React, { createContext, useContext, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";

const HIDE_MUSIC_NOTICE = "lmw:hide-music-notice";
const EnteredContext = createContext(false);
export const useWorldEntered = () => useContext(EnteredContext);

function subscribe(cb: () => void) {
    window.addEventListener("storage", cb);
    return () => window.removeEventListener("storage", cb);
}

export default function WorldGate({
    contentWarning,
    children,
}: {
    contentWarning?: string;
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [passed, setPassed] = useState(false);
    const [dontShowAgain, setDontShowAgain] = useState(false);

    const showMusicNotice = useSyncExternalStore(
        subscribe,
        () => localStorage.getItem(HIDE_MUSIC_NOTICE) !== "true", // client value
        () => true, // server value
    );

    const gateNeeded = showMusicNotice || !!contentWarning;
    const entered = passed || !gateNeeded;

    const handleContinue = () => {
        if (dontShowAgain) localStorage.setItem(HIDE_MUSIC_NOTICE, "true");
        setPassed(true);
    };

    return (
        <EnteredContext.Provider value={entered}>
            {children}
            {!entered && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
                    <div
                        role={contentWarning ? "alertdialog" : "dialog"}
                        aria-modal="true"
                        aria-labelledby="gate-title"
                        aria-describedby="gate-body"
                        className="w-full max-w-md rounded-2xl bg-neutral-900 p-6 text-neutral-100 shadow-xl"
                    >
                        <h2 id="gate-title" className="sr-only">
                            Before you continue
                        </h2>

                        <div id="gate-body" className="space-y-3">
                            {contentWarning && (
                                <p className="font-semibold text-foreground border-b border-neutral-400 pb-4">
                                    ⚠︎ {contentWarning}
                                </p>
                            )}
                            {showMusicNotice && (
                                <p className="text-sm text-neutral-300">
                                    Music will begin playing after you close this dialog.
                                </p>
                            )}
                            {showMusicNotice && (
                                <label className="flex items-center gap-2 text-sm text-neutral-400">
                                    <input
                                        type="checkbox"
                                        checked={dontShowAgain}
                                        onChange={(e) => setDontShowAgain(e.target.checked)}
                                        className="accent-accent-one"
                                    />
                                    {`Don't show this again`}
                                </label>
                            )}
                        </div>

                        <div className="mt-5 flex justify-end gap-3">
                            <button
                                onClick={() => router.push("/")}
                                className="rounded-lg px-4 py-2 text-sm border border-neutral-300 text-neutral-300 hover:text-white hover:cursor-pointer"
                            >
                                Go Home
                            </button>
                            <button
                                onClick={handleContinue}
                                className="rounded-lg px-4 py-2 text-sm font-medium bg-white text-black hover:bg-neutral-200 hover:cursor-pointer"
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </EnteredContext.Provider>
    );
}
