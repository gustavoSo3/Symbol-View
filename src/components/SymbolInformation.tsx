import WinLoseColor from "./DayWinLoose";

export function SymbolInformationSHIMMER() {
    return (
        <div className="space-y-4 p-3">
            <div className="flex items-center space-x-4">
                <div className="h-[60px] w-[60px] bg-gray-200 rounded-full animate-pulse"></div>
                <div className="flex-1 space-y-2">
                    <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="w-24 space-y-2 text-right">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
            </div>

            <div className="flex space-x-4">
                <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <div className="flex space-x-4">
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <div className="space-y-2">
                <div className="h-4 w-36 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <div className="h-16 w-full bg-gray-200 rounded animate-pulse"></div>
        </div>
    );
}


export default function SymbolInformation({ symbol }: { symbol: symbol_complex_query }) {
    return (
        <div>
            <div className="flex flex-col lg:flex-row items-center pb-4">
                <div className="flex">
                    <img className="h-[60px] aspect-square" src={`https://img.logo.dev/ticker/${symbol.symbol}?token=${process.env.NEXT_PUBLIC_LOGO_TOKEN}`} alt={`${symbol} logo`} />
                    <div className="text-6xl pl-2">{symbol.symbol}</div>
                    <div className="flex flex-col text-l text-gray-600">
                        <div>{symbol?.asset_type ?? "N/A"}</div>
                        <div>{symbol?.exchange ?? "N/A"}</div>
                    </div >
                </div>
                <div className="grow"></div>
                <div className="flex flex-row lg:flex-col pr-3 mt-2 lg:pt-1 text-right">
                    <div className="pl-2">L: ${symbol.last_data?.low}</div>
                    <div className="pl-2">H: ${symbol.last_data?.high}</div>
                    <div className="pl-2">C: ${symbol.last_data?.price}</div>
                    <div className="pl-2">
                        <WinLoseColor change={symbol.last_data?.change_percent}></WinLoseColor>%
                    </div>
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
            <div className="text-justify">{symbol?.description ?? "N/A"}</div>
        </div>
    )
}