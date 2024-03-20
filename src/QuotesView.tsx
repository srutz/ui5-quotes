

import { Icon, Input, InputDomRef, Label, Table, TableCell, TableColumn, TableRow, Title } from "@ui5/webcomponents-react";
import { Ui5CustomEvent } from "@ui5/webcomponents-react/wrappers";
import { useEffect, useState } from "react";
import './QuotesView.css'

type Quote = {
    id: number;
    quote: string;
    author: string;
}

let timeout: number | null = null
function debounce(func: () => void, delayMs: number) {
    if (timeout) {
        clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
        func()
        timeout = null
    }, delayMs)
}


export function QuotesView() {

    const [ quotes, setQuotes] = useState<Quote[]>([]) 
    const [ filteredQuores, setFilteredQuotes] = useState<Quote[]>([]) 
    const [ filter, setFilter] = useState<string>("")

    const onFilter = (e: Ui5CustomEvent<InputDomRef>) => {
        debounce(() => {
            setFilter(e.target.value)
        }, 50)
    }

    useEffect(() => {
        console.log("Filtering", filter);
        (async () => {
            const response = await fetch('https://dummyjson.com/quotes?limit=500');
            const data = await response.json();
            const qs = data.quotes as Quote[]
            setQuotes(qs)
        })()
    }, [ ])

    useEffect(() => {
        const f = filter.toLowerCase()
        const filtered = quotes.filter(q => q.quote.toLowerCase().includes(f) || q.author.toLowerCase().includes(f))
        setFilteredQuotes(filtered)
    }, [ quotes, filter ])

    const cols = (<>
        <TableColumn><Label>Quote</Label></TableColumn>
        <TableColumn><Label>Author</Label></TableColumn>
    </>)

    return (
        <div className="flex flex-col items-center grow">
            <Title level="H2">
                UI5 Quotes
            </Title>
            <Input
                icon={<Icon name="employee" />}
                onChange={() => { console.log("changed")}}
                onInput={onFilter}
                onSuggestionItemPreview={function _a(){}}
                onSuggestionItemSelect={function _a(){}}
                type="Text"
                valueState="None"
                />
            <div className="flex flex-col h-1 grow overflow-y-auto self-stretch pl-8 pr-8">
                <Table
                    columns={cols}
                    onLoadMore={function _a() { }}
                    onPopinChange={function _a() { }}
                    onRowClick={function _a() { }}
                    onSelectionChange={function _a() { }}
                >
                    {filteredQuores.map(q => (
                        <TableRow key={q.id}>
                            <TableCell>
                                <div className="quotecell">{q.quote}</div>
                            </TableCell>
                            <TableCell>
                                <div className="authorcell">{q.author}</div>
                            </TableCell>
                        </TableRow>
                    ))}
                </Table>
            </div>
        </div>
    )
}

