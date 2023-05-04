const express = require('express');
const router = express.Router();

const Task = require('../models/task')

// Get all tasks
router.get('/', async(req, res)=> {
    try{
        const tasks = await Task.find();
        res.json(tasks)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

// Create task
router.post('/', async(req, res)=> {
    const task = new Task({
        task_id: req.body.task_id,
        username: req.body.username,
        email: req.body.email,
        role: req.body.role,
        title: req.body.title,
        description: req.body.description,
        date: req.body.date
    })

    try{
        const newTask = await task.save();
        res.status(201).json(newTask)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

// Create middleware for our :task_id routes
async function getTask(req, res, next){
    let task;
    try{
        // ใช้ _id หา, return เป็น json 
        // task = await Task.findById(req.params.id);

        // ใช้ task_id หา, return เป็น array ที่เป็น json ต้องระบุช่องด้วยเวลาใช้
        task = await Task.find({task_id: req.params.id});
        if(task == null){
            return res.status(404).json({message: 'Task not found'})
        }
    }
    catch(err){
        return res.status(500).json({message: err.message})
    }
    res.task = task;
    // ให้ response เลือกเป็น array ช่องแรก
    res.task = res.task[0];
    next()
}

// Get task by task_id
router.get('/:id', getTask, (req, res)=> {
    res.json(res.task)
})

// Update task by ID
router.patch('/:id', getTask, async(req, res)=> {
    if(req.body.task_id != null){
        // res.json({message: "task_id not null"})
        res.task.task_id = req.body.task_id;
    }
    if(req.body.username != null){
        // res.json({message: "username not null"})
        res.task.username = req.body.username;
    }
    if(req.body.email != null){
        // res.json({message: "email not null"})
        res.task.email = req.body.email;
    }
    if(req.body.role != null){
        // res.json({message: "role not null"})
        res.task.role = req.body.role;
    }
    if(req.body.title != null){
        // res.json({message: "title not null"})
        res.task.title = req.body.title;
    }
    if(req.body.description != null){
        // res.json({message: "description not null"})
        res.task.description = req.body.description;
    }
    if(req.body.date != null){
        // res.json({message: "date not null"})
        res.task.date = req.body.date;
    }

    try{
        const updateTask = await res.task.save();
        res.json(updateTask)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

// Delete task by ID
router.delete('/:id', getTask, async(req, res)=> {
    try{
        await res.task.deleteOne();
        res.status(200).json({message: "task deleted"})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

module.exports = router