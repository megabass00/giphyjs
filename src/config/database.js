const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/giphy-app';
mongoose.connect(mongoURI, { 
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(db => console.log('DB is connected to: '.blue + (mongoURI).cyan))
.catch(error => console.log(error));