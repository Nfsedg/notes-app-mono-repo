import { Fragment, useState } from "react"
import { Toggable } from "./Toggable"
import PropTypes from "prop-types"

export const LoginForm = ({ handleSubmitLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        handleSubmitLogin(username, password)
        setUsername('')
        setPassword('')
    }

    return(
        <Fragment>
            <Toggable buttonLabel={'Show Login'}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input 
                            type="text" 
                            value={username} 
                            name="username" 
                            placeholder="Username" 
                            onChange={({target}) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                        <input 
                            type="password" 
                            value={password} 
                            name="password" 
                            placeholder="Password" 
                            onChange={({target}) => setPassword(target.value)}
                        />
                    </div>
                    <div>
                        <button id="from-login-button">Login</button>
                    </div>
                </form>
            </Toggable>
        </Fragment>
    )
}

LoginForm.prototype = {
    handleSubmitLogin: PropTypes.func.isRequired
}