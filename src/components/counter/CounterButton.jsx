import {PropTypes} from 'prop-types';
import "./Counter.css"

export default function CounterButton({by, incrementParent, decrementParent}){

    return(
        <div className="Counter">
            <div>
                <button className="counterButton" onClick={() => incrementParent(by)}>+{by}</button> 
                <button className="counterButton" onClick={() => decrementParent(by)}>-{by}</button>       
            </div>
        </div>
    )
}
CounterButton.propTypes = {
    by: PropTypes.number
}