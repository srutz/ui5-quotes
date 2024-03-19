
import '@ui5/webcomponents/features/InputElementsFormSupport.js'

import { Button } from '@ui5/webcomponents-react'; // loads ui5-button wrapped in a ui5-webcomponents-react component
import { DateStuff } from './DateStuff.tsx';
import { QuotesView } from './QuotesView.tsx';


function App() {
  return (
    <div className="flex flex-col h-1 grow">
        <div className="flex flex-col items-center grow">
            <QuotesView></QuotesView>
            {false && (
                <>
                    <DateStuff></DateStuff>
                    <Button type="Submit">Click me</Button>
                </>
            )}
        </div>        
    </div>
  )
}

export default App
