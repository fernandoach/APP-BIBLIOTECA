import express from 'express'
import { getAllAuthors } from '../services/getAllAuthors.js'
import { getAuthorById } from '../services/getAuthorById.js'
import { getDateFormatView } from '../utils/getDateFormat.js'
import { editAuthorById } from '../services/editAuthorById.js'
import { createAuthor } from '../services/createAuthor.js'
import { deleteAuthorById } from '../services/deleteAuthorById.js'

const autoresRoutes = express.Router()

autoresRoutes.get('/crear', async (req, res) => {
  try {
    return res.render('autores/crear.ejs')
  } catch (error) {
    return res.json(error)
  }
})

autoresRoutes.post('/crear', async (req, res) => {
  try {
    const { nombre, alias, fechaNacimiento } = req.body
    await createAuthor(nombre, alias, fechaNacimiento)
    return res.redirect('/autores')
  } catch (error) {
    return res.json(error)
  }
})

autoresRoutes.get('/', async (req, res) => {
  try {
    const autores = await getAllAuthors()
    console.log(autores)
    return res.render('autores/index.ejs', { autores })
  } catch (error) {
    console.log(error)
    console.log(error)
    return res.json(error)
  }
})

autoresRoutes.get('/editar/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const autor = await getAuthorById(id)
    const fechaFormateada = getDateFormatView(autor[0].id)
    return res.render('autores/editar.ejs', { autor: autor[0], fechaFormateada })
  } catch (error) {
    console.log(error)
    return res.json(error)
  }
})

autoresRoutes.post('/editar', async (req, res) => {
  try {
    const { id, nombre, alias, fechaNacimiento } = req.body
    await editAuthorById(id, nombre, alias, fechaNacimiento)
    return res.redirect('/autores')
  } catch (error) {
    console.log(error)
    return res.json(error)
  }
})

autoresRoutes.post('/delete/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    await deleteAuthorById(id)
    return res.redirect('/autores')
  } catch (error) {
    return res.json(error)
  }
})

export { autoresRoutes }
