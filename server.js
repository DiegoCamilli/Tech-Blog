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
    db: sequelize,
  }),
}

// Set up session middleware
app.use(session(sess))

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

// Mount the routes
app.use('/api/posts', require('./controllers/api/postRoutes'))
app.use('/api/comments', require('./controllers/api/commentRoutes'))
app.use('/api', require('./controllers/api'))
app.use('/login', require('./controllers/api/loginRoutes'))
app.use('/signup', require('./controllers/api/signupRoutes'))
app.use('/dashboard', require('./controllers/api/dashboardRoutes'))
app.use('/', require('./controllers/api/homeRoutes'))
app.use(routes)

// Sync SQL
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'))
})