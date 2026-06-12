import { sites } from "@/lib/sampleData";
import Grid from "@/components/Grid";

export default function Home() {
    return (
        <div className="flex flex-col flex-1 items-center justify-start px-8 md:px-10 lg:px-20 py-20">
            <div className="flex flex-col justify-center items-center gap-2 mb-10">
                <h1 className="text-4xl">littlemusicworlds.net</h1>
                <h2 className="text-lg">
                    by{" "}
                    <a
                        href="https://graceis.online/"
                        target="_blank"
                        rel="noreferrer"
                        className="underline"
                    >
                        Grace Manning
                    </a>
                </h2>
            </div>
            <Grid sites={sites} />
        </div>
    );
}
