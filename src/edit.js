export const editData = (e) => {
   let index = getIndex(e).index;
    let obj = getObj(e).obj
    return {
        index,
        obj
    }
}

export const getIndex = (e) => {
    let index = `${e.target.parentElement.parentElement.children[3].textContent}`-1;
    return {index}
}

export const getObj = (e) => {
    let dataArray = JSON.parse(localStorage.getItem('tasks'));
    let obj = dataArray[getIndex(e).index]
    return {obj}
}

export const switchBtn = () => { //Changes button text
    let oldBtn = document.querySelector('.newTaskBtn');
    oldBtn.textContent = 'OK'
    
}

export const editObj = (obj) => {
    let task = document.getElementById('task').value;
    let note = document.getElementById('note').value;
    let date = document.getElementById('date').value;
    //If there is no input keep the old data 
    obj['task'] = task;
    obj['note'] = note;
    obj['date'] = date;
    return obj
}

export const replaceObj = (obj, index) => { //Replaces the old obj data with the new data
    let oldData = JSON.parse(localStorage.getItem('tasks'));
    oldData.splice(index, 1, obj);
    localStorage.setItem('tasks', JSON.stringify(oldData))
}