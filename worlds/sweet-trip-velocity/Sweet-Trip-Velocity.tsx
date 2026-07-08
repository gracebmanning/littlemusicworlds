import WorldGate from "@/components/WorldGate";
import { Site } from "@/lib/siteData";

function VelocityContent() {
    return <div>I exist!</div>;
}
export default function SweetTripVelocity({ site }: { site: Site }) {
    return (
        <WorldGate contentWarning={site.contentWarning}>
            <VelocityContent />
        </WorldGate>
    );
}
