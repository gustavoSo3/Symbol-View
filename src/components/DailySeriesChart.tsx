import { use } from "react";
import ChartClientWrapper from "./ChartClientWrapper";



export default function DailySeriesChart({
    symbol_promise
}: {
    symbol_promise: Promise<symbol_complex_query>
}) {


    const data: days_series = use(symbol_promise).day_series

    return (

        <ChartClientWrapper data={data} />

    );
}