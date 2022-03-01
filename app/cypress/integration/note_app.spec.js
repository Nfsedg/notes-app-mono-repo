describe('Note App', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')

        cy.request('POST', 'http://localhost:3005/api/testing/reset')

        const user = {
            name: 'Edgar',
            username: 'nfsedg',
            password: 'mypassword'
        }

        cy.request('POST', 'http://localhost:3005/api/users', user)
    })

    it('frontpage can be opend', () => {
        cy.contains('Notes')
    })

    it('login can be opened', () => {
        cy.contains('Cancel').click()
    })

    it('use can login', () => {
        cy.get('[placeholder="Username"]').type('nfsedg')
        cy.get('[placeholder="Password"]').type('mypassword')
        cy.get('#from-login-button').click()
        cy.contains('Create a new note')
    })
    it('login fails with wrong password', () => {
        cy.get('[placeholder="Username"]').type('nfsedg')
        cy.get('[placeholder="Password"]').type('incorrect')
        cy.get('#from-login-button').click()

        cy.contains('Wrong credentials').click()
    })

    describe('when logged in', () => {
        beforeEach(() => {
            cy.login({
                username: 'nfsedg',
                password: 'mypassword'
            })
        })

        it('a new note can be created', () => {
            const noteContent = 'a note created by cypress'
    
            cy.contains('Create a new note').click()
            cy.get('input').type(noteContent)
            cy.contains('Add Note').click()
            cy.contains(noteContent)
        })

        describe.only('and a note exists', () => {
            beforeEach(() => {
                cy.createNote({
                    content: 'A note created from cypress 1', 
                    important: false
                })
                cy.createNote({
                    content: 'A note created from cypress 2',
                    important: false
                })
                cy.createNote({
                    content: 'A note created from cypress 3',
                    important: false
                })
            })

            it('can be made important', () => {
                cy.contains('A note created from cypress 2').as('theNote')

                cy.get('@theNote')
                .contains('make important')
            })
        })
    })
})