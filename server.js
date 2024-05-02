require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const DbConnection = require("./Config/DbConnection");
const userRoutes = require("./Routes/userRoutes");
const storyRoutes = require("./Routes/storyRoutes");
const bookmarkRoutes = require("./Routes/bookmarkRoutes");
const cors = require("cors");
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json({
        service: "SwipTory Server",
        status: "Active",
        time: new Date()
    })
})

app.use("/user", userRoutes);
app.use("/story", storyRoutes);
app.use("/bookmark", bookmarkRoutes);

//Database Connection
DbConnection();

app.listen(port, (err) => {
    if (!err) {
        console.log("Server started at port : ", port);
    }
})