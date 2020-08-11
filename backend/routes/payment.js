var express = require('express');
var router = express.Router();
const axios = require("axios");
const stripe = require('stripe')('sk_test_51H7oaAFvYqAjSG5imIW7Qg7F7Bb1yGe1uzadP4YECJfhJzZwfQ09NUUo3odus744L9hvZTmeR0nKOV6TbhTFfUOF002jruSSFo')

const Tutor = require('../models/Tutor')

const uuid = require('uuid')

const passport = require('passport')

const PendingPayment = require('../models/PendingPayment');
const Lesson = require('../models/Lesson');

//This is probably for the student, check if the tutor uses it
router.get("/connect/oauth", passport.authenticate('user', { session: false }), (req, res) => {
    //const { code, state } = req.query;
    const code = req.query.code;
    //add the state checking feature potentially

    stripe.oauth.token({
        grant_type: 'authorization_code',
        code
    })
    .then(response => {
        var connected_account_id = response.stripe_user_id;
        saveAccountId(connected_account_id);
    })
    .catch(err => {
        if (err.type === 'StripeInvalidGrantError') {
            return res.status(400).json({error: 'Invalid autorization code: ' + code});
        } else {
            return res.status(500).json({error: 'An unknown error occured.'})
        }
    })
});

const saveAccountId = (id) => {
    //save the tutors account id to their accound
    console.log(id);
}


router.post("/pay", passport.authenticate('user', { session: false }), (req, res) => {
    const { product, token } = req.body;
    console.log("PRODUCT", product);
    console.log("PRICE", product.price)
    const idempontencyKey = uuid();

    return stripe.customers.create({
        email: token.email,
        source: token.id
    })
    .then(customer => {
        stripe.charges.create({
            amount: product.price * 100,
            currency: "CAD",
            customer: customer.id,
            receipt_email: token.email,
            description: product.name
        }, {idempontencyKey})
    })
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err))
});

//Should be a student action that manages the payout
router.post("/payOut", passport.authenticate('user', { session: false }), async (req, res) => {

    Tutor.findOne({ _id: req.body.tutorID })
    .then( async tutor => {
        console.log(tutor.stripeID)
        // const transfer = await stripe.transfers.create({
        //     amount: 20 * 100,
        //     currency: 'cad',
        //     destination: "acct_1H9axUIm10TqtFjV"
        // });

        stripe.transfers.create({
            amount: 20 * 100,
            currency: 'cad',
            destination: "acct_1H9axUIm10TqtFjV"
        })
        .then(transfer => {
            console.log(transfer);
            res.json(transfer);
        })
        .catch(err => {
            console.log("error")
            console.log(err.raw)
        })

        //res.json(transfer);
    })
    .catch(err => console.log(err));


});

router.post("/addPendingPayment", (req, res) => {
    PendingPayment.findOne({ lessonID: req.body.lessonID })
    .then(doc => {
        if(!doc) {
            const pendingProto = {
                tutorID: req.body.tutorID,
                tutorEmail: req.body.tutorEmail,
                stripeID: req.body.stripeID,
                lessonID: req.body.lessonID
            }

            const pending = new PendingPayment(pendingProto);
            pending
            .save()
            .then(save => {
                res.json(save)
            })
            .catch(err => console.log(err));
        }
    })
    .catch(err => console.log(err));
});

//may or may not need
router.get("/secret", passport.authenticate('user', { session: false }), async (req, res) => {

    const paymentIntent = await stripe.paymentIntents.create({
        amount: 25 * 100,
        currency: 'cad',

        metadata: {integration_check: 'accept_a_payment'}
    });

    res.json({ client_secret: paymentIntent.client_secret });

});



module.exports = router;