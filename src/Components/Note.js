import React, { useState, useEffect, useContext } from 'react'
import "../index.css"
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import Displaynotes from './Displaynotes';
import Sidebar from './Sidebar';
import { useLocation } from "react-router-dom";
import { Notescontextmain } from './Contexts/Notescontext';
import { UPDATE_NOTE, BASE_URL, DELETE_NOTE } from './Utils/apiendpoints'
import { putRequest, deleteRequest } from './Utils/apirequests'
import { VscTrash } from "react-icons/vsc";
import { useHistory } from 'react-router-dom'
import { ImUndo2 } from "react-icons/im";
import FormatTime from './Helperfiles/FormatTime';

const Note = () => {
    let history = useHistory();


    const location = useLocation();
    const { notes } = useContext(Notescontextmain);
    const [currentnoteid, setcurrentnoteid] = useState("");

    // show/hide revoke button
    const [revokebutton, setrevokebutton] = useState(false);
    useEffect(() => {
        window.scrollTo(0, 0);
        //show revoke button in trash note
        if (location.pathname.substring(0, 7) === "/trash/") {
            setrevokebutton(true);
        }
        if (location.note) {
            setcurrentnoteid(location.note._id)
            setitlevalue(location.note.titlevalue)
            setextareavalue(location.note.textareavalue)
            setupdatedatvalue(location.note.updatedAt)
        }
        else {
            notes.forEach((note) => {
                if (note._id === location.pathname.substring(6) || note._id === location.pathname.substring(7)) {
                    setcurrentnoteid(note._id)
                    setitlevalue(note.titlevalue)
                    setextareavalue(note.textareavalue)
                    setupdatedatvalue(note.updatedAt)
                }
            })
        }
    }, [location.note, location.pathname, notes])



    //for toggling save button with back button
    const [save, setsave] = useState(false);
    //title value
    const [titlevalue, setitlevalue] = useState("");
    //textareavalue
    const [textareavalue, setextareavalue] = useState("");

    //updated at
    const [updatedatvalue, setupdatedatvalue] = useState('');

    //for hiding sidebar and Dsiplaynotes in all-notes route
    const [hidecomponents, sethidecomponents] = useState(true);
    function focused(string, fieldtoupdate) {
        if (string === "writing") {
            setsave(true)
        }
        else {
            //here user blurred so save to db
            savetodb(fieldtoupdate);
            setsave(false);
        }
    }
    async function savetodb(fieldtoupdate) {
        if (fieldtoupdate === "titlevalue") {
             await putRequest(`${BASE_URL}${UPDATE_NOTE}/${currentnoteid}`, { titlevalue: titlevalue, updatedAt: Date.now() });
        }
        else {
            await putRequest(`${BASE_URL}${UPDATE_NOTE}/${currentnoteid}`, { textareavalue: textareavalue, updatedAt: Date.now() });
        }

    }
    async function deletecurrentnote() {
        if (location.pathname.substring(0, 6) !== "/note/") {
            await deleteRequest(`${BASE_URL}${DELETE_NOTE}${location.pathname.substring(6)}`)

            history.push({
                pathname: "/trash",
                notify: "delete"
            })

        }
        else {
          await putRequest(`${BASE_URL}${UPDATE_NOTE}/${currentnoteid}`, { archive: 1, updatedAt: Date.now() });

            history.push({
                pathname: "/all-notes",
                notify: "success"
            })
        }
    }
    async function movefromtrashtoallnotes() {
         await putRequest(`${BASE_URL}${UPDATE_NOTE}/${currentnoteid}`, { archive: 0, updatedAt: Date.now() });
        history.push({
            pathname: "/trash",
            notify: "revoked"
        })
    }

    useEffect(() => {
        if (location.pathname.substring(0, 6) === "/note/" || location.pathname.substring(0, 7) === "/trash/") {
            sethidecomponents(false);
        }
    }, [location.pathname])

    return (
        <>

            <div className="flex">
                <div className={"hidden " + (hidecomponents ? "md:hidden" : "md:block")}>
                    <Sidebar />
                </div>
                <div className={"hidden " + (hidecomponents ? "md:hidden" : "md:block")}>
                    <Displaynotes />
                </div>


                <div >
                    <div className="header-top  p-4 text-green-600 text-2xl bg-gray-200  flex justify-between">
                        <span className="ml-1"> {save ? (<h2 className="text-lg font-bold cursor-pointer">Save</h2>) : (<Link to="/all-notes"><FaArrowLeft /></Link>)}</span>
                        <div>
                            {revokebutton && <button className="mr-5 text-black" onClick={() => movefromtrashtoallnotes()}><ImUndo2 /></button>}
                            <button className="mr-5 text-black" onClick={() => deletecurrentnote()}><VscTrash /></button>
                        </div>
                    </div>
                    <div className="border-l-2 border-gray-300 font-extralight text-sm p-2 tracking-wide">
                        <h2><FormatTime updatedAt={updatedatvalue}/></h2>

                    </div>
                    <div className="headertitle ">
                        <input className=" titleinput w-screen pt-8 pb-8 text-4xl outline-none pl-2 pr-2 border-r-2 border-l-2 border-b-2 border-gray-300  "
                            onChange={(e) => setitlevalue(e.target.value)}
                            value={titlevalue}
                            onFocus={() => focused("writing")}
                            onBlur={() => focused("stopped", "titlevalue")}
                            placeholder="Title" type="text"
                        />
                    </div>
                    <div className="maincontent ">
                        <textarea className="textareainput w-screen md:overflow-hidden  text-lg outline-none border-2 border-gray-300 pl-2 pr-2 h-screen "
                            onChange={(e) => setextareavalue(e.target.value)}
                            value={textareavalue}
                            onFocus={() => focused("writing")}
                            onBlur={() => focused("stopped", "textareavalue")}
                            placeholder="Start writing..."
                            type="text"
                        />
                    </div>
                </div>

            </div>
        </>
    )
}

export default Note
