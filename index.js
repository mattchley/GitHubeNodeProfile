// forgot to do the node_modules
// Inquirer and axios work in tandem and get the info
const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

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
      // const userImg = res.avatar_url;
      // const userName = res.name;
      // const userLocal = res.location;
      // const userGitHub = res.html_url;
      // const userBlog = res.blog;
      // const userBio = res.bio;
      // const userRepos = res.public_repos;
      // const userFollowers =res.followers;
      // const userStars = 0;
      // const userFollowing = res.following;
      console.log(res.data);
    });
  });
