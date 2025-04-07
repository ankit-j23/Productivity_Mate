import PomoContext from './PomoContext'
import { useState } from 'react';

const PomoStates = (props) => {

    const [showSettings, setShowSettings] = useState(false);
    const [workDuration, setWorkDuration] = useState(25);
    const [breakDuration, setBreakDuration] = useState(5);


    return(
        <PomoContext.Provider value = {{showSettings ,setShowSettings, workDuration , breakDuration , setWorkDuration , setBreakDuration}}>
            {props.children}
        </PomoContext.Provider>
    )
}

export default PomoStates;