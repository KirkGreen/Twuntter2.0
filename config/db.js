const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('\x1b[36m%s\x1b[0m', 'MongoDB Connected...')
  } catch(err) {
    console.error('\x1b[31m%s\x1b[0m', 'Error:', err.message);
    //Exit process with failure
    process.exit(1)
  }
}

module.exports = connectDB;
