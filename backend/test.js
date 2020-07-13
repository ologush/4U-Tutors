const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

const newMsg = {
    to: 'test@example.com',
    from: 'test@example.com',
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};

sgMail.send(newMsg)
.catch(err => console.log(err))
