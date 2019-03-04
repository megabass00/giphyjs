const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/giphy-app';
if (process.env.NODE_ENV === 'test') {
    mongoURI = 'mongodb://localhost/giphy-app-TEST';
}
mongoose.connect(mongoURI, { 
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
.then(db => console.log(`DB is connected to: ${mongoURI}`.green))
.catch(error => console.log(error));