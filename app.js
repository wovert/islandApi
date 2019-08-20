// require('module-alias/register')

const Koa = require('koa')
const path = require('path')
const static = require('koa-static')
const parser = require('koa-bodyparser')
const InitMananger = require('./core/init')
const catchError = require('./middlewares/exception')

// require('./app/models/user')

const port = 3000
const app = new Koa()

app.use(catchError)
app.use(parser())
app.use(static(path.join(__dirname, './static')))

InitMananger.initCore(app)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
  console.log('Press CTRL-C to stop \n')
})

