class CheckoutPage
{
    constructor(page)
    {
        this.creditCardField = page.locator("input[value='4542 9931 9292 2293']");
        this.monthExppiration = page.locator(".ddl").nth(0);
        this.yearExpiration = page.locator(".ddl").last();
        this.cvvCode = page.locator(".title:has-text('CVV Code ?') + input");
        this.nameOnCard = page.locator(".title:has-text('Name on Card') + input");
        this.countrySelection = page.locator("[placeholder*='Country']");
        this.countryDropdown = page.locator(".ta-results");
        this.submitButton = page.locator(".action__submit");
    }

async fillClientInfo()
{
    await this.creditCardField.fill("4542 9931 9292 2293");
    await this.monthExppiration.selectOption("04");
    await this.yearExpiration.selectOption("30");
    await this.cvvCode.fill("555");
    await this.nameOnCard.fill("Test Test");
    await this.countrySelection.pressSequentially("ind", { delay: 150 });
    await this.countryDropdown.waitFor();
    const optionsCount = await this.countryDropdown.locator("button").count();
    for (let i=0; i< optionsCount; ++i)
    {
        const text = await this.countryDropdown.locator("button").nth(i).textContent();
        if (text === " India")
        {
            await this.countryDropdown.locator("button").nth(i).click();
            break;
        }
    }

    await this.submitButton.click();
}  

}

module.exports = {CheckoutPage};