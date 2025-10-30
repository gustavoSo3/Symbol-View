import Link from "next/link";
import WinLoseColor from "./DayWinLoose";

export default function SymbolCard(
    { symbol }:
        { symbol: symbol_simple_query }
) {
    return (

        <Link href={`/${symbol.symbol}`} className="grow m-1 p-2 lg:p-3 lg:max-w-fit rounded-md border-4 border-double hover:border-teal-400">
            <div className="flex items-center">
                <img className="h-[48px] aspect-square" src={`https://img.logo.dev/ticker/${symbol.symbol}?token=${process.env.NEXT_PUBLIC_LOGO_TOKEN}`} alt={`${symbol} logo`} />
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