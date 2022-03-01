import { Fragment,useState, useRef } from "react"
import { Toggable } from "./Toggable"

export const AddNoteForm = ({ handleLogout, addNoteSubmit }) => {
    const [contentValue, setContentValue] = useState("")
    const elementRef = useRef(null)
    const toggableRef = useRef()

    const handleChange = (e) => {
        setContentValue(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const newNotetoAdd = {
            content: contentValue,
            important: Math.random() > 5
        }

        addNoteSubmit(newNotetoAdd)
        setContentValue("")
        toggableRef.current.toggleVisibility()
    }

    return(
        <Fragment>
            <Toggable buttonLabel={'New note'} ref={toggableRef}>
                <h3 ref={elementRef}>Create a new note</h3>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        onChange={handleChange} 
                        value={contentValue} 
                        name="note_content" 
                        id="content" 
                        placeholder="Add a note" 
                    />
                    <button>Add Note</button>
                </form>
                <div>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </Toggable>
        </Fragment>
    )
}