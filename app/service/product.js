const Service = require('egg').Service;

class ProductService extends Service{
    async read(params){
        const products = await this.app.mysql.select('product',{
			where: params
		});
        return products;
    }
    async selectDetail(params){
        // const product = await this.app.mysql.select('product',{
        //     where: params
        // });
        //自定义mysql语句
        const product = await this.app.mysql.query('SELECT * FROM product INNER JOIN sku ON product.id = sku.product_id WHERE product_id = ? ' , [params.id]);
        return product;
    }
    async selectSkuInfo(params){
        const skuInfo = await this.app.mysql.select('sku',{
            where: params
        });
        return skuInfo;
    }
}

module.exports = ProductService;