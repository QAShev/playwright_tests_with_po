import { BaseSwagLabPage } from './BaseSwagLab.page';

export class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    headerTitle = this.page.locator('.title');

    inventoryItems = this.page.locator('.inventory_item');

    addItemToCartButton = this.page.locator('[id^="add-to-cart"]');

    sortSelect = this.page.getByTestId('product-sort-container');

    async addItemToCartById(id) {
        await this.addItemToCartButton.nth(id).click();
    }

    async applySortOption(sortOption) {
        await this.sortSelect.selectOption({ value: sortOption });
    }

    async getArrayOfPrices() {
        return this.page.$$eval('.inventory_item_price', (prE) => prE.map((el) => parseFloat(el.textContent.replace('$', ''))));
    }

    async addRandomItems(count) {
        const itemsCount = await this.inventoryItems.count();
        let indices = [];
        while (indices.length < count) {
            const index = Math.floor(Math.random() * itemsCount);
            if (!indices.includes(index)) {
                indices.push(index);
            }
        }
        indices = indices.sort((a, b) => b - a);
        const addedItems = [];
        for (let i = 0; i < indices.length; i++) {
            const item = indices[i];
            const productName = await this.inventoryItems.nth(item).locator('.inventory_item_name').innerText();
            const productPrice = await this.inventoryItems.nth(item).locator('.inventory_item_price').innerText();
            addedItems.push({
                name: productName,
                price: productPrice,
            });
            await this.addItemToCartButton.nth(item).click();
        }
        return addedItems;
    }
}

export const sortOptions = {
    fromA_toZ: 'az',
    fromZ_toA: 'za',
    fromLow_toHigh: 'lohi',
    fromHigh_toLow: 'hilo',
};
