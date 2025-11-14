import { Suspense, use } from "react";
import { DailySeriesChartSHIMMER } from "../../components/ChartClientWrapper";
import DaylySeriesTable, { DailyTableSHIMMER } from "../../components/DailySeriesTable";
import { getSymbolInfo } from "../../lib/APICalls";
import SymbolInformation, { SymbolInformationSHIMMER } from "../../components/SymbolInformation";
import Link from "next/link";
import DailySeriesChart from "../../components/DailySeriesChart";




export default function Page({
  params,
}: {
  params: Promise<{ symbol: string }>
}) {

  const symbol_string: string = use(params).symbol;

  const symbol_promise = getSymbolInfo(symbol_string);

  return (
    <div className="overflow-x-hidden">
      <Link className="text-lg p-5" href="/">&larr; Go Back to Listing</Link>
      <div className="flex border-2 flex-col lg:flex-row items-center">
        <div className="basis-1 lg:min-h-[400px] lg:basis-1/2 p-5 lg:p-3 border-b-2 lg:border-none ">
          <Suspense fallback={<SymbolInformationSHIMMER />}>
            <SymbolInformation symbol_promise={symbol_promise} />
          </Suspense>
        </div>

        <div className="w-full lg:w-1/2 h-[400px]">
          <Suspense fallback={<DailySeriesChartSHIMMER />}>
            <DailySeriesChart symbol_promise={symbol_promise} />
          </Suspense>
        </div>
      </div>
      <div>

        <Suspense fallback={<DailyTableSHIMMER />}>
          <DaylySeriesTable symbol_promise={symbol_promise} />
        </Suspense>
      </div>
    </div >
  );
}
