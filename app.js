const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

const restaurants = [
    {name: 'Ruski', image: 'https://source.unsplash.com/S9yn7XYqxoU/800x600'},
    {name: 'I like wine', image: 'https://source.unsplash.com/lZrLPITHbxU/800x600'},
    {name: 'Erwin. РекаМореОкеан', image: 'https://source.unsplash.com/_P8hIt5lTUA/800x600'},
    {name: 'Ruski', image: 'https://source.unsplash.com/S9yn7XYqxoU/800x600'},
    {name: 'I like wine', image: 'https://source.unsplash.com/lZrLPITHbxU/800x600'},
    {name: 'Erwin. РекаМореОкеан', image: 'https://source.unsplash.com/_P8hIt5lTUA/800x600'},
    {name: 'Ruski', image: 'https://source.unsplash.com/S9yn7XYqxoU/800x600'},
    {name: 'I like wine', image: 'https://source.unsplash.com/lZrLPITHbxU/800x600'},
    {name: 'Erwin. РекаМореОкеан', image: 'https://source.unsplash.com/_P8hIt5lTUA/800x600'},
    {name: 'Ruski', image: 'https://source.unsplash.com/S9yn7XYqxoU/800x600'},
    {name: 'I like wine', image: 'https://source.unsplash.com/lZrLPITHbxU/800x600'},
    {name: 'Erwin. РекаМореОкеан', image: 'https://source.unsplash.com/_P8hIt5lTUA/800x600'},
];

app.get('/', function(req, res){
    res.render('landing');
});

app.get('/restaurants', function(req, res){
    res.render('restaurants', {restaurants: restaurants});
});

app.get('/restaurants/new', function(req, res){
    res.render('new');
});

app.post('/restaurants', function(req, res){
    //get data from form and add to campgrounds array
    const name = req.body.name;
    const image = req.body.image;
    const newRestaurant = {name: name, image: image};
    restaurants.push(newRestaurant);
    //redirect back to rests page
    res.redirect('/restaurants');
});


app.listen(3000, () => console.log('Rests App Has Started!'));