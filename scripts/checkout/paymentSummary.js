import { cart } from "../../data/cart.js";
import {getProduct, products} from "../../data/products.js";
import {formatCurrency} from "../utils/money.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";

export function renderPaymentSummany(){
    let productPriceCents = 0;
    let shippingPriceCents = 0;
    let totalBeforeTaxCents = 0;
    let taxCents = 0;
    let totalCents = 0;
    cart.forEach((cartItem) => {  
        const product = getProduct(cartItem.productId);
        productPriceCents += cartItem.quantity * product.priceCents;


        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;

        totalBeforeTaxCents = productPriceCents + shippingPriceCents;
        taxCents = totalBeforeTaxCents * 0.1;
        totalCents = totalBeforeTaxCents + taxCents;
    });

    let paymentSummaryHTML =`
        <div class="payment-summary">
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        </div>`
        
        document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}