const   express    = require('express'),
        app        = express(),
        bodyParser = require('body-parser'), // to be able to get input from the body of the request (req.body)
        mongoose   = require('mongoose'), // to be able to add data to MongoDB database from our JS file
        Restaurant = require('./models/restaurant'), // add link to our restaurant file with restaurant schema and model
        Comment    = require('./models/comment'), // add link to comment model
        seedDB     = require('./seeds'); // require seeds.js file to update the DB

mongoose.connect('mongodb://localhost:27017/rests_app', {useNewUrlParser: true}); // connects mongoose to MongoDB
app.use(bodyParser.urlencoded({extended: true})); // command to use body-parser
app.set('view engine', 'ejs'); // lets us avoid .ejs endings in files
app.use(express.static(__dirname + '/public')); // tells the app to search for linked files (css/js) in the public directory. __dirname - is the name of root directory (add it for safety purposes).
seedDB(); // seeding the DB of sample restaurants and comments

app.get('/', function(req, res){
    res.render('landing');
});

// ===========================
// RESTAURANT ROUTES
// ===========================

// INDEX ROUTE - show all restaurants
app.get('/restaurants', function(req, res){
    // Get all restaurants from DB and render them
    Restaurant.find({}, function(err, allRests){
        if(err){
            console.log(err);
        } else {
            res.render('restaurants/index', {restaurants: allRests});
        }
    });
});

// CREATE ROUTE - add new restaurant to DB
app.post('/restaurants', function(req, res){
    //get data from form and add to campgrounds array
    const name = req.body.name;
    const image = req.body.image;
    const desc = req.body.description;
    const newRestaurant = {name: name, image: image, description: desc};
    // Create a new rest and save it to DB
    Restaurant.create(newRestaurant, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to rests index page
            res.redirect('/restaurants');
        }
    });
});

// NEW ROUTE - show form to create new restaurant
app.get('/restaurants/new', function(req, res){
    res.render('restaurants/new');
});

// SHOW ROUTE - shows more info about one restaurant
app.get('/restaurants/:id', function(req, res){
    // find the restaurand with provided ID using mongoose .findById() method
    Restaurant.findById(req.params.id).populate('comments').exec(function(err, foundRestaurant){
        if (err){
            console.log(err);
        } else {
            // render show template with that found restaurant
            res.render('restaurants/show', {restaurant: foundRestaurant});
        }
    });
});

// ===========================
// COMMENTS ROUTES
// ===========================

app.get('/restaurants/:id/comments/new', function(req,res){
    Restaurant.findById(req.params.id, function(err, restaurant){
        if(err){
            console.log(err);
        } else {
            res.render('comments/new', {restaurant: restaurant});
        }
    });
});

app.post('/restaurants/:id/comments', function(req, res){
    // lookup restaurant using ID
    Restaurant.findById(req.params.id, function(err, restaurant){
        if(err){
            console.log(err);
            res.redirect('/restaurants');
        } else {
            // create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    // connect new comment to restaurant
                    restaurant.comments.push(comment);
                    restaurant.save();
                    // redirect to restaurant show page
                    res.redirect(`/restaurants/${restaurant._id}`);
                }
            });
        }
    });
});



app.listen(3000, () => console.log('Rests App Has Started!'));


/* for rests creation (to be deleted later):
https://source.unsplash.com/S9yn7XYqxoU/800x600
https://source.unsplash.com/lZrLPITHbxU/800x600
https://source.unsplash.com/Orz90t6o0e4/800x600 */
