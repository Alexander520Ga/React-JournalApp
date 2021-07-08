import types from "../types/types"


export const setError  = (err:string) => ({
    type:types.uiSetError,
    payload:err
})

export const removeError=()=>({
    type:types.uiRemoveError,
    
})


export const startLogin =()=>({
    type:types.uiStartLoading
})

export const finishLogin=()=>({
    type:types.uiFinishLoading 
})

