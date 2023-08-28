const express = require("express");
const app = express();

//const mysql=require('mysql');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set('view engine','ejs');


let tasks = []; // For storing tasks temporarily

app.get('/', (req, res) => {
  res.render('index', { tasks: tasks });
});

app.get('/edit/:id', (req, res) => {
    const taskId = req.params.id;
    const task = tasks[taskId];
    res.render('edit', { task: task, taskId: taskId });
  });

  app.post('/add', (req, res) => {
    const newTask = req.body.task;
    tasks.push(newTask);
    res.redirect('/');
  });
  
  app.post('/edit/:id', (req, res) => {
    const taskId = req.params.id;
    tasks[taskId] = req.body.task;
    res.redirect('/');
  });
  
  app.post('/delete/:id', (req, res) => {
    const taskId = req.params.id;
    tasks.splice(taskId, 1);
    res.redirect('/');
  });

app.listen(5000, ()=>{
    console.log('Server is running on port 5000');
})

