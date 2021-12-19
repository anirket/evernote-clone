import React, { useContext, useState, useEffect } from 'react'
import "../index.css"
import { UserProfile } from './Contexts/UserContext';
import { Notescontextmain } from './Contexts/Notescontext';
import { CgNotes } from "react-icons/cg";
import { VscTrash } from "react-icons/vsc";
import { FiLogOut } from "react-icons/fi";
import { Link, useLocation, useHistory } from "react-router-dom"
import { useAuth0 } from '@auth0/auth0-react'
import { postRequest } from './Utils/apirequests'
import { BASE_URL, CREATE_NOTE } from './Utils/apiendpoints'
import CreateLoading from './Helperfiles/CreateLoading';
const Sidebar = () => {
    const { user } = useContext(UserProfile);
    const { sidebartoggle } = useContext(Notescontextmain);
    const { logout } = useAuth0();
    const [activeid, setactiveid] = useState(1);

    //for new note loading
    const [loading, setloading] = useState(false);
    let history = useHistory();

    function changeactiveid(id) {
        setactiveid(id);
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
    const location = useLocation();
    useEffect(() => {
        if (location.pathname.substring(0, 6) === "/note/") {
            changeactiveid(0);
        }
        if (location.pathname.substring(0, 6) === "/trash") {
            changeactiveid(2);
        }
    }, [location.pathname])

    return (
        <>
            {/* for mobile */}
            <div className={"md:hidden z-10 h-screen w-56 bg-white border-r-2 border-gray-300 absolute " + (sidebartoggle ? "block" : "hidden")}>
                <h2 className="flex items-center bg-white  p-4 text-gray-800 justify-between">
                    <img className="w-8 h-8 bg-white rounded-full mx-3" src={user.picture} alt="evernote" />
                    <span className="mr-6">{user.given_name}</span>
                </h2>
                <hr />
                <div className="navlinks mt-4 text-white p-1">
                    <Link to="/all-notes"> <div onClick={() => changeactiveid(1)} className={"flex items-center p-3 bg-white mb-2 text-black " + (activeid === 1 ? "bg-gray-200" : "bg-white")}>
                        <span><CgNotes /></span> <div className="ml-3">all-notes</div>
                    </div>
                        <hr />
                    </Link>

                    <Link to="/trash"><div onClick={() => changeactiveid(2)} className={"flex items-center p-3 bg-white mb-2 text-black " + (activeid === 2 ? "bg-gray-200" : "bg-white")}>
                        <span><VscTrash /></span> <div className="ml-3">Trash</div>
                    </div>
                    </Link>
                    <hr />

                    <div onClick={() => logout()} className="flex items-center p-3 bg-red-500 text-white mt-2">
                        <span><FiLogOut /></span> <div className="ml-3">Logout</div>
                    </div>
                </div>
            </div>
            {/* for pc */}
            <div className="pcsidebar hidden md:block h-screen  bg-white border-r-2 border-gray-300 relative">
                <h2 className="flex items-center bg-white  p-4 text-gray-800 justify-between">
                    <img className="w-8 h-8 bg-white rounded-full mx-3" src={user.picture} alt="evernote" />
                    <span className="mr-6">{user.given_name}</span>
                </h2>
                <hr />
                <div className="navlinks mt-4 text-white p-1">


                    <CreateLoading handlecreatenote={handlecreatenote} loading={loading} />
                    <hr />
                    <Link to="/all-notes"> <div onClick={() => changeactiveid(1)} className={"flex items-center p-3 bg-white mb-2 mt-2 text-black " + (activeid === 1 ? "bg-gray-200" : "bg-white")}>
                        <span><CgNotes /></span> <div className="ml-3">all-notes</div>
                    </div>
                        <hr />
                    </Link>

                    <Link to="/trash"><div onClick={() => changeactiveid(2)} className={"flex items-center p-3 bg-white mb-2 text-black " + (activeid === 2 ? "bg-gray-200" : "bg-white")}>
                        <span><VscTrash /></span> <div className="ml-3">Trash</div>
                    </div>
                    </Link>
                    <hr />

                    <div className="flex justify-center text-center">
                        <div onClick={() => logout()} className="flex items-center px-24 py-3  bg-gray-600 text-white cursor-pointer  absolute bottom-5 rounded-lg">
                            <span><FiLogOut /></span> <div className="ml-3">Logout</div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Sidebar
