// Importing Controller
const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
const orderController = require('../app/http/controllers/customers/orderController')
const AdminOrderController = require('../app/http/controllers/admin/orderController')
const AdminDashController = require('../app/http/controllers/admin/dashController')
const statusController = require('../app/http/controllers/admin/statusController')
const productController = require('../app/http/controllers/product/productController')
const blogController = require('../app/http/controllers/blog/blogController')
const extraController = require('../app/http/controllers/extras/extraController')


// Middlewares
const guest = require('../app/http/middleware/guest')
const auth = require('../app/http/middleware/auth')
const admin = require('../app/http/middleware/admin')


function initRoutes(app) {
    app.get('/', homeController().index)
    app.get('/login', guest, authController().login)
    app.post('/login', authController().postLogin)
    app.get('/register', guest, authController().register)
    app.post('/register', authController().postRegister)
    app.post('/logout', authController().logout)

    // contactForm
    app.get('/contact', homeController().contact)
    app.post("/contact", homeController().postContact)

    app.get('/cart', cartController().index)
    app.post('/update-cart', cartController().update)

    app.get('/cart/incrementCart', cartController().incrementCart)
    app.get('/cart/decrementCart', cartController().decrementCart)


    // forgot password
    app.get('/forgot', authController().forgot);
    app.post('/forgot', authController().postForgot);
    app.get('/reset/:token', authController().resetToken);
    app.post('/reset/:token', authController().postResetToken);

    // Customer routes
    app.post('/orders', auth, orderController().store)
    app.get('/customer/orders', auth, orderController().index)
    app.get('/customer/orders/:id', auth, orderController().show)

    //Admin Routes
    app.get('/admin/orders', admin, AdminOrderController().index)
    app.post('/admin/order/status', admin, statusController().update)

    // Dashboard
    app.get('/dashboard', admin, AdminDashController().adminDash)
    app.get('/dashboard/addMenu', admin, AdminDashController().addMenu)
    app.post('/addMenu', admin, AdminDashController().postAddMenu)
    app.post('/updateMenu', admin, AdminDashController().postUpdateMenu)
    app.get('/dashboard/viewMenu', admin, AdminDashController().viewMenu)
    app.get('/dashboard/addCategory', admin, AdminDashController().addCategory)
    app.post('/addCategory', admin, AdminDashController().postAddCategory)
    app.post('/updateCategory', admin, AdminDashController().postUpdateCategory)
    app.get('/deleteCategory', admin, AdminDashController().deleteCategory)
    app.get('/updateCategory', admin, AdminDashController().updateCategory)
    app.get('/dashboard/viewCategory', admin, AdminDashController().viewCategory)
    app.get('/dashboard/viewAdmin', admin, AdminDashController().user)
    app.get('/dashboard/addAdmin', admin, AdminDashController().addAdmin)
    app.get('/dashboard/viewContact', admin, AdminDashController().viewContact)

    app.post('/addAdmin', admin, AdminDashController().postAddAdmin)
    app.get('/deleteUser', admin, AdminDashController().deleteUser)
    app.get('/updateUser', admin, AdminDashController().updateUser)
    app.post('/updateUser', admin, AdminDashController().postUpdateUser)

    app.get('/dashboard/allOrders', AdminDashController().showAllOrders)

    //extra routes
    app.get('/privacy', extraController().privacy)
    app.get('/locate', extraController().locate)

    // Blog Routes
    app.get('/blog/cakeblog', blogController().index)
    app.get('/blog/firstblog', blogController().firstblog)
    app.get('/blog/secondblog', blogController().secondblog)

    // Products Routes
    app.get('/product/productDetails', productController().show) // This :id will take you to the specific product whose id is this.id. And this id should be same as you pass it from show method

    // Delete prod
    app.get('/cart/deleteCart', cartController().delete)

    // Delete Product from dashboard
    app.get('/dashboard/deleteMenu', AdminDashController().deleteMenu)

    // Edit Products from dashboard
    app.get('/dashboard/updateMenu', AdminDashController().updateMenu)
    app.put('/addMenu', AdminDashController().postAddMenu)


    // contactForm
    app.post("/send", homeController().contact)


}

module.exports = initRoutes