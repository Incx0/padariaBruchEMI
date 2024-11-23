const mongoose = require('mongoose');

const connectDatabase = async () => {

    console.log('Waiting connection of mongo(-_-)...')

    await mongoose.connect('mongodb+srv://incx:terraria313234353@padariabrunch2024.diseq.mongodb.net/db?retryWrites=true&w=majority')
    .then(() => console.log('MongoDB has connected too, hellyeaa🦅🦅\(*o*)/!'))
    .catch((error) => console.log(error));
}

module.exports = connectDatabase