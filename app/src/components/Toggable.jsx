import { useState, useImperativeHandle, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { es } from '../i18n/index';


export const Toggable = forwardRef(({ children, buttonLabel }, ref) => {
    const [visible, setVisible] = useState(false)

    const showStyle = {display: visible ? 'none' : ''}
    const hideStyle = {display: visible ? '' : 'none'}

    const toggleVisibility = () => setVisible(!visible)

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hideStyle}>
                <button onClick={toggleVisibility}>{buttonLabel}</button>
            </div>
            <div style={showStyle}>
                { children }
                <button onClick={toggleVisibility}>{es.TOGGABLE.CANCEL_BUTTON}</button>
            </div>
        </div>
    )
})

Toggable.displayName = 'elnombrequesea'

Toggable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}