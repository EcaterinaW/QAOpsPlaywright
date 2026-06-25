import { test,expect } from '@playwright/test';
import {customTest} from '../utils_ts/test-base';
import { POManager } from '../pageobjects_ts/POManager';

const dataset = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));

for (const data of dataset) {
    test(`@Web Client app login for ${data.productName}`, async ({ page }) => {

        const poManager = new POManager(page);

        const products = page.locator(".card-body");
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validLogin(data.username, data.password);

        const dashBoardPage = poManager.getDashBoardPage();
        await dashBoardPage.searchProductAddCart(data.productName);
        await dashBoardPage.navigateToCart();

        const myCart = poManager.getMyCart();
        await myCart.clickCheckout();

        const checkoutPage = poManager.getCheckoutPage();
        await checkoutPage.fillClientInfo();


        await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
        const orderID:any = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
        console.log(orderID);

        await page.locator("button[routerlink*='myorders']").click();
        const rows = await page.locator("tbody tr");
        await page.locator("tbody").waitFor();

        for (let i = 0; i < await rows.count(); ++i) {
            const rowOrderId = await rows.nth(i).locator("th").textContent();
            if (orderID.includes(rowOrderId)) {
                await rows.nth(i).locator("button").first().click();
                break;
            }
        }
        const orderIdDetails = await page.locator(".col-text").textContent();
        expect(orderID.includes(orderIdDetails)).toBeTruthy();
        // await page.pause();
    });

}

customTest(`Client app login`, async ({ page, testDataForOrder }) => {

        const poManager = new POManager(page);

        const products = page.locator(".card-body");
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);

        const dashBoardPage = poManager.getDashBoardPage();
        await dashBoardPage.searchProductAddCart(testDataForOrder.productName);
        await dashBoardPage.navigateToCart();

        const myCart = poManager.getMyCart();
        await myCart.clickCheckout();

        const checkoutPage = poManager.getCheckoutPage();
        await checkoutPage.fillClientInfo();



        await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
        const orderID:any = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
        console.log(orderID);

        await page.locator("button[routerlink*='myorders']").click();
        const rows = await page.locator("tbody tr");
        await page.locator("tbody").waitFor();

        for (let i = 0; i < await rows.count(); ++i) {
            const rowOrderId = await rows.nth(i).locator("th").textContent();
            if (orderID.includes(rowOrderId)) {
                await rows.nth(i).locator("button").first().click();
                break;
            }
        }
        const orderIdDetails = await page.locator(".col-text").textContent();
        expect(orderID.includes(orderIdDetails)).toBeTruthy();
        // await page.pause();
    });
