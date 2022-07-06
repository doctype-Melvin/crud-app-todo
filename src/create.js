import Edit from './edit.png';
import Delete from './delete.png'
import { deleteTask } from './delete';
import { editData, editObj, replaceObj, switchBtn } from './edit';
import Icon from './burger-icon.png'

//////DOM Start
export const display = document.querySelector('.display'); //Section where tasks are rendered
export const sidebar = document.querySelector('.sidebar');
const controls = document.querySelector('.controls');
export const buttons = document.createElement('div');
buttons.classList.add('addButtons');
const main = document.querySelector('.main')
export const newTask = document.createElement('button')
const closeBtn = document.querySelector('.closeBtn');
export const addTaskBtn = document.querySelector('.newTaskBtn'); //Form button
newTask.textContent = 'New task'
const burgerMenu = () => { //creates the burger menu icon
    let icon = new Image();
    icon.classList.add('burgerMenu')
    icon.src = Icon;
    return {
        icon
    }
}
const burgerBtn = burgerMenu().icon
buttons.append(newTask);
controls.append(burgerBtn, buttons);

const openSb = () => {
    sidebar.style.width = '100vw';
}
export const closeSb = () => {
    sidebar.style.width = '0';
}

burgerBtn.addEventListener('click', () => openSb())
closeBtn.addEventListener('click', () => closeSb())

//Task modal for task creation
export const taskModal = document.querySelector('.taskModal'); 
export const openForm = () => {
    if(isEdit){
        addTaskBtn.textContent = 'OK'
    }else{
        addTaskBtn.textContent = 'Add task'
    }
    document.querySelector('.taskForm').reset();
    taskModal.style.display = 'block';
    window.onclick = function (e){
        if(e.target == taskModal){
            taskModal.style.display = 'none';
            isEdit = false;
        }
    }
}
newTask.addEventListener('click', () => {
    openForm();
});

//Form input fields
const task = document.querySelector('#task');
const note = document.querySelector('#note');
const date = document.querySelector('#date');

export const makeTask = () => { //Creates object from form input values
    let newTask = {};
    newTask['task'] = task.value;
    newTask['note'] = note.value;
    newTask['date'] = date.value;
    return newTask
}

let isEdit = false;
let index = 0//Card index
let data

//Creates the dom nodes for task cards
export const createCard = ([task, note, date]) => {
    //Task details
    index++ //Each card gets an incremented index
    let card = document.createElement('div');
    card.classList.add('card');
        let title = document.createElement('span');
        title.classList.add('cardTitle');
        title.textContent = task;
            let description = document.createElement('span');
            description.classList.add('cardNote');
            description.textContent = note;
                let due = document.createElement('span');
                due.classList.add('cardDate');
                due.textContent = date;
                    //Hidden index span for further task processing (deleting, editing)
                    let position = document.createElement('span');
                    position.classList.add('position');
                    position.textContent = index;
                    position.style.display = 'none';
                    //Edit and delete icons
                    let edit = new Image;
                    edit.src = Edit;
                    edit.classList.add('editBtn');
                        let deleteBtn = new Image;
                        deleteBtn.src = Delete;
                        deleteBtn.classList.add('deleteBtn');
                    let editBtnContainer = document.createElement('div');
                    editBtnContainer.classList.add('editContainer');
                    deleteBtn.addEventListener('click', (e) => {//Delete button removes data from storage and updates UI
                        deleteTask(e);
                        readStorage();
                    })
                    edit.addEventListener('click', (e) => {
                        data = (editData(e).obj);
                        index = (editData(e).index)
                        switchBtn()
                        isEdit = true;
                        openForm()
//In the projects view the edit buttons behave sus
//
                    })
    editBtnContainer.append(edit, deleteBtn)

    card.append(title, description, due, position, editBtnContainer)
    return card
}

addTaskBtn.onclick = (e) => {
    if (!isEdit){
    addToStorage();
    readStorage();
} else {//open form and update local storage data
    editObj(data);
    replaceObj(data, index)
    readStorage()
}
    e.preventDefault();
    taskModal.style.display = 'none';
    isEdit = false;
}

const readStorage = () => {//Removes all cards and appends them anew
    const tasksArray = JSON.parse(localStorage.getItem('tasks'))
    if (tasksArray != null){
        while (display.firstChild) { //remove all appended tasks
            display.removeChild(display.lastChild);
            index = 0
        }
        tasksArray.map(item => display.append(createCard(Object.values(item))))
    }
}
readStorage()

//////DOM End

//Fn updates local storage tasks array
const addToStorage = () => {
    if(localStorage.getItem('tasks') == null){
        localStorage.setItem('tasks', '[]')
    }
    let newData = makeTask();
    let oldState = JSON.parse(localStorage.getItem('tasks'));
    oldState.push(newData);
    localStorage.setItem('tasks', JSON.stringify(oldState))
}
