export const deleteTask = (e) => {
    removeData(e)
}

const removeData = (input) => {
    let index = `${input.target.parentElement.parentElement.children[3].textContent}`-1;//Local storage array index
    let dataArray = JSON.parse(localStorage.getItem('tasks'));//old storage array data
    dataArray.splice([index], 1);//data to be removed
    return localStorage.setItem('tasks', JSON.stringify(dataArray));//reset of storage array data
}