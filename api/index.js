require('dotenv').config();
const express = require('express');
const app = express();
require('./mongo');

const cors = require('cors');
const notFound = require('./middleware/notFound');
const handleErrors = require('./middleware/handleErrors');
const usersRouter = require('./controllers/users');
const notesRouter = require('./controllers/notes');
const loginRouter = require('./controllers/login');

app.use(cors());
app.use(express.json());
app.use(express.static('../app/build'))

app.use('/api/login', loginRouter);
app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);

if(process.env.NODE_ENV === 'test') {
    const testRouter = require('./controllers/testing');
    app.use('/api/testing', testRouter);
}

app.use(notFound);
app.use(handleErrors);

const PORT = process.env.PORT || 3006;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

module.exports = { app, server };