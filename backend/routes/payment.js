var express = require('express');
var router = express.Router();
const axios = require("axios");
const CLIENT_ID = AQGhRTy5LENUVfn-PHd_7cVGr2yePsvw81VgVuHMelyaYrxjkWQcbOhLrc7QD4dLfOxVScgzPfxUaOfL;


router.post("/payTutor", (req, res) => {

    const sender_batch_header = {
        sender_batch_id: req.body.lessonID,
        email_subject: "Lesson Payout",
        email_message: "You have recieved a payout for your lesson with: " + req.body.studentName
    }

    const item = {
        recipient_type: "EMAIL",
        amount: {
            value: 20.00,
            currency: "CAD"
        },
        note: "Thank you for your time!",
        sender_item_id: req.body.tutorID,
        reciever: req.body.tutorEmail,
        notification_language: "en-CA"
    }

    const response = await axios.post("https://api.sandbox.paypal.com/v1/oath2/token")

})



module.exports = router;