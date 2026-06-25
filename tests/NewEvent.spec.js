import {test, expect} from '@playwright/test';

test('Assignment Event', async ({page}) => {

    await page.goto("https://eventhub.rahulshettyacademy.com");
    await page.getByPlaceholder("you@email.com").fill("kirovichkate@gmail.com");
    await page.getByLabel("Password").fill("pjB!Hx8!!UXqC@!");
    await page.locator("#login-btn").click();
    await expect(page.locator(".grid-cols-1").nth(0)).toBeVisible();

    await page.getByRole('button', {name: "Admin"}).click();
    await page.locator('a').filter({ hasText: 'Manage Events' }).first().click(); 
    const eventTitle = `Test Event ${Date.now()}`;
    await page.locator("#event-title-input").fill(eventTitle);
    await page.getByPlaceholder("Describe the event…").fill("Test Description of the EVENT");
    await page.locator("#category").selectOption("Festival");
    await page.getByLabel("City*").fill("Orlando");
    await page.getByLabel("Venue*").fill("100 International Ave");
    await page.locator('[id="event-date-&-time"]').fill("2026-08-10T18:00");
    await page.getByLabel("Price ($)").fill("299.99");
    await page.getByLabel("Total Seats").fill("50");
    await page.locator("#add-event-btn").click();
    await expect(page.getByText("Event created!")).toBeVisible();

    await page.locator('a').filter({ hasText: 'Events' }).first().click(); 
    const eventCards = page.locator('[data-testid="event-card"]');
    await expect(await eventCards.first()).toBeVisible();
    await expect(eventCards.filter({hasText: eventTitle})).toBeVisible();
    const seatText = await (eventCards.filter({hasText: eventTitle})).getByText(/seat/i).textContent();
    const seatsBeforeBooking = parseInt(seatText.match(/\d+/)[0]);

    await eventCards.filter({hasText: eventTitle}).locator('[data-testid="book-now-btn"]').click();

    await expect(await page.locator('#ticket-count')).toHaveText("1");
    await page.getByLabel("Full Name").fill("Katy T");
    await page.locator("#customer-email").fill("test@test.com");
    await page.getByPlaceholder("+91 98765 43210").fill("+91 98765 43210");
    await page.locator(".confirm-booking-btn").click();

    await expect(page.locator(".booking-ref")).toBeVisible();
    const bookingRef = (await page.locator(".booking-ref").innerText()).trim();

    await page.getByRole("button", {name: 'View My Bookings'}).click();
    await expect(page).toHaveURL("https://eventhub.rahulshettyacademy.com/bookings");
    const bookingCards = await page.locator("#booking-card");
    await expect(bookingCards.first()).toBeVisible();
    await expect(bookingCards.filter({hasText: bookingRef})).toBeVisible(); 
    await expect(bookingCards.filter({hasText: bookingRef}).locator("h3")).toHaveText(eventTitle); 

    await page.locator('a').filter({ hasText: 'Events' }).first().click(); 
    await expect(await eventCards.first()).toBeVisible();
    await expect(eventCards.filter({hasText: eventTitle})).toBeVisible();
    const newSeatText = await (eventCards.filter({hasText: eventTitle})).getByText(/seat/i).textContent();
    const seatsAfterBooking = parseInt(seatText.match(/\d+/)[0]);
    await expect(seatsAfterBooking === seatsBeforeBooking - 1).toBeTruthy;

});