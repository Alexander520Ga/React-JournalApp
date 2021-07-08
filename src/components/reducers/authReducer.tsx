import types from "../../types/types"

export interface IPayload {
    uid: string  ,
    displayName:string 
}

export interface IAction{
    type:string,
    payload?:IPayload 
}

export const authReducer = (state={},action:IAction) => {

    switch(action.type){

        case types.login:
            return {
                uid:action.payload!.uid,
                name:action.payload!.displayName
            } 

        case types.logout:
            return { }

            default:
                return state
    }



}

