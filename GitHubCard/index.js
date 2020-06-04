/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
const myID = axios.get('https://api.github.com/users/numbers0580')
  .then(responder => {
    //console.log('numbers0580 data', responder);
    const fetchedUser = responder.data;
    //console.log('numbers0580 company', responder.data.company);
    return fetchedUser;
    //githubUser(responder.data);
  })
  .catch(errorMessage => {
    console.log('Danger, Will Robinson, Danger!');
  })

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/
let mainCards = document.querySelector('.cards');
mainCards.appendChild(githubUser(myID));

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = [];

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/
function githubUser(usersData) {
  //Creating tags
  let mainDiv = document.createElement('div');
  let imageTag = document.createElement('img');
  let nestedDiv = document.createElement('div');
  let nameTag = document.createElement('h3');
  let ghPage = document.createElement('a');
  let pTags = [];
  for(let i = 0; i < 6; i++) {
    pTags.push(document.createElement('p'));
  }

  //Adding Details
  mainDiv.classList.add('card');
  imageTag.setAttribute('src', usersData['avatar_url']);
  nestedDiv.classList.add('card-info');
  nameTag.classList.add('name');
  nameTag.textContent = usersData.name;
  ghPage.setAttribute('href', usersData['html_url']);
  ghPage.textContent = usersData['html_url'];
  pTags[0].classList.add('username');
  pTags[0].textContent = usersData.login;
  pTags[1].textContent = usersData.location;
  pTags[2].textContent = 'Profile:';
  pTags[3].textContent = `Followers: ${usersData.followers}`;
  pTags[4].textContent = `Following: ${usersData.following}`;
  pTags[5].textContent = `Bio: ${usersData.bio}`;

  //Appending all children
  pTags[2].appendChild(ghPage);
  nestedDiv.appendChild(nameTag);
  for(j = 0; j < 6; j++) {
    nestedDiv.appendChild(pTags[j]);
  }
  mainDiv.appendChild(imageTag);
  mainDiv.appendChild(nestedDiv);

  //Done
  return mainDiv;
}

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
