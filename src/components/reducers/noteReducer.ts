import types from "../../types/types"


export interface IIAction {
    type:string
    payload:INote[] | any
}
export interface INote {
    id?:string ,
    title:string,
    body:string,
    imageUrl?:string,
    date:number,
    url?:string
}
interface IInitialState {
    notes:INote[],
    active:INote | null 

}

const initialState={
    notes:[],
    active:null

}

export const noteReducer = (state:IInitialState=initialState, action:IIAction) => {
   
switch(action.type){
    case types.notesActive :
        return {
            ...state,
            active:{
                ...action.payload
            }
        }
    case types.notesLoad :
        return {
            ...state,
            notes:[...action.payload]
        }
    case types.notesUpdated:
        return {
            ...state,
            notes: state.notes.map(note => note.id === action.payload.id
               ? action.payload.note : note
                )
        }
    case types.notesDelete:
        return {
            ...state,
            active:null,
            notes: state.notes.filter( note => note.id !== action.payload )
        }
    case types.notesLogoutCleaning:
        return {
            ...state,
            active:null,
            notes:[]
        }
    case types.notesAddNew:
        return {
            ...state,
            notes:[action.payload, ...state.notes]
        }

    default: 
    return state
}   


}
