import React from 'react'
import { Redirect, Route } from 'react-router'


const PublicRoute = ({
    isAuthenticated,
    component:Component,
    path,
    ...rest
    }:any) => {
        return (
            <Route {...rest} 
            
            component={(props:any)=>(
            
                (isAuthenticated) ? (<Redirect to="/" />) : (<Component {...props} />)
            )}
            
            />
        )
}

export default PublicRoute
