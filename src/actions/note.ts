import Swal from "sweetalert2"
import { IIAction,INote } from "../components/reducers/noteReducer"
import { db } from "../firebase/firebase-config"
import { fileUpload } from "../helpers/fileUpload"
import { loadNotes } from "../helpers/loadNotes"
import types from "../types/types"



 const startNewNote = () => {
    return async(dispatch: React.Dispatch<React.SetStateAction<IIAction>>,getState:any)=>{

        const {uid} = getState().auth 
      

        const newNote = {
            title:"",
            body:"",
            date: new Date().getTime()
        }
        
        const doc = await db.collection(`${uid}/journal/notes`).add(newNote)
        
        dispatch( activeNote(doc.id,newNote))
        dispatch(addNewNote(doc.id,newNote))
    }
    
}

export const activeNote =(id:string, note:INote)=>({
        type:types.notesActive,
        payload:{
            ...note,id
        }
})


export const addNewNote=(id:string, note:any)=>({
        type:types.notesAddNew,
        payload:{
            id,
            ...note
        }
})

export const startLoadingNotes=(uid:string)=>{
        return async (dispatch: React.Dispatch<React.SetStateAction<IIAction >>)=>{
            const notes = await loadNotes(uid)
            dispatch(setNotes(notes))
        }
}


export const setNotes =(notes:any)=>({
    type:types.notesLoad,
    payload: notes
})

export const startSaveNote =(note:any)=>{

        return async (dispatch: React.Dispatch<React.SetStateAction<IIAction >>,getState:any)=>{
                const {uid} = getState().auth;
             

            if(!note.url){

                    delete note.url
            }
               
                const noteToFirestore = {...note}

                delete noteToFirestore.id

                await db.doc(`${ uid }/journal/notes/${note.id}`).update(noteToFirestore)

                dispatch(refeshNote(note.id,note))
                Swal.fire("Saved",note.title,"success")
        }

        //react-journal
}

export const refeshNote =(id:string,note:any)=>({

    type:types.notesUpdated,
    payload:{
        id,
        note:{
            id,
            ...note
        }
    }

})   


export const startUpLoading =(file:any)=>{

        return async (dispatch:React.Dispatch<React.SetStateAction<any >>,getState:any)=>{

            const {active:activeNote}=getState().notes;

            Swal.fire({
                title:"Uploading...",
                text:"Please wait...",
                allowOutsideClick:false,
                showConfirmButton: false,
                willOpen:() => {
                    Swal.showLoading()
                }
            });
            
            const fileUrl = await fileUpload(file)

            activeNote.url = fileUrl

           dispatch(startSaveNote(activeNote))

            Swal.close()
        }
}

export const startDeleting=(id:string)=>{

    return async(dispatch:React.Dispatch<React.SetStateAction< IIAction >>,getState:any)=>{

        const uid=getState().auth.uid

        await db.doc(`${ uid }/journal/notes/${id}`).delete()

        dispatch(deleteNote(id))
        

    }

}

export const deleteNote = (id:string) => ({

    type:types.notesDelete,
    payload: id

})


export const noteLogout=()=>({
    type:types.notesLogoutCleaning,
    
})


 export default startNewNote
