const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Init middleware
app.use(express.json({
  extended: false
}))

const PORT = process.env.PORT || 5353;

//Connect DB
connectDB();

app.get('/', (req, res) => res.send('API Running'));

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

app.listen(PORT, () => console.log('\x1b[36m%s\x1b[0m',`Server started on port ${PORT}`));
