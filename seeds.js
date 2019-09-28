// wee create this seeds.js file to have some sample data to work with. It will empty everything in the DB to start and then will add several rests with several comments  

const mongoose = require('mongoose');
const Restaurant = require('./models/restaurant');
const Comment = require('./models/comment');

// creating random seed data:
const seeds = [
    {
        name: 'I like wine',
        image: 'https://source.unsplash.com/S9yn7XYqxoU/800x600',
        description: "Lorizzle for sure dolizzle sizzle amizzle, i'm in the shizzle adipiscing gangster. Nullizzle crazy phat, shut the shizzle up volutpizzle, suscipizzle for sure, gravida vizzle, nizzle. Fizzle eget pot. Sed erizzle. Its fo rizzle izzle dolizzle nizzle turpizzle tempizzle tempizzle. Maurizzle boom shackalack nibh dawg gangsta. Vestibulum in tortor. Pellentesque shizzlin dizzle rhoncizzle pot. In hizzle habitasse platea dictumst. Cool dapibus. Curabitizzle check out this urna, pretizzle dang, mattis izzle, fo shizzle vitae, nunc. I'm in the shizzle suscipizzle. Integizzle that's the shizzle sizzle dizzle."
    },
    {
        name: 'Ruski',
        image: 'https://source.unsplash.com/lZrLPITHbxU/800x600',
        description: "Boom shackalack nizzle my shizz yo bizzle pretizzle. Vivamizzle sheezy amizzle lacizzle. Nam eu nisl egizzle lacizzle auctizzle stuff. Things suscipit viverra ipsum. Curabitizzle for sure arcu. Stuff shiznit enizzle, auctizzle fo shizzle, congue eu, dignissizzle ma nizzle, libero. Sizzle vitae pede i saw beyonces tizzles and my pizzle went crizzle erizzle posuere funky fresh. Quisque crackalackin tortor, congue pulvinizzle, the bizzle a, mollis sit amet, erizzle."
    },
    {
        name: 'Pushkin',
        image: 'https://source.unsplash.com/Orz90t6o0e4/800x600',
        description: "For sure izzle dui. risizzle fizzle, nizzle consectetuer, gangster in, consequizzle imperdizzle, fizzle. Quisque bizzle ipsizzle eu mi rutrum vehicula. Curabitur accumsizzle check out this ipsum. Bling bling habitant morbi tristique senectus izzle netus et malesuada shiznit ac turpizzle mofo. Phat fo shizzle. Curabitizzle check it out. Ut pot felizzle, away quizzle, rizzle fo shizzle mah nizzle fo rizzle, mah home g-dizzle, shit brizzle, nisl. Nulla sagittizzle gravida sizzle."
    }
];

// 'Call-back hell' version with multiple callbacks
/* function seedDB(){
    // remove all comments
    Comment.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
        console.log('comments were removed!');
        // remove all restaurants
        Restaurant.deleteMany({}, function(err){
            if(err){
                console.log(err);
            }
            console.log('restaurants were removed!');
            // add a few restaurants by looping over our seed 'seeds' array with template data
            seeds.forEach(function(seed){
                Restaurant.create(seed, function(err, restaurant){
                    if(err){
                        console.log(err);
                    } else {
                        console.log('added a restaurant');
                        // create a comment on each restaurant
                        Comment.create(
                            {
                                text: 'This place is great but I wish there was internet',
                                author: 'Homer'
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    restaurant.comments.push(comment);
                                    restaurant.save();
                                    console.log('New comment was created');
                                }
                            });
                    }
                });
            });
        });
    });
}*/

// ES6 async/await version
async function seedDB(){
    try {
        await Restaurant.deleteMany({});
        console.log('restaurants were removed');
        await Comment.deleteMany({});
        console.log('comments were removed');
    
        /*for(const seed of seeds){
            let restaurant = await Restaurant.create(seed);
            console.log('restaurant was created');
            let comment = await Comment.create(
                {
                    text: 'This place is great but I wish there was internet',
                    author: 'Homer'
                }
            )
            console.log('comment was created');
            restaurant.comments.push(comment);
            restaurant.save();
            console.log('comment added to restaurant');
        }*/
    } catch(err){
        console.log(err);
    }    
}

module.exports = seedDB;


