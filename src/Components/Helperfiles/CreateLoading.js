import React from 'react'
import '../../index.css'
import { BsPlus } from "react-icons/bs";

const CreateLoading = ({ handlecreatenote, loading }) => {
    if (loading) {
        return (

            <div className="cursor-pointer flex items-center p-3 bg-gray-300 rounded-full mb-2 text-white font-semibold justify-center mx-6">
                <div class="animate-spin rounded-full h-7 w-7 border-b-2 border-white"></div>
            </div>
        )
    }
    return (
        <div onClick={() => handlecreatenote()} className="cursor-pointer flex items-center p-3 bg-green-400 rounded-full mb-2 text-white font-semibold mx-6 justify-center text-lg">
            <span className="text-2xl font-bold"><BsPlus /></span> <div className="ml-3">New note</div>
        </div>
    )
}

export default CreateLoading
