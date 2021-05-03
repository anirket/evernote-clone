import React from 'react'
import '../index.css'
import LoginLogout from './Helperfiles/LoginLogout'

const Login = () => {
  
    return (
        <div className="bg-gray-300  h-screen flex justify-center items-center">

            <div className="logindiv bg-white rounded-xl pt-10">
                <div className="logo-section flex flex-col items-center">
                    <div className="evernote-logo flex justify-center p-4 flex-col items-center">
                        <img  src="/evernotefinallogo.svg" alt="evernote-logo" className="" />
                        <div className="evernote-tagline text-sm font-serif pt-1 md:text-lg">
                    </div>
                  
                        <h3>Remember everything important.</h3>
                    </div>
                </div>
                <div className="loginsection flex justify-center mt-20 items-center md:mt-28">
                   <LoginLogout/>
                </div>
            </div>
        </div>
    )
}

export default Login
