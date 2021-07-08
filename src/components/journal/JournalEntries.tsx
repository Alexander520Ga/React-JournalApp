import React from 'react'
import { useSelector } from 'react-redux'
import JournalEntry from './JournalEntry'




const JournalEntries = () => { 
    const {notes}:any = useSelector<any>(state => state.notes) 
        // console.log(notes )



    return (    
           <div className="journal__entries">
            {
                  notes.map((note:any ) => (
                         <JournalEntry 
                            key={note.id}
                             {...note} />
                    
                
                ))  
            }
        </div>
    )
}

export default JournalEntries
