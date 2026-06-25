const {LoginPage} = require('./LoginPage');
const {DashBoardPage} = require('./DashBoardPage');
const {MyCart} = require('./MyCart');
const {CheckoutPage} = require('./CheckoutPage');

class POManager
{
    constructor(page)
    {
        this.loginPage = new LoginPage(page);
        this.dashBoardPage = new DashBoardPage(page);
        this.myCart = new MyCart(page);
        this.checkoutPage = new CheckoutPage(page);
        this.page = page;
    }

    getLoginPage()
    {
        return this.loginPage;
    }

    getDashBoardPage()
    {
        return this.dashBoardPage;
    }

    getMyCart()
    {
        return this.myCart;
    }

    getCheckoutPage()
    {
        return this.checkoutPage;
    }
}

module.exports = {POManager};