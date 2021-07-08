import types from "../../types/types";
import { IAction } from "../reducers/authReducer";


interface IInitialState {
    loading:boolean ,
    msgError:null | string 
}

const initialState:IInitialState={
    loading:false ,
    msgError:null
}

const uiReducer = (state=initialState,action:IAction) => {
    
switch (action.type) {
    case types.uiSetError:
        return {
            ...state,
            msgError: action.payload
        }
    case types.uiRemoveError:
        return {
            ...state,
            msgError:null
        }

    case types.uiStartLoading:
        return {
            ...state,
            loading:true
        }
    case types.uiFinishLoading:
        return{
            ...state,
            loading:false
        }
    default:
        return state
}

}

export default uiReducer
