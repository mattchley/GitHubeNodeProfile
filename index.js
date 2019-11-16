// ES7 Feature
const axios = require("axios");
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

// functions
function promptUser() {
  inquirer
  .prompt([
    {
      type: "input",
      name: "username",
      message: "What is your username?"
    },
    {
      type: "input",
      name: "color",
      message: "What is your favorite color?"
    },
  ])
  .then(function ({ username }) {
    const queryUrl = `https://api.github.com/users/${username}`;

    axios.get(queryUrl).then(function (res) {
      console.log(res.data);
    });
  });

}
function generateHTML(answers) {
  return `
  <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <!-- maybe materialize? -->
  <title>GitHub</title>
</head>

<body>
  <div class='container'>
    <div class='row'>
      <div class='col-12'>
        <div class="jumbotron">
          <!-- need to fix centering -->
          <div class="justify-content-md-center">
            <img href="">pic here<img>
          </div>
          <h1 class="display-4 text-center">Hello, world!</h1>
          <p class="lead text-center"> My name is ${answers.name}</p>
          <hr class="my-4">
          <p class="lead text-center">Currently @ ${answers.location}</p>
          <div class="row justify-content-md-center">
            <a class="btn btn-primary btn-lg text-center" href="#" role="button">Learn more</a>
            <a class="btn btn-primary btn-lg text-center" href="#" role="button">${answers.html_url}</a>
            <a class="btn btn-primary btn-lg text-center" href="#" role="button">${answers.blog}</a>
          </div>

        </div>
      </div>
    </div>
    <div class='row'>
      <div class="col-12">
        <p class="lead text-center">${answers.bio}</p>
      </div>
    </div>
    <div class="row justify-content-md-center">
      <div class='col-3'>
        <div>${answers.public_repos}</div>
        <div>${answers.stars}</div>
      </div>
      <div class='col-3'>
          <div>${answers.followers}</div>
          <div>${answers.following}</div>
        </div>
    </div>
  </div>

</body>

</html>`
};


async function init() {
  console.log("hi")
  try {
    const answers = await promptUser();

    const html = generateHTML(answers);

    await writeFileAsync("index.html", html);

    console.log("Successfully wrote to index.html");
  } catch (err) {
    console.log(err);
  }
}
init();