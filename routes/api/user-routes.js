const router = require('express').Router();
const { User } = require('../../models');
const { restore } = require('../../models/User');

// GET /api/users
router.get('/', (req, res) => {
    // Access our User model and run .findAll() method, which lets us query all the users from the
    // user table in the db; findAll is JS equivalent of SELECT * FROM users;
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
     
});
// ^^ When client makes a GET request to /api/users, we will select all users from the user table in db and send back as JSON

// GET /api/users/1
router.get('/:id', (req, res) => {
    User.findOne({ // findOne means we only want one piece of data back
        where: { // Where option indicates we want to find a user where its id value = whatever req.params.id is
            // like SELECT * FROM users WHERE id = 1
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST /api/users - creates a user
router.post('/', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
    User.create({
        username: req.body.username, // key/value pairs; keys are what we defined in User model, values are what we
        // get from req.body; in SQL: INSERT INTO users
        // (username, email, password)
        // VALUES
        //("Lernantino", "lernantino@gmail.com", "password1234");
        email: req.body.email,
        password: req.body.password
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// PUT /api/users/1 - update existing data
router.put('/:id', (req, res) => { 
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
    // if req.body has exact key/value pairs to match the model, you can use `req.body` instead
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData[0]) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// ^^ In SQL: UPDATE users
// SET username = "Lernantino", email = "lernantino@gmail.com", password = "newPassword1234"
// WHERE id = 1;

// DELETE /api/users/1
router.delete('/:id', (req, res) => { 
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;

// GET, POST, PUT, and DELETE are called HTTP methods