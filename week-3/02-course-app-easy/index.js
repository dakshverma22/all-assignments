const express = require('express');
const app = express();
const utils = require('./utils')
const {response} = require("express");
app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

// Admin routes
app.post('/admin/signup', (req, res) => {
  let response = null
  try{
    const admin = {
      username:req.body.username,
      password:req.body.password
    }
    ADMINS.push(admin)
    response = res.status(200).json({ message: 'Admin created successfully' })
  }catch (e) {
    response = res.status(500).json({ message: 'Admin not created' })
  }
  return response
  // logic to sign up admin
});

app.post('/admin/login', (req, res) => {
  // logic to log in admin
  let response = null
  try{
    const username = req.headers.username
    const password = req.headers.password
    const admin = ADMINS.find(admin => admin.username === username)
    if(admin && admin.password === password){
      response = res.status(200).json({ message: 'Logged in successfully' })
    }
  }catch (e){
    response = res.status(404).json({ message: 'Unable to login' })
  }
  return response
});

app.post('/admin/courses', (req, res) => {
  // logic to create a course
  let response = null
  try {
    const username = req.headers.username
    const password = req.headers.password
    const admin = ADMINS.find(admin => admin.username === username)
    if(!(admin && admin.password === password)){
      response = res.status(400).json({ message: 'Invalid admin credentials' })
    }else {
      const id = Date.now()
      const course = {...req.body, courseId: id}
      COURSES.push(course)
      response = res.status(200).json({ message: 'Course created successfully', courseId: id })
    }
  }catch (e) {
    response = res.status(404).json({ message: 'Could not create course'})
  }
  return response
});

app.put('/admin/courses/:courseId', (req, res) => {
  // logic to edit a course
  let response = null
  try{
    const courseId = req.params.courseId
    const username = req.headers.username
    const password = req.headers.password
    const admin = ADMINS.find(admin => admin.username === username)
    if(!(admin && admin.password === password)){
      response = res.status(400).json({ message: 'Invalid admin credentials' })
    }else {
      const updatedCourse = {...req.body.body}
      let course = COURSES.find(course => course.courseId === courseId)
      course = updatedCourse
      response = res.status(200).json({ message: 'Course updated successfully' })
    }
  }catch (e) {
    response = res.status(400).json({ message: 'Could not update the course' })
  }
  return response
});

app.get('/admin/courses', (req, res) => {
  // logic to get all courses
  let response = null
  try{
    const courseId = req.params.courseId
    const username = req.headers.username
    const password = req.headers.password
    const admin = ADMINS.find(admin => admin.username === username)
    if(!(admin && admin.password === password)){
      response = res.status(400).json({ message: 'Invalid admin credentials' })
    }else {
      response = res.status(200).json({courses:COURSES})
    }
  }catch (e) {
    response = res.status(400).json({ message: 'Cannot get All the courses' })
  }
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
  let response = null
  try{
    const user = {...req.body}
    USERS.push(user)
    response = res.status(200).json({ message: 'User created successfully' })
  }catch (e) {
    response = res.status(400).json({ message: 'Can not create User' })
  }
  return response
});

app.post('/users/login', (req, res) => {
  // logic to log in user
  let response = null
  try{
    const username = req.headers.username
    const password = req.headers.password
    const user = USERS.find(user => user.username === username)
    if(user && user.password === password){
      response = res.status(200).json({ message: 'Logged in successfully' })
    }
  }catch (e){
    response = res.status(404).json({ message: 'Unable to login' })
  }
  return response
});

app.get('/users/courses', (req, res) => {
  // logic to list all courses
  let response = null
  try{
    const username = req.headers.username
    const password = req.headers.password
    const user = USERS.find(user => user.username === username)
    if(!(user && user.password === password)){
      response = res.status(400).json({ message: 'Invalid Creds' })
    }else {
      response = res.status(200).json({courses: COURSES})
    }
  }catch (e){
    response = res.status(404).json({ message: 'Unable to login' })
  }
  return response
});

app.post('/users/courses/:courseId', (req, res) => {
  // logic to purchase a course
  let response = null
  try{
    const username = req.headers.username
    const password = req.headers.password
    const user = USERS.find(user => user.username === username)
    if(!(user && user.password === password)){
      response = res.status(404).json({message:'Invalid creds'})
    }else {
      const course = COURSES.find(course => course.id === req.params.courseId)
      user['courses'] = [course]
      response = res.status(200).json({ message: 'Course purchased successfully' })
    }
  }catch (e) {
    response = res.status(400).json({ message: 'Can not purchase course' })
  }
  return response
});

app.get('/users/purchasedCourses', (req, res) => {
  // logic to view purchased courses
  let response = null
  try{
    const username = req.headers.username
    const password = req.headers.password
    const user = USERS.find(user => user.username === username)
    if(!(user && user.password === password)){
      response = res.status(400).json({ message: 'Invalid Creds' })
    }else {
      const purchasedCourses = user.courses
      response = res.status(200).json({purchasedCourses})
    }
  }catch (e) {
    response = res.status(404).json({ message: 'Can not get purchased courses' })
  }
  return response
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
