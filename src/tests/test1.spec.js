import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { sortOptions } from '../pages/Inventory.page';

test.beforeEach(async ({ app }) => {
    await app.login.navigate();
    await app.login.performLogin('standard_user', 'secret_sauce');
    await expect(app.inventory.headerTitle).toBeVisible();
    expect(await app.inventory.inventoryItems.count()).toBeGreaterThanOrEqual(1);
});

test.describe('Test1', () => {
    test('Sorting by A-Z', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        // Get all cards names
        const namesBeforeSort = await app.inventory.inventoryItems.allTextContents();
        // Apply sort A-Z
        await app.inventory.applySortOption(sortOptions.fromA_toZ);
        // Get all cards names after sort
        const namesAfterSort = await app.inventory.inventoryItems.allTextContents();
        // Apply sort fn
        const sortedNames = [...namesBeforeSort].sort();
        // Compare
        expect(namesAfterSort).toEqual(sortedNames);
    });

    test('Sorting by Z-A', async ({ app }) => {
        // Get all cards names
        const namesBeforeSort = await app.inventory.inventoryItems.allTextContents();
        // Apply sort Z-A
        await app.inventory.applySortOption(sortOptions.fromZ_toA);
        // Get all cards names after sort
        const namesAfterSort = await app.inventory.inventoryItems.allTextContents();
        // Apply sort fn
        const sortedNames = [...namesBeforeSort].sort().reverse();
        // Compare
        expect(namesAfterSort).toEqual(sortedNames);
    });

    test('Sorting by price Low to High', async ({ app }) => {
        // Get all cards prices
        const pricesBeforeSort = await app.inventory.getArrayOfPrices();
        // Apply sort low to high
        await app.inventory.applySortOption((sortOptions.fromLow_toHigh));
        // Get all cards prices after sort
        const pricesAfterSort = await app.inventory.getArrayOfPrices();
        // Apply sort fn
        const sortedPrices = [...pricesBeforeSort].sort((a, b) => a - b);
        // Compare
        expect(pricesAfterSort).toEqual(sortedPrices);
    });

    test('Sorting by price High to Low', async ({ app }) => {
        // Get all cards prices
        const pricesBeforeSort = await app.inventory.getArrayOfPrices();
        // Apply sort high to low
        await app.inventory.applySortOption(sortOptions.fromHigh_toLow);
        // Get all cards prices after sort
        const pricesAfterSort = await app.inventory.getArrayOfPrices();
        // Apply sort fn
        const sortedPrices = [...pricesBeforeSort].sort((a, b) => b - a);
        // Compare
        expect(pricesAfterSort).toEqual(sortedPrices);
    });
});
