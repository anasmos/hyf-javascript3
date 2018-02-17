'use strict';
//const hyf_path = "https://api.github.com/repos/HackYourFuture/";
//const user = 
function createAndAppend(name, parent, innerHTML) {
    const child = document.createElement(name);
    parent.appendChild(child);
    if (innerHTML !== undefined) {
        child.innerHTML = innerHTML;
    }
    return child;
}
const container = document.getElementById('container');
const containerContribut = document.getElementById('containerContribut');
const hyfButton = document.getElementById('repo-search');
const usernameButton = document.getElementById('username-search');
const search = document.getElementById('search-box');

function fetchJSON(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'json';
        xhr.onload = () => resolve(xhr.response);
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
    });
}
// fetchJSON('https://api.github.com/orgs/HackYourFuture/repos').then(data => {
//     console.log(data);
// });
// function printData() {
//     fetchJSON('https://api.github.com/orgs/HackYourFuture/repos').then(data => {
//         const img = document.createElement('img');
//         img.src = data[0].owner.avatar_url;
//         container.appendChild(img);
//         console.log(data[0].owner.avatar_url);
//     });
// }
function repoInfo() {
    //window.location.reload(false);
    fetchJSON("https://api.github.com/repos/HackYourFuture/" + search.value).then(data => {
        if (!data.name) {
            createAndAppend('h3', container, `this ${search.value} Repositorie is not found`);
        }
        const a = document.createElement('a');
        a.href = data.html_url;
        a.target = '_blank';
        a.id = 'a-id';
        const div = createAndAppend('div', a);
        div.className = 'div-hyf';
        const img = document.createElement('img');
        img.className = 'imgRepo';
        img.src = data.owner.avatar_url;
        div.appendChild(img);
        container.appendChild(a);
        const ul = createAndAppend('ul', div);
        createAndAppend('li', ul, "name of the repo: " + data.name);
        createAndAppend('li', ul, "The Description: " + data.description);
        createAndAppend('li', ul, "created by: " + data.owner.login);
        createAndAppend('li', ul, "created at: " + data.created_at);
        createAndAppend('li', ul, "last update at: " + data.updated_at);
        const contribute = data.contributors_url;
        fetchJSON(contribute).then(items => {
            createAndAppend('h1', containerContribut, 'contributors:');
            items.forEach(item => {
                const divContribut = createAndAppend('div', containerContribut);
                divContribut.className = 'subdiv';
                createAndAppend('h2', divContribut,'name of the contributor:  '+ item.login);
               const imgcon= createAndAppend('img', divContribut);
                imgcon.src = item.avatar_url;
                imgcon.className = 'imgRepo';
            });
        });
    });
}
hyfButton.addEventListener('click', repoInfo);
function usernameInfo() {
    fetchJSON("https://api.github.com/users/" + search.value + "/repos").then(datas => {
        if (!datas[0]) {
            createAndAppend('h3', container, `this ${search.value} user is not found`);
        }
        datas.forEach(data => {
            const a = document.createElement('a');
            a.href = data.html_url;
            a.target = '_blank';
            a.id = 'a-id';
            const div = createAndAppend('div', a);
            div.className = 'div-hyf';
            const img = document.createElement('img');
            img.className = 'imgRepo';
            img.src = data.owner.avatar_url;
            div.appendChild(img);
            const subdiv = document.createElement('div');
            subdiv.className = 'subdiv';
            container.appendChild(subdiv);
            subdiv.appendChild(a);
            const ul = createAndAppend('ul', div);
            createAndAppend('li', ul, "name of the repo: " + data.name);
            createAndAppend('li', ul, "The Description: " + data.description);
            createAndAppend('li', ul, "created by: " + data.owner.login);
            createAndAppend('li', ul, "created at: " + data.created_at);
            createAndAppend('li', ul, "last update at: " + data.updated_at);
        });
    });
}
usernameButton.addEventListener('click', usernameInfo);
