import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import { Toggable } from './Toggable.jsx'
import { es } from '../i18n/index'

describe('<Toggable />', () => {
    const buttonLabel = 'show'
    let component

    beforeEach(() => {
        component = render(
            <Toggable buttonLabel={buttonLabel}>
                <div className='testDiv'>testDivContent</div>
            </Toggable>
        )
    })
    
    test('renders its children', () => {
        component.getByText('testDivContent')
    })
    test('renders its children but are not visible', () => {
        const el = component.getByText('testDivContent')
        expect(el.parentNode).toHaveStyle('display: block')
    })
    test('after clicking its children must be shown', () => {
        const button = component.getByText(buttonLabel)
        fireEvent.click(button)

        const el = component.getByText('testDivContent')
        expect(el.parentNode).toHaveStyle('display: none')
    })

    test('toggled content can be closed', () => {
        const cancelButton = component.getByText(es.TOGGABLE.CANCEL_BUTTON)
        fireEvent.click(cancelButton)

        const el = component.getByText('testDivContent')
        expect(el.parentNode).toHaveStyle('display: none')
    })
})