//where your profile info will appear//
const overview = document.querySelector(".overview");
const username = "leeeaaaht";
//display the repo list//
const list = document.querySelector(".repo-list");

const information = async function() {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    newInfo(data);
};
information();

//fetched user info//
const newInfo = function(data) {
    const div = document.createElement("div");
    div.classList.add(".user-info");
    div.innerHTML = 
    `<figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div> `;
  overview.append(div);
  repoList();
};

const repoList = async function() {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
    displayInfo(repoData);
};

//display info about each repo//
const displayInfo = function (repos) {
    for(const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        list.append(repoItem);
    }   
};

