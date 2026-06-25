const {test, expect} = require('@playwright/test');
let webContext;

test.beforeAll(async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("#userEmail").fill("kirovichkate@gmail.com");
    await page.locator("#userPassword").fill("U$u8An!A3DFRbbi");
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path: 'state.json'});
    webContext = await browser.newContext({storageState: 'state.json'});
});

test('Assignment Playwright Test', async ()=>
{

    const email = "kirovichkate@gmail.com"
    const productName = 'ZARA COAT 3';
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");
    const userEmail = page.locator("#userEmail");
    const userPassword = page.locator("#userPassword");

    const products = page.locator("h5");
    await expect(products.first()).toBeVisible();
    console.log(await page.locator(".card-body b").allTextContents());
    const count = await products.count();
    for (let i = 0; i < count; i++)
    {
        if (await products.nth(i).locator("b").textContent() === productName)
        {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    await page.locator("input[value='4542 9931 9292 2293']").fill("4542 9931 9292 2293");
    await page.locator(".ddl").nth(0).selectOption("04");
    await page.locator(".ddl").last().selectOption("30");
    await page.locator(".title:has-text('CVV Code ?') + input").fill("555");
    await page.locator(".title:has-text('Name on Card') + input").fill("Test Test");
    await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for (let i=0; i< optionsCount; ++i)
    {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text === " India")
        {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderLocator = page.locator(".em-spacer-1 .ng-star-inserted");
    await expect(orderLocator).toBeVisible();

    const orderID = await orderLocator.textContent();    console.log(orderID);

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
    const orderIdDetailsLocator = page.locator(".col-text");
    await expect(orderIdDetailsLocator).toBeVisible();

    const orderIdDetails = await orderIdDetailsLocator.textContent();
    expect(orderID.includes(orderIdDetails)).toBeTruthy();
    // await page.pause();
})

