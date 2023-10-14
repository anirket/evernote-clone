import React from 'react'
import '../index.css'
import LoginLogout from './Helperfiles/LoginLogout'

const Login = () => {

    return (
        <div className="loginpagewrapper  h-screen flex justify-center items-center">
            <div className="logindiv bg-white rounded-xl pt-10">
                <div className="logo-section flex flex-col items-center">
                    <div className="evernote-logo flex justify-center p-4 flex-col items-center">
                        <img src="/evernotefinallogo.svg" alt="evernote-logo" className="h-64" />
                        <div className="evernote-tagline text-sm font-serif pt-1 md:text-lg">
                        </div>

                        <h3 className="text-xl font-semibold text-center">Tame your work, organize your life</h3>
                        <h4 className='text-md m-4 text-center italic'>Remember everything and tackle any project with your notes, tasks, and schedule all in one place.</h4>
                    </div>
                </div>
                <div className="loginsection flex justify-center mt-14 items-center md:mt-28 outline-none">
                    <LoginLogout />
                </div>
            </div>
        </div>
    )
}

export default Login
