export default function DaylyTable({
    data
}: {
    data: day_series
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
        <table width="100%">
            <tr>
                <th>Day</th>
                <th>Open</th>
                <th>Close</th>
                <th>+/- day</th>
                <th>Low</th>
                <th>High</th>
                <th>Volume</th>
            </tr>
            {table_data.map((value, index) => (
                <tr key={index}>
                    <th>{value.date}</th>
                    <th>{value.open}</th>
                    <th>{value.close}</th>
                    <th>{value.gain_lose.toFixed(3)}</th>
                    <th>{value.low}</th>
                    <th>{value.high}</th>
                    <th>{value.volume}</th>
                </tr>
            ))}
        </table>
    )
}