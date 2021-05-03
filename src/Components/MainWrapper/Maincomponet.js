import React, { useEffect } from 'react'
import Displaynotes from '../Displaynotes'
import Note from '../Note'
import Sidebar from '../Sidebar'
import Notescontext from '../Contexts/Notescontext'
import { useLocation } from 'react-router-dom'
import Notifications, { notify } from 'react-notify-toast';


const Maincomponet = () => {
    const location = useLocation();


    useEffect(() => {
        if (location.notify !== undefined) {
            if (location.notify === "success") {

                let myColor = { background: '#10B981', text: "#FFFFFF" };
                notify.show("Note is moved to trash", "custom", 2000, myColor);
            }
            else if (location.notify === "delete") {
                let myColor = { background: '#10B981', text: "#FFFFFF" };
                notify.show("Note is permanantly deleted", "custom", 2000, myColor);
            }
            else {
                let myColor = { background: '#10B981', text: "#FFFFFF" };
                notify.show("Note is revoked", "custom", 2000, myColor);
            }
        }
    }, [location])
    return (
        <>
            <Notifications />
            <Notescontext>

                <div className="flex">
                    <div>
                        <Sidebar />
                    </div>
                    <div>
                        <Displaynotes />
                    </div>

                    <div className="hidden">
                        <Note />
                    </div>
                </div>
            </Notescontext>
        </>
    )
}

export default Maincomponet
