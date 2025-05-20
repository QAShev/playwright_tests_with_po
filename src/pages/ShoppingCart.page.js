import { BaseSwagLabPage } from './BaseSwagLab.page';

export class ShoppingCartPage extends BaseSwagLabPage {
    url = '/cart.html';

    cartItemSelector = '.cart_item';

    removeItemSelector = '[id^="remove"]';

    headerTitle = this.page.locator('.title');

    cartItems = this.page.locator(this.cartItemSelector);

    checkoutBtn = this.page.getByTestId('checkout');

    // async below added to show the function returns a promise
    async getCartItemByName(name) {
        return this.page.locator(this.cartItemSelector, { hasText: name });
    }

    async removeCartItemByName(name) {
        const item = await this.getCartItemByName(name);
        return item.locator(this.removeItemSelector);
    }

    async removeCartItemById(id) {
        await this.cartItems.nth(id).locator(this.removeItemSelector).click();
    }

    async getCartElementsInfo() {
        const cartItemCount = await this.cartItems.count();
        const cartItems = [];
        for (let i = 0; i < cartItemCount; i++) {
            const name = await this.cartItems.nth(i).locator('.inventory_item_name').innerText();
            const price = await this.cartItems.nth(i).locator('.inventory_item_price').innerText();
            cartItems.push({ name, price });
        }
        return cartItems;
    }
}
