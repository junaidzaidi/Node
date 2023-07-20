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
    const course = courses.find(obj => obj.id == requestedId) || "No Record Found"
    // res.send(req.params)
    res.send(course)
    res.end()
});

// Route parameters are nothing just a Dictionary of URL parameters.
app.get('/api/courses/:id/:name', (req, res) => {
    const requestedId = req.params.id
    res.send(req.params)
    res.end()
});


/*
    Specifies the port we want to listen for HTTP calls
*/
app.listen(port, () => console.log(`Listening to port ${port}....`))