var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose'),
    //require the schemas
    loanRequest = require('./models/loanRequest'),
    loan = require('./models/Loan'),
    guarantors = require('./models/Guarantor'),
    users = require('./models/User');
// connect to mongodb
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/muchemi");
var bodyparser = require('body-parser');

var route = require('./routes/routes');

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use(function(req, res, next){
   // CORS headers
   res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
   // Set custom headers for CORS
   res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
   if (req.method == 'OPTIONS') {
     res.status(200).end();
   } else {
     next();
   }
});

app.use(route);



const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
});
