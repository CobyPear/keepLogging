// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
const { QueryTypes } = require("sequelize");

// exporting this as a function to use in server.js
module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
      res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    // creates a new user with email and password
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  //--------------------------------------------------------------------------------------------------------------------
  // flight_time routes begin here


  // Routes for flight_time table per user id
  app.get("/api/flight_time/:userId", function (req, res) {
    // if (!req.user) {
    //     res.redirect(307, "/api/login");
    // } else {
    db.FlightTime.findAll({
      where: {
        UserId: req.params.userId
      },
      include: db.Aircraft
    })
      .then(results => res.json(results))
      .catch(err => res.status(404).json(err));
    // };
  });

  // Route for selecting one flight_time
  app.get("/api/flight_time/:userId/:id", function (req, res) {
    // if (!req.user) {
    //   res.redirect(307, "/login");
    // } else {
    db.FlightTime.findAll({
      where: {
        UserId: req.params.userId,
        id: req.params.id
      },
      // include: [db.Aircraft, db.Airport.icao]
    })
      .then(results => res.json(results))
      .catch(err => res.status(404).json(err));
    // };
  });

  // Route for creating a flight_time
  app.post("/api/flight_time/", function (req, res) {
    // if (!req.user) {
    //     res.redirect(307, "/login");
    // } else {
    db.FlightTime.create(req.body)
      .then(results => res.json(results))
      .catch(err => res.status(404).json(err));
    // };
  });

  // Route for updating a flight_time
  app.post("/api/flight_time/update/:UserId/:id", function (req, res) {
    // if (!req.user) {
    //   res.redirect(307, "/api/login");
    // } else {
    db.FlightTime.update(req.body, {
      where: {
        UserId: req.params.UserId,
        id: req.params.id
      }
    })
      .then(results => res.json(results))
      .catch(err => res.status(404).json(err));
    // };
  });

  // Route for deleting a flight_time
  app.delete("/api/flight_time/delete/:UserId/:id", function (req, res) {
    // if (!req.user) {
    //   res.redirect(307, "/api/login");
    // } else {
    db.FlightTime.destroy({
      where: {
        UserId: req.params.UserId,
        id: req.params.id
      }
    })
      .then(results => res.json(results))
      .catch(err => res.status(400).json(err));
    // };
  });

  //-----------------------------------------------------------------------------------------------------------------------
  // aircraft routes begin here


  // Routes for flight_time table per user id
  app.get("/api/aircraft/", function (req, res) {
    // if (!req.user) {
    //     res.redirect(307, "/api/login");
    // } else {
    db.Aircraft.findAll()
      .then(results => res.json(results))
      .catch(err => res.status(404).json(err));
    // };
  });

  // Route for selecting one flight_time
  app.get("/api/aircraft/:id", function (req, res) {
    // if (!req.user) {
    //   res.redirect(307, "/login");
    // } else {
    db.Aircraft.findAll({
      where: {
        id: req.params.id
      },
    })
      .then(results => res.json(results))
      .catch(err => res.status(404).json(err));
    // };
  });

  // Route for creating a flight_time
  app.post("/api/aircraft/", function (req, res) {
    // if (!req.user) {
    //     res.redirect(307, "/login");
    // } else {
    db.Aircraft.create(req.body)
      .then(results => res.json(results))
      .catch(err => res.status(404).json(err));
    // };
  });

  // Route for updating a flight_time
  app.post("/api/aircraft/update/:id", function (req, res) {
    // if (!req.user) {
    //   res.redirect(307, "/api/login");
    // } else {
    db.Aircraft.update(req.body, {
      where: {
        id: req.params.id
      }
    })
      .then(results => res.json(results))
      .catch(err => res.status(404).json(err));
    // };
  });

  // Route for deleting a flight_time
  app.delete("/api/aircraft/delete/:id", function (req, res) {
    // if (!req.user) {
    //   res.redirect(307, "/api/login");
    // } else {
    db.Aircraft.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(results => res.json(results))
      .catch(err => res.status(400).json(err));
    // };
  });

  app.get("/api/aircraft/:aircraftType", function (req, res) {
    // if (!req.user) {
    //   res.redirect(307, "/login");
    // } else {
    db.Aircraft.findAll({
      where:{
        aircraftType:"C=172"
      }
    })
      .then(results => {
        console.log('Working')
        res.json(results)
      })
        
      .catch(err => res.status(404).json(err));
    // };
  });
  // -----------------------------------------
  // Airport Routes

  app.get("/api/airports/", function (req, res) {
    // if (!req.user) {
    //   res.redirect(307, "/login");
    // } else {
    db.Airport.findAll()
      .then(results => res.json(results))
      .catch(err => res.status(404).json(err));
    // };
  });

  app.get("/api/airports/:id", function (req, res) {
    // if (!req.user) {
    //   res.redirect(307, "/login");
    // } else {
    db.Airport.findAll({
      where: {
        id: req.params.id
      },
    })
      .then(results => res.json(results))
      .catch(err => res.status(404).json(err));
    // };
  });

  app.post("/api/airports/", function (req, res) {
    // if (!req.user) {
    //     res.redirect(307, "/login");
    // } else {
    db.Airport.create(req.body)
      .then(results => res.json(results))
      .catch(err => res.status(404).json(err));
    // };
  });

  app.post("/api/airports/update/:id", function (req, res) {
    // if (!req.user) {
    //   res.redirect(307, "/api/login");
    // } else {
    db.Airport.update(req.body, {
      where: {
        id: req.params.id
      }
    })
      .then(results => res.json(results))
      .catch(err => res.status(404).json(err));
    // };
  });

  app.delete("/api/airports/delete/:id", function (req, res) {
    // if (!req.user) {
    //   res.redirect(307, "/api/login");
    // } else {
    db.Airport.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(results => res.json(results))
      .catch(err => res.status(400).json(err));
    // };
  });

  // app.get("/api/airports/test", function (req, res) {
  //   // if (!req.user) {
  //   //   res.redirect(307, "/api/login");
  //   // } else {
  //     const airportTest = sequelize.query(
  //       'SELECT flighttimes.id , arr.latitude, arr.longitude, dep.latitude, dep.longitude FROM logbook_db.flighttimes ftime left outer join airports dep on ftime.depAir = dep.icao left outer join airports arr on ftime.arrAir = arr.icao;',
  //       {
  //       type:QueryTypes.SELECT,
  //     })
  //       .then(results => {
  //         console.log(results)
  //         res.json(results)
  //       })

  //       .catch(err => res.status(400).json(err));
  // });


};
