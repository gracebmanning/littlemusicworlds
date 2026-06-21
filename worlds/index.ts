import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { Site } from "@/lib/siteData";

export const worlds: Record<string, ComponentType<{ site: Site }>> = {
    "alex-g/treehouse": dynamic(() => import("./alex-g-treehouse/Alex-G-Treehouse")),
    "tommy-fleece/bounce": dynamic(() => import("./tommy-fleece-bounce/Tommy-Fleece-Bounce")),
};
