const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session=require('express-session');
const cookieparser=require('cookie-parser');
const MongoStore=require("connect-mongo")(session);

// DON'T HARDCODE connection string here, read it from process.env
const connectionString = "mongodb+srv://dbuser:dbuser@cluster0.vsbgp.mongodb.net/auth?retryWrites=true&w=majority";
const dbOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, auto_reconnect: true };
mongoose.connect(connectionString, dbOptions);
mongoose.connection.on('connected', function () {
    console.log("Connected to DB");
});
mongoose.connection.on('error', function (err) {
    console.log("Error while connecting to DB: " + err);
});

const app = express();
app.use(express.static(__dirname + '/dist/meanAuth'));
app.use(express.json());
app.use(cookieparser());
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret: 'mysecret',
    saveUninitialized: true,
    resave:true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use((req,res,next)=>
{
    console.log(req.session);
    next();
})
const { OAuth2Client } = require('google-auth-library');
const { stringify } = require('querystring');
const { json } = require('express');
const { LOG_LOG } = require('karma/lib/constants');
const client = new OAuth2Client('709679406974-ct18mkgug340hf9682gmkm04qhgj8rj4.apps.googleusercontent.com');
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: '709679406974-ct18mkgug340hf9682gmkm04qhgj8rj4.apps.googleusercontent.com',  // Specify the CLIENT_ID of the app that accesses the backend
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];

    return payload;
}
var userSchema = new mongoose.Schema({
    email: String,
    google: {
        id: String,
        photoUrl: String,
        name: String
    },
    facebook: {
        id: String,
        photoUrl: String,
        name: String
    }
});
var User = mongoose.model('User', userSchema);


app.post('/api/google/verify', async (req, res) => {
    try {
        let payload = await verify(req.body.token);
        if(payload.email_verified)
            req.session.user={name: payload.name, photoUrl: payload.picture };
        console.log(req.session);
        let user = await User.findOne({ email: payload.email });
        if (!user) {
            var newUser = new User(
                { email: payload.email, google: { id: payload.sub, name: payload.name, photoUrl: payload.picture } }
            );
            user = await newUser.save();
        }
        res.json({ msg: "Okay"});
    } catch (e) {
        console.log('Error while google verify ' + e);
        res.status(401).json({ msg: "Noooo" });
    }
})

app.get('/api/session',(req,res)=>
{
    if(req.session && req.session.user)
        res.json({'user':req.session.user,'status':true});
    else
    res.json({'user':null,'status':false});      
}
)
app.get('/logout',(req,res)=>
{
    console.log(req.session)
    req.session.destroy();
    res.json({status:true});
}
)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log("Server started...") });