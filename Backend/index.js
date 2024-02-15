
const express = require('express');
const {connection}=require("./config/db")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const {User} = require('./models/user.model');
const {Post} = require('./models/post.model');

const cors =require('cors')

const app=express();
app.use(express.json())
app.use(cors())


app.get('/', async (req, res) => {
    try {

        const response=await fetch("https://jsonplaceholder.typicode.com/users")
        const users=await response.json()
        res.send(users)
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/addUser', async (req, res) => {
    try {
        const userData = req.body;
        
        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            res.send("user already exists in the database")
        } else {
  
            await User.create(userData);

            res.send("The data is added")
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/addPost/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const postData = req.body;

        await Post.insertMany(postData);
        
        res.redirect('/post/' + userId);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


const port=8080
app.listen(port,async()=>{
    try{
        await connection;
        console.log("The DB is connected!")
    }catch(err){
        console.log(err)
        console.log({"Err":"Something went wrong"})
    }
    console.log(`The server is connected to port ${port}`)
})

