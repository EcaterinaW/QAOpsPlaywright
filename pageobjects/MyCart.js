class MyCart {
    constructor(page) {
        this.checkoutButton = page.locator("text=Checkout");
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }

}

module.exports = {MyCart};