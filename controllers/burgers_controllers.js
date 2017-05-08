var express = require("express");

var router = express.Router();

//Importing the model to use its database
var burger = require("../models/burger.js");

//Creating the routes and setting up the logic
router.get("/", function(req, res) {
    burger.all(function(data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/", function(req, res) {
    burger.create([
        "burger_name", "devoured"
    ], [
      req.body.name, req.body.devoured  
    ], function() {
        res.redirect("/");
    });
});

router.put("/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.update({
        devoured: req.body.devoured
    }, condition, function() {
        res.redirect("/");
    });
});

module.exports = router;