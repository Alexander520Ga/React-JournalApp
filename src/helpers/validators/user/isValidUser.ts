interface IIValidUserPrps {
    uid?:string 
    displayName?:string |null
}
export const isValidUser = ({uid, displayName}: IIValidUserPrps)=>{
    if (uid && displayName) {
        return true
    }
    return false

}