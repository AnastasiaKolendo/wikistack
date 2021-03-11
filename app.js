const express = require("express");
const app = express();
const morgan = require("morgan");
const { db, User, Page } = require("./models");

const wiki = require('./routes/wiki');
const user = require('./routes/users');

app.use(morgan("dev"));

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

app.use('/wiki', wiki);
app.use('/users', user);

db.authenticate().then(() => {
  console.log("connected to the database");
});

app.get("/", (req, res) => {
  
  res.redirect('/wiki');
});

const init = async () => {
  try {
    await db.sync({ force: true });
    const user = await User.create({ name: "Mac", email: "mac@gmail.com" });
    const page = await Page.create({
      title: "Instructor",
      slug: "blah",
      content: "javascript",
      status: "open",
    });
    const user2 = await User.create({ email: "sarah@gmail.com" });
  } catch (error) {
    console.error();
  }
};

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});

init();


