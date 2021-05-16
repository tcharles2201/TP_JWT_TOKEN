const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Mongoose } = require('mongoose');

exports.userRegister = async (req, res, next) => {

        User.find({ email: req.body.email })
           .exec()
           .then(user => {

                if(user.length >= 1) {

                    return res.status(409).json({

                        message: "Mail exists"

                    });

                }
                else {

                    bcrypt.hash(req.body.password, 10, (err, hash) => {

                        if(err) {

                            return res.status(500).json({ 
                                error: err
                            });

                        } else {

                            const user = new User({

                                _id: new Mongoose.Types.ObjectId(),
                                email: req.body.email,
                                password: hash

                            });

                            user.save((error, user) => {

                                if(error) {

                                    res.status(500);
                                    console.log(error);
                                    res.json({
                    
                                        message: "Erreur serveur."
                    
                                    });
                    
                                }
                                else {
                    
                                    res.status(201);
                                    console.log(user.email);
                                    res.json({
                    
                                        message: `utilisateur créé :' ${user.email}`
                    
                                    });
                    
                                }
                    
                            });
                        }
                    });

                }

           })

        /*let newUser = new User(req.body);

        newUser.save((error, user) => {

            if(error) {

                res.status(500);
                console.log(error);
                res.json({

                    message: "Erreur serveur."

                });

            }
            else {

                res.status(201);
                res.json({

                    message: `utilisateur créé :' ${user.email}`

                });

            }

        });*/
  
}

exports.userLogin = (req, res, next) => {

    User.findOne({ email: req.body.email }, (error, user) => {

        if(user.length < 1) {

            return res.status(401).json({
                message: 'Auth failed'
            });

        }

        bcrypt.compare(req.body.password, user.password, (err, result) => {

           if(err) {

                return res.status(401).json({

                    message:  'Auth failed'

                });

           }

           if(result) {

                const token = jwt.sign({
                    email: user.email,
                    userId: user._id
                }, process.env.JWT_KEY, {

                    expiresIn: "1h"

                });

                return res.status(200).json({

                    message: 'Auth successful',
                    token: token

                });

           }

           /*res.status(401).json({

                message: 'Auth failed'

           });*/

        });

      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
      });
      
    // Rechercher l'utilisateur
    User.findOne({
        email: req.body.email
    }, (error, user) => {
        // Si l'utilisateur n'est pas trouvé
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            });
        }
        // Si l'utilisateur est trouvé
        else {
            // Si l'email et le mot de passe correspondent
            if (user != null) {

                if (user.email === req.body.email) {

                    bcrypt.compare(req.body.password, user.password, (error, result) => {

                        if(error) {

                            return res.status(401).json({
            
                                message: 'Authentication Failed'
            
                            });
            
                        }

                        if(result) {

                            const token = jwt.sign({
                                userId: user._id,
                                email: user.email
                            }, process.env.JWT_KEY, {
            
                                expiresIn: "1h"
            
                            });
            
                            return res.status(200).json({
            
                                message: 'Authentication Successful',
                                token: token
            
                            });

                        }

                        /*jwt.sign({
                            user : {
                                id: user._id,
                                email: user.email
                            }
                        }, process.env.JWT_KEY, {
                                expiresIn: "30 days"
                            }, (error, token) => {
                        
                            if (error) {
                                res.status(500);
                                console.log(error);
                                res.json({
                                    message: "Erreur serveur."
                                });
                            } 
                            else {
                                res.status(200);
                                res.json({
                                    token
                                });
                            }
                    });*/

                 });

                } else {
                    res.status(403);
                    console.log(error);
                    res.json({
                        message: "Authentification incorrect."
                    });
                }
            }
            // Si l'email et le mot de passe ne correspondent pas
            else {
                res.status(403);
                console.log(error);
                res.json({
                    message: "Authentification incorrect."
                });
            }
        }
    });
}
