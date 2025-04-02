import { BaseSwagLabPage } from './BaseSwagLab.page';

export class CheckoutPage extends BaseSwagLabPage {
    firstNameInput = this.page.getByTestId('firstName');

    lastNameInput = this.page.getByTestId('lastName');

    postalCodeInput = this.page.getByTestId('postalCode');

    continueBtn = this.page.getByTestId('continue');

    storeItemSelector = '.cart_item';

    cartItems = this.page.locator(this.storeItemSelector);

    actualPrice = this.page.getByTestId('subtotal-label');

    tax = this.page.getByTestId('tax-label');

    finalPrice = this.page.getByTestId('total-label');

    async getStoreElementsInfo() {
        const cartItemCount = await this.cartItems.count();
        const cartItems = [];
        for (let i = 0; i < cartItemCount; i++) {
            const name = await this.cartItems.nth(i).locator('.inventory_item_name').innerText();
            const price = await this.cartItems.nth(i).locator('.inventory_item_price').innerText();
            cartItems.push({ name, price });
        }
        return cartItems;
    }

    async getTotalPrice() {
        const cartItemCount = await this.cartItems.count();
        let total = 0;
        for (let i = 0; i < cartItemCount; i++) {
            const price = await this.cartItems.nth(i).locator('.inventory_item_price').innerText();
            total += parseFloat(price.split('$')[1]);
        }
        return total;
    }
}
