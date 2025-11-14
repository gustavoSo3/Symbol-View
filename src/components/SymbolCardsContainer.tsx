import { use } from "react"
import SymbolCard from "./SymbolCard"


export default function SymbolCardsContainer(
    { symbol_promise }:
        { symbol_promise: Promise<Array<symbol_simple_query>> }
) {
    const symbols = use(symbol_promise)
    return (

        symbols.map((symbol, i) => <SymbolCard key={i} symbol={symbol} />)

    )
}