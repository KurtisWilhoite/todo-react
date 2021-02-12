import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';



const getDataModern = async()=>{
  var tasks = [];
  

  for(var i=0; i < 3; i++){
    const data = await fetch("http://wsp16pw.course.tamk.cloud/api/v1/tasks/random");
    const dataJson = await data.json();
    tasks[i] = JSON.parse(JSON.stringify(dataJson)).dataObj.data[0].task;
  }
  
  const DATA = [
    {id: "todo-0", name: tasks[0], completed: true},
    {id: "todo-1", name: tasks[1], completed: false},
    {id: "todo-2", name: tasks[2], completed: false}
  ];

  ReactDOM.render(<App tasks={DATA} />, document.getElementById("root"));
}
getDataModern();


reportWebVitals();