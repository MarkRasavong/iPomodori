require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

//Data Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*'
}));

//connecting MongoDB 
mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedtopology: true });
mongoose.connection.on('connected', () => (
    console.log('database connesso')
))

//Creating DB Schemas/Models

const goalsSchema = new mongoose.Schema({
    name: {
        type: String,
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


app.get('/', async (req, res) => {
    const getGoals = await Goal.find();
    res.status(200).json(getGoals);
    res.redirect('/');
});

app.post('/', (req, res) => {
    const { name } = req.body;
    const newGoal = new Goal({ name: name });

    newGoal.save(err => {
        if (err) {
            res.status(500).json({ msg: 'Sorry, interal server errors' })
        } else {
            res.json({
                msg: 'Data has been saved to DB'
            });
            res.redirect('/');
        }
    });
});

app.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Goal.deleteOne({ _id: id });

    res.json({ message: 'Post Deleted Succesfully' });
    res.redirect('/');
});

app.get('/record', async (req, res) => {
    const getRecords = await Record.find();
    res.status(200).json(getRecords)
    res.redirect('/');
});

app.post('/record', (req, res) => {
    const { goalName, sessionTime, timeStapmed } = req.body;
    const newRecord = new Record({
        goalName: goalName,
        sessionTime: sessionTime,
        timeStamped: timeStapmed
    });

    newRecord.save(err => {
        if (err) {
            res.status(500).json({ msg: 'Sorry, interal server errors' })
        } else {
            res.json({
                msg: 'Data has been saved to DB'
            });
            res.redirect('/');
        }
    });
});

app.delete('/record/:goalName', async (req, res) => {
    const { goalName } = req.params;

    await Record.deleteMany({ goalName: goalName });

    res.json({ message: 'Post Deleted Succesfully' });
    res.redirect('/');
});



//Uses our build to serve to heroku 
//app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/index.html'))
})

app.listen(PORT, () => (
    console.log(`Server is starting at ${PORT}`)
));
