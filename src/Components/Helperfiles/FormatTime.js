import React from 'react'
import Moment from 'react-moment';
import '../../index.css'

const FormatTime = ({updatedAt}) => {

    return (
        <div>
           Last Edited <span className="font-normal"><Moment format="YYYY-MM-DD HH:mm" date={updatedAt} /></span>
        </div>
    )
}

export default FormatTime
