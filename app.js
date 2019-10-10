const   express    = require('express'),
        app        = express(),
        bodyParser = require('body-parser'), // to be able to get input from the body of the request (req.body)
        mongoose   = require('mongoose'), // to be able to add data to MongoDB database from our JS file
        flash      = require('connect-flash'), // to add flash messages
        passport   = require('passport'), // add passport js for authentication
        LocalStrategy = require('passport-local'), // authentication by means of email and password
        methodOverride = require('method-override'), // used to override post methods into PUT etc
        moment     = require('moment'), // requires moment JS library to show how long ago an item was created
        Restaurant = require('./models/restaurant'), // add link to our restaurant file with restaurant schema and model
        Comment    = require('./models/comment'), // add link to comment model
        User       = require('./models/user'), // add user model
        seedDB     = require('./seeds'); // require seeds.js file to update the DB

// require route files:
const   commentRoutes = require('./routes/comments'),
        restRoutes    = require('./routes/restaurants'),
        indexRoutes   = require('./routes/index');

mongoose.connect(process.env.DATABASEURL, {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false}); // connects mongoose to local MongoDB
// mongoose.connect('mongodb+srv://ylsv:dickpick@cluster0-7oi2r.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false}); // connects mongoose to Atlas MongoDB
app.use(bodyParser.urlencoded({extended: true})); // command to use body-parser
app.set('view engine', 'ejs'); // lets us avoid .ejs endings in files
app.use(express.static(__dirname + '/public')); // tells the app to search for linked files (css/js) in the public directory. __dirname - is the name of root directory (add it for safety purposes).
app.use(methodOverride('_method')); // tells the app to use methodOverride we required
app.use(flash()); // tell express to use flash messages
moment.locale('ru'); // sets momentJS language to Russian
app.locals.moment = moment; // transferrs momentJS to all templates
// seedDB(); // seeding the DB of sample restaurants and comments


// PASSPORT CONFIGURATION
app.use(require('express-session')({
    secret: 'The quick brown fox jumps over the lazy dog',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){ 
    // middleware to add currentUser variable to all routes to display templates differently depending on the logged in user
    res.locals.currentUser = req.user; 
    // middleware to add flash message variable to routes to display templates with flash messages
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.use('/', indexRoutes);
app.use('/restaurants', restRoutes);
app.use('/restaurants/:id/comments', commentRoutes);


// For local app:
// app.listen(3000, () => console.log('Rests App Has Started!'));

// For Heroku deployment:
app.listen(process.env.PORT);
