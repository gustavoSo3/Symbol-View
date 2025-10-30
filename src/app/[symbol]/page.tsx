"use client"
import { use, useEffect, useState } from "react";
import DailySeriesChart from "../../components/DailySeriesChart";
import DaylySeriesTable from "../../components/DailySeriesTable";
import { getSymbolData } from "../../lib/APICalls";




export default function Page({
  params,
}: {
  params: Promise<{ symbol: string }>
}) {

  const [symbol, setSymbol] = useState<symbol_iformation>({} as symbol_iformation);
  const symbol_string: string = use(params).symbol;

  useEffect(() => {

    getSymbolData(symbol_string)
      .then((fetched_data) => {
        console.log(fetched_data);
        setSymbol(fetched_data);

      })
      .catch((reason) => {
        console.log(reason);
      });

  }, []);

  return (
    <div>
      <h2>{symbol.symbol}</h2>
      <h3>{symbol.name}</h3>
      <h4>{symbol.market_capitalization}</h4>
      <div>
        <span>{symbol.asset_type}</span>
        <span>{symbol.country}</span>
        <span>{symbol.exchange}</span>
        <span>{symbol.currency}</span>
      </div>
      <div>
        <span>{symbol.sector}</span>
        <span>{symbol.industry}</span>
        <span>{symbol.exchange}</span>
        <span>{symbol.currency}</span>
      </div>
      <p>{symbol.description}</p>


      {symbol.day_series && symbol.day_series.time_series_daily && (
        <DailySeriesChart data={symbol.day_series} />
      )}
      {symbol.day_series && symbol.day_series.time_series_daily && (
        <DaylySeriesTable data={symbol.day_series} />
      )}
    </div>
  );
}
