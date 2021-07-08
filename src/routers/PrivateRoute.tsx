import React, { VoidFunctionComponent } from 'react'
import { Redirect, Route } from 'react-router'

export interface IProps{
    isAuthenticated:boolean,
    component:VoidFunctionComponent,
    path:string,
}

const PrivateRoute = ({
    isAuthenticated,
    component:Component,
    ...rest
    }:any) => {
       // console.log(rest.location.pathname)

        return (
            <Route {...rest} 
            
            component={(props:any)=>(
            
                (isAuthenticated) ? (<Component {...props} />):(<Redirect to="/auth/login" />)
            )}
            
            />
        )
}

export default PrivateRoute
