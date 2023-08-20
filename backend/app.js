// --------------------------- import module ------------------//


// importation mta3 l'express modules
const express = require("express");

// import body-parser module
const bodyParser = require("body-parser");

// import mongoose
const mongoose = require("mongoose");

// import bcrypt
const bcrypt = require("bcrypt");



// import multer
const multer = require("multer");

// module path : interne module
const path = require("path");


// forstiDB ---> database name
mongoose.connect('mongodb://localhost:27017/forstiDB');

const { ObjectId } = require("mongodb");



// --------------------------- models importation ------------------//

const User = require("./models/user");
const Annonce = require("./models/annonce");
const Commande = require("./models/commande");
const { url } = require("inspector");
const annonce = require("./models/annonce");





// --------------------------- Create application ------------------//

// create express application
const app = express();


// --------------------------- App configuration ------------------//


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/images', express.static(path.join('backend/images')));
const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}
const storageConfig = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Mime type is invalid");
        if (isValid) {
            error = null;
        }
        cb(null, 'backend/images')
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + '-' + Date.now() + '-FORSTI-' + '.' + extension;
        cb(null, imgName);
    }
});



// ------------------------- Security configuration ----------------------------------
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );
    next();
});









// -----------------------------** User Business Logic **--------------------------------------

// Business Logic : Signup 
app.post("/users/signup", multer({ storage: storageConfig }).single("img"),
    (req, res) => {
        console.log("here user", req.body);
        bcrypt.hash(req.body.pwd, 10).then((cryptedPwd) => {
            let verifEmail = EmailValid(req.body.email);
            if (!req.file) {
                req.file = {}
                req.file.filename = "defaultPic.png"
            }
            if (verifEmail) {
                let url = req.protocol + "://" + req.get("host");
                let userObj = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    pwd: cryptedPwd,
                    tel: req.body.tel,
                    adresse: req.body.adresse,
                    role: req.body.role,
                    avatar: url + "/images/" + req.file.filename,
                });
                userObj.save((err, doc) => {
                    if (err) {
                        res.json({ error: err })
                    } else {
                        res.json({ message: "user saved with success", obj: doc })
                    }
                });
            } else {
                res.json({ message: "please verif email format" })
            }
        })
    });


// Business Logic : Login User
app.post("/users/login", (req, res) => {
    console.log("here obj", req.body);
    let user;
    User.findOne({ tel: req.body.tel })
        .then((doc) => {
            user = doc;
            console.log("this is founded user", doc);
            if (!doc) {
                res.json({ message: "User not founded" });
            }
            return bcrypt.compare(req.body.pwd, doc.pwd);
        })
        .then((pwdResponse) => {
            console.log("pwdResponse", pwdResponse);
            if (!pwdResponse) {
                res.json({ message: "Password incorrect" })
            } else {
                let userObj = user;
                console.log("Final user", userObj);
                res.json({ message: "2", user: userObj });
            }
        });
});



// ---------------Business Logic : Get User By Annonces.userId
app.get("/users/getUserByAnnonceUserId/:id", (req, res) => {
    console.log("here user ID", req.params.id);
    let id = req.params.id;
    User.findOne({ _id: id }).then(
        (doc) => {
            console.log("h", doc);
            res.json({ user: doc });
        })
});


// ---------------Business Logic : Get User By Id
app.get("/users/getUserById/:id", (req, res) => {
    console.log("here bl: get User By Id", req.params.id);
    User.findById(req.params.id).then(
        (docs) => {
            console.log("here user", docs);
            res.json({ user: docs })
        }
    )
});



// ---------------Business Logic : Get all Users
app.get("/users", (req, res) => {
    console.log("get all users");
    User.find().then(
        (docs) => {
            console.log("here user", docs);
            res.json({ users: docs })
        }
    )
});


















// -----------------------------** Annonce Business Logic **--------------------------------------



// Business Logic : Add annonce
app.post("/annonces/add-annonce", multer({ storage: storageConfig }).single("img"),
    (req, res) => {
        console.log("here aslema", req.body);

        let url = req.protocol + "://" + req.get("host");
        let annonceObj = new Annonce({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            qty: req.body.qty,
            category: req.body.category,
            idUser: ObjectId(req.body.idUser),
            avatar: url + "/images/" + req.file.filename,
        });
        annonceObj.save((err, doc) => {
            if (err) {
                res.json({ error: err })
            } else {
                res.json({ message: "annonce saved with success", obj: doc })
            }
        });

    });





// ---------------Business Logic : Get All Annonces
app.get("/annonces/getAllAnnonces", (req, res) => {
    console.log("here bl: get all announces");
    Annonce.find().then(
        (docs) => {
            console.log("here all announces", docs);
            res.json({ annonces: docs })
        }
    )
});







// ---------------Business Logic : Get All Annonces With User ID
app.get("/annonces/getAllUsersWithTheirAnnonces", (req, res) => {
    User.aggregate(
        [
            {
                $lookup: {
                    from: "annonces", // collection to join
                    localField: "_id", //field from the input documents
                    foreignField: "idUser", //field from the documents of the "from" collection
                    as: "annonces", // output array field
                },
            },
        ],
        (error, docs) => {
            res.status(200).json({
                AllUsersWithAnnonces: docs,
            });
        }
    );
});






// ---------------Business Logic : Get Annonce By Id
app.get("/annonces/getAnnoncesById/:id", (req, res) => {
    console.log("here bl: get Announce By Id", req.params.id);
    Annonce.findById(req.params.id).then(
        (docs) => {
            console.log("here announce", docs);
            res.json({ annonce: docs })
        }
    )
});








