const Template = require("../models/Template");

async function addTemplate(request, response) {
    if (request.body) {
        const { templateId, html, version, title } = request.body;

        const template = new Template({
            templateId: templateId,
            html: html,
            version: version,
            title: title
        });

        try {
            const result = await Template.findOne({ templateId });
            if (result) {
                await template.findByIdAndUpdate({ templateId: templateId }, {
                    html: template.html,
                    version: template.version,
                    title: template.title
                })
            } else
                await template.save();
            response.status(200).send(result ? 'update existing template' : 'New template added');
        } catch (error) {
            console.log(error);
            // response.redirect("/");
        }
    } else console.warn("No data ready to send");
}

getTemplates = function(request, response) {
    Template.find({}, (error, templates) => {
        if (error) return response.send(500, error)
        else {
            response.setHeader('Content-Type', 'application/json');
            return response.end(JSON.stringify(templates))
        }
    });
}

function getTemplateById(request, response) {
    const templateId = request.params.id;
    Template.find({ templateId }, (error, templates) => {
        if (error) return response.send(500, error)
        else {
            response.setHeader('Content-Type', 'application/json');
            return response.end(JSON.stringify(templates))
        }

    });
}

function updateTemplate(request, response) {
    const templateId = request.params.id;
    Template.findByIdAndUpdate(
        templateId, { templateId: request.body.templateId },
        (error) => {
            return error ? response.send(500, error) : response.status(200).send('Updated');
        }
    );
}

function removeTemplate(request, response) {
    const templateId = request.params.id;
    Template.findByIdAndRemove(templateId, (error) => {
        return error ? response.send(500, error) : response.redirect("/");
    });
}


module.exports = function(app) {
    // Add new template
    app.post("/template/add/", addTemplate);
    // Get all template from MongoDB
    app.get("/templates/", getTemplates);
    // Edit template
    app
        .route("/template/edit/:id")
        .get(getTemplateById)
        .post(updateTemplate);

    // delete template
    app.route("/template/remove/:id").get(removeTemplate);
};