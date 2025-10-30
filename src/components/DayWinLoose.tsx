export default function WinLoseColor(
    { change }: { change: number }
) {

    if (change > 0) {
        return <span className="text-green-600">{change} &uarr;</span>
    } else {
        return <span className="text-red-600">{change} &darr;</span>
    }

}