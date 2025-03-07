const User = require("../models/user");
const Seller = require("../models/seller");
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.userlist = async (req, res) => {
    try {
        const user = await User.find({});
        if (!user) {
            return res.status(404).json({ error: 'no users found' });
        }
        console.log(user);

        res.render('seller/userlist', { user });
    } catch (error) {
        res.send({ error: 'error in user' })
    }
};

exports.getAllUser = async (req, res) => {
    try{
        const users = await User.find();
        const sellers = await Seller.find();
        // res.json(user);

        res.render('admin', { users, sellers });
    }catch (error) {
        res.status(500).json({ error: " error fetching user"})
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!seller)
            return res.status(404).json({ error: 'user not found' });
        
            res.json(user);
    } catch (error) {
        res.status(500).json({ error: " error fetching user" })
    }
};

exports.deleteuser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user)
            return res.status(404).json({error: 'user not found'});
        res.redirect('/admin');
    } catch (error) {
        res.status(500).json({ error: " error deleting user" })
    }
};

exports.sellerlist = async (req, res) => {
    try {
        //fetch user details 
        const seller = await Seller.find({});
        if (!seller) {
            return res.status(404).json({ error: 'no seller found' });
        }
        res.status(200).json({ userdata: seller });
    } catch (error) {
        res.status(500).json({ error: 'error in user' });
    }
};

exports.getAllSeller = async (req, res) => {
    try{
        const seller = await Seller.find();
        res.json(seller);
    }catch (error) {
        res.status(500).json({ error: " error fetching seller"})
    }
};

exports.getSellerById = async (req, res) => {
    try {
        const seller = await Seller.findById(req.params.id);
        if (!seller)
            return res.status(404).json({ error: 'seller not found' });
        
            res.json(seller);
    } catch (error) {
        res.status(500).json({ error: " error fetching seller" })
    }
};

exports.deleteSeller = async (req, res) => {
    try {
        const seller = await Seller.findByIdAndDelete(req.params.id);
        if (!seller)
            return res.status(404).json({error: 'seller not found'});
        res.redirect('/admin');
    } catch (error) {
        res.status(500).json({ error: " error deleting seller" })
    }
};

exports.productlist = async (req, res) => {
    try {
        const products = await Product.find({});
        if (!products) {
            return res.status(404).json({ error: 'no product found' });
        }
        console.log(products);

        res.render('seller/productlist', { products });
    } catch (error) {
        res.send({ error: 'error in product' })
    }
};