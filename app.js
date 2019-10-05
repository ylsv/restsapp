const   express    = require('express'),
        app        = express(),
        bodyParser = require('body-parser'), // to be able to get input from the body of the request (req.body)
        mongoose   = require('mongoose'), // to be able to add data to MongoDB database from our JS file
        passport   = require('passport'), // add passport js for authentication
        LocalStrategy = require('passport-local'), // authentication by means of email and password
        methodOverride = require('method-override'), // used to override post methods into PUT etc
        Restaurant = require('./models/restaurant'), // add link to our restaurant file with restaurant schema and model
        Comment    = require('./models/comment'), // add link to comment model
        User       = require('./models/user'), // add user model
        seedDB     = require('./seeds'); // require seeds.js file to update the DB

// require route files:
const   commentRoutes = require('./routes/comments'),
        restRoutes    = require('./routes/restaurants'),
        indexRoutes   = require('./routes/index');

mongoose.connect('mongodb://localhost:27017/rests_app', {useNewUrlParser: true, useFindAndModify: false}); // connects mongoose to MongoDB
app.use(bodyParser.urlencoded({extended: true})); // command to use body-parser
app.set('view engine', 'ejs'); // lets us avoid .ejs endings in files
app.use(express.static(__dirname + '/public')); // tells the app to search for linked files (css/js) in the public directory. __dirname - is the name of root directory (add it for safety purposes).
app.use(methodOverride('_method')); // tells the app to use methodOverride we required
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

app.use(function(req, res, next){ // middleware to add currentUser variable to routes to display templates differently depending on the logged in user
    res.locals.currentUser = req.user;
    next();
});

app.use('/', indexRoutes);
app.use('/restaurants', restRoutes);
app.use('/restaurants/:id/comments', commentRoutes);


app.listen(3000, () => console.log('Rests App Has Started!'));