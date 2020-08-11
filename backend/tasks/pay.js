const mongoose = require('mongoose');
const PendingPayment = require('../models/PendingPayment');
const stripe = require('stripe')('sk_test_51H7oaAFvYqAjSG5imIW7Qg7F7Bb1yGe1uzadP4YECJfhJzZwfQ09NUUo3odus744L9hvZTmeR0nKOV6TbhTFfUOF002jruSSFo')
const sgMail = require('@sendGrid/mail');
sgMail.setApiKey('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');

const SuccessfulPayout = require('../models/SuccessfulPayout');


module.exports = async function pay() {
    PendingPayment.find({})
    .then( async payments => {
        payments.forEach( async payment => {
            
            stripe.transfers.create({
                amount: 20 * 100,
                currency: 'cad',
                destination: payments.stripeID
            })
            .then(payment => {
                let payoutProto = {
                    tutorID: payment.tutorID,
                    stripeID: payments.stripeID,
                    amount: payment.amount,
                    transferID: payment.id
                }

                const payout = new SuccessfulPayout(payoutProto);
                payout
                .save()
                .then(pay => {
                    const message = {
                        to: payment.tutorEmail,
                        from: "payments@4uacademics.com",
                        text: "You have recieved a payment"
                    };
        
                    sgMail.send(message)
                    .catch(err => console.log(err))
                })
                .catch(err => console.log(err));

            })
            .catch(err => {
                console.log('bruh');
                console.log(err)
            })

            
        })
    })
    .catch(err => console.log(err));
};
