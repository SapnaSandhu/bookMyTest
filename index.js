// package module imports
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require('express-session');
const fileUpload = require("express-fileupload");
const flash = require('connect-flash');
const cors = require('cors')


// ? Database URL
const databaseURL = "mongodb+srv://meetpanchal:pass786&*^@meetcluster-1.p9kvv.mongodb.net/test";

mongoose.connect(databaseURL, { useNewUrlParser: true }, (error) => {
	console.log("Database Connected Successfully!");
	error?console.error("Database Error: ", error):undefined;
});

// ? Creating object for express
const app = new express();

// ? enabling cross domian request
app.use(cors())

// ? Creating session
app.use(session({secret: 'userSession'}));

// ? Defining the static path to express
app.use(express.static(path.join(__dirname, "/public")));

// ? Defining default 'view engine' to  'ejs' and 'veiws' folder
app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());

//? register the middleware with app
app.use(flash());

// ? declaring port
const PORT = process.env.PORT || 3000;

// ? Defining routes for different pages and rendering appropriate page to the requested route

const showDashboardPage = require('./controllers/showDashboardPage')
app.get("/", showDashboardPage);


const showLoginPage = require('./controllers/showLoginPage')
app.get("/login", showLoginPage);

const logout = require('./controllers/logout')
app.get("/logout", logout)

const showDriverPage = require("./controllers/showDriverPage")
app.get("/driver", showDriverPage);

const showExaminerPage = require('./controllers/showExaminerPage');
app.get("/examiner",showExaminerPage);

/* const showAdminPage = require('./controllers/showAdminPage');
app.get("/admin",showAdminPage); */

const showGTestPage = require("./controllers/showGPage")
app.get("/gTest",showGTestPage);

const showG2TestPage = require("./controllers/showG2TestPage")
app.get("/g2Test",showG2TestPage);

const editDriverDetails = require('./controllers/editDriverDetails');
app.get("/editDriverDetails",editDriverDetails);
app.get("/editDriverDetails/:id",editDriverDetails);

const saveEditDetails = require('./controllers/saveEditDetails');
app.post("/saveEditDetails",saveEditDetails);


const saveDriverDetails = require('./controllers/saveDriverDetails');
app.post("/g2Test",saveDriverDetails);

const bookGDate = require('./controllers/bookGDate')
app.post("/bookGDate",bookGDate);

const registerUser = require('./controllers/registerUser')
app.post("/registerUser",registerUser);

const loginUser = require('./controllers/loginUser')
app.post('/loginUser',loginUser);


const showAppointmentPage = require('./controllers/showAppointmentPage');
app.get('/appointment',showAppointmentPage);

const createSlot = require('./controllers/createSlot')
app.post('/createSlot',createSlot)

const checkForAvailableTime = require('./controllers/showTimeBookingPage')
app.get('/checkForTime',checkForAvailableTime)

const getTimeSlots = require('./controllers/getTimeSlots')
app.post('/getTimeSlots',getTimeSlots)

const getFilteredDrivers = require('./controllers/getFilteredDrivers')
app.get('/getFilteredDrivers',getFilteredDrivers)

const showAppointmenDriverDetailsPage = require('./controllers/showAppointmenDriverDetailsPage')
app.get('/driver/:id',showAppointmenDriverDetailsPage)

const declareResult = require('./controllers/declareResult')
app.post('/declareResult',declareResult)

// ? Listing the applicaiton on the defined port
app.listen(PORT, () => {
	console.log(`Application is running on PORT: ${PORT}`);
});

/* 
? Student Name: Meet Yogesh Panchal
? Student Id: 8771023
*/
