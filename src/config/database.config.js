const mongoose = require('mongoose');


const dbConnect = () => {
  mongoose.connect('mongodb+srv://ankitultracures:6UKAIlfBoTcdu3Aw@cluster0.um93jp4.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });
}

module.exports = dbConnect;

