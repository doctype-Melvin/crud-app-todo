//////DOM Start
const display = document.querySelector('.display'); //Section where tasks are rendered
const controls = document.querySelector('.controls');
const main = document.querySelector('.main')
const button = document.createElement('button')
button.textContent = 'Button'
controls.append(button);

const taskModal = document.querySelector('.taskModal');
const openForm = () => {
    document.querySelector('.taskForm').reset();
    taskModal.style.display = 'block';
}
button.addEventListener('click', () => {
    openForm();
    window.onclick = function (e){
        if(e.target == taskModal){
            taskModal.style.display = 'none'
        }
    }
});

//Form input fields
const task = document.querySelector('#task');
const note = document.querySelector('#note');
const date = document.querySelector('#date');

const makeTask = () => { //Creates object from form inpt values
    let newTask = {};
    newTask['task'] = task.value;
    newTask['note'] = note.value;
    newTask['date'] = date.value;
    return newTask
}

//Creates the dom nodes for task cards
const createCard = ([task, note, date]) => {
    let card = document.createElement('div');
    card.classList.add('card');
    let title = document.createElement('span');
    title.classList.add('cardTitle');
    title.textContent = task;
    let description = document.createElement('span');
    description.classList.add('cardNote');
    description.textContent = note;
    let due = document.createElement('span');
    due.classList.add('dateNote');
    due.textContent = date;
    
    card.append(title, description, due)
    return card
}

const addTaskBtn = document.querySelector('.newTaskBtn');
addTaskBtn.onclick = (e) => {
    e.preventDefault();
    addToStorage();
    readStorage();
    taskModal.style.display = 'none'
}

const readStorage = () => {
    const tasksArray = JSON.parse(localStorage.getItem('tasks'))
    if (tasksArray != null){
        while (display.firstChild) { //remove all appended tasks
            display.removeChild(display.lastChild)
        }
        tasksArray.map(item => display.append(createCard(Object.values(item))))
    }
}
readStorage()
//tasksArray.map(item => display.append(createCard(Object.values(item))))

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
