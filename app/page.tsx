import { sites } from "@/lib/siteData";
import Grid from "@/components/Grid";
import { newTab_accentTwo, newTab_background } from "@/lib/icons";

export default function Home() {
    return (
        <div className="flex flex-col flex-1 items-center justify-start px-8 md:px-10 lg:px-20 py-20">
            <div className="flex flex-col justify-center items-center gap-6 mb-10">
                <h1 className="text-3xl md:text-4xl">littlemusicworlds.net</h1>
                <h2 className="text-base flex flex-col md:flex-row justify-center items-center gap-x-4 gap-y-2">
                    <a
                        href="https://graceis.online/"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full md:w-fit inline-flex flex-row justify-start items-center gap-1 tracking-wide font-medium bg-foreground text-background px-1 py-0.5 rounded-sm"
                    >
                        created by Grace Manning {newTab_background}
                    </a>
                    <a
                        href="https://github.com/gracebmanning/littlemusicworlds"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full md:w-fit inline-flex flex-row justify-start items-center gap-1 tracking-wide font-medium bg-accent-one text-accent-two px-1 py-0.5 rounded-sm"
                    >
                        This project is open source {newTab_accentTwo}
                    </a>
                </h2>
            </div>
            <Grid sites={sites} />
            <p className="mt-12 text-lg">More sites coming soon!</p>
        </div>
    );
}
