import DayWinLoose from "./DailyChange";

export default function DailyTable({
    data
}: {
    data: days_series
}) {

    const table_data = Object.entries(data.time_series_daily)
        .map(([date, values]) => ({
            date,
            open: values.open,
            high: values.high,
            low: values.low,
            close: values.close,
            volume: values.volume,
            is_gain: values.close >= values.open,
            gain_lose: values.close - values.open,
        }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return (
        <table width="100%" className="border-separate border-2 border-black">
            <thead>
                <tr>
                    <th>Day</th>
                    <th>Open</th>
                    <th>Close</th>
                    <th>+/- day</th>
                    <th>Low</th>
                    <th>High</th>
                    <th>Volume</th>
                </tr>
            </thead>
            <tbody>
                {table_data.map((value, index) => (
                    <tr key={index}>
                        <th>{value.date}</th>
                        <th>{value.open}</th>
                        <th>{value.close}</th>
                        <th><DayWinLoose change={value.gain_lose} /></th>
                        <th>{value.low}</th>
                        <th>{value.high}</th>
                        <th>${value.volume.toLocaleString()}</th>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}