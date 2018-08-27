const Controller = require("egg").Controller;

class CheckoutController extends Controller{
    async selectSkus(){
        const orderitem = this.ctx.query;
        const products = await this.ctx.service.checkout.select(orderitem);
        this.ctx.body = products;
    }
}

module.exports = CheckoutController;
