const mongoose = require('mongoose');

const connectDatabase = async () => {

    console.log('Waiting connection of mongo(-_-)...')

    await mongoose.connect('mongodb://127.0.0.1:27017/ProjetoIntegrado2Ano2024')
        .then(() => console.log('MongoDB has connected too, hellyeaa🦅🦅\(*o*)/!'))
        .catch((error) => console.log(error));

}

module.exports = connectDatabase