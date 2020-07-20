const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

const newMsg = {
    to: 'oliver.logush@queensu.ca',
    from: 'test@4uacademics.com',
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};

sgMail.send(newMsg)
.catch(err => console.log(err))
