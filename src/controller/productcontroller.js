const Product = require("../models/product");
const User = require("../models/user");
const Cart = require("../models/cart");
const order = require("../models/order")
const OrderItem = require("../models/orderItem")

exports.dashboard = async (req, res) => {
    try {
        console.log('req.body')
        console.log(req.body)

        const product = await Product.findOne({ productName: req.body.productName });
        if (!product) {
            const newProduct = new Product({
                productName: req.body.productName,
                price: req.body.price,
                description: req.body.description,
                proimage: req.file.filename,
                category: req.body.category
            });

            await newProduct.save();
        }

        const products = await Product.find();
        // res.render('dashboard', { products });
        res.redirect('dashboard');

    } catch (error) {
        res.send({ error: 'error in product' })
    }
};

exports.getProductsByCategory = async (req, res) => {
    try {
        const category = req.params.category;

        if (!['product', 'game', 'grow'].includes(category)) {
            return res.status(400).json({ error: "Invalid category" });
        }

        const products = await Product.find({ category });
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: 'Error fetching products' });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const product = await Product.find();
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: "error fetching products" })
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product)
            return res.status(404).json({ error: 'Product not found' });

        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching product' });
    }
};

exports.editproductview = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product)
            return res.status(404).json({ error: "product not found" });

        res.render('seller/editdashboard', { product });
    } catch (error) {
        res.status(500).json({ error: 'error updaing product' });
    }
}

exports.editProduct = async (req, res) => {
    try {
        console.log(req.body);

        const { productName, price, description, category } = req.body;
        const product = await Product.findByIdAndUpdate(req.params.id, { productName, price, description, category }, { new: true });

        if (!product)
            return res.status(404).json({ error: "product not found" });

        // res.json({ message: 'product has updated' });
        res.redirect('/productlist');
    } catch (error) {
        res.status(500).json({ error: 'error updaing product' });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product)
            return res.status(404).json({ error: 'product not found' });
        // res.json({message: 'product delete successfully'});
        res.redirect('/productlist');
    } catch (error) {
        res.status(500).json({ error: 'error deleting product' });
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

exports.buynow = async (req, res) => {
    try {
        const products = await Product.find({ category: 'product' });

        res.render('user/buynow', { products });
    } catch (error) {
        res.status({ error: 'error in buypage' })
    }
};

exports.game = async (req, res) => {
    try {
        console.log('game');

        const game = await Product.find({ category: 'games' });

        res.render('user/game', { game });
    } catch (error) {
        res.status({ error: 'error in game' });
    }
};

exports.grow = async (req, res) => {
    try {
        console.log('grow');

        const grow = await Product.find({ category: 'grow' });

        res.render('user/grow', { grow });
    } catch (error) {
        res.status({ error: 'error in grow' });
    }
};

exports.addtocart = async (req, res) => {
    try {
        console.log('asjndjas');

        const authuser = req.user;
        const productid = req.params.id;

        if (!authuser) {
            return res.status(401).json({ error: 'User not authenticated' })
        }

        const newCartItem = new Cart({
            productid: productid,
            userid: authuser.id
        });

        await newCartItem.save();

        res.redirect('/cart');
    } catch (error) {
        res.status({ error: 'error in grow' });
    }
};

exports.order = async (req, res) => {
    try {
        const authuser = req.user;
        const newOrder = new order({
            userid: authuser.id,
            fullname: req.body.fullname,
            email: req.body.email,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip
        });

        await newOrder.save();

        console.log('ds1');

        const cartdata = await Cart.find({ userid: authuser.id });

        if (cartdata.length > 0) {
            // Step 3: Insert cart items into orderitem table
            const orderItems = cartdata.map(cartItem => ({
                orderid: newOrder._id,
                productid: cartItem.productid,
            }));

            await OrderItem.insertMany(orderItems);

            // Step 4: Clear the cart after order is placed
            await Cart.deleteMany({ userid: authuser.id });
        }


        // const order = await this.order.find();

        res.redirect('/payment');
    } catch (error) {
        res.send({ error: 'error in order submission' });
    }
};