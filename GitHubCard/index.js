/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
axios.get('https://api.github.com/users/numbers0580')
  .then(responder => {
    let fetchedUser = responder.data;
    //console.log('numbers0580 data',fetchedUser);
    //return githubUser(fetchedUser);
    mainCards.appendChild(githubUser(fetchedUser));
  })
  .catch(errorMessage => {
    console.log('Error: Something is amiss with numbers0580!');
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
//debugger
//let createdCard = myID;
//mainCards.appendChild(createdCard);
//mainCards.appendChild(githubUser(fetchedUser));

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.   <---   I think they mean the followersArray

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = [
  'https://api.github.com/users/tetondan',
  'https://api.github.com/users/dustinmyers',
  'https://api.github.com/users/justsml',
  'https://api.github.com/users/luishrd',
  'https://api.github.com/users/bigknell',
  'https://api.github.com/users/MaryamMosstoufi',
  'https://api.github.com/users/sage-jordan',
  'https://api.github.com/users/jduell12',
  'https://api.github.com/users/Roboblox',
  'https://api.github.com/users/emilioramirezeguia',
  'https://api.github.com/users/Elisa-Alvarez',
  'https://api.github.com/users/stephaniegatt',
  'https://api.github.com/users/j721',
  'https://api.github.com/users/alphaseinor',
  'https://api.github.com/users/virginia-d90',
  'https://api.github.com/users/Mr-Russell'
];

//So I got the additional 5 people to work, but now I want to have some fun with this. I don't believe there's a stretch goal like this
//but the idea I'm about to detail here will still be in-line with what's asked in Part 3.
//In Slack, there were some people that volunteered their github handles to each other for this project. I want to add them to the array above
//Then I want to create a function that will randomly select 5 without replacement (means without duplication of any individual) and create
//the divs for those randomly selected.

let followerSeries = [];
let x = 0;
while(x < 5) {
  let grabPerson = Math.floor(Math.random() * followersArray.length); // 0 - 15 for the list above
  let unique = true;

  if(x > 0) {
    //Test to make sure there's no replacement
    for(let y = 0; y < x; y++) {
      if(followerSeries[y] === grabPerson) {
        unique = false; //Found replacement, do not push grabPerson to array
      }
    }
  }

  if(unique) {
    followerSeries.push(grabPerson); // store 0 - 15
    x++; // Find the next victim, err... person!
  }
}

for(let x = 0; x < followerSeries.length; x++) {
  followerData(followersArray[followerSeries[x]]);
}

//I pulled the guts out of the above for-loop and created this function, so I could use it with a Stretch, as well
function followerData(thePerson) {
  axios.get(thePerson)
  .then(responded => {
    let follower = responded.data;
    //return githubUser(follower);
    mainCards.appendChild(githubUser(follower));
  })
  .catch(errorMessage => {
    console.log('Error: Something amiss with this follower');
  })
}

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
  imageTag.setAttribute('src', usersData.avatar_url);
  nestedDiv.classList.add('card-info');
  nameTag.classList.add('name');
  nameTag.textContent = usersData.name;
  ghPage.setAttribute('href', usersData.html_url);
  ghPage.textContent = usersData.html_url;
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

//Stretch
axios.get('https://api.github.com/users/alphaseinor/followers') //I went with Brian Hague's profile since he has followers, while I have 0 friends.
  .then(collection => {
    let followerList = collection.data;

    for(a = 0; a < followerList.length; a++) {
      followerData(`https://api.github.com/users/${followerList[a].login}`);
    }
  })
  .catch(collectError => {
    console.log('Error: Something amiss with this dynamic follower');
  })
