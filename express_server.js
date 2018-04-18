var express = require("express");
var app = express();
var PORT = process.env.PORT || 8080;
app.set("view engine", "ejs");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

function generateRandomString() {
return Math.floor((1 + Math.random()) * 0x1000000).toString(16).substring(1);
}

var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.get("/", (req, res) => {
  res.end("Hello!");
});

app.get("/urls", (req, res) => {
  let templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.get("/urls/:id", (req, res) => {
  const shortURL = req.params.id;
  const templateVars = { shortURL: req.params.id, longURL: urlDatabase[shortURL]};
  console.log(urlDatabase[shortURL]);
  res.render("urls_show", templateVars);
});

app.post("/urls", (req, res) => {
  var randomString = generateRandomString();
  urlDatabase[randomString] = req.body["longURL"];
  res.redirect("/urls/" + randomString);
});

app.get("/u/:shortURL", (req, res) => {
  console.log(urlDatabase);
  console.log(req.params);
  let longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL);
});



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
