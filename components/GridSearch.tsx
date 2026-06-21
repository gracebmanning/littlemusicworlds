import { magnifyingGlass } from "@/lib/icons";

export default function GridSearch({
    searchQuery,
    onSearchChange,
}: {
    searchQuery: string;
    onSearchChange: (query: string) => void;
}) {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSearchChange(searchQuery);
        }
    };

    return (
        <div className="relative w-full md:w-2/5 lg:w-1/5">
            {magnifyingGlass}
            <input
                type="search"
                name="grid-search"
                placeholder="Search songs and artists"
                aria-label="Search song titles and artist names"
                className="bg-accent-two text-accent-one rounded-md pl-10 pr-2 w-full h-10"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
}
