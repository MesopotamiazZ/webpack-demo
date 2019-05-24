import _ from 'lodash';
import printMe from './print';
import './css/style.css';
import avatar from '../assets/images/avatar.jpg';
import $ from 'jquery';

function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');

  $(btn).html('click!');
  btn.onclick = printMe;

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.className = 'hello';


  let img = new Image();
  img.src = avatar;
  element.appendChild(img);
  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());
if (module.hot) {
  module.hot.accept('./print.js', function () {
    console.log('Accepting the updated printMe module!');
    printMe();
  })
}