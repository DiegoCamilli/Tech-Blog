// import dependencies and other requirements
const path = require('path')
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const routes = require('./controllers')
const helpers = require('./utils/helpers.js')
const sequelize = require('./config/connection')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const app = express()
const PORT = process.env.PORT || 3001
const hbs = exphbs.create({ helpers })

const sess = {
  secret: 'Super secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
}

app.use(session(sess))

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(routes)
const postRoutes = require('./controllers/api/postRoutes')
app.use('/api/posts', postRoutes)
const commentRoutes = require('./controllers/api/commentRoutes')
app.use('/api/comments', commentRoutes)
const homeRoutes = require('./controllers/api/homeRoutes')
app.use('/', homeRoutes)
const dashboardRoutes = require('./controllers/DashboardRoutes')
app.use('/dashboard', dashboardRoutes)
const loginRoutes = require('./controllers/api/loginRoutes')
app.use('/login', loginRoutes)
const signupRoutes = require('./controllers/api/signupRoutes')
app.use('/signup', signupRoutes)

// sync sql
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'))
})
