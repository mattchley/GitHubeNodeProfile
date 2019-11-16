// ES7 Feature
const axios = require("axios");
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

// functions
function promptUser() {
  return inquirer.prompt([
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
};
function axiosGet() {
  axios.get('https://api.github.com/users/mattchley')
};
function generateHTML() {
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
            <img href=${res.avatar_url}>pic here<img>
          </div>
          <h1 class="display-4 text-center">Hello, world!</h1>
          <p class="lead text-center"> My name is ${res.name}</p>
          <hr class="my-4">
          <p class="lead text-center">Currently @ ${res.location}</p>
          <div class="row justify-content-md-center">
            <a class="btn btn-primary btn-lg text-center" href="#" role="button">Learn more</a>
            <a class="btn btn-primary btn-lg text-center" href="#" role="button">${res.html_url}</a>
            <a class="btn btn-primary btn-lg text-center" href="#" role="button">${res.blog}</a>
          </div>

        </div>
      </div>
    </div>
    <div class='row'>
      <div class="col-12">
        <p class="lead text-center">${res.bio}</p>
      </div>
    </div>
    <div class="row justify-content-md-center">
      <div class='col-3'>
        <div>${res.public_repos}</div>
        <div>${res.stars}</div>
      </div>
      <div class='col-3'>
          <div>${res.followers}</div>
          <div>${res.following}</div>
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

    const res = await axiosGet(answers)

    const html = generateHTML(res);

    await writeFileAsync("index.html", html);

    console.log("Successfully wrote to index.html");
  } catch (err) {
    console.log(err);
  }
}
init();
// Works
// async function promptUser() {
//   // V important wont return anything until the awaits are all settled
//   try {
//     //                V important
//     const { username } = await inquirer.prompt([
//       {
//         message: "What is your username",
//         name: "username",
//         type: 'input'
//       },
//       {
//         // change to choices for the 4 choice in generateHTML
//         type: "input",
//         name: "color",
//         message: "What is your favorite color?"
//       }

//     ]);
//     //               V important
//     const { data } = await axios.get(
//       `https://api.github.com/users/${username}`
//       // const userImg = res.avatar_url;
//       // const userName = res.name;
//       // const userLocal = res.location;
//       // const userGitHub = res.html_url;
//       // const userBlog = res.blog;
//       // const userBio = res.bio;
//       // const userRepos = res.public_repos;
//       // const userFollowers =res.followers;
//       // const userStars = 0;
//       // const userFollowing = res.following;
//     );

//     console.log(data);
//     // V important 
//   } catch (err) {
//     console.log(err);
//   }
// }