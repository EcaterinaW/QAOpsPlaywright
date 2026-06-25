import {test,expect,Locator,Page} from '@playwright/test';


export class LoginPage {
    page:Page;
    singInbutton:Locator;
    userName:Locator;
    password:Locator;

constructor(page:Page)
{
    this.page = page;
    this.singInbutton = page.locator("#login");
    this.userName = page.locator("#userEmail");
    this.password = page.locator("#userPassword");

}

async goTo()
{
    await this.page.goto("https://rahulshettyacademy.com/client/");
}

async validLogin(username:string,password:string)
{
    await this.userName.fill(username);
    await this.password.fill(password);
    await this.singInbutton.click();
    await this.page.waitForLoadState('networkidle');
}

}
module.exports = {LoginPage};