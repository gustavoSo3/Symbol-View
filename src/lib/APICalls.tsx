function parseDaySeries(raw: any): days_series {
    const meta = raw["Meta Data"];
    const series = raw["Time Series (Daily)"];

    const parsed_series: days_series["time_series_daily"] = {};

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

export async function getSymbols(symbols: Array<string>): Promise<Array<symbol_query>> {

    //TODO: change to dinamic symbol
    const resp_symbols: Array<symbol_query> = await Promise.all(
        symbols.map(async (symbol: string) => {
            const response = await fetch(
                `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo`
            );
            const symbol_raw_object = await response.json();

            const current: symbol_query = {
                symbol: symbol,
                open: Number(symbol_raw_object["Global Quote"]["02. open"]),
                high: Number(symbol_raw_object["Global Quote"]["03. high"]),
                low: Number(symbol_raw_object["Global Quote"]["04. low"]),
                price: Number(symbol_raw_object["Global Quote"]["05. price"]),
                change: Number(symbol_raw_object["Global Quote"]["09. change"]),
                change_percent: Number(symbol_raw_object["Global Quote"]["10. change percent"].slice(0, 7)),
            };

            return current;
        })
    );

    return resp_symbols;
}

export async function getSymbolData(symbol: string): Promise<symbol_iformation> {

    //TODO: change to dinamic symbol
    var response = await fetch(
        "https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo"
    );
    const symbol_object = await response.json();

    response = await fetch(
        "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo"
    );

    const day_series_object = await response.json();

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
