//importing modules
import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
import user from './userModel.js';


//configuring dotenv
dotenv.config();

//database connection
// const sequelize = new Sequelize(`postgres://postgres:${process.env.Password}@localhost:5432/${process.env.Database}`);
export const sequelize = new Sequelize(`postgres://imaginedtime:eaXuoPhYUEn2wMp7FteBqRP1y9ESs26r@dpg-cngbnsdjm4es7396n7o0-a.oregon-postgres.render.com/emailverify_3d1j?ssl=true`);

//checking if connection is done with the authenticate method in sequelize
sequelize.authenticate().then(() => {
    console.log(`Database connected to testing `)
}).catch((err) => {
    console.log(err)
})

//creating a global variable and assigning an empty variable to be used later
const db = {}

db.Sequelize = Sequelize
// db.sequelize = sequelize

//connecting to models which are the users and the tokens schema
// import token from './token.js';

db.users = user(sequelize, DataTypes);
// db.tokens = token(sequelize, DataTypes)


//relationship of users and token which is one to one relationship
//every user would have one token.
//users.hasOne means every user will have just one token
//tokens.belongsTo means every token will belong to the users table
// and not any other table
// db.users.hasOne(db.tokens, {
//     as: 'token',
//     foreignKey: "userId"
// })

// db.tokens.belongsTo(db.users, {
//     as: 'user',
//     foreignKey: "userId"
// })


//exporting the module
export default db