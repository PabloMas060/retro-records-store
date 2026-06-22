require('dotenv').config();
const express = require('express');
const session = require('express-session'); 
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const cors = require('cors');
const passport = require('passport');

// Middlewares y servicios
const checkCookie = require('./middlewares/cookieCheck');
const localsCheck = require('./middlewares/localsCheck'); 
const { loginGoogleInitialize } = require('./services/passport');

// Rutas
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const authRouter = require('./routes/auth');
const albumsApiRouter = require('./routes/api/albumsRouter');
const bandsApiRouter = require('./routes/api/bandsRouter');
const merchsApiRouter = require('./routes/api/merchsRouter');
const cartApiRouter = require('./routes/api/cartRouter');

loginGoogleInitialize();

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(methodOverride('_method'));
app.use(cors());

// Configuración de Sesión
app.use(session({
    secret: 'elbichosiuu',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 // 24 horas
    }
}));

// Middleware manual para manejar mensajes (Reemplaza a connect-flash)
app.use((req, res, next) => {
    res.locals.successMessage = req.session.successMessage;
    res.locals.errorMessage = req.session.errorMessage;

    // Limpiamos los mensajes después de pasarlos a locals
    delete req.session.successMessage;
    delete req.session.errorMessage;
    next();
});

// Passport y Auth
app.use(passport.initialize());
app.use(passport.session());

// Chequeos de usuario
app.use(checkCookie);
app.use(localsCheck); 

// Rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/auth', authRouter);
app.use('/api/albums', albumsApiRouter);
app.use('/api/bands', bandsApiRouter);
app.use('/api/merchs', merchsApiRouter);
app.use('/api/cart', cartApiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;