const Controller = require('egg').Controller;
class ReceiverController extends Controller {
        async add() {
                const receiverInfo = this.ctx.query;
                const info = await this.ctx.service.receiver.add(receiverInfo);
                this.ctx.body = info;
        }

        async select() {
                const memberId = this.ctx.query;
                const info = await this.ctx.service.receiver.selectReceiver(memberId);
                this.ctx.body = info;
        }
        async modify() {
                const receiverInfo = this.ctx.query;
                const info = await this.ctx.service.receiver.modifyReceiver(receiverInfo);
                this.ctx.body = 22;
        }
        async modifyDefault() {
                const receiverInfo = this.ctx.query;
                const info = await this.ctx.service.receiver.modifyDefault(receiverInfo);
                this.ctx.body = info;
        }
        async show() {
                const receiverId = this.ctx.query;
                const info = await this.ctx.service.receiver.findReceiver(receiverId);
                this.ctx.body = info;
        }
        async delete() {
                const receiverId = this.ctx.query;
                const info = await this.ctx.service.receiver.deleteReceiver(receiverId);
                this.ctx.body = info;
        }
}
module.exports = ReceiverController;