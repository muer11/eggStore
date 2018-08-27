const Controller = require("egg").Controller;

class PaymentController extends Controller{
    async addOrder(){
        const orderitem = this.ctx.query;
        const products = await this.ctx.service.payment.add(orderitem);
        this.ctx.body = products;
    }
    async findOrder(){
        const orderId = this.ctx.query;
        const orders = await this.ctx.service.payment.find(orderId);
        this.ctx.body = orders;
    }
}

module.exports = PaymentController;
