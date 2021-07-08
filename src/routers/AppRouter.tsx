import React, { useEffect } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    
    Redirect
  } from "react-router-dom";
  

import {firebase} from "../firebase/firebase-config"
import JournalScreen from '../components/journal/JournalScreen';
import { useDispatch } from 'react-redux';
import AuthRouter from './AuthRouter';
import { login } from '../actions/auth';
import { useState } from 'react';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { startLoadingNotes } from '../actions/note';

  

const AppRouter = () => {
    const [checking, setChecking] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {

        firebase.auth().onAuthStateChanged( async (user) => {
            
                if(user?.uid){
                        dispatch(login(user.uid,user.displayName!))
                        setIsLoggedIn(true)

                        dispatch(startLoadingNotes(user.uid))

                }else{
                    setIsLoggedIn(false)
                }
                setChecking(false)
        } )

    }, [dispatch,setChecking,setIsLoggedIn])

    if(checking){
        return( 
            <h1>Espere...</h1>
        )
    }


    return (
        <Router>
                <div>
                    <Switch>
                        <PublicRoute path="/auth" component={AuthRouter} isAuthenticated={isLoggedIn} />
                        <PrivateRoute exact path="/" component={JournalScreen} isAuthenticated={isLoggedIn} />
                        <Redirect to="/auth/login" />
                    </Switch>
                </div>
        </Router>
    )
}

export default AppRouter
