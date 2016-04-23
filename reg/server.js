var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var methodOverride = require('method-override');
var mailer = require("nodemailer");

    // Use Smtp Protocol to send Email
    var smtpTransport = mailer.createTransport("SMTP",{
        service: "Gmail",
        auth: {
            user: "nehadp.friends@gmail.com",
            pass: "8050602873"
        }
    });

    

mongoose.connect("mongodb://localhost:27017/mydb", function(err){
	if(err){
		console.log(err);
	} else{
		console.log("connected to database");
	}
});

var app = express();

	app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

  var CustomerSchema = new mongoose.Schema({
	serialNum: Number,
	name : String,
	practiceMobile:Number,
	alternate_number:Number,
	isPhoneVerified:Boolean,
	age:Number,
	dob:Date,
	gender:String,
	email:String,
	isEmailVerified:Boolean,
	
	addressLine:String,

	PaymentType:Boolean,
	CardNumber:String,
	IdentityType:String,
	IdentityNumber:String,
	//Identity ProofImage:String,
	city:String,
	pincCode:Number,
	signature:String,
	createAt:Date,
	updateAt:Date,
	userID:String,
	Password:String,
	//practice details
	practiceName : String,
	practiceLocation: String,
	practiceEmail: String,
    subscriptionType:String,
	validity: Date,
	TotalUserAllowed: Number,

   practiceType: String,
   practicePassword : Number,
   practiceUsername : Number,
   practName : String
   
}, {collection: 'Customerlogin'});

var Form = mongoose.model('Form',CustomerSchema);
/*
var form1 = new Form({slno: 'inputName', age: 'inputAge', gender: 'inputGender', date: 'inputDate'});
form1.save();*/


app.get('/list/Customerlogin', function(req, res) {

        // use mongoose to get all todos in the database
        Form.find(function(err, Customerlogin) {
console.log(Customerlogin);
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.send(Customerlogin); // return all todos in JSON format
        });
    });

 app.post('/list/Customerlogin', function(req, res) {
 			
        // create a todo, information comes from AJAX request from Angular
        Form.create({
            name:req.body.practiceName,
            practiceName : req.body.practiceName,
             practiceLocation:req.body.practLocation,
             practiceMobile : req.body.practiceMobile,
             subscriptionType:req.body.multipleSelect,
             practiceUsername : req.body.practiceMobile,
             practicePassword : (Math.ceil(Math.random() * 999999999 +100000000)), 
             practiceEmail : req.body.practiceEmail,
             practName : req.body.practName,
            done : false
        }, function(err,Customerlogin) {
            if (err)
                res.send(err);

console.log("ssss");            // get and return all the todos after you create another
            Form.find(function(err,Customerlogin) {
                if (err){

                    res.send(err)
                }
                res.send(Customerlogin);
                
                var mail = {
        from: "nehadp <nehadp.friends@gmail.com>",
        to: req.body.practiceEmail,
        subject: "eManageHealth",
        text: "Congrats, Your Registration is successfull",
        html: "<b>Congrats, Your Registration is successfull on eManageHealth!!!!</b>"
    }
                smtpTransport.sendMail(mail, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }

        smtpTransport.close();
    });

            });
        });

    });

app.get('/list/Customer', function(req, res){	
Form.find(function(err, Customerlogin){
	if(err)
		res.json(err);
	res.json(Customerlogin);
});
});
app.listen(8081);
    console.log("App listening on port 8080");