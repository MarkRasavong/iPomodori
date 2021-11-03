import axios from 'axios';

export default axios.create({
    baseURL: 'https://pomodori-server.herokuapp.com/'
});

