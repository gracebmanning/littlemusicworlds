import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { Site } from "@/lib/siteData";

export const worlds: Record<string, ComponentType<{ site: Site }>> = {
    "alex-g/treehouse": dynamic(() => import("./alex-g-treehouse/Alex-G-Treehouse")),
    "lucy-lamb/sin-city": dynamic(() => import("./lucy-lamb-sin-city/Lucy-Lamb-Sin-City")),
    "tommy-fleece/bounce": dynamic(() => import("./tommy-fleece-bounce/Tommy-Fleece-Bounce")),
};
