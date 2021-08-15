require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

//Data Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//connecting MongoDB 
mongoose.connect(process.env.MONGO_DB_URI || 'mongodb://localhost:27017/iPomodori', { useNewUrlParser: true, useUnifiedtopology: true  });
mongoose.connection.on('connected', () => (
    console.log('database connesso')
))

//Creating DB Schemas/Models

const goalsSchema = new mongoose.Schema({
    name: {
        type : String,
        require: [true, 'Please add create a goal']
    },
});

const Goal = mongoose.model('Goal', goalsSchema);

const recordsSchema = new mongoose.Schema({
    sessionTime: Number,
    goalName: String,
    timeStamped: String,
    date: {
        type: String,
        default: Date.now()
    }
});

const Record = mongoose.model('Record', recordsSchema);


/* 
saved a new object to initalize the Goals/Records database;
const goal = new Goal({
    name: 'Learn Italian'
});
goal.save(err => {
    if(err){
        console.log(err)
    }else{
        console.log('goals has been saved')
    }
});

const record = new Record({
    goalName: 'Learn Italian',
    sessionTime: 5,
    timeStamped: "10:21:28"
});

record.save(err => {
    if (err) {
        console.log(err)
    }else{
        console.log('data has beed saved')
    }
});
*/


app.get('/getTasks' , async (req, res) =>{
    
    try{
        const getGoals = await Goal.find();
        res.status(200).json(getGoals)
    } catch (err){
        res.status(404).json({ messsage : err.messsage })
    }
});

app.post('/saveTask', (req, res) => {
    const { name } = req.body;
    const newGoal = new Goal( {name: name} );

    newGoal.save(err => {
        if(err){
            res.status(500).json({ msg: 'Sorry, interal server errors' })
        }else{
            res.json({
                msg: 'Data has been saved to DB'
            });
        }
    });
});


//Uses our build to serve to heroku 
//app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/index.html'))
})

app.listen(PORT, () => (
    console.log(`Server is starting at ${PORT}`)
));