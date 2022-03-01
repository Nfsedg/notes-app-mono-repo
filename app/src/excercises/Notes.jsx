import { Fragment, useState, useEffect } from "react";
import { Notification } from "../components/Notification";
import { loginService } from "../services/login";
import { LoginForm } from "../components/LoginForm";
import { AddNoteForm } from "../components/AddNoteForm";
import { create, setToken } from "../services/notes"
import { Note } from "../components/Note";

export const Notes = () => {
    const [notes, setNotes] = useState([])
    const [showAll, setShowAll] = useState(true)
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        fetch("http://localhost:3005/api/notes")
            .then(res => res.json())
            .then(data => setNotes(data))
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
        if(loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user)
            setToken(user.token)
        }
    }, [])
    
    const addNoteSubmit = (newNote) => {

        create(newNote)
            .then(returnNote => {
                setNotes(notes.concat(returnNote))
            })
    }
    
    const handleSubmitLogin = async (username, password) => {
        try {
            const user = await loginService({
                username,
                password
            })
            window.localStorage.setItem(
                'loggedNoteAppUser', JSON.stringify(user)
            )
            console.log(user)
            setToken(user.token)
            setUser(user)
        } catch (e) {
            setErrorMessage(e)
            setTimeout(() => {
                setErrorMessage(null)
            }, 2500)
        }
    }
    const handleLogout = () => {
        setUser(null)
        setToken(user.token)
        window.localStorage.removeItem('loggedNoteAppUser')
    }
    const handleShowAll = () => {
        setShowAll(showAllNotes => !showAllNotes)
    }
    const toggleImportance = () => {
        console.log('Importance has not channged')
    }

    return(
        <Fragment>
            <div>
                <h1 style={{color: 'green'}}><i>Notes</i></h1>
                <Notification message={errorMessage}/>
                {!user && <LoginForm 
                    handleSubmitLogin={handleSubmitLogin} 
                />}
                <button onClick={handleShowAll}>{showAll ? "Show important" : "Show All"}</button>
                
                <ol>
                    {
                        notes
                        .filter(e => {
                            if(showAll === false) {
                                return e.important === true
                            } else {
                                return true
                            }
                        })
                        .map(note => (
                                <Note note={note} toggleImportance={toggleImportance}/>
                        ))
                    }
                </ol>
            </div>

            {user && (<AddNoteForm 
                addNoteSubmit={addNoteSubmit} 
                handleLogout={handleLogout}
            />)}

        </Fragment>
    )
}