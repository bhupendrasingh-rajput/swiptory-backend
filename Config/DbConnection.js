const mongoose = require("mongoose");

const DbConnection = async () => {
    await mongoose.connect(`${process.env.MONGO_URI}`).then(() => {
        console.log("Database Connected Successfully...");
    }).catch((err) => {
        console.log("Error in Database Connection! -", err);
    })
}

module.exports = DbConnection;