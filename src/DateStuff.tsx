
import { DatePicker } from '@ui5/webcomponents-react'

export function DateStuff() {
    return (
        <DatePicker
        formatPattern='dd.MM.YYYY'
        onChange={function _a(){}}
        onInput={function _a(){}}
        onValueStateChange={function _a(){}}
        primaryCalendarType="Gregorian"

        valueState="None"
        />
    )
}