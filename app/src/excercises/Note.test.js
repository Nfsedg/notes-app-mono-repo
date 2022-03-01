import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import { Note } from '../components/Note'

test('renders content', () => {
    const note = {
        content: 'This is a test',
        important: true
    }

    const component = render(<Note note={note}/>)

    component.getByText('This is a test')
    component.getByText('make not important')
    // expect(component.container).toHaveTextContent('camiones')

    // const li = component.container.querySelector('li')
    // console.log(prettyDOM(li))
})

test('clicking the button calls event handle once', () => {
    const note = {
        content: 'This is a test',
        important: true
    }

    const mockHandler = jest.fn()

    const component = render(<Note note={note} toggleImportance={mockHandler}/>)

    const button = component.getByText('make not important')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler).toHaveBeenCalledTimes(2)
})