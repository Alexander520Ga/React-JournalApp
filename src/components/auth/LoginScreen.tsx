import React from 'react'
import { Link } from 'react-router-dom'
import useForm from '../../hooks/useForm'
import {useDispatch,useSelector} from "react-redux"
import {startGoogleLogin, startLoginEmailPassword } from '../../actions/auth'

const LoginScreen = () => {

        const dispatch =  useDispatch()
        const {loading}:any = useSelector<any>(state => state.UI)
     
        const handleGoogleLogin =()=>{
            dispatch(startGoogleLogin())
        }

       const [formValues, handleInputChange ] = useForm({
                 email:"",
                 password:""
             })

        const {email,password}=formValues


        const handleLogin=(e:React.SyntheticEvent)=>{
            e.preventDefault()

            dispatch( startLoginEmailPassword(email,password) )
            
        }

    return (
        <>
            <h3 className="auth__title">Login</h3>
            <form action="" 
            onSubmit={handleLogin}
            className="animate__animated animate__fadeIn animate__faster"
            >

                <input 
                type="text" 
                placeholder="Email" 
                name="email"
                autoComplete="off"
                className="auth__input"
                value={email}
                onChange={handleInputChange}
                />

                <input type="password" 
                placeholder="Password" 
                name="password" 
                className="auth__input"
                value={password}
                onChange={handleInputChange}
                />

                <button type="submit" className="btn btn-primary btn-block" disabled={loading} >Login</button>

               

                <div className="auth__social-networks">

                    <p>Login social network</p>

                    <div className="google-btn" onClick={handleGoogleLogin} >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>
                <Link to="/auth/register" className="link">
                    Create new account
                </Link>

            </form>
        </>
    )
}

export default LoginScreen
