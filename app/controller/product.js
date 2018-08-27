const Controller = require("egg").Controller;

class ProductController extends Controller{
    async findProducts(){
        const data_id = this.ctx.query;
        const products = await this.ctx.service.product.read(data_id);
        this.ctx.body = products;
    }
    async findDetail(){
        const product_id = this.ctx.query;
        const detail = await this.ctx.service.product.selectDetail(product_id);
        this.ctx.body = detail;
    }
    async findSkuInfo(){
        const product_id = this.ctx.query;
        const skuInfo = await this.ctx.service.product.selectSkuInfo(product_id);
        this.ctx.body = skuInfo;
    }
}

module.exports = ProductController;
