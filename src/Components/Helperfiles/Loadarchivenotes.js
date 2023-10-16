import React from 'react'
import { Link } from 'react-router-dom'
import FormatTime from './FormatTime';
const Loadarchivenotes = ({ changecurrentid, note, currentid, location }) => {



    if (note.archive === 0) {
        return (
            <div>
                <Link to={`/note/${note._id}`}>
                    <div key={note._id} onClick={() => changecurrentid(note._id)} className={"px-3 pt-2  hover:border-blue-400 border-4 " + (currentid === note._id ? "border-4 border-blue-400" : "")}>
                        <h2 className="font-bold">{note.titlevalue}</h2>
                        <div className="h-28 pt-2 overflow-ellipsis overflow-hidden">{note.textareavalue}</div>
                        <div className="last edited font-extralight p-1 text-sm">
                            <FormatTime updatedAt={note.updatedAt} />
                        </div>

                    </div>
                    <hr />
                </Link>
            </div>
        )
    }
    else {
        return (
            <div>
                <Link to={`/trash/${note._id}`}>
                    <div key={note._id} onClick={() => changecurrentid(note._id)} className={"px-3 pt-2  hover:border-blue-400 border-4 " + (currentid === note._id ? "border-4 border-blue-400" : "")}>
                        <h2 className="font-bold">{note.titlevalue}</h2>
                        <div className="h-28 pt-2 overflow-ellipsis overflow-hidden">{note.textareavalue}</div>
                        <div className="last edited font-extralight p-1 text-sm">
                            <FormatTime updatedAt={note.updatedAt} />
                        </div>
                    </div>
                    <hr />
                </Link>
            </div>
        )
    }

}

export default Loadarchivenotes
