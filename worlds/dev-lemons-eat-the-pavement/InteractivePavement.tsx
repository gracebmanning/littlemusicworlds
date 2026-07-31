export default function InteractivePavement() {
    return (
        <div className="relative w-[80dvw] h-full border border-red-600">
            <canvas className="absolute z-20 inset-0 w-full h-full"></canvas>
            <div className="absolute z-10 inset-0 w-full h-full"></div>
        </div>
    );
}
