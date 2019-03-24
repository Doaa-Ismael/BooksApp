const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const nav = [
    { title: 'Books', link: '/books' },
    { title: 'Authors', link: '/authors' },
    { title: 'Login', link: '/auth/login' }
];
const booksRouter = require('./src/Routes/booksRouter')(nav);
const adminRouter = require('./src/Routes/adminRouter')(nav);
const authRouter = require('./src/Routes/authRouter')(nav);
const app = express();
const sql = require('mssql');


// SQL DB Configuration

// const dbConfig = {
//   user: 'doaa',
//   password: '01152642386Omar',
//   server: 'doaabooklibrary.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
//   database: 'BokkLibrary',

//   options: {
//       encrypt: true // Use this if you're on Windows Azure
//   }
// }



// Set views 
app.set('views', './src/views');
app.set('view engine', 'ejs');

// Middlewares
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//app.use(cookieParser());
app.use(session({secret: 'library'}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

require('./src/config/passport.js')(app);

// app.use((req, res, next) => {
//   console.log("MY Middle Waer");
//   next();
// })


// Routing
app.use('/books', booksRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.get('/', (req, res) => {
  res.render('index',
    {
      title: 'Librry App',
      nav
    }
  );
});




app.listen(3000, () => {
  debug(`Listening on port ${chalk.green(3000)} ....`);
});
