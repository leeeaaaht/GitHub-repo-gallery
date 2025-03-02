//where your profile info will appear//
const overview = document.querySelector(".overview");
const username = "leeeaaaht";
//display the repo list//
const list = document.querySelector(".repo-list");
// all the repo info appears//
const infoSection = document.querySelector(".repos");
//individual repo data appears//
const individualRepo = document.querySelector(".repo-data");
const button = document.querySelector(".view-repos");
const filterInput = document.querySelector("filter-repos");

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

repoList.addEventListener("click", function(e){
if(e.target.matches("h3")){
    const repoName = e.target.innerText;
    getRepoInfo(repoName);
}
});

const getRepoInfo = async function(repoName) {
   const fetchInfo = await fetch(`https://api.github.com/users/${username}/${repoName}`);
    const repoInfo = await fetchInfo.json();
    console.log(repoInfo);
    const fetchLanguages = await fetch (repoInfo.language_url);
    const languageData = await fetchLanguages.json();
    console.log(languageData);

    //make a list of languages//
    const languages = [];
for(const language in languageData) {
languages.push(language);
console.log(languages);
}
displayRepoInfo(repoInfo , languages);

};

const displayRepoInfo = function(repoInfo, languages) {
    individualRepo.innerHTML = "";
    div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    individualRepo.classList.remove("hide");
    infoSection.classList.add("hide");
    button.classList.remove("hide");
    const div = document.createElement("div");
    individualRepo.append(div);
};

button.addEventListener("click", function() {
    infoSection.classList.remove("hide");
    individualRepo.classList.add("hide");
    button.classList.add("hide");

});

filterInput.addEventListener("input", function(e){
    const searchText = e.target.value;
    const repos = document.querySelectorAll(".repo");
    const lowerText = searchText.toLowerCase();

    for(const repo of repos){
        const repoLowerText = repo.innerText.toLowerCase();
        if(repoLowerText.includes (lowerText)) {   
        } else {
            repoLowerText.classList.add("hide");
        }
    }
});
