const express = require('express');
// const mongoose = require('mongoose');

const app = express();
const port = process.env.port || 3000;

app.use(express.static('public'));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// mongoose.connect('', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// mongoose.connection.on('connected', () => {
//   console.log('✅ Connected to MongoDB!');
// });

// Routes
const usersRoute = require('./routes/users.routes');
app.use('/api/users', usersRoute);

app.listen(port, () => {
  console.log('App listening to: ' + port);
});
