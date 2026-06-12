export default function Home() {
    return (
        <div className="flex flex-col flex-1 items-center justify-start px-8 md:px-10 lg:px-20 py-20">
            <h1 className="text-4xl mb-2">littlemusicworlds.net</h1>
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
    );
}
