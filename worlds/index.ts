import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { Site } from "@/lib/siteData";

export const worlds: Record<string, ComponentType<{ site: Site }>> = {
    "tommy-fleece/bounce": dynamic(() => import("./tommy-fleece-bounce/Tommy-Fleece-Bounce")),
    "lucy-lamb/sin-city": dynamic(() => import("./lucy-lamb-sin-city/Lucy-Lamb-Sin-City")),
};
