const Service = require('egg').Service;
class CartService extends Service{
    async add(params){
        //const product =  await this.app.mysql.insert('user', user);
        console.log(params);
        const member_id = params.member_id;
        const sku_id = params.sku_id;
        const quantity = params.quantity;
        const isExistUser = await this.app.mysql.query('SELECT * FROM cart WHERE cart.member_id = ? ', [member_id]);
        let createdDate = new Date();
        let cart_id = isExistUser[0].id;
        
        //判断是否已将购物车绑定用户
        if(isExistUser.length == 0){
            
            const cart =  await this.app.mysql.insert('cart', {
                createdDate : createdDate,
                member_id : member_id,
            });
            cart_id = cart.insertId;
        }
        const cartItem =  await this.app.mysql.insert('cartitem', {
            createdDate : createdDate,
            quantity : quantity,
            cart_id : cart_id,
            sku_id : sku_id,
        });
        
		return cartItem;
    }

    async sum(params){
        const id = params.id;
        const quantityList = await this.app.mysql.query('SELECT * FROM cart INNER JOIN cartitem ON cart.id = cartitem.cart_id WHERE member_id = ? ' , [id]);
        
        return quantityList;
    }

    async delete(params){
        const result = await this.app.mysql.query('DELETE FROM cartitem WHERE cartitemId = ? ' , [params]);
        return result;
    }

    async judge(params){
        const memberId = params.member_id;
        const skuId = params.sku_id;
        const cartItem = await this.app.mysql.query('SELECT * FROM cart INNER JOIN cartitem ON cart.id = cartitem.cart_id WHERE member_id = ? AND sku_id = ? ' , [memberId, skuId]);
        return cartItem;
    }

    async select(params){
        const id = params.id;
        //const listitem = await this.app.mysql.query('SELECT * FROM table1 cart INNER JOIN table2 cartitem ON cart.id = cartitem.cart_id INNER JOIN table3 sku ON cartitem.sku_id = sku.id WHERE cart.member_id = ? ' , [id]);
        //const listitem = await this.app.mysql.query('SELECT * FROM cartitem RIGHT JOIN cart ON cartitem.cart_id = cart.id LEFT JOIN sku ON cartitem.sku_id = sku.id WHERE cartitem.member_id = ? ' , [id]);
        //const listitem = await this.app.mysql.query('SELECT * FROM cart, cartitem, sku WHERE cart.id = cartitem.cart_id AND cartitem.sku_id = sku.id AND cart.member_id = 8');
        const listitem = await this.app.mysql.query('SELECT * FROM cart LEFT JOIN cartitem ON cart.id = cartitem.cart_id AND cart.member_id = 8 LEFT JOIN sku ON cartitem.sku_id = sku.id LEFT JOIN product ON sku.product_id = product.id ');
        return listitem;
    }

    async changeQuantity(params){
        console.log(params);
        const term = params.quantity;
        const row = params.cartitemId;
        const result = await this.app.mysql.query('UPDATE cartitem SET quantity = ' + term + ' WHERE cartitemId = ' + row);
        return result;
    }
}
module.exports = CartService;