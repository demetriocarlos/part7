const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/',async (request, response) => {
    const users = await User
        .find({}).populate('blog', {url:1,title:1,author:1, id:1})

        response.json(users)
})


usersRouter.post('/', async (request, response) =>{    
    const { username, name, password } = request.body;

    const saltRounds = 10;
    try { 
    const passwordHash= await bcrypt.hash(password, saltRounds)
    const user = new User({username,name,passwordHash})

    const savedUser = await user.save()


    response.status(201).json(savedUser)
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Algo salió mal' });
      }
} )


module.exports = usersRouter




