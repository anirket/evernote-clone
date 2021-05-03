
import React from 'react'
import '../../index.css'
import { BsPlus } from "react-icons/bs";

const CReateLoadingmobile = ({ handlecreatenote, loading }) => {
    if (loading) {
        return (<>
            <BsPlus className="text-2xl" />
            <span className="mx-5" onClick={handlecreatenote}>
                New note
    </span>
        </>)
    }
    return (
        <>
            <BsPlus className="text-2xl" />
            <span className="mx-5" onClick={handlecreatenote}>
                New note
        </span>
        </>
    )
}

export default CReateLoadingmobile
