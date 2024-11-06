import express from 'express'
import { getAllAuthors } from '../services/getAllAuthors.js'
import { getAuthorById } from '../services/getAuthorById.js'

const autoresRoutes = express.Router()

autoresRoutes.get('/', async (req, res) => {
  const autores = await getAllAuthors()
  console.log(autores)
  return res.render('autores/index.ejs', { autores })
})

autoresRoutes.get('/editar/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const autor = await getAuthorById(id)
    return res.render('autores/editar.ejs', { autor: autor[0] })
  } catch (error) {
    console.log(error)
    return new Error(error)
  }
})

export { autoresRoutes }
