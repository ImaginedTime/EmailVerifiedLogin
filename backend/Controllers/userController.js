//importing modules
import { hash, compare } from "bcrypt";
import db from "../Models/index.js";
import pkg from "jsonwebtoken";
const { sign } = pkg;
// import { randomBytes } from "crypto";
import { sendingMail } from "../nodemailer/mailing.js";

// Assigning users to the variable User
const User = db.users;
// const Token = db.tokens;

//signing a user up
//hashing users password before its saved to the database with bcrypt
const signup = async (req, res) => {
    try {
        const { userName, email, password, isVerified } = req.body;
        const data = {
            userName,
            email,
            password: await hash(password, 10),
            isVerified,
        };


        let user;

        //search the database to see if user exist
        const emailcheck = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        // if an unverified email exist in the database, update the user details
        // else create a new user
        if (emailcheck && emailcheck.dataValues.isVerified === false) {
            user = emailcheck;
        }
        else {
            user = await User.create(data);
        }

        //if user details is captured
        //create a token with crypto.js

        if (user) {
            // let setToken = await Token.create({
            //     userId: user.id,
            //     token: randomBytes(16).toString("hex"),
            // });

            //if token is created, send the user a mail
            // if (setToken) {
                
            //send email to the user
            //with the function coming from the mailing.js file
            //message containing the user id and the token to help verify their email
            sendingMail({
                from: "no-reply@example.com",
                to: `${email}`,
                subject: "Account Verification Link",
                text: `Hello ${userName}, Please verify your email by \nclicking on this link : \n\t https://emailverifiedlogin.onrender.com/api/users/verify-email/${user.id}/${user.userName}`,
            });
            //if token is not created, send a status of 400
            // } else {
            //     return res.status(400).send({ error: "Token not created" });
            // }

            console.log("user", JSON.stringify(user, null, 2));

            //send users details
            return res.status(201).send(user);
        } else {
            return res.status(409).send({ error: "Details are not correct" });
        }
    } catch (error) {
        console.log(error);
    }
};

//verifying the email of the user
const verifyEmail = async (req, res) => {
    try {
        // const token = req.params.token;

        //find user by token using the where clause
        // const usertoken = await Token.findOne({
        //     token,
        //     where: {
        //         userId: req.params.id,
        //     },
        // });
        // console.log(usertoken);

        // //if token doesnt exist, send status of 400
        // if (!usertoken) {
        //     return res.status(400).send(`
        //         <div>
        //             <h2>Your verification link may have expired. Please Go to signup and send verification email again.</h2>
        //             <a href='https://email-verified-login.vercel.app/'>Click here to login or signup</a>
        //         </div>
        //     `);

        //     //if token exist, find the user with that token
        // } 
        // else {
        const user = await User.findOne({ where: { id: req.params.id, userName: req.params.userName } });
        if (!user) {
            console.log(user);

            return res.status(401).send(`
                    <div>
                        <h1>We were unable to find a user for this verification. Please SignUp!</h1>
                        <a href='https://email-verified-login.vercel.app/'>Click here to login or signup</a>
                    </div>
                `);

            //if user is already verified, tell the user to login
        } else if (user.isVerified) {
            return res.status(200).send(`
                        <div>
                            <h1>User is already verified</h1>
                            <a href='https://email-verified-login.vercel.app/'>Click here to login</a>
                        </div>
                    `);

            //if user is not verified, change the verified to true by updating the field
        } else {
            const updated = await User.update(
                { isVerified: true },
                {
                    where: {
                        id: req.params.id,
                    },
                }
            );
            console.log(updated);

            //if not updated send error message
            if (!updated) {
                return res.status(500).send({ msg: err.message });
                //else send status of 200
            } else {
                return res.status(200).send(`
                            <div>
                                <h1>Email has been Successfully verified</h1>
                                <a href='https://email-verified-login.vercel.app/'>Click here to login</a>
                            </div>
                        `);
            }
        }
        // }
    } catch (error) {
        console.log(error);
    }
};

//login authentication

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //find a user by their email
        const user = await User.findOne({ where: { email: email } });

        console.log(user);
        //if user email is found, compare password with bcrypt
        if (user) {
            //
            const isSame = await compare(password, user.password);

            //if password is the same, check if the user is verified,
            //if verified, generate a token and use it to set cookies for the user
            if (isSame) {
                //check if they are verified
                const verified = user.isVerified;
                if (verified) {
                    let token = sign({ id: user.id }, process.env.secretKey, {
                        expiresIn: 1 * 24 * 60 * 60 * 1000,
                    });

                    res.cookie("jwt", token, {
                        maxAge: 1 * 24 * 60 * 60,
                        httpOnly: true,
                    });
                    console.log("user", JSON.stringify(user, null, 2));
                    console.log(token);
                    //send user data
                    return res.status(201).send(user);
                } else {
                    return res.status(401).send({ error: "Please verify your email" });
                }
            } else {
                return res.status(401).send({ error: "Invalid Password" });
            }
        } else {
            return res.status(401).send({ error: "User not found" });
        }
    } catch (error) {
        console.log(error);
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({ attributes: ['userName', 'email'] });
        if (users) {
            return res.status(200).send(users);
        } else {
            return res.status(404).send({ error: "No user found" });
        }
    } catch (error) {
        console.log(error);
    }
}

//exporting the modules
export default {
    signup,
    login,
    verifyEmail,
    getAllUsers,
};