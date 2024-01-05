import { useState } from "react"
import "./Counter.css"
import CounterButton from "./CounterButton";


export default function Counter(){
    const [count, setCount] = useState(0);

    function incrementParentFunction(by){
        setCount(count+by)
    }
    function decrementParentFunction(by){
        count <= 0 ? setCount(0) : setCount(count-by);
    }
    function resetCounterFunction(){
        setCount(0);
    }

    return(
        <div className="App">
            <div>
                <span className="totalCount">{count}</span>
            </div>
            <div className="counterButtons">
                <CounterButton by={1} incrementParent={incrementParentFunction} decrementParent={decrementParentFunction}/>
                <CounterButton by={2} incrementParent={incrementParentFunction} decrementParent={decrementParentFunction}/>
                <CounterButton by={3} incrementParent={incrementParentFunction} decrementParent={decrementParentFunction}/>
            </div>
            <div className="resetButton">
                <button className="resetButton" onClick={resetCounterFunction}>Reset</button>
            </div>
        </div>
    )
}