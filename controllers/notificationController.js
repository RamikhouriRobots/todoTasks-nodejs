const Template = require("../models/Template");
const Schedule = require("../models/Schedule");

const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
let ejs = require("ejs");
const sendGridMail = require('@sendgrid/mail');
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);


async function notifyUserAppointment(schedule) {
    const result = await Template.findOne({ templateId: schedule.templateId });
    if (result) {
        const emailMessage = {
            to: schedule.email,
            from: 'info@domain.com', // Change to your verified sender
            subject: schedule.title || 'Notification',

            html: result ? ejs.render(result.html, {
                firstName: {
                    name: '-'
                },
                secondName: {
                    name: "Rami Khouri"
                }
            }) : '<b> object not found - html</b>',
        }
        console.log(emailMessage);
        const phoneSMS = {
                body: schedule.title || 'Notification',
                from: '+19896372337',
                to: schedule.phone
            }
            //let statusCode = 200;
        switch (schedule.type) {
            case '1':
                if (schedule.email) {
                    try {
                        let sendEmailResult = await sendGridMail.send(emailMessage);
                        if (sendEmailResult) {
                            console.log(sendEmailResult[0].statusCode);
                        }
                    } catch (err) {
                        if (Array.isArray(err))
                            err.forEach(e => console.error(e))
                        else
                            console.error(err);
                    }

                }

                break;
                // case '2':
                //     if (schedule.phone) {
                //         let sendSms = await twilio.messages.create(phoneSMS);
                //         if (sendSms) {
                //             console.log(sendSms.sid);
                //         }
                //     }

                //     break;
        }
    }
    Schedule.findByIdAndRemove(schedule._id, (error) => {
        return error ? console.log(error) : console.log(`delete ${schedule.title}`);
    });


}

async function sendEmailNotification(request, response) {
    let { email, templateId, phone } = request.body;
    if (!(email && templateId)) {
        response.status(400).send("missing email variable");
    } else {
        const result = await Template.findOne({ templateId });
        if (result) {
            const message = {
                    to: email, // Change to your recipient
                    from: 'rami@domain.com', // Change to your verified sender
                    subject: 'Sending with SendGrid is Fun',
                    html: result ? ejs.render(result.html, {
                        firstName: {
                            name: ' - '
                        },
                        secondName: {
                            name: "Rami khouri"
                        }
                    }) : '<b> object not found - html</b>',
                }
                //let statusCode = 200;
                // if (phone) {
                //     let sendSms = await twilio.messages.create({
                //         body: 'this is a test for sms notificatin',
                //         from: '+19896372337',
                //         to: '+14389954556'
                //     });
                //     if (sendSms) {
                //         console.log(sendSms.sid);
                //     }
                // }
            console.log(message)
            let sendEmailResult = await sendGridMail.send(message);
            if (sendEmailResult) {
                return response.status(sendEmailResult[0].statusCode).send('Email result');
            }
            return response.status(421).send("Service Not Available");
        }
        return response.status(400).send("Template Not Available");
    }
}

module.exports = function(app) {

    const notificationService = setInterval(async function() {
        Schedule.find({
            alert: {
                $gte: new Date(),
                // $lt: new Date()
            }
        }, async(error, schedules) => {
            if (error)
                console.error(error);
            else {
                for (const schedule of schedules) {
                    await notifyUserAppointment(schedule);
                }
                console.log(schedules);
                // response.setHeader('Content-Type', 'application/json');
                // return response.end(JSON.stringify(schedules))
            }
        });
        console.log(new Date())
    }, 30000);


    app.post("/notification/send/", sendEmailNotification);
};