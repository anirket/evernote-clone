import React from 'react'
import '../../index.css'
import { BsPlus } from "react-icons/bs";

const CreateLoading = ({ handlecreatenote, loading }) => {
    if (loading) {
        return (<div  className={"cursor-pointer flex items-center p-3 bg-green-400 rounded-full mb-2 text-white font-semibold "}>
            <span className="text-2xl"><BsPlus /></span> <div className="ml-3">Loading...</div>
        </div>)
    }
    return (
        <div onClick={() => handlecreatenote()} className={"cursor-pointer flex items-center p-3 bg-green-400 rounded-full mb-2 text-white font-semibold "}>
        <span className="text-2xl"><BsPlus /></span> <div className="ml-3">New note</div>
    </div>
    )
}

export default CreateLoading
