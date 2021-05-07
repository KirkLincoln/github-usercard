/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    
*/

// upper case functions are public and considered componenets or dispatch fns
// lower case functions are private so type checking is not needed with proper discipline

const handleSubmit = async () => {
  await axios({
    method: 'get',
    url: 'https://api.github.com/users/KirkLincoln',
  })
  .then((response) => {
    User(response.data);
  })
  .catch((error) => {
    console.log(error)
  }); 
}
handleSubmit();

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

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = [
  `GoesToEleven`,
  `Kelta-King`,
  `mathieudutour`,
  `client-engineering-bot`,
  `ryanmcdermott`
];

const fetcher = async username => {
  await axios({
    method: 'get',
    url: `https://api.github.com/users/${username}`,
  })
  .then((response) => {
    User(response.data)
  })
  .catch((error) => {
    console.log(error)
  }); 
}

const Followers = usernames => {
  return usernames.forEach(follower => fetcher(follower));
}
Followers(followersArray);

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
const User = profile => {
  console.log(profile);
  const card = document.createElement('div').classList.add('card');
  const avatar = document.createElement('img').setAttribute('src', profile.avatar_url);
  const card_info = createCardInfo(profile);


}

const CardInfo = profile => createCardInfo(profile);
const createCardInfo = profile  => {
  const card = createElement('div');
  const avatar = createElement('img');
  const name = createElement('h3');
  const username = createElement('p');
  const location = createElement('p');
  const urlFrame = createElement('p');
  const url = createElement('a');
  const following = createElement('p');
  const followers = createElement('p');
  const bio = createElement('p');
  const htmlCollection = {
    name, 
    username,
    location,
    urlFrame,
    url,
    following,
    followers,
    bio
  };

  card.classList.add('card');
  username.classList.add('username');

  url.setAttribute('href', profile.url);

  const hydrated = hydrater(profile, htmlCollection);
  const appended = appender(htmlCollection);
  console.log(appended)
  card.append(avatar);
  card.append(appended);
  document.querySelector('.cards').append(card);
  console.log(card);
  return card;
 
}

const createElement = el => document.createElement(el);

const hydrater = (profile, htmlCollection) => {
  const html = htmlCollection;
  
  html.username.innerHTML = profile.login;
  html.name.innerHTML = profile.name === null ? "unknown" : profile.login;
  html.location.innerHTML = profile.location;
  html.url.innerHTML = "Github";
  html.urlFrame.innerHTML = `Profile: ${profile.html_url}`;
  html.followers.innerHTML = `Followers: ${profile.followers}`;
  html.following.innerHTML = `Following: ${profile.following}`;
  html.bio.innerHTML = `Bio: ${profile.bio}`;
  
  const appended = appender(html)
  console.log(appended);
  return appended;
}

const appender = htmlCollection => {
  const cardInfo = createElement('div');
  const html = htmlCollection;
  const keys = Object.keys(htmlCollection);
  const container = htmlCollection.cardInfo;
  console.log(keys)
  console.log(html)

  cardInfo.classList.add('card-info')

  for(let i = 1; i < keys.length; i++) {
    console.log(html[keys[i]])
    cardInfo.append(html[keys[i]]);
  }

  console.log(html.cardInfo)
  return cardInfo;
}

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
