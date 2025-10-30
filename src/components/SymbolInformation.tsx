export default function SymbolInformation({ symbol }: { symbol: symbol_complex_query }) {
    return (
        <div className="basis-1/2 ">
            <div className="flex">
                <div className="text-5xl">{symbol.symbol}</div>
                <div className="flex flex-col text-l text-gray-600">
                    <div>{symbol?.asset_type ?? "N/A"}</div>
                    <div>{symbol?.exchange ?? "N/A"}</div>
                </div>
            </div>
            <div className="flex">
                <div className="text-3xl">{symbol?.name ?? "N/A"}</div>
                <div>{symbol?.country ?? "N/A"}</div>
            </div>
            <div className="flex">
                <div>Market Cap: ${symbol?.market_capitalization ?? "N/A"}</div>
                <div>: {symbol?.currency ?? "N/A"}</div>
            </div>
            <div className="flex flex-col">
                <div>Sector: {symbol?.sector ?? "N/A"}</div>
                <div>Industry: {symbol?.industry ?? "N/A"}</div>
            </div>
            <div>{symbol?.description ?? "N/A"}</div>
        </div>
    )
}