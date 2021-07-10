const repoSection=document.querySelector(".repos");

let username="Bhuwan-web";
let gitUserAPI=`https://api.github.com/users/${username}`;
let repoAPI=`${gitUserAPI}/repos`
const makePortfolio=()=>{
    fetch(gitUserAPI)
    .then(response=>response.json())
    .then(data=>{
        console.log(data)
        document.getElementById("profile").src=data.avatar_url;
        document.getElementById("profileCap").innerText=data.login;
        document.getElementById("username").textContent=data.name;
        document.getElementById("bio").textContent=data.bio;
        document.getElementById("repos").textContent=`Total projects public in github :${data.public_repos}`;
        document.querySelector(".apiDetails").hidden=false;
        document.querySelector("#laoding").hidden=true;
    })
};

const makeRepo = ()=>{
    fetch(repoAPI)
    .then(response=>response.json())
    .then(data=>{
        const repos=data.filter(repo=>!repo.fork);
        repoSection.innerHTML="";
        console.log(repos);
        repos.forEach(repo => {
            repoSection.innerHTML+=`
            <article class="repo repo1">
            <h2 class="name">
                ${repo.name}
            </h2>
            <div class="description">
                ${repo.description}    
            </div>
            <div class="language">
               Language used: ${repo.language}
            </div>
            <div class="watchers">
                Watcher's count: ${repo.watchers}
            </div>
            <div class="clone_url">
            Visit Project repo at:
            <a href="${repo.clone_url}">
                 ${repo.name}
            </a>
            </div>
        </article>`
        });
    })
};

const form=document.querySelector('form');
form.addEventListener('submit',event=>{
    event.preventDefault();
    username=form.anonUsername.value;
    gitUserAPI=`https://api.github.com/users/${username}`;
    repoAPI=`${gitUserAPI}/repos`;
    makePortfolio();
    makeRepo();

})


makePortfolio();
makeRepo();