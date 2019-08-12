const Koa = require('koa')
const parser = require('koa-bodyparser')
const InitMananger = require('./core/init')
const catchError = require('./middlewares/exception')

require('./app/models/user')

const port = 3000
const app = new Koa()

app.use(catchError)
app.use(parser())
InitMananger.initCore(app)

// const book = require('./api/v1/book')
// const classic = require('./api/v1/classic')
// app.use(book.routes())
// app.use(classic.routes()) 

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
  console.log('Press CTRL-C to stop \n')
})

