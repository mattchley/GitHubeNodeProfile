// // forgot to do the node_modules
// // Inquirer and axios work in tandem and get the info
// const fs = require("fs");
// const axios = require("axios");
// const inquirer = require("inquirer");

// inquirer
//   .prompt([
//     {
//       type: "input",
//       name: "username",
//       message: "What is your username?"
//     },
//     {
//       // https://www.npmjs.com/package/inquirer/v/0.2.3
//       // change to choices for the 4 choice in generateHTML
//       type: "input",
//       name: "color",
//       message: "What is your favorite color?"
//     },
//   ])
//   .then(function ({ username }) {
//     const queryUrl = `https://api.github.com/users/${username}`;

//     axios.get(queryUrl).then(res => {

//       console.log(res.data);
//     });
//   });



// ES7 Feature
const axios = require("axios");
const inquirer = require("inquirer");

getMovie();
// V important sugar syntaxt
async function getMovie() {
  // V important wont return anything until the awaits are all settled
  try {
    //                V important
    const { username } = await inquirer.prompt([
      {
        message: "What is your username",
        name: "username",
        type: 'input'
      },
      {
        // change to choices for the 4 choice in generateHTML
        type: "input",
        name: "color",
        message: "What is your favorite color?"
      }

    ]);
  //               V important
  const { data } = await axios.get(
    `https://api.github.com/users/${username}`
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
  );

  console.log(data);
  // V important 
} catch (err) {
  console.log(err);
}
}