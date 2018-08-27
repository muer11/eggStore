
const Controller = require("egg").Controller;

class Cart extends Controller{
    async addCart(){
        const proInfo = this.ctx.query;
        const detail = await this.ctx.service.cart.add(proInfo);
        this.ctx.body = detail;
    }
    async sumQuantity(){
        const id = this.ctx.query;
        let quantitySum = 0;
        const sumAll = await this.ctx.service.cart.sum(id);
        for(let i = 0; i < sumAll.length; i++){
            quantitySum += sumAll[i].quantity;
        }
        this.ctx.body = quantitySum;
    }
    async listProduct(){
        const memberId = this.ctx.query;
        const list = await this.ctx.service.cart.select(memberId);
        this.ctx.body = list;
    }
    async changeInitQuantity(){
        const ctx = this.ctx.query;
        const list = await this.ctx.service.cart.changeQuantity(ctx);
        this.ctx.body = list;
    }
    async deleteItems(){
        let ctx = this.ctx.query;
        const deleteItems = eval(ctx.delItems);
        for(let n = 0; n < deleteItems.length; n++){
            let result = await this.ctx.service.cart.delete(deleteItems[n]);
            if(result.serverStatus != 2){
                this.ctx.body = '删除失败';
                return false;
            }
        }
        this.ctx.body = '删除成功';
    }
    async judgeIsAddCart(){
        const msg = this.ctx.query;
        const list = await this.ctx.service.cart.judge(msg);
        this.ctx.body = list;
    }
}

module.exports = Cart;
