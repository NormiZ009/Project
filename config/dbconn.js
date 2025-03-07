const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE, {
    // uesNewUrlParser: true,
    // useUnifiedTopology: true
})
.then(() => {
    console.log("database is connected");
  })
  .catch((err) => {
    console.log("database is not connected", err);
  });