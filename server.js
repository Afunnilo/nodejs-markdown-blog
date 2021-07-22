const express = require('express');
const app = express()
const articleRouter = require('./routes/articles')
const mongoose = require('mongoose')
const Article = require('./models/article')
const methodOverride = require('method-override')

mongoose.connect('mongodb://localhost/MarkdownBlog',{ useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex: true})

app.use(express.urlencoded({extended:false}))


app.set('view engine', 'ejs')

app.use(methodOverride('_method'))






app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt : 'desc' })
    res.render('articles/index', {articles : articles})
})

app.use('/articles', articleRouter)
app.listen(3000)
console.log("app is listening on port 3000")