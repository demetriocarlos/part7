
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/' ,async (request, response) => {
    const blog = await Blog
        .find({}).populate('user', {username:1, name:1 ,id:1})

    response.json(blog)
})


blogRouter.post('/', async (request, response, next) => {
    try {

        const {
            title, 
            url ,
            author,
            id,
            userId
        }= request.body;// Desestructura las propiedades

        const user = await User.findById(userId)


        // Crea un nuevo blog usando los datos de la solicitud
        const newBlog = new Blog ({
            title, 
            url ,
            author,
            id,
            user:user._id // Asigna el id del usuario al blog
        })

        // Guarda el nuevo blog en la base de datos
        const result = await newBlog.save()

        
        // Agrega el id del nuevo blog a la lista de blogs del usuario y guarda los cambios
        user.blog = user.blog.concat(result._id)
        await user.save()

        response.status(201).json(result)// Responde con el blog creado y un estado 201 (Created)

    } catch (error) {
        next(error)
    }
} )



module.exports = blogRouter

