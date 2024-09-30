const mongoose = require('mongoose');
const User = require('../user/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.user_signUp = async (req, res) => {   
    try { 
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).json({
                message: "Mail already exists!"
            });
        } else {
            const hashedPassword = await bcrypt.hash(req.body.password.trim(), 10);

            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hashedPassword
            });

            const savedUser = await user.save();
            return res.json({
                message: "User saved successfully.",
                user: savedUser
            });
        }
    } catch (err) {
        return res.status(500).json({
            error: err,
            message: "An error occurred while processing the request."
        });
    }        
};

exports.user_logIn = async (req, res) => {
    
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                console.error('Error during password comparison:', err); // Log the error
                return res.status(500).json({
                    message: "An error occurred during password comparison."
                });
            }

            if (result) {
                const token = jwt.sign(
                    {
                        email: user.email,
                        _id: user._id,
                    },
                    process.env.JWT_TOKEN,
                    { expiresIn: "1h" }
                );

              res.status(200).json({
            message: 'Login successful',
            token,
            user: {
             id: user._id,
             email: user.email,
             role: user.role 
        }
    });
            } else {
                return res.status(401).json({
                    message: 'Authentication failed. Incorrect password.'
                });
            }
        });
    } catch (err) {
        console.error('Login error:', err); 
        return res.status(500).json({
            message: 'An error occurred while trying to log in.',
            error: err.message || err 
        });
    }
};

