const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("./authmiddleware");

const app = express();

app.use(express.json());


// DataBase
const userNotes = [
    {
        username: "Hardik", note: "say hii"
    }
];
const users = [
    {
        username: "Hardik", password: "hello123"
    }
];


// -------------------------------------------------------------------------------------------------------------------------------------

app.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userExists = users.find(user => user.username === username);

    if (userExists) {
        return res.status(403).json({
            message: "username already taken"
        });
    };

    users.push({
        username, password
    });

    res.json({
        message: "SignUp Successfull"
    })
});


app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userExists = users.find(user => user.username === username && user.password === password);

    if (!userExists) {
        return res.status(403).json({
            message: "Invalid Credentials"
        });
    };

    const token = jwt.sign({
        username
    }, "hardik11");

    res.json({
        token
    });
}); 


app.get("/notes", authMiddleware, (req, res) => {
    const username = req.username;

    const notes = userNotes.filter(notes => notes.username === username);

    res.json({
        notes: notes.map(note => note.note)
    });

});

app.post("/notes", authMiddleware, (req, res) => {
    const username = req.username;
    const note = req.body.note;

    userNotes.push({username, note});

    res.json({
        message: "done!"
    });
});

app.get("/database", (req, res) => {
    res.json({
        users, userNotes
    })
})

app.get("/", (req, res) => {
    res.sendFile("C:/WEB DEV/100x Devs BootCamp 1.0/Projects/Notes App/Frontend/index.html");
});

app.get("/signup", (req, res) => {
    res.sendFile("C:/WEB DEV/100x Devs BootCamp 1.0/Projects/Notes App/Frontend/signup.html");
});

app.get("/signin", (req, res) => {
    res.sendFile("C:/WEB DEV/100x Devs BootCamp 1.0/Projects/Notes App/Frontend/signin.html");
});


app.listen(3000);




