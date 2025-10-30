export default function DayWinLoose(
    { change }: { change: number }
) {

    if (change > 0) {
        return <div className="text-green-600">{change.toFixed(3)} &uarr;</div>
    } else {
        return <div className="text-red-600">{change.toFixed(3)} &darr;</div>
    }

}