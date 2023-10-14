import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom"
import { FiArrowRight } from "react-icons/fi";
import GoogleButton from 'react-google-button'


const LoginLogout = () => {
    const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
    if (isLoading) {
        return (<div className="login-wrapper cursor-pointer  text-center flex justify-center ">
            <button className="loginbutton rounded-full border-none outline-none md:px-32 bg-red-500  text-white py-2 px-14" disabled>
                <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-white"></div>
            </button>
        </div>)
    }
    return (
        <div>
            {isAuthenticated ?
                (
                    <Link to="/all-notes">
                        <div className="login-wrapper cursor-pointer  text-center flex justify-center outline-none border-black border-2 rounded-full w-96 shadow-lg ">
                            <button className="loginbutton rounded-full border-none outline-none md:px-16 bg-white text-black py-2 px-12 flex items-center font-semibold">Go to Dashboard <FiArrowRight className="ml-3" /></button>
                        </div>
                    </Link>
                )
                :
                (
                    <div onClick={() => loginWithRedirect()} className="login-wrapper cursor-pointer  text-center flex justify-center">
                        <GoogleButton type='dark' />
                    </div>
                )
            }

        </div>
    )
}

export default LoginLogout
