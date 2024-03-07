//importing modules
import express from "express";

import db from "../Models/index.js";

//Assigning db.users to User variable
const User = db.users;

//Function to check if username or email already exist in the database
//this is to avoid having two users with the same username and email
const saveUser = async (req, res, next) => {
    //search the database to see if user exist
    try {
        
        //checking if email already exist
        const emailcheck = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        //if email exist in the database respond with a status of 409
        if (emailcheck && emailcheck.dataValues.isVerified === true) {
            return res.status(409).send({
                error: "Verified Email Already Exists",
            });
        }


        const username = await User.findOne({
            where: {
                userName: req.body.userName,
            },
        });
        //if username exist in the database respond with a status of 409
        if (username && username.dataValues.isVerified === true) {
            return res.status(409).send({
                error: "Username Already Taken",
            });
        }

        next();
    } catch (error) {
        console.log(error);
    }
};

//exporting module
export default {
    saveUser
};