import React, { createContext, useState} from 'react'

export const Notescontextmain = createContext();

const Notescontext = (props) => {
    const [sidebartoggle, setsidebartoggle] = useState(false);
    const [notes, setnotes] = useState([])
    return (
        <Notescontextmain.Provider value={{ notes, setnotes, sidebartoggle, setsidebartoggle }}>
            {props.children}
        </Notescontextmain.Provider>

    )
}

export default Notescontext
