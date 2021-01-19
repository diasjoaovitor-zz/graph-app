import express from 'express'
import fileUpload from 'express-fileupload'
import cors from 'cors'
import fs from 'fs'
import dotenv from 'dotenv'
import path from 'path'

const port = process.env.PORT || 3001

const app = express()

dotenv.config()

app.use(express.static('uploads'))
app.use(express.static(path.join('client/build')))
app.use(cors())
app.use(fileUpload())

app.post('/api/upload', (req, res) => {
  try {
    const file = req.files.file

    file.mv(`uploads/${file.name}`)

    return res.status(200).json({ message: 'Sucesso' })
  } catch (error) {
    return res.status(500).json({ message: error.message})
  }
})

app.get('/api/data', (req, res) => {
  try {
    const file = req.query.name

    const data = JSON.parse(fs.readFileSync(`uploads/${file}`))

    fs.unlinkSync(`uploads/${file}`)

    console.log(data, 'olá')


    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

app.listen(port, () => console.log('> Servidor executando...'))
