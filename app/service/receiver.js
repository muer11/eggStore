const Service = require('egg').Service;

class ReceiverService extends Service{
    async add(params){

        //1. 如果数据库没有用户的相关地址，则默认必为true
        //2. 如果数据库有用户的相关地址，若默认必为true，则该项为true,其余为false;若默认为false,则直接存储

        const receiverInfo = await this.app.mysql.select('receiver',{
            where: {member_id: params.member_id}
        });
        let len = receiverInfo.length;
        let isDefault = false;
        const member_id = params.member_id;
        
        if(len == 0){
            isDefault = true;
        }else{
            isDefault = (params.isDefault == "true") ? true : false;
            if(isDefault){
                await this.app.mysql.query('UPDATE receiver SET isDefault = false WHERE member_id = ?' , [member_id]);
            }
        }

        let createdDate = new Date();
        const consignee = params.consignee;
        const phone = params.phone;
        const zipCode = params.zipCode;
        const areaName = params.areaName;
        const area_id = params.area_id;
        const address = params.address;

        const receiver = await this.app.mysql.insert('receiver', {
            createdDate : createdDate,
            address : address,
            areaName : areaName,
            consignee : consignee,
            isDefault : isDefault,
            phone : phone,
            zipCode : zipCode,
            area_id : area_id,
            member_id : member_id,
        });

        return receiver;
    }
    async selectReceiver(params){
        const receiverInfo = await this.app.mysql.select('receiver',{
            where: params
        });
        return receiverInfo;
    }
    async modifyReceiver(params){
        // 自定义mysql语句: update 表名 set `字段名`='修改值' where 条件;
        console.log(params);
        const id = params.id;
        const consignee = params.consignee;
        const phone = params.phone;
        const areaName = params.areaName;
        const address = params.address;
        const zipCode = params.zipCode;
        const areaId = params.areaId;
        const receiverInfo = await this.app.mysql.query('UPDATE receiver SET consignee = ? , phone = ? , areaName = ? , address = ? , zipCode = ? , area_id = ? WHERE id = ?' , [consignee, phone, areaName, address, zipCode, areaId, id]);
        return 333;
    }
    async modifyDefault(params){
        // 自定义mysql语句: update 表名 set `字段名`='修改值' where 条件;
        console.log(params);
        const id = params.id;
        const member_id = params.member_id;
        await this.app.mysql.query('UPDATE receiver SET isDefault = false WHERE member_id = ?' , [member_id]);
        const receiverInfo = await this.app.mysql.query('UPDATE receiver SET isDefault = true WHERE id = ?' , [id]);
        return receiverInfo;
    }
    async findReceiver(params){
        const receiverInfo = await this.app.mysql.select('receiver',{
            where: params
        });
        return receiverInfo;
    }
    async deleteReceiver(params){
        const id = params.id;
        const member_id = params.member_id;
        const isDefault = Number(params.isDefault);
        let result = await this.app.mysql.query('DELETE FROM receiver WHERE id = ? ' , id);
        if(isDefault){
            const idInfo = await this.app.mysql.query('SELECT id FROM receiver WHERE member_id = ? ORDER BY id ASC limit 0,1' , [member_id]);
            const id = idInfo[0].id;
            result = await this.app.mysql.query('UPDATE receiver SET isDefault = true WHERE id = ?' , [id]);
        }
        return result;
    }
    
}

module.exports = ReceiverService;