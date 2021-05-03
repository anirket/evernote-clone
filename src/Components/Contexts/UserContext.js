import React, { createContext } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

export const UserProfile = createContext();


const UserContext = (props) => {
    const { user } = useAuth0();
    return (
        <UserProfile.Provider value={{user}}>
            {props.children}
        </UserProfile.Provider>
    )
}

export default UserContext
