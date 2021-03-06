


export const fileUpload= async(file:any)=>{

    const cloudUrl="https://api.cloudinary.com/v1_1/dp2ccs5dl/upload"

    const formData = new FormData()
    formData.append("upload_preset","react-journal")
    formData.append("file",file) 

    try {
        const resp = await fetch(cloudUrl,{
            method:"POST",
            body:formData
        })

        if( resp.ok ){
            const couldResp = await resp.json()
            return couldResp.secure_url;
        } else {
            throw await resp.json()
        }

    } catch (error) {
        throw error
    }

}