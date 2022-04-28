const Schedule = require("../models/Schedule");

async function addSchedule(request, response) {
    if (request.body) {
        const { notificationId, scheduleId, templateId, name, email, start, end, phone, type, alert, title } = request.body;

        const schedule = new Schedule({
            notificationId: notificationId,
            templateId: templateId,
            scheduleId: scheduleId,
            name: name,
            email: email,
            start: start,
            end: end,
            phone: phone,
            type: type,
            alert: alert,
            title: title
        });

        try {
            const result = await Schedule.findOne({ notificationId });
            if (result) {
                await Schedule.findByIdAndUpdate(result._id, {
                    templateId: schedule.templateId,
                    scheduleId: schedule.scheduleId,
                    name: schedule.name,
                    email: schedule.email,
                    start: schedule.start,
                    end: schedule.end,
                    phone: schedule.phone,
                    type: schedule.type,
                    alert: schedule.alert,
                    title: schedule.title
                })
            } else
                await schedule.save();
            response.status(200).send('New template added');
        } catch (error) {
            console.log(error);
            // response.redirect("/");
        }
    } else console.warn("No data ready to send");
}

getSchedules = function(request, response) {
    Schedule.find({}, (error, schedules) => {
        if (error) return response.send(500, error)
        else {
            response.setHeader('Content-Type', 'application/json');
            return response.end(JSON.stringify(schedules))
        }
    });
}

function getScheduleById(request, response) {
    const scheduleId = request.params.id;
    Schedule.find({ scheduleId }, (error, schedules) => {
        if (error) return response.send(500, error)
        else {
            response.setHeader('Content-Type', 'application/json');
            return response.end(JSON.stringify(schedules))
        }

    });
}

function updateSchedule(request, response) {
    const scheduleId = request.params.id;
    Schedule.findByIdAndUpdate(
        scheduleId, { scheduleId: request.body.scheduleId },
        (error) => {
            return error ? response.send(500, error) : response.statusCode(200).send('Updated');
        }
    );
}

function removeSchedule(request, response) {
    const scheduleId = request.params.id;
    Schedule.findByIdAndRemove(scheduleId, (error) => {
        return error ? response.send(500, error) : response.redirect("/");
    });
}


module.exports = function(app) {

    // Add new task
    app.post("/schedule/add/", addSchedule);
    // Get all tasks from MongoDB
    app.get("/schedules/", getSchedules);
    // Edit task
    app
        .route("/schedule/edit/:id")
        .get(getScheduleById)
        .post(updateSchedule);

    // delete task
    app.route("/schedule/remove/:id").get(removeSchedule);
};