const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore =require('express-mysql-session');

const {database} = require('./keys');
//inicializacion
const app = express();

//settings
app.set('port', process.env.PORT || 5200);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));

app.set('view engine', '.hbs');

//
app.use(session({
    secret: 'session',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database),
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
 

//Global Variable
app.use((req, res, next) =>{
    app.locals.success = req.flash('success');
    next();
});

//Rutas
app.use(require('./routes'));
app.use(require('./routes/authencation'));
app.use('/links',require('./routes/links'));
app.use('/productos', require('./routes/productos'));


//Public
app.use(express.static(path.join(__dirname, 'public')));

//Iniciar Servidor
app.listen(app.get('port'), () =>{
   console.log('Server on port', app.get('port'));
});