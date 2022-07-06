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
    //Form input fields values
    let task = document.getElementById('task').value;
    let note = document.getElementById('note').value;
    let date = document.getElementById('date').value;

    //Old object values
    let oldTask = obj['task'];
    let oldNote = obj['note'];
    let oldDate = obj['date'];
    
    //Tests for existance of old values
    (task == '' && oldTask != '') ? obj['task'] = oldTask : obj['task'] = task;
    (note == '' && oldNote != '') ? obj['note'] = oldNote : obj['note'] = note;
    (date == '' && oldDate != '') ? obj['date'] = oldDate : obj['date'] = date;

    return obj
}

export const replaceObj = (obj, index) => { //Replaces the old obj data with the new data
    let oldData = JSON.parse(localStorage.getItem('tasks'));
    oldData.splice(index, 1, obj);
    localStorage.setItem('tasks', JSON.stringify(oldData))
}