import { expect } from '@playwright/test';
import { test } from '../fixtures/base';

test.beforeEach(async ({ app }) => {
    await app.login.navigate();
    await app.login.performLogin('standard_user', 'secret_sauce');
    await expect(app.inventory.headerTitle).toBeVisible();
    expect(await app.inventory.inventoryItems.count()).toBeGreaterThanOrEqual(1);
});

test.describe('Test2', () => {
    test('Add to cart test', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        // Call function for add random cards
        const addedItems = await app.inventory.addRandomItems();
        // Go to chart
        await app.inventory.shoppingCart.click();
        // Get added card info
        const itemsFromCart = await app.shoppingCart.getCartElementsInfo();
        // Compare
        expect(addedItems).toEqual(itemsFromCart);
    });
});
