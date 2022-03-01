const { app, server} = require('../index')
const supertest = require('supertest')
const User = require('../models/User')
const api = supertest(app)

const initialNotes = [
    {
        content: 'Aprendiendo fullstack js with me',
        importart: true,
        date: new Date(),
    },
    {
        content: 'Sigueme en redes sociales',
        importart: true,
        date: new Date(),
    }
]

const getAllContentFromNotes = async () => {
    const response = await api.get('/api/notes')

    return {
        contents: response.body.map(note => note.content),
        response
    }
}

const getUsers = async () => {
    const usersDB = await User.find({})
    return usersDB.map(user => user.toJSON())
}

module.exports = {
    getAllContentFromNotes,
    initialNotes,
    api,
    getUsers
}