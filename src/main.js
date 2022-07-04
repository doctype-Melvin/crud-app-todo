import './create'
import './read'
import './style.css'
import Icon from './burger-icon.png'

export const toDoApp = ( () => {
    const controls = document.querySelector('.controls');
    let icon = new Image();
    icon.classList.add('burgerMenu')
    icon.src = Icon;
    controls.append(icon);
return {
    icon
}
})()
 
// Storage.prototype.setObj = function (key, value) {
//     this.setItem(key, JSON.stringify(value));
// }

// Storage.prototype.getObj = function (key) {
//     let value = this.getItem(key);
//     return value && JSON.parse(value);
// }



