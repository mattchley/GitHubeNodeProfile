// ES7 Feature
const axios = require("axios");
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

// functions
function promptUser() {
  return inquirer
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
};

function axiosGithub({ username }) {
  return axios
    .get(`https://api.github.com/users/${username}`)
    .then(function (res) {
      return res.data;
      const userImg = res.data.avatar_url;
      const userName = res.data.name;
      const userLocal = res.data.location;
      const userGitHub = res.data.html_url;
      const userBlog = res.data.blog;
      const userBio = res.data.bio;
      const userRepos = res.data.public_repos;
      const userFollowers = res.data.followers;
      const userFollowing = res.data.following;
    })
};

function axiosStars({ username }) {
  return axios
    .get(`https://api.github.com/users/${username}/watched`)
    .then(function (res) {
      return res.data
      const userStars = res.data;
    })
};

function generateHTML(gitHub, stars, { color }) {

  const userImg = gitHub.avatar_url;
  const userName = gitHub.name;
  const userLocal = gitHub.location;
  const userGitHub = gitHub.html_url;
  const userBlog = gitHub.blog;
  const userBio = gitHub.bio;
  const userRepos = gitHub.public_repos;
  const userFollowers = gitHub.followers;
  const userFollowing = gitHub.following;
  const userStars = stars;
  return `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <!-- maybe materialize? -->
    <title>GitHub</title>
    <style>
      body {
        background-color: ${color};
        font-size: 30px;
        color: black
      };
    </style>
  </head>
  
  <body>
    <div class='container'>
      <div class='row'>
        <div class='col-12'>
          <div class="jumbotron">
            <div class="row">
              <div class="col-3"></div>
              <div class="col-6">
                <img src="${userImg}">
              </div>
              <div class="col-3"></div>
            </div>
            <h1 class="display-4 text-center">Hello, world!</h1>
            <p class="lead text-center"> My name is ${userName}</p>
            <hr class="my-4">
            <p class="lead text-center">Currently @ ${userLocal}</p>
            <div class="row justify-content-md-center">
              <a class="btn btn-primary btn-lg text-center" href="#" role="button">${userGitHub}</a>
              <a class="btn btn-primary btn-lg text-center" href="#" role="button">${userBlog}</a>
            </div>
          </div>
        </div>
      </div>
      <div class='row'>
        <div class="col-12">
          <p style: 'font-size: 30px; color: black;'>${userBio}</p>
        </div>
      </div>
      <div class="row justify-content-md-center">
        <div class='col-4'>
          <div style='background-color: grey; border-style: outset;text-align:center;'>
          <p>Public Repos</p>
          ${userRepos}
          </div>
          <div style='background-color: grey; border-style: outset;text-align:center;'>
          <p>Stars</p> 
          ${userStars}
          </div>
        </div>
        <div class='col-4'>
          <div style='background-color: grey; border-style: outset;text-align:center;'>
          <p>Followers</p>
          ${userFollowers}
          </div>
          <div style='background-color: grey; border-style: outset;text-align:center;'>
          <p>Following</p>
          ${userFollowing}
          </div>
        </div>
      </div>
    </div>
  </body>
  
  </html>`
};


async function init() {
  try {
    const answers = await promptUser();
    const gitHub = await axiosGithub(answers);
    const stars = await axiosStars(answers);
    const html = generateHTML(gitHub, stars, answers)
    await writeFileAsync("index2.html", html);
    console.log("index2.html successfully created!")

  } catch (err) {
    console.log(err);
  }
};

init();