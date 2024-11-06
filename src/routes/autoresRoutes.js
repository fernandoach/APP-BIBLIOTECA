import express from 'express'
import { getAllAuthors } from '../services/getAllAuthors.js'

const autoresRoutes = express.Router()

autoresRoutes.get('/', async (req, res) => {
  const autores = await getAllAuthors()
  console.log(autores)
  return res.render('autores/index.ejs', { autores })
})

export { autoresRoutes }
