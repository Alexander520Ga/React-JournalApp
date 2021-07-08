import React from 'react'

import { Link } from 'react-router-dom'
import useForm from '../../hooks/useForm'
import validator from "validator"
import { removeError, setError } from '../../actions/ui'
import { useDispatch,useSelector, } from "react-redux"
import { startRegisterWithEmailPaswordName } from '../../actions/auth'

const RegisterScreen = () => {

    const dispatch = useDispatch()  

    const {msgError}:any = useSelector<any>( state => state.UI )
    
   
  //  console.log(msgError)



    const [formValues, handleInputChange] = useForm({
        name: "",
        email: "",
        password: "",
        password2: ""
    })  

    const { name, email, password, password2 } = formValues

    const handleRegister = (e: React.SyntheticEvent) => {
        e.preventDefault()
       // console.log(name, email, password, password2)

        if (isFormValid()) {
            dispatch(startRegisterWithEmailPaswordName(email,password,name))
        }

    }


    const isFormValid = () => {

        if (isEmpty(name)) {
            dispatchError("name is required")
            return false
        }
        if (!isEmail(email)) {
            dispatchError("email is not valid")
            return false
        }
        if (isValidPasswords(password, password2)) {
            dispatchError("password should be at least 6 characters and match each other")
            return false
        }
        dispatch(removeError())
        return true
    }

    const dispatchError = (text: string) => dispatch(setError(text))

    const isEmpty = (text: string) => text.trim().length === 0
    const isEmail = (email: string) => validator.isEmail(email)
    const isValidPasswords = (password: string, password2: string) => password !== password2 || isValidPassword(password)
    const isValidPassword = (password: string) => password.length < 7
    return (
        <>
            <h3 className="auth__title">Register</h3>
            <form action="" onSubmit={handleRegister} className="animate__animated animate__fadeIn animate__faster">

                {
                    msgError &&
                   ( <div className="auth__alert-error">
                        {msgError}
                    </div>)
                }

                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    autoComplete="off"
                    className="auth__input"
                    onChange={handleInputChange}
                    value={name}
                />

                <input
                    type="text"
                    placeholder="ejemplo@gmail.com"
                    name="email"
                    autoComplete="off"
                    className="auth__input"
                    onChange={handleInputChange}
                    value={email}
                />

                <input type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    onChange={handleInputChange}
                    value={password}    
                />

                <input type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    className="auth__input"
                    onChange={handleInputChange}
                    value={password2}
                />

                <button type="submit" 
                className="btn btn-primary btn-block mb-5"
                >Register</button>

                <Link to="/auth/login" className="link">
                    Already registed?
                </Link>

            </form>
        </>
    )
}

export default RegisterScreen