// ---------------Business Logic : Get Annonce By Commande.idAnnonce
app.get("/annonces/getAnnonceByCommandeIdAnnonce/:id", (req, res) => {
    console.log("here user ID", req.params.id);
    let id = req.params.id;
    Annonce.findOne({ _id: id }).then(
        (doc) => {
            console.log("h", doc);
            res.json({ annonce: doc });
        })
});



// ---------------Business Logic : confirm annonce 
app.put('/annonces/confirmAnnonce/:idAnnonce', async (req, res) => {
    try {
        // get the command id and user id from the request
        const { idAnnonce } = req.params;
        // find the command that matches the idCmd and idUser
        const annonce = await Annonce.findOne({ _id: idAnnonce });
        // update the status of the command
        annonce.status = "confirmed";
        // save the updated command
        await annonce.save();
        //   case updated success
        res.status(200).json({ message: '1' });
    } catch (err) {
        // case fama problem
        console.log(err);
        res.status(500).json({ message: '2' });
    }
});




// ---------------Business Logic : delete annonce 
app.delete('/annonces/deleteAnnonce/:idAnnonce', (req, res) => {

    Annonce.findOneAndDelete({ _id: req.params.idAnnonce }).then(
        (doc) => {
            console.log("This is the founded announce", doc);
            res.json({ message: "1" });
        })
});






// ---------------Business Logic : Update Announce
app.put("/annonces/updateAnnonce/:id", (req, res) => {
    console.log("here BL : Update Announce",req.body);
    let id = req.params.id;
    let newAnnounce = req.body;
    Annonce.updateOne({ _id: id }, newAnnounce).then(
        (response) => {
            if (response.modifiedCount == 1) {
                res.json({ message: "Edited with success" });
            } else {
                res.json({ message: "Echec" });
            }
        }
    )

});




// -----------------------------** Commande Business Logic **--------------------------------------


// Business Logic : Add Commande
app.post("/commandes/add-commande",
    (req, res) => {
        console.log("here commande", req.body);

        let commandeObj = new Commande({
            idUser: ObjectId(req.body.idUser),
            idAnnonce: ObjectId(req.body.idAnnonce),
        });
        commandeObj.save((err, doc) => {
            if (err) {
                res.json({ error: err })
            } else {
                res.json({ message: "commande saved with success", obj: doc })
            }
        });

    });







// ---------------Business Logic : Get All Commandes
app.get("/commandes/getAllCommandes", (req, res) => {
    console.log("here bl: get All Commandes");
    Commande.find().then(
        (docs) => {
            console.log("here all Commandes", docs);
            res.json({ commandes: docs })
        }
    )
});







// ---------------Business Logic : get Commandes By Id Annonce
app.get('/commandes/getCommandesByIdAnnonce/:idAnnonce', function (req, res) {
    var idAnnonce = mongoose.Types.ObjectId(req.params.idAnnonce);
    Commande.aggregate([
        {
            $match: { idAnnonce: idAnnonce }
        },
        {
            $lookup:
            {
                from: "users",
                localField: "idUser",
                foreignField: "_id",
                as: "user_info"
            }
        },
        {
            $unwind: "$user_info"
        },
        {
            $group: {
                _id: "$idAnnonce",
                users: { $push: "$user_info" }
            }
        },
    ]).exec(function (err, commandes) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.json(commandes);
        }
    });
});








// ---------------Business Logic : update command status
app.put('/commandes/updateStatus/:idCmd', async (req, res) => {
    try {
        // get the command id and user id from the request
        const { idCmd } = req.params;
        const { idUser } = req.body;
        // find the command that matches the idCmd and idUser
        const command = await Commande.findOne({ idAnnonce: idCmd, idUser });
        // update the status of the command
        command.status = "confirmed";
        // save the updated command
        await command.save();
        //   case updated success
        res.status(200).json({ message: '1' });
    } catch (err) {
        // case fama problem
        console.log(err);
        res.status(500).json({ message: '2' });
    }
});








// ---------------Business Logic : Get All Annonces With User ID
app.get("/commandes/getAllUsersWithTheirCommandes", (req, res) => {
    User.aggregate(
        [
            {
                $lookup: {
                    from: "commandes", // collection to join
                    localField: "_id", //field from the input documents
                    foreignField: "idUser", //field from the documents of the "from" collection
                    as: "commandes", // output array field
                },
            },
        ],
        (error, docs) => {
            res.status(200).json({
                AllUsersWithCommandes: docs,
            });
        }
    );
});





























// ---------------Business Logic : test recherche
app.get("/users/getUserByName/:name", (req, res) => {
    console.log("here bl: test");
    let name = req.params.name;
    for (let i = 0; i < usersTab.length; i++) {
        if (usersTab[i].firstName == name) {
            res.json({ user: usersTab[i], msg: "1" })
        } else {
            res.json({ msg: "2" })
        }

    }
});












let usersTab = [
    { id: 1, firstName: "salah", lastName: "ben ali", email: "benalisalah@gmail.com", pwd: "123456" },
    { id: 2, firstName: "ahmed", lastName: "ben ali", email: "ahmed@gmail.com", pwd: "123456" },
    { id: 3, firstName: "aziz", lastName: "ben ali", email: "aziz@gmail.com", pwd: "123456" }
];












// --------------*** Functions ***--------------------

function EmailValid(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}









// make app importable from other files
module.exports = app;






