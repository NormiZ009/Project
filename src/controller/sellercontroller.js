const Seller = require("../models/seller");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
require('dotenv').config();

exports.sloginview = async (req, res) => {
    res.render('seller/login');
}

exports.slogin = async (req, res) => {
    try {
        console.log(req.body);

        const seller = await Seller.findOne({ name: req.body.name });
        if (!seller) {
            return res.send({ error: 'invalid credentials' });
        }

        const Matchpassword = await bcrypt.compare(req.body.password, seller.password);
        if (!Matchpassword) {
            return res.send({ error: 'invalid credentials' });
        }

        token = jwt.sign({ id: seller._id, email: seller.email }, process.env.ACCESS_TOKEN)
        console.log(token);
        res.cookie('sellerauthjwt', token);
        // return res.send({ message: 'User login successfully' });
        if(seller.user_type == 1){
            res.redirect('/dashboard');
        }else{
            res.redirect('/admin');
        }

    } catch (error) {
        res.send({ error: 'Error login seller' });
    }
};

exports.slogout = async (req, res) => {
    res.clearCookie('sellerauthjwt', { path: '/'});

    res.redirect('/seller');
};

exports.sregisterview = async (req, res) => {
    res.render('seller/signup');
}

exports.sregister = async (req, res) => {
    try {
        const existingSeller = await Seller.findOne({ name: req.body.name });

        if (existingSeller) {
            return res.send({ error: 'seller already exist' });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newSeller = new Seller({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            user_type: req.body.user_type
        });

        await newSeller.save();

        res.redirect('seller');
    } catch (error) {
        res.send({ error: 'error signup seller' });
    }
};

exports.dashboardview = async (req, res) => {
    res.render('seller/dashboard');
}

exports.seller = async (req, res) => {
    try {
        //fetch user details 
        const user = await Seller.find({});
        if (!user) {
            return res.status(404).json({ error: 'no user found' });
        }
        res.status(200).json({ userdata: user });
    } catch (error) {
        res.status(500).json({ error: 'error in user' });
    }
};
