// =================================
// ======= libararies required =====
// =================================
const mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    validator = require('validator'),
    nodemailer = require('nodemailer') ,
    smtpTransport = require('nodemailer-smtp-transport')

// =======================================
// ====== Institution Schema =============
// =======================================

const institutionSchema = new mongoose.Schema({
    name:               {type: String, required: true, unique: true},
    emailAddress:       {type: String, required: true, unique: true},
    password:           {type: String, required: true},
    location:           {type: String, required: true},
    transcriptTypes:    [],
    staff:              [],
    verificationCode:  {type: Number},
    isActive:           {type: Boolean, default: true},
    isVerified:         {type: Boolean, default: false}

}, {timestamps: true})


// =============================================
// ======= statics functions ===================
// =============================================

institutionSchema.statics.signup = async function (name, emailAddress, location, password, verfificationCode) {
    // check if all inputs are filled
    if(!name || !emailAddress || !location || !password){
        throw Error('All fields are required !')
    }

    // use validator to validate email
    if(!validator.isEmail(emailAddress)){
        throw Error('email is not valid')
    }

    // use validator check if password is strong enough
    if(!validator.isStrongPassword(password)){
        throw Error('password is not strong enough')
    }

    // check if email exists in database
    const exists = await this.findOne({emailAddress}) 

    // throw error if email already exists
    if(exists){
        throw Error('email already in use !')
    }

    // check if name exists in database
    const nameExists = await this.findOne({name})

    // throw error if name already exists
    if(nameExists){
        throw Error('name already exists in our database')
    }

    // generating salt to hash password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    // saving instition in database
    const institution = await this.create({name, emailAddress, location, password: hash, verfificationCode})

    // returning saved institution as json
    return institution
}

// sending email to staff
institutionSchema.statics.sendEmail = async function (email, message) {
    let transport = nodemailer.createTransport(smtpTransport({
        host: 'smtp.gmail.com',
        secure: true,
        port: 465,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    }))

    const info = await transport.sendMail({
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: 'INVITATION: RecordDigita Signup invite',
        text: message
    }, (err, sent)=>{
        if(err){
            console.log('error send email')     
        }else{
            console.log('succesfully sent', sent)
        }
    })
}

// function to login admin
institutionSchema.statics.login = async function (email, password) {

    // validation
    if(!email || !password){
       throw Error('All fields must be filled')
   }

    // find an email in database   
   const institution = await this.findOne({email})

    // not exist throw error   
   if(!institution){
       throw Error('Incorrect email')
   }

   // if account inactive throw error    
   if(!institution.isVerified){
        throw Error('sorry your account is disabled')
    }

    // if account inactive throw error    
   if(!institution.isActive){
        throw Error('sorry your account is disabled')
   }

   const match = await bcrypt.compare(password, institution.password)

   if(!match){
       throw Error('Incorrect password')
   }

   return institution

}



// ======= modeling schema =====================
const Institution = mongoose.model('institution', institutionSchema)

module.exports = Institution
