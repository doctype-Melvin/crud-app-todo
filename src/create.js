//////DOM Start
const main = document.querySelector('.main')
const button = document.createElement('button')
button.textContent = 'Button'
main.append(button);

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

const addTaskBtn = document.querySelector('.newTaskBtn');
addTaskBtn.onclick = (e) => {
    e.preventDefault();
    addToStorage()
    taskModal.style.display = 'none'
}
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