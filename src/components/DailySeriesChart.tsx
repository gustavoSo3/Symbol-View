import { ResponsiveContainer, ComposedChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Cell, Line } from "recharts";

export default function DailySeriesChart({
    data
}: {
    data: days_series
}) {

    const chartData = Object.entries(data.time_series_daily).map(([date, values]) => ({
        date,
        close: values.close,
        open: values.open,
        volume: values.volume,
        is_gain: values.close >= values.open,
        errorY: [values.close - values.low, values.high - values.close],
    })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return (

        <ResponsiveContainer width="50%" height={420}>
            <ComposedChart
                data={chartData}
                margin={{ top: 20, right: 40, bottom: 20, left: 0 }}
            >
                <CartesianGrid strokeDasharray="3 3" opacity={0.50} />

                <XAxis
                    dataKey="date"
                    tickFormatter={(v) => v.slice(5)}
                    minTickGap={20}
                />

                <YAxis
                    yAxisId="left"
                    domain={["auto", "auto"]}
                    tickFormatter={(v) => `$${v}`}
                />

                <YAxis
                    yAxisId="right"
                    orientation="right"
                    tickFormatter={(v) => `${(v / 1_000_000).toFixed(1)}M`}
                />

                <Tooltip
                    labelFormatter={(v) => `Date: ${v}`}
                    formatter={(val: number, key: string) => {
                        if (key === "volume") return [`${val.toLocaleString()}`, "Volume"];
                        return [`$${val.toFixed(2)}`, key.charAt(0).toUpperCase() + key.slice(1)];
                    }}
                />

                <Legend verticalAlign="top" height={36} />
                <Bar
                    yAxisId="right"
                    dataKey="volume"
                    barSize={18}
                    name="Volume"
                >
                    {chartData.map((entry, index) => (
                        <Cell
                            key={`bar-${index}`}
                            fill={entry.is_gain ? "#26a69a" : "#ef5350"} // green vs red
                            opacity={0.4}
                        />
                    ))}
                </Bar>
                <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="open"
                    stroke="#ff3300"
                    strokeWidth={2}
                    dot={false}
                    name="Open"
                />
                <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="close"
                    stroke="#00c853"
                    strokeWidth={2}
                    dot={false}
                    name="Close"
                />
            </ComposedChart>

        </ResponsiveContainer>



    );
}