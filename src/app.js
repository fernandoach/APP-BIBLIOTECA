import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { autoresRoutes } from './routes/autoresRoutes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

// middlewares
app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.set('views', join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }))

// routes
app.use('/autores', autoresRoutes)

app.get('/', (req, res) => {
  return res.render('index.ejs')
})

app.listen(3000, () => {
  console.log('Server on => http://localhost:3000')
})
