import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUpLoading } from '../../actions/note'
const NotesAppBar = () => {

    const dispatch = useDispatch()
    const {active}:any = useSelector<any>(state => state.notes)


    const handleSave=()=>{
       dispatch(startSaveNote(active))
       
    }
    const handlePictureClick = ()=>{
  
       const fileSelector = document.querySelector("#fileSelector")
        if (fileSelector instanceof HTMLElement) {
            fileSelector.click();
          }
        
            
    }

   const  handleFileChange = (e:any)=>{

            const file = e.target.files[0]
            if(file){
                dispatch(startUpLoading(file))
            }

    }
    
    return (
        <div className="notes__appbar">
            <span>28 agosto 2021</span>

            <input type="file" name="file" id="fileSelector" style={{display:"none"}}  onChange={handleFileChange} />

            <div>
                
                <button className="btn" onClick={handlePictureClick}>
                        Picture
                </button>

                <button className="btn" onClick={handleSave}>
                        Save
                </button>
                
            </div>
        </div>
    )
}

export default NotesAppBar
