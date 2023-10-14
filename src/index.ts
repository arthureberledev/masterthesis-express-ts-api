import express from "express";
import https from "https";
import fs from "fs";

import users from "./routes/users";
import seed from "./routes/seed";

const app = express();
app.use(express.json());
app.use("/users", users);
app.use("/seed", seed);

const port = process.env.PORT || 3000;

// http server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

const options = {
  cert: fs.readFileSync("./cert/cert.pem"),
  key: fs.readFileSync("./cert/key.pem"),
  passphrase: "secretpassword",
};

https.createServer(options, app).listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
