import { expect } from '@playwright/test';
import { test } from '../fixtures/base';

test.beforeEach(async ({ app }) => {
    await app.login.navigate();
    await app.login.performLogin('standard_user', 'secret_sauce');
    await expect(app.inventory.headerTitle).toBeVisible();
    expect(await app.inventory.inventoryItems.count()).toBeGreaterThanOrEqual(1);
});

test.describe('Test3', () => {
    test('Add to cart test with compare prices', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        // Call function for add random cards
        const addedItems = await app.inventory.addRandomItems(3);
        // Go to chart
        await app.inventory.shoppingCart.click();
        // Get added card info
        const itemsFromCart = await app.shoppingCart.getCartElementsInfo();
        // Compare
        expect(addedItems).toEqual(itemsFromCart);
        // Go to checkout page
        await app.shoppingCart.checkoutBtn.click();
        // Fill data
        await app.checkout.firstNameInput.fill('John');
        await app.checkout.lastNameInput.fill('Dou');
        await app.checkout.postalCodeInput.fill('10030');
        // Go to step 2 checkout page
        await app.checkout.continueBtn.click();
        // Get array of added elements
        const itemFromStore = await app.checkout.getStoreElementsInfo();
        // Compare
        expect(addedItems).toEqual(itemFromStore);
        // Get element sum cards prices
        const itemsTotalPrice = await app.checkout.getTotalPrice();
        // Get element total price without tax
        const actualPriceElement = await app.checkout.actualPrice;
        // Get value total price
        const actualPrice = parseFloat(actualPriceElement.split('$')[1]);
        // Compare
        expect(itemsTotalPrice).toEqual(actualPrice);
        // Get tax element
        const taxElement = await app.checkout.tax;
        // Get tax value
        const tax = parseFloat(taxElement.split('$')[1]);
        // Get final price
        const finalPriceElement = await app.checkout.finalPrice;
        // Get final price value
        const finalPrice = parseFloat(finalPriceElement.split('$')[1]);
        // Compare
        expect(finalPrice).toEqual(actualPrice + tax);
    });
});
