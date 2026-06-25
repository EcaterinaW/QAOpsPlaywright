import {test, expect} from '@playwright/test';

async function loginAndGoToBooking(page) {
    await page.goto("https://eventhub.rahulshettyacademy.com");

    await page.getByPlaceholder("you@email.com").fill("kirovichkate@gmail.com");
    await page.getByLabel("Password").fill("pjB!Hx8!!UXqC@!");
    await page.locator("#login-btn").click();

    await expect(page.locator(".grid-cols-1").first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
}

test('Eligible for Refund', async ({page}) => {

    await loginAndGoToBooking(page);

    await page.locator('a').filter({ hasText: 'Events' }).first().click();
    await page.locator('[data-testid="event-card"]').first().locator('[data-testid="book-now-btn"]').click();
    await expect(await page.locator('#ticket-count')).toHaveText("1");
    await page.getByLabel("Full Name").fill("Katy T");
    await page.locator("#customer-email").fill("test@test.com");
    await page.getByPlaceholder("+91 98765 43210").fill("+91 98765 43210");
    await page.locator(".confirm-booking-btn").click();

    await page.getByRole("button", {name: 'View My Bookings'}).click();
    await expect(page).toHaveURL("https://eventhub.rahulshettyacademy.com/bookings");
    await page.locator("#booking-card").first().getByRole("button", {name:'View Details'}).click();
    await expect(page.getByText("Booking Information")).toBeVisible();

    const bookingRefText = (await page.locator(".font-mono").first().innerText()).trim();
    const firstLetterRef = bookingRefText.charAt(0);
    const eventTitleName = (await page.locator("h1").first().innerText()).trim();
    const firstLetterTitle = eventTitleName.charAt(0);
    await expect(firstLetterRef === firstLetterTitle).toBeTruthy();

    await page.getByRole("button", {name: 'Check eligibility for refund?'}).click();
    await expect(page.locator("#refund-spinner")).toBeVisible({ timeout: 0 });
    await expect(page.locator("#refund-spinner")).toBeHidden({ timeout: 6000 });

    await expect(page.locator("#refund-result")).toBeVisible();
    await expect(page.locator("#refund-result").locator("strong")).toHaveText("Eligible for refund.");
    await expect(page.locator("#refund-result").locator("span")).toContainText(" Single-ticket bookings qualify for a full refund.");


});

test('NOT Eligible for Refund', async ({page}) => {

    await loginAndGoToBooking(page);

    await page.locator('a').filter({ hasText: 'Events' }).first().click();
    await page.locator('[data-testid="event-card"]').first().locator('[data-testid="book-now-btn"]').click();
    await expect(await page.locator('#ticket-count')).toHaveText("1");
    await page.getByRole("button", {name: '+'}).click();
    await page.getByRole("button", {name: '+'}).click();
    await page.getByLabel("Full Name").fill("Katy T");
    await page.locator("#customer-email").fill("test@test.com");
    await page.getByPlaceholder("+91 98765 43210").fill("+91 98765 43210");
    await page.locator(".confirm-booking-btn").click();

    await page.getByRole("button", {name: 'View My Bookings'}).click();
    await expect(page).toHaveURL("https://eventhub.rahulshettyacademy.com/bookings");
    await page.locator("#booking-card").first().getByRole("button", {name:'View Details'}).click();
    await expect(page.getByText("Booking Information")).toBeVisible();

    const bookingRefText = (await page.locator(".font-mono").first().innerText()).trim();
    const firstLetterRef = bookingRefText.charAt(0);
    const eventTitleName = (await page.locator("h1").first().innerText()).trim();
    const firstLetterTitle = eventTitleName.charAt(0);
    await expect(firstLetterRef === firstLetterTitle).toBeTruthy();

    await page.getByRole("button", {name: 'Check eligibility for refund?'}).click();
    await expect(page.locator("#refund-spinner")).toBeVisible({ timeout: 0 });
    await expect(page.locator("#refund-spinner")).toBeHidden({ timeout: 6000 });

    await expect(page.locator("#refund-result")).toBeVisible();
    await expect(page.locator("#refund-result").locator("strong")).toContainText("Not eligible for refund");
    await expect(page.locator("#refund-result").locator("span")).toContainText("Group bookings (3 tickets) are non-refundable");


});