import express from "express";
import UserRoute from "./routes/User/User.js";

const app = express();
const port = 3000;

app.use("/api/v1/users", UserRoute);

app.listen(port, () => {
});
