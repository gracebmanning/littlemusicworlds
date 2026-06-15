import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { Site } from "@/lib/siteData";

export const worlds: Record<string, ComponentType<{ site: Site }>> = {
    "lucy-lamb/sin-city": dynamic(() => import("./lucy-lamb-sin-city/Lucy-Lamb-Sin-City")),
};
