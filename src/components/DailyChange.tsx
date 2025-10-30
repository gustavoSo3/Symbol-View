export default function DailyChange(
    { change }: { change: number }
) {

    if (change > 0) {
        return <div className="text-green-600">{change} &uarr;</div>
    } else {
        return <div className="text-red-600">{change} &darr;</div>
    }

}