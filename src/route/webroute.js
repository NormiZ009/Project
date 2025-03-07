const express = require("express");

const UserauthenticateToken = require('../middleware/userauth');
const SellerauthenticateToken = require('../middleware/sellerauth');
// creating route to controller
const usercontroller = require("../controller/usercontroller");
const sellercontroller = require("../controller/sellercontroller");
const productcontroller = require("../controller/productcontroller");
const admincontroller = require("../controller/admincontroller");

const route = express.Router();
const multer = require("multer")
const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null,"uploads")
  },
  filename:(req,file,cb)=>{
    cb(null,Date.now() + "-" +  file.originalname)
  }
})

var upload = multer({storage:storage});

// routing to controller
route.get("/login", usercontroller.loginview);
route.post("/login", usercontroller.login)
route.get("/register", usercontroller.registerview);
route.post("/regi", usercontroller.register);
route.get("/logout", usercontroller.logout);
route.get("/user", usercontroller.user);
route.get("/seller",sellercontroller.sloginview);
route.post("/seller", sellercontroller.slogin);
route.get("/signup", sellercontroller.sregisterview);
route.post("/signup", sellercontroller.sregister);
route.get("/", usercontroller.homeview);
route.get("/dashboard", SellerauthenticateToken, sellercontroller.dashboardview);
route.get("/slogout",sellercontroller.slogout);
route.post('/dashboard', upload.single('proimage'), productcontroller.dashboard);
route.get("/userprofile", usercontroller.userprofileview);
route.get("/aboutus", usercontroller.aboutusview);
route.get("/productlist", productcontroller.productlist);
route.get("/userlist", productcontroller.userlist);
route.get("/buynow", UserauthenticateToken, productcontroller.buynow);
route.get("/cart", UserauthenticateToken, usercontroller.cartview);
route.get("/products", UserauthenticateToken, productcontroller.getAllProducts);
route.get("/products/:id", productcontroller.getProductById);
route.get("/editproductview/:id",  productcontroller.editproductview);
route.post("/edit-product/:id",  productcontroller.editProduct);
route.post("/delete-product/:id", productcontroller.deleteProduct);
route.get("/game", UserauthenticateToken, productcontroller.game);
route.get("/grow", UserauthenticateToken, productcontroller.grow);
route.get("/addtocart/:id", UserauthenticateToken, productcontroller.addtocart);
route.post("/removefromcart/:id", usercontroller.removeFromCart);
route.post("/order", UserauthenticateToken, productcontroller.order);
route.get("/payment", usercontroller.paymentview);
// route.get("/admin/seller", admincontroller.sellerlist);
route.get("/admin", SellerauthenticateToken,admincontroller.getAllUser);
route.post("/admin/delete/:id", admincontroller.deleteuser);
route.post("/admin/deleteSeller/:id", admincontroller.deleteSeller);
// route.get("/")
// route.post("/payment". productcontroller.payment);

module.exports = route;