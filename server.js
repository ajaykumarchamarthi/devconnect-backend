const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT;

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    autoIndex: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB connection successful!!!");
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
