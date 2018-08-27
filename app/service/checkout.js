const Service = require('egg').Service;

class CheckoutService extends Service{
    async select(params){
        let cartitemId = (params.cartitemId).split(",");
        //SELECT a.cartitemId, a.quantity, a.cart_id, a.sku_id, b.allocatedStock, b.price, b.id, b.product_id, b.specificationValues, c.id, c.name FROM cartitem a, sku b,product c WHERE a.sku_id = b.id AND b.product_id = c.id AND a.cartitemId IN (70,71);
        let cartitems = 'SELECT a.cartitemId, a.quantity, a.cart_id, a.sku_id, b.allocatedStock, b.price, b.id, b.product_id, b.rewardPoint, b.specificationValues, c.id, c.name FROM cartitem a, sku b,product c WHERE a.sku_id = b.id AND b.product_id = c.id AND a.cartitemId IN (';
        let c = '';
        for(let i = 0; i < cartitemId.length; i++){
            if(i == cartitemId.length-1){
                c += Number(cartitemId[i]) + ")";
            }else{
                c += Number(cartitemId[i]) + ","
            }
        }
        cartitems += c;
        const skus = await this.app.mysql.query(cartitems);
        return skus;
    }
    // async selectDetail(params){
    //     // const product = await this.app.mysql.select('product',{
    //     //     where: params
    //     // });
    //     //自定义mysql语句
    //     const product = await this.app.mysql.query('SELECT * FROM product INNER JOIN sku ON product.id = sku.product_id WHERE product_id = ? ' , [params.id]);
    //     return product;
    // }
    // async selectSkuInfo(params){
    //     const skuInfo = await this.app.mysql.select('sku',{
    //         where: params
    //     });
    //     return skuInfo;
    // }
}

module.exports = CheckoutService;