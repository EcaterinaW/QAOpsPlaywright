import {LoginPage} from './LoginPage';
import {DashBoardPage} from './DashBoardPage';
import {MyCart} from './MyCart';
import {CheckoutPage} from './CheckoutPage';
import {Page} from '@playwright/test';

export class POManager
{
    loginPage: LoginPage;
    dashBoardPage: DashBoardPage;
    myCart: MyCart;
    checkoutPage: CheckoutPage;
    page: Page;
    constructor(page:Page)
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