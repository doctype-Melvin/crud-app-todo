export const editData = (e) => {
    let index = `${e.target.parentElement.parentElement.children[3].textContent}`-1
    let dataArray = JSON.parse(localStorage.getItem('tasks'));//old storage array data
}