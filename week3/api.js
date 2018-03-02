'use strict';
{
    function renderPage() {
        const repoContainer = createAndAppend('div', document.body, null, {
            id: 'container'
        });
        const userContainer = createAndAppend('div', document.body, null, {
            id: 'usernames'
        });
        const contributorsContainer = createAndAppend('div', document.body, null, {
            id: 'containerContribut'
        });

        const searchInput = document.getElementById('search-box');

        const clearContainers = () => {
            repoContainer.innerHTML = "";
            userContainer.innerHTML = "";
            contributorsContainer.innerHTML = "";
        };

        document
            .getElementById('repo-search')
            .addEventListener('click', () => {
                clearContainers();
                onRepoHyfClick(repoContainer, contributorsContainer, searchInput.value);
            });

        document
            .getElementById('username-search')
            .addEventListener('click', () => {
                clearContainers();
                onUserNameClick(userContainer, searchInput.value);
            });
    }

    function onRepoHyfClick(repoContainer, contributorsContainer, repoName) {
        const repoUrl = "https://api.github.com/repos/HackYourFuture/" + repoName;
        fetchJSON(repoUrl)
            .then(data => {
                if (!data.name) {
                    throw new Error(`this ${repoName} Repository is not found`);
                }

                const a = createAndAppend('a', repoContainer, null, {
                    href: data.html_url,
                    target: '_blank',
                    id: 'a-id'
                });

                const div = createAndAppend('div', a, {
                    class: 'div-hyf'
                });

                createAndAppend('img', div, null, {
                    class: 'imgRepo',
                    src: data.owner.avatar_url
                });

                const ul = createAndAppend('ul', div);

                createAndAppend('li', ul, "Name of the repo: " + data.name);
                createAndAppend('li', ul, "Description: " + data.description);
                createAndAppend('li', ul, "Created by: " + data.owner.login);
                createAndAppend('li', ul, "Created at: " + data.created_at);
                createAndAppend('li', ul, "Last update at: " + data.updated_at);

                return fetchJSON(data.contributors_url);
            })
            .then(items => {
                createAndAppend('h1', contributorsContainer, 'contributors:');
                items.forEach(item => {
                    const div = createAndAppend('div', contributorsContainer, null, {
                        class: 'subdiv'
                    });
                    createAndAppend('h2', div, 'Contributor name:  ' + item.login);
                    createAndAppend('img', div, null, {
                        class: 'imgRepo',
                        src: item.avatar_url
                    });
                });
            })
            .catch(error => {
                createAndAppend('h3', repoContainer, error.message);
            });
    }

    function onUserNameClick(userContainer, userName) {
        const url = "https://api.github.com/users/" + userName + "/repos";
        fetchJSON(url)
            .then(items => {
                if (!items[0]) {
                    throw new Error(`User ${userName} is not found`);
                }

                items.forEach(item => {
                    const username = createAndAppend('div', userContainer, null, {
                        class: 'username'
                    });

                    const a = createAndAppend('a', username, null, {
                        href: item.html_url,
                        target: '_blank',
                        id: 'a-id'
                    });

                    const div = createAndAppend('div', a, null, {
                        class: 'details'
                    });

                    createAndAppend('img', div, null, {
                        class: 'imgRepo',
                        src: item.owner.avatar_url
                    });

                    const ul = createAndAppend('ul', div);
                    createAndAppend('li', ul, "Name of the repo: " + item.name);
                    createAndAppend('li', ul, "Description: " + item.description);
                    createAndAppend('li', ul, "Created by: " + item.owner.login);
                    createAndAppend('li', ul, "Created at: " + item.created_at);
                    createAndAppend('li', ul, "Last update at: " + item.updated_at);
                });
            })
            .catch(error => {
                createAndAppend('h3', userContainer, error.message);
            });
    }

    function createAndAppend(name, parent, innerHTML, attributes) {
        attributes = attributes || {};
        const child = document.createElement(name);
        parent.appendChild(child);
        if (innerHTML != null) {
            child.innerHTML = innerHTML;
        }
        Object.keys(attributes).forEach(name => {
            child.setAttribute(name, attributes[name]);
        });
        return child;
    }

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

    renderPage();
}
