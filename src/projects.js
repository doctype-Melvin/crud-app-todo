import { addTaskBtn, buttons, closeSb, display, makeTask, newTask, openForm, sidebar, createCard } from "./create";

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

//Accesses project's title and toDo source
let source //ToDo array
let object //Title
const accessObj = (e) => {
    let title = e.target.textContent;
    let source = JSON.parse(localStorage.getItem('projects')).filter(item => title == item.title)[0].toDo;
    return {source, title}
}
//Creates nodelist of project links and adds eventlisteners
const projectTabs = document.querySelectorAll('.projectLink');
projectTabs.forEach(link => link.addEventListener('click', (e) => {
    closeSb();
   source = accessObj(e).source;
   object = accessObj(e).title
    clearDisplay()
    readStorage()
}))
//Single button in projects view to add new task
const newTaskBtn = document.createElement('button');
newTaskBtn.classList.add('projectTaskBtn');
newTaskBtn.textContent = 'New task';

//Renders the project tab view
const clearDisplay = () => {
    while (display.firstChild){
        display.removeChild(display.lastChild)
    }
    newProject.style.display = 'none';
    newTask.style.display = 'none';
    buttons.append(newTaskBtn)
}

//Replaces button on form
const replaceSubmitBtn = () => {
    addTaskBtn.style.display = 'none';
    const formTaskBtn = document.createElement('button');
    formTaskBtn.classList.add('btn');
    formTaskBtn.textContent = 'Add task';
    document.querySelector('.taskForm').append(formTaskBtn);
    return {
        formTaskBtn
    }
}

// Updates toDo array and localStorage
replaceSubmitBtn().formTaskBtn.addEventListener('click', (e) => {
    e.preventDefault()
    let oldData = JSON.parse(localStorage.getItem('projects'));
    let newData = pushToArray(source).array;
    oldData.filter(item => item.title == object)[0].toDo = newData;
    localStorage.setItem('projects', JSON.stringify(oldData));
})

//Opens task form
newTaskBtn.addEventListener('click', () => {
    openForm();
})

//Pushes new task to toDo array
const pushToArray = (input) => {
    let newTask = makeTask();
    let array = input
    array.push(newTask);
    return {array}
}

const readStorage = () => {//Removes all cards and appends them anew
    const tasksArray = source
    if (tasksArray != null){
        while (display.firstChild) { //remove all appended tasks
            display.removeChild(display.lastChild);
            //index = 0
        }
        tasksArray.map(item => display.append(createCard(Object.values(item))))
    }
}