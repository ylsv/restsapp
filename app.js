const   express    = require('express'),
        app        = express(),
        bodyParser = require('body-parser'), // to be able to get input from the body of the request (req.body)
        mongoose   = require('mongoose'); // to be able to add data to MongoDB database from our JS file

mongoose.connect('mongodb://localhost:27017/rests_app', {useNewUrlParser: true}); // connects mongoose to MongoDB
app.use(bodyParser.urlencoded({extended: true})); // command to use body-parser
app.set('view engine', 'ejs'); // lets us avoid .ejs endings in files

// MONGOOSE SCHEMA SETUP
// creating schema:
const restSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});
// creating restaurant model based on our schema allowing us to use methods:
const Restaurant = mongoose.model('Restaurant', restSchema);

/*Restaurant.create(
    {
        name: 'I like wine',
        image: 'https://source.unsplash.com/lZrLPITHbxU/800x600',
        description: 'Крутой ресторан со вкусным вином'
    }, function(err, rest){
        if (err) {
            console.log(err);
        } else {
            console.log('NEWLY CREATED RESTAURANT:');
            console.log(rest);
        }
});*/

app.get('/', function(req, res){
    res.render('landing');
});

// INDEX ROUTE - show all restaurants
app.get('/restaurants', function(req, res){
    // Get all restaurants from DB and render them
    Restaurant.find({}, function(err, allRests){
        if(err){
            console.log(err);
        } else {
            res.render('index', {restaurants: allRests});
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
    res.render('new');
});

// SHOW ROUTE - shows more info about one restaurant
app.get('/restaurants/:id', function(req, res){
    // find the restaurand with provided ID using mongoose .findById() method
    Restaurant.findById(req.params.id, function(err, foundRestaurant){
        if (err){
            console.log(err);
        } else {
            // render show template with that found restaurant
            res.render('show', {restaurant: foundRestaurant});
        }
    });
});


app.listen(3000, () => console.log('Rests App Has Started!'));


/* for rests creation (to be deleted later):
https://source.unsplash.com/S9yn7XYqxoU/800x600
https://source.unsplash.com/lZrLPITHbxU/800x600
https://source.unsplash.com/Orz90t6o0e4/800x600 */
