import { cn } from "~/lib/utils";

const ScoreBadge = ({ score }: { score: number }) => {
    let badgeText = '';
    let badgeColor = '';
    if (score >= 70) {
        badgeText = 'Excellent';
        badgeColor = 'bg-badge-green text-green-600';
    } else if (score >= 50) {
        badgeText = 'Fair';
        badgeColor = 'bg-badge-yellow text-yellow-600';
    } else {
        badgeText = 'Need Improvement';
        badgeColor = 'bg-badge-red text-red-600';
    }
    return (
        <div className={cn(
            "flex flex-row gap-1 items-center px-2 py-0.5 rounded-[96px]",
            badgeColor
        )}>
            <p className="text-sm font-medium">{badgeText}</p>
        </div>
    )
}

export default ScoreBadge
