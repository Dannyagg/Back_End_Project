'use strict'

const express = require('express');
const router = express.Router();
const tripsModel = require('../models/tripsModel');
const itineraryModel = require('../models/itineraryModel');




router.get('/history', async(req, res) => {

    const user_id = req.session.user_id;

    //const trips = new tripsModel();
    const trips_history = await tripsModel.getTripByUser(user_id);
    console.log("trips_history: ", trips_history);
});


router.get('/plan', (req, res) => {
    const user_id = req.session.user_id;
    console.log("user id: ", user_id);
    res.render('template', {
        locals: {
            title: "Trip Planner",
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            body: 'partials/trips_plan'
        }
    });
});

router.post('/add_itinerary', (req, res) => {
    const { day, destination, leisure, dining, transport, budget, trip_id } = req.body;
    const itinerary = new itineraryModel(null, day, destination, leisure, dining, transport, budget, trip_id);
    const response = itinerary.addItinerary();
    if (response.rowCount >= 1) {
        res.redirect('back');
    } else {
        res.sendStatus(500);
    }
});







router.post('/add_trip', async(req, res) => {
    const { location, trip_name, trip_start_date, trip_end_date, user_id } = req.body;
    const trip = new tripsModel(null, location, trip_name, trip_start_date, trip_end_date, user_id);
    console.log("trip: ", trip);
    const response = await trip.addTrip(location, trip_name, trip_start_date, trip_end_date, user_id);
    if (!!response.id) {
        res.redirect('back');
    } else {
        res.sendStatus(500);
    }

});




module.exports = router;