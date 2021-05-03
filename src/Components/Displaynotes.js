import React, { useContext, useEffect, useState } from 'react'
import "../index.css"
import { Notescontextmain } from './Contexts/Notescontext';
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import {     useLocation, useHistory } from 'react-router-dom';
import { BASE_URL, GET_ALL_NOTES, GET_TRASH_NOTES, CREATE_NOTE } from './Utils/apiendpoints'
import { getRequest, postRequest } from './Utils/apirequests'
import { useAuth0 } from '@auth0/auth0-react'
import Loadarchivenotes from './Helperfiles/Loadarchivenotes';
import CReateLoadingmobile from './Helperfiles/CreateLoadingmobile';


const Displaynotes = () => {
    const { user } = useAuth0();
    const { notes, sidebartoggle, setsidebartoggle, setnotes } = useContext(Notescontextmain);
    let history = useHistory();
    //to show fetching notes message
    const [fetchingnotes, setfetchingnotes] = useState(true);

    const location = useLocation();
    //to hide new note button
    const [hidebutton, sethidebutton] = useState(false);
    //currentid to display border over note
    const [currentid, setcurrentid] = useState(0);
    const [zeronotes, setzeronotes] = useState(false);

    //note loading
    const [loading, setloading] = useState(false);

    //detect trash notes or all notes
    const [notetype,settypenote] = useState("All");
    useEffect(() => {
        notes.forEach((note) => {
            if (note._id === location.pathname.substring(6) || note._id === location.pathname.substring(7)) {

                setcurrentid(note._id)
            }
        })
    }, [notes, location.pathname])

    useEffect(() => {
        //user requesting trash
        if (location.pathname.substring(0, 6) === "/trash") {
            settypenote("Trash")
            sethidebutton(true);
        }
        if (location.pathname.substring(0, 10) === "/all-notes" || location.pathname.substring(0, 6) === "/note/") {
            getallnotes();
        }
        if (location.pathname === "/trash" || location.pathname.substring(0, 7) === "/trash/") {
            getallnotes();
        }

       
        async function getallnotes() {
            if (location.pathname === "/all-notes" || location.pathname.substring(0, 6) === "/note/") {
                const notes = await getRequest(`${BASE_URL}${GET_ALL_NOTES}/${user.sub}`)
                setnotes(notes)
                setfetchingnotes(false);
                if (notes.length === 0) {
                    setzeronotes(true);
                }
            }
            if (location.pathname === "/trash" || location.pathname.substring(0, 7) === "/trash/") {
                const notes = await getRequest(`${BASE_URL}${GET_TRASH_NOTES}/${user.sub}`)
                setnotes(notes)
                setfetchingnotes(false);
                if (notes.length === 0) {
                    setzeronotes(true);
                }
            }
        }

    }, [location.pathname,setnotes,user.sub])
    //function to toggle sidebar
    function sidebarhandle() {
        if (!sidebartoggle) {
            window.scrollTo(0, 0)
        }
        setsidebartoggle(!sidebartoggle);
    }
    function changecurrentid(id) {
        setcurrentid(id)
    }
    async function handlecreatenote() {
        setloading(true);
        const response = await postRequest(`${BASE_URL}${CREATE_NOTE}`, { sub: user.sub })
        //if note creation failed
        if (response.error) {
            return false;
        }
        if (response._id) {
            setloading(false)
            history.push({
                pathname: `/note/${response._id}`,
                note: response
            })
        }
    }

    return (
        <>
            <div className="header  p-10 flex items-center justify-between border-r-2 border-gray-300">
                <h2><span className="font-semibold">{notetype} Notes </span><span className="font-thin">({notes.length})</span></h2>

            </div>
            <hr />

            <div className="allnotes  overflow-scroll pb-24 w-screen">
                {zeronotes &&
                    <div className="flex flex-col justify-center items-center h-screen">
                        <img className="mb-5" src="/nonotes2.gif" alt="no notes" />
                        <h2 className="text-center text-lg mb-44 md:mb-10">
                            Create your first note<br />
                            Click the <span className="text-green-500">+ New Note </span>button in the sidebar to get started.
                        </h2>
                    </div>
                }
                {fetchingnotes ?

                    (<div className="flex justify-center items-center h-screen text-2xl text-green-500">
                        <h2>Fetching Notes...</h2>
                    </div>

                    )
                    :
                    (notes.map((note) => (
                        
                            <Loadarchivenotes key={note._id}
                                changecurrentid={changecurrentid}
                                currentid={currentid}
                                note={note}
                                location={location.pathname}
                                zeronotes={zeronotes}
                            />
                        
                    )
                    ))
                }
            </div>
            <div className="footer md:hidden fixed bottom-0 bg-yellow-300 w-screen  flex flex-col z-20 items-center">
                <div className={(hidebutton) ? "hidden" : "flex justify-center"}>
                    <div className="flex items-center justify-center bg-green-500 p-2 text-white text-lg cursor-pointer rounded-full absolute bottom-12">
        
                        <CReateLoadingmobile loading={loading} handlecreatenote={handlecreatenote} />

                    </div>
                </div>
                <div className=" bg-gray-500  w-screen p-6 text-white">
                    {sidebartoggle ? (<ImCross onClick={() => sidebarhandle()} />) : (<GiHamburgerMenu onClick={() => sidebarhandle()} />)}
                </div>
            </div>

        </>
    )
}

export default Displaynotes
