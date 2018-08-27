const Service = require('egg').Service;
const moment = require('moment');

class PaymentService extends Service{
    async add(params){
        const receiverId = params.receiver_id;
        //const cartitemId = params.cartitemId; 
        const member_id = 8; 
        const memo = params.memo; 
        const createDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        const completeDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        const sn = moment(new Date()).format('YYYYMMDDHHmmss');
        const quantity = await this.app.mysql.query('SELECT quantity FROM cartitem WHERE cartitemId IN (70,71)');
        const price = await this.app.mysql.query('SELECT price FROM sku WHERE sku.id IN (SELECT sku_id FROM cartitem WHERE cartitemId IN (70,71)) ');
        const weight = await this.app.mysql.query('SELECT weight FROM product WHERE product.id IN ( SELECT product_id FROM sku WHERE sku.id IN (SELECT sku_id FROM cartitem WHERE cartitemId IN (70,71))) ');
        const receiver = await this.app.mysql.query('SELECT address, areaName, consignee, phone FROM receiver WHERE receiver.id = ?', receiverId);
        let sumquantity = 0;
        let sumprice = 0;
        let sumweight = 0;
        const address = receiver[0].address;
        const areaName = receiver[0].areaName;
        const consignee = receiver[0].consignee;
        const phone = receiver[0].phone;

        for(let i = 0; i < quantity.length; i++){
            sumquantity += quantity[i].quantity;
        }
        for(let i = 0; i < price.length; i++){
            sumprice += price[i].price;
        }
        for(let i = 0; i < weight.length; i++){
            sumweight += weight[i].weight;
        }

        //注意点：自定义sql语句时 时间戳必须格式规范+加双引号；所有字符串都需要加引号
        const ordersResult = await this.app.mysql.query('INSERT INTO orders(createdDate,address,areaName,completeDate,consignee,paymentMethodName,phone,price,quantity,weight,memo,member_id,sn) VALUE ("' + createDate + '","' + address + '","' + areaName + '","' + completeDate + '","' + consignee + '", "网上支付" ,' + phone + ',' + sumprice + ',' + sumquantity + ',' + sumweight + ',' + memo + ',' + member_id + ',' + sn + ')');
        const ordersId = ordersResult.insertId;

        const orderitem = await this.app.mysql.query('SELECT a.sku_id, c.name, b.price, a.quantity, b.sn, b.specificationValues, c.weight FROM cartitem a, sku b, product c WHERE a.sku_id = b.id AND b.product_id = c.id AND a.cartitemId IN (70,71)');
        for(let n = 0; n < orderitem.length; n++){
            const skuId = orderitem[n].sku_id;
            const ordername = orderitem[n].name;
            const orderprice = orderitem[n].price;
            const orderquantity = orderitem[n].quantity;
            const ordersn = orderitem[n].sn;
            const specificationValues = orderitem[n].specificationValues;
            const orderweight = orderitem[n].weight;
            const createDate2 = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
            const orderitemResult = await this.app.mysql.query("INSERT INTO orderitem(createdDate, name, price, quantity, sn, specifications, weight, orders_id, sku_id ) VALUE ('" + createDate2 +"','" + ordername +"',"+ orderprice +","+ orderquantity +",'"+ ordersn +"','"+ specificationValues +"',"+ orderweight + "," + ordersId + "," + skuId +")");
        }
        return ordersId;
    }
    async find(params){
        const orderInfo = await this.app.mysql.select('orders',{
            where: {id: params.orderId}
        });
        return orderInfo;
    }
}

module.exports = PaymentService;