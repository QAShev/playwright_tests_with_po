import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { sortOptions } from '../pages/Inventory.page';

[
    {
        name: 'Sorting by A-Z',
        sortType: 'fromA_toZ',
        sortFn: (a, b) => a.localeCompare(b),
    },
    {
        name: 'Sorting by Z-A',
        sortType: 'fromZ_toA',
        sortFn: (a, b) => b.localeCompare(a),
    },
    {
        name: 'Sorting by price Low to High',
        sortType: 'fromLow_toHigh',
        byPrice: true,
        sortFn: (a, b) => a - b,
    },
    {
        name: 'Sorting by price High to Low',
        sortType: 'fromHigh_toLow',
        byPrice: true,
        sortFn: (a, b) => b - a,
    },
].forEach(({ name, sortType, byPrice, sortFn }) => {
    test.beforeEach(async ({ app }) => {
        await app.login.navigate();
        await app.login.performLogin('standard_user', 'secret_sauce');
        await expect(app.inventory.headerTitle).toBeVisible();
        expect(await app.inventory.inventoryItems.count()).toBeGreaterThanOrEqual(1);
    });
    test.describe('Sorting', () => {
        test(`${name}`, async ({ app }) => {
            // Get all cards names
            const valuesBeforeSort = byPrice
                ? await app.inventory.getArrayOfPrices()
                : await app.inventory.inventoryItems.allTextContents();
            // Apply sort A-Z
            await app.inventory.applySortOption(sortOptions[sortType]);
            // Get all cards names after sort
            const valuesAfterSort = byPrice
                ? await app.inventory.getArrayOfPrices()
                : await app.inventory.inventoryItems.allTextContents();
            // Apply sort fn
            const sorted = [...valuesBeforeSort].sort(sortFn);
            // Compare
            expect(valuesAfterSort).toEqual(sorted);
        });
    });
});
