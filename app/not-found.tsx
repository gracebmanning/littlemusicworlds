import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col flex-1 items-center justify-start px-8 md:px-10 lg:px-20 py-20">
            <h1 className="text-4xl mb-2">Page not found.</h1>
            <h2 className="text-lg">
                <Link href="/" target="_self" rel="noreferrer" className="underline">
                    go home
                </Link>
            </h2>
        </div>
    );
}
