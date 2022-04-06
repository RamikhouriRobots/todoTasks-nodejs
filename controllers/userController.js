const jwToken = require('jsonwebtoken');
const User = require('../models/user');
const cipher = require('../shared/helper');
const getUUID = require('../shared/helper')
const decipher = require('../shared/helper');
const auth = require("../middleware/auth");


function loadLogin(request, response) {
    response.render("../views/login/login.ejs", { user: { emai: '', password: '' } })
}

function loadRegisterUser(request, response) {
    response.render("../views/login/register.ejs", { user: { emai: '', password: '' } })
}

function generateToken(id, email) {
    return jwToken.sign({ user_id: id, email: email },
        process.env.TOKEN_KEY, {});
}

async function registerUser(request, response) {

    try {
        const { firstName, lastName, email, password } = request.body;
        console.log(request);

        if (!(email && password && firstName && lastName)) {
            return response.status(400).send("You have to fill all the information");
        }
        const isExist = await User.findOne({ email });
        if (isExist) {
            return response.status(409).send("User already exist. please login");
        }

        // encrypt the password
        const encryptedPassword = cipher('GENERIC KEY', password);

        const newUser = await User.create({
            userId: getUUID(),
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: encryptedPassword,
            token: generateToken(this.userId, email)
        });



        response.render("../views/login/login.ejs", { user: { emai: '', password: '' } });

    } catch (err) {
        console.log(err);
        return response.status(400).send(err);
    }

}


async function userLogin(request, response) {
    try {
        const { email, password } = request.body;
        if (!(email && password)) {
            response.status(400).send("Enter your username and password");
        }

        const user = await User.findOne({ email });
        const encryptedPassword = cipher('GENERIC KEY', password);
        if (user && user.password === encryptedPassword) {
            user.token = generateToken(newUser.userId, newUser.email);
            return response.status(200).json(user);
        }
        return response.status(400).send("Invalid Credentials");
    } catch (err) {
        console.error(err);
    }
}

module.exports = function(app) {
    // register new user
    app.post("/create", registerUser)

    // register user
    app.get("/register", loadRegisterUser)

    // user login
    app.post("/login", userLogin)

    // user login
    app.get("/login", loadLogin)

    // user auth
    app.post("/auth", auth, (request, response) => {
        response.status(200).send("User is authenticated");
    });
}