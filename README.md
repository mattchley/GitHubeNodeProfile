# GitHubeNodeProfile
11-14 Pseudocode

what NPM do i need to do this?
    1.inquierer- to ask client for git hub data(x 11/14)
        questions being asked
        a.user name
        b.favorite color ()
    2.util- to handle promises (x 11/16)
    3.git hub api documentation (x 11/14)
    4.axios?(x 11/14)
    5.google maps api?
    6.seperate api for stars in GIthub

after questions what needs to be generated? (pathway)
    1. Profile Image (response.avatar_url)
    2. User name (response.name)
    3. links to
        a. Google maps (response.location)(then google maps API, will need to convert name to lat/long)
        b. github profile (response.html_url)
        c. user blog (response.blog)
    4. bio (response.bio)
    5. number of
        a. public repos (response.public_repos)
        b. followers (response.followers)
        c. github stars (https://developer.github.com/changes/2012-09-05-watcher-api/, use this url https://api.github.com/users/mattchley/watched)
        d. users following (response.following)
General Qs

What would be the best way to handle the promises?
more than likely the most recent promise structure from activity 39. Seems the most clean

How do i make a pdf from node?
It appears that the html generated can be saved/printed as a pdf

how do i connect the generateHTML.js?

Mile stones

inquirer to work (x 11/14)
axios to work (x 11/14)
HTML design
    a. format (x 11/16)
    b. what the text will be(x 11/16)
Map API
Link map to HTML
ES7 reworking
Use Async Wait functioning (x 11/16) 
Constructor for github stuff? refer to 10/02 activity

Styling
Use color settings

Update 11/19
really working on the Async in index2
    now retruns at proper time and gets info for both github user and stars
    gitHub and stars console.log res.data
    Connected gitHub and stars to generateHTML



