"use client";
import { use, useEffect, useState } from "react";
import DaylySeriesChart from "../../components/DaylySeriesChart";
import DaylySeriesTable from "../../components/DaylySeriesTable";

function parseDaySeries(raw: any): day_series {
  const meta = raw["Meta Data"];
  const series = raw["Time Series (Daily)"];

  const parsed_series: day_series["time_series_daily"] = {};

  for (const date in series) {
    const day = series[date];
    parsed_series[date] = {
      open: Number(day["1. open"]),
      high: Number(day["2. high"]),
      low: Number(day["3. low"]),
      close: Number(day["4. close"]),
      volume: Number(day["5. volume"]),
    };
  }

  return {
    meta_data: {
      information: meta["1. Information"],
      symbol: meta["2. Symbol"],
      last_refreshed: meta["3. Last Refreshed"],
      output_size: meta["4. Output Size"],
      time_zone: meta["5. Time Zone"],
    },
    time_series_daily: parsed_series,
  };
}

async function getSymbolData(symbol: string): Promise<symbol_iformation> {

  // Get Symbol data
  //TODO: change to dinamic symbol
  var response = await fetch(
    "https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo"
  );
  const symbol_object = await response.json();

  response = await fetch(
    "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo"
  );

  const day_series_object = await response.json();

  console.log({
    "symbol": symbol_object["Symbol"],
    "asset_type": symbol_object["AssetType"],
    "name": symbol_object["Name"],
    "description": symbol_object["Description"],
    "exchange": symbol_object["Exchange"],
    "currency": symbol_object["Currency"],
    "country": symbol_object["Country"],
    "sector": symbol_object["Sector"],
    "industry": symbol_object["Industry"],
    "market_capitalization": Number(symbol_object["MarketCapitalization"]),
    "day_series": parseDaySeries(day_series_object)
  })
  return {
    "symbol": symbol_object["Symbol"],
    "asset_type": symbol_object["AssetType"],
    "name": symbol_object["Name"],
    "description": symbol_object["Description"],
    "exchange": symbol_object["Exchange"],
    "currency": symbol_object["Currency"],
    "country": symbol_object["Country"],
    "sector": symbol_object["Sector"],
    "industry": symbol_object["Industry"],
    "market_capitalization": Number(symbol_object["MarketCapitalization"]),
    "day_series": parseDaySeries(day_series_object)
  };
}



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
        <DaylySeriesChart data={symbol.day_series} />
      )}
      {symbol.day_series && symbol.day_series.time_series_daily && (
        <DaylySeriesTable data={symbol.day_series} />
      )}
    </div>
  );
}
