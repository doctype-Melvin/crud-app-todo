import { buttons, sidebar } from "./create";

//Create projects array in local storage
const createProjectArr = () => {
    if(localStorage.getItem('projects') == null){
        localStorage.setItem('projects', '[]')
    }
    let newData = makeProject();
    let oldState = JSON.parse(localStorage.getItem('projects'));
    oldState.push(newData);
    localStorage.setItem('projects', JSON.stringify(oldState))
};

//Button that triggers the projects form
const newProject = document.createElement('button');
newProject.classList.add('projectBtn');
newProject.textContent = 'New Project'
buttons.append(newProject)

//Fn opens project form
const projectModal = document.querySelector('.projectModal')
const openProjectForm = () => {
    projectModal.style.display = 'block';
    window.onclick = function (e){
        if(e.target == projectModal){
            projectModal.style.display = 'none';
        }
    }
}

//Creates project object
const makeProject = () => {
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    let newObject = {};
    newObject['title'] = title.value;
    newObject['description'] = description.value;
    newObject['toDo'] = [];
    return newObject
}
const tabContainer = document.createElement('div');
tabContainer.classList.add('tabContainer');
const projectsTitle = document.createElement('div');
projectsTitle.classList.add('projectsTitle');
projectsTitle.textContent = 'Projects';
sidebar.append(projectsTitle, tabContainer);

//Create tab in sidebar
const makeTab = (title) => {
    let element = document.createElement('div');
    element.classList.add('projectLink');
    element.textContent = title;
    return element
}

//Add project to local storage
const addProject = document.querySelector('.newProjectBtn');
addProject.addEventListener('click', (e) => {
    createProjectArr();
    renderStorage();
    e.preventDefault();
    projectModal.style.display = 'none';
})

//
const renderStorage = () => {//Removes all cards and appends them anew
    const projectsArray = JSON.parse(localStorage.getItem('projects'))
    if (projectsArray != null){
        while (tabContainer.firstChild) { //remove all appended projects
            tabContainer.removeChild(tabContainer.lastChild);
            //index = 0
        }
        projectsArray.map(item => tabContainer.append(makeTab(item.title)))
    }
}
renderStorage()
newProject.addEventListener('click', () => openProjectForm())