import React from 'react'
import {Route} from 'react-router-dom'
import {withAuthenticationRequired} from "@auth0/auth0-react"
import Loading from '../Helperfiles/Loading'
const ProtectedRoute = ({component,...args}) => {
    return (
        <Route exact component={withAuthenticationRequired(component,{
            onRedirecting:()=><Loading/>
        })}{...args}/>
    )
}

export default ProtectedRoute
