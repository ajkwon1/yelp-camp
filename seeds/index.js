const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: '6344e708367fda2fe1908b71',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dgvgafijx/image/upload/v1665832248/YelpCamp/crr7h1qgbx3rxwxoe8yo.jpg',
                    filename: 'YelpCamp/crr7h1qgbx3rxwxoe8yo'
                },
                {
                    url: 'https://res.cloudinary.com/dgvgafijx/image/upload/v1665832247/YelpCamp/riphgsrfnlca86j1k4wn.jpg',
                    filename: 'YelpCamp/riphgsrfnlca86j1k4wn'
                }
            ],
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur iusto earum error perferendis assumenda dignissimos sint, veniam id voluptas odio tempora veritatis corporis ab, illum vero sed vel. Voluptatibus, officiis.',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})