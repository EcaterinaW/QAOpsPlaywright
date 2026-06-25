import {test,expect,Locator,Page} from '@playwright/test';

export class MyCart {
    checkoutButton: Locator;
    page:Page;


    constructor(page:Page) {
        this.checkoutButton = page.locator("text=Checkout");
        this.page=page;
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }

}

module.exports = {MyCart};