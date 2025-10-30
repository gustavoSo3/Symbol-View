import Link from "next/link";
import WinLoseColor from "./DayWinLoose";

export function SymbolCardSHIMMER() {
    return (
        <div className="grow m-1 p-2 lg:p-3 lg:max-w-[260px] rounded-md border-4 border-double border-gray-200 animate-pulse">
            <div className="flex flex-col lg:flex-row items-center justify-center space-y-2 lg:space-y-0 lg:space-x-3">
                <div className="h-[48px] w-[48px] bg-gray-300 rounded-full"></div>
                <div className="h-6 w-20 bg-gray-300 rounded"></div>
            </div>

            <div className="flex flex-col items-center mt-2 space-y-2">
                <div className="flex justify-center space-x-2">
                    <div className="h-4 w-12 bg-gray-300 rounded"></div>
                    <div className="h-4 w-12 bg-gray-300 rounded"></div>
                    <div className="h-4 w-12 bg-gray-300 rounded"></div>
                </div>

                <div className="flex justify-center items-center space-x-2">
                    <div className="h-6 w-16 bg-gray-300 rounded"></div>
                    <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
                </div>
            </div>
        </div>
    );
}


export default function SymbolCard(
    { symbol }:
        { symbol: symbol_simple_query }
) {
    return (

        <Link href={`/${symbol.symbol}`} className="grow m-1 p-2 lg:p-3 lg:max-w-[260px] rounded-md border-4 border-double hover:border-teal-400">
            <div className="flex items-center">
                <img className="h-[48px] aspect-square" src={`https://img.logo.dev/ticker/${symbol.symbol}?token=pk_W1ts02iVSVOyP5OF3ioMfA`} alt={`${symbol} logo`} />
                <div className="text-3xl pl-3">{symbol.symbol}</div>

            </div>
            <div className="flex flex-col max-w-fit">
                <div className="flex text-center">
                    <div className="m-1">o: {symbol.open}</div>
                    <div className="m-1">h: {symbol.high}</div>
                    <div className="m-1">l: {symbol.low}</div>
                </div>
                <div className="flex text-xl text-center ">
                    <h3>{symbol.price}</h3>
                    <div className="grow"></div>
                    <WinLoseColor change={symbol.change_percent}></WinLoseColor>
                </div>
            </div>

        </Link>
    )
}