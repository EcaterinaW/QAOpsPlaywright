const {test, expect} = require('@playwright/test');

test('Assignment Playwright Test', async ({page})=>
{

    const email = "kirovichkate@gmail.com"
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    const userEmail = page.getByPlaceholder("email@example.com");
    const userPassword = page.getByPlaceholder("enter your passsword");
    await page.goto("https://rahulshettyacademy.com/client/");
    // console.log (await page.title());
    await userEmail.fill(email);
    await userPassword.fill("U$u8An!A3DFRbbi");
    await page.getByRole('button', {name : "Login"}).click();
    // await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();

    await page.locator(".card-body").filter({hasText: productName}).getByRole('button', {name: "Add to Cart"}).click();

    await page.getByRole('listitem').getByRole('button', {name: "Cart"}).click();
    await page.locator("div li").first().waitFor();
    await expect(page.getByText(productName)).toBeVisible();
    await page.getByRole('button', {name: "Checkout"}).click();

    await page.locator("input[value='4542 9931 9292 2293']").fill("4542 9931 9292 2293");
    await page.locator(".ddl").nth(0).selectOption("04");
    await page.locator(".ddl").last().selectOption("30");
    await page.locator(".title:has-text('CVV Code ?') + input").fill("555");
    await page.locator(".title:has-text('Name on Card') + input").fill("Test Test");

    await page.getByPlaceholder("Select Country").pressSequentially("ind", { delay: 150 });

    await page.getByRole("button", {name: "India"}).nth(1).click();

    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.getByText("PLACE ORDER").click();
    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();

    const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderID);

    await page.locator("button[routerlink*='myorders']").click();
    const rows = await page.locator("tbody tr");
    await page.locator("tbody").waitFor();

    for (let i=0; i< await rows.count(); ++i)
    {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderID.includes(rowOrderId))
        {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderID.includes(orderIdDetails)).toBeTruthy();
    // await page.pause();
})

