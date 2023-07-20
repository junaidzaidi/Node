
/*
    This file is an introduction to express and how to make basic CRUD operations.
*/

// Input validation package
const Joi = require('joi')

const express = require('express');
/*
    express() create an express application

    through that we can use all HTTP verbs such as:
        app.get()
        app.post()
        app.put()
        app.delete()
*/
const app = express();

// Add and use JSON as a middleware in the request processing pipeline in order to read JSON from body properly.
app.use(express.json())

// Getting the environment variable for which PORT to listen on.
const port = process.env.PORT || 3000;

// Defining course list. Usually we would hit database to fetch this list.
courses = [
    {
        id: "ENPM611",
        courseName: "Introduction to Software Engineering"
    },
    {
        id: "ENPM612",
        courseName: "Introduction to Software Requirement"
    },
    {
        id: "ENPM613",
        courseName: "Introduction to Software Testing"
    },
    {
        id: "ENPM614",
        courseName: "Introduction to Software Design"
    },
];

/* 
    GET:
        Parameters:
            Route: To specify the path of the GET request to serve.
            Callback Function (Route Handler): To run the code we want to run on the request.
*/

// Route for getting home page
app.get('/', (req, res) => {
    res.send("Welcome To Course Hub!!")
    res.end()
});

// Route for getting course list
app.get('/api/courses', (req, res) => {
    res.send(courses)
    res.end()
});

// Route for getting specific course.
// Have id as a route parameter.
app.get('/api/courses/:id', (req, res) => {
    const requestedId = req.params.id
    const course = courses.find(obj => obj.id == requestedId)
    
    if (!course) return res.status(404).send('The course with the given Id was not found')
    res.send(course)
    // res.end()
});

// Route parameters are nothing just a Dictionary of URL parameters.
// Express also handles query string parameters like ...?sortBy="id"&offset=20&start=50 etc

// Route parameters are used for required values.
// Query string parameters are used for optional values.
app.get('/api/courses/:id/:name', (req, res) => {
    requestParams = {
        routeParameters: req.params,
        queryParameters: req.query
    }

    res.send(requestParams)
    res.end()
});

// Post Request
// For adding new course
// Generally ID is assigned by the database. For testing purpose, just assigning it manually.
app.post('/api/courses', (req, res) => {

    // Input Validations
    if (!req.body.name) return res.status(400).send('Name is required and should be minimum 3 characters')
    if (req.body.name.length < 3) return res.status(400).send('Name is required and should be minimum 3 characters')
    
    // Input Validations can be simplified by JOI package
    // For that first we define a schema
    // And validate like this
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })

    result = Joi.validate(req.body, schema)
    if (result.error) return res.status(400).send(result.error.details[0].message)
    
    const course = {
        id: `ENPM ${Math.floor((Math.random() * 1000))}`,
        courseName: req.body.name
    }
    courses.push(course)
    res.send(course)
    res.end()
});

// For updating any course we use PUT methods
app.put('/api/courses/:id', (req, res) => {
    // Look for course
    // If not exist send 404

    // Look for body
    // If not valid send 400 - Bad Reques

    // Update Course
    // Return Updated Course Object
});

// For deleting any course we use DELETE methods
app.delete('/api/courses/:id', (req, res) => {
    // Look for index of course
    // If not exist send 404

    // Delete Course
    // Return Deleted Course Object
})

/*
    Specifies the port we want to listen for HTTP calls
*/
app.listen(port, () => console.log(`Listening to port ${port}....`))