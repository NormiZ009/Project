const User = require("../models/user");
const Cart = require("../models/cart");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
require('dotenv').config();

//user login compare
exports.loginview = async (req, res) => {
    res.render('user/login');
}
exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.send({ error: 'invalid credentials' });
        }

        // compare password
        const Matchpassword = await bcrypt.compare(req.body.password, user.password);
        if (!Matchpassword) {
            return res.send({ error: 'invalid credentials' });
        }

        token = jwt.sign({ id: user._id, email: user.email }, process.env.ACCESS_TOKEN)
        console.log(token);
        res.cookie('userauthjwt', token);
        // req.session.user = user;
        // return res.send({ message: 'User login successfully' });
        res.redirect('/');

        // res.render('home', user);

    } catch (error) {
        res.send({ error: 'Error login user' });
    }
};

exports.logout = async (req, res) => {
    res.clearCookie('userauthjwt', { path: '/'});

    res.redirect('/');
};

//user register compare
exports.registerview = async (req, res) => {
    res.render('user/regi');
}
exports.register = async (req, res) => {
    try {
        console.log(req.body);

        // Check if email exists or not
        const existingUser = await User.findOne({ email: req.body.email });
        console.log(existingUser);

        if (existingUser) {
            // return res.status(400).json({ error: 'Email already exists' });
            return res.send({ error: 'Email already exists' });
        }

        // const lastUser = await User.findOne().sort({id: -1});
        // const newId = lastUser ? lastUser.Id + 1 : 1;

        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create new user
        const newUser = new User({
            // id: newId,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        await newUser.save();

        // res.status(201).json({ message: 'User registered successfully' });
        res.render('user/login');
    } catch (error) {
        console.error(error);
        // res.status(500).json({ message: 'Error registering user' });
        res.send({ message: 'Error registering user' });
    }
};

//jump to home page
exports.homeview = async (req, res) => {
    const token = req.cookies.userauthjwt;

    res.render('home', { token });
}

//user page
exports.userprofileview = async (req, res) => {
    res.render('user/userprofile');
};

exports.aboutusview = async (req, res) => {
    res.render('user/aboutus');
}

exports.cartview = async (req, res) => {
    const authUser = req.user;
    const cart = await Cart.find({ userId: authUser._id }).populate('productid');

    if (!cart) {
        return res.status(404).render('user/cart', { error: 'cart not found' });
    }

    const cartProducts = cart.map(item => item.productid);

    res.render('user/Cart', {
        cartProducts
    });
};

exports.removeFromCart = async (req, res) => {
    try{
        const authUser = req.user;
        const cartItemId = req.params.id;

        if(!cartItemId) {
            return res.status(404).json({ error: "Invalid request, no cart item ID provided"});
        }

        const cartItem = await Cart.findOneAndDelete({ productid: cartItemId});

        if (!cartItem) {
            return res.status(404).json({ error: 'item not found in cart'});
        }

        res.redirect('/cart');
    }catch (error) {
        res.status(500).json({ error: 'error removing item from cart'})
    }
};

exports.user = async (req, res) => {
    try {
        //fetch user details 
        const user = await User.find({});
        if (!user) {
            return res.status(404).json({ error: 'no user found' });
        }
        res.status(200).json({ userdata: user });
    } catch (error) {
        res.status(500).json({ error: 'error in user' });
    }
};

exports.paymentview = async (req, res) => {
    res.render('payment');
};