import {  IAction } from "../components/reducers/authReducer";
import types from "../types/types"
import { firebase, googleAuthProvider } from "../firebase/firebase-config"
import { isValidUser } from "../helpers/validators/user/isValidUser";
import { finishLogin, startLogin } from "./ui";
import Swal from 'sweetalert2'
import { noteLogout } from "./note";


export const startLoginEmailPassword = (email: string, password: string) => {

    return (dispatch: React.Dispatch<React.SetStateAction<IAction>>) => {
        
        dispatch(startLogin())

        firebase.auth().signInWithEmailAndPassword(email,password)

        .then(({user}) => {
            if (!isValidUser({ uid: user?.uid, displayName: user?.displayName })) {
                return false
            }
            dispatch(login(user!.uid,user!.displayName!))
            dispatch(finishLogin())
        } )
        .catch( e => {
          //  console.log(e)
            dispatch(finishLogin())
            Swal.fire("Error", e.message,"error")
        })
    }
}


export const startRegisterWithEmailPaswordName=(email:string,password:string,name:string)=>{

    return (dispatch: React.Dispatch<React.SetStateAction<IAction>>)=>{
        firebase.auth().createUserWithEmailAndPassword(email,password)
            .then( async ({user})=>{

              await  user?.updateProfile({displayName:name} )
               // console.log(user)
                if (!isValidUser({ uid: user?.uid, displayName: user?.displayName })) {
                    return false
                }

                dispatch( login(user!.uid, user!.displayName!) )
            }).catch(e => {
            //    console.log(e)
                Swal.fire("Error", e.message,"error")
            })
    }

}


export const startGoogleLogin = () => {
    return (dispatch: React.Dispatch<React.SetStateAction<IAction>>) => {

        firebase.auth().signInWithPopup(googleAuthProvider)

            .then(({ user }) => {

                if (!isValidUser({ uid: user?.uid, displayName: user?.displayName })) {
                    return false
                }

                dispatch( login(user!.uid, user!.displayName!) )

            //    console.log(user)
              //  console.log(user?.uid, user?.displayName)

            })

    }
}



export const login = (uid: string, displayName: string) => {

    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}
export const startLogout = ()=>{
    return async (dispatch: React.Dispatch<React.SetStateAction<IAction>>)=>{
       await firebase.auth().signOut()
       dispatch(Logout())
       dispatch(noteLogout())
       
    }
}

export const Logout =()=>({
    type:types.logout
})