
export const Notification = ({ message }) => {
        return(
            <div>
                <p>{message ? `Wrong credentials` : ''}</p>
            </div>
        )
}