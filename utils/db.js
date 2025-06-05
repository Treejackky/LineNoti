const [, , method] = process.argv;
const { sequelize } = require('../db/index');

exports.syncDB = async ({ alter = false }) => {
    try{
        console.log(`Syncing db -> ${process.env.DB_NAME} ${alter ? 'alter' : 'force'}`);
        if(alter){
            await sequelize.sync({ alter: true });
        }else{
            await sequelize.sync({ force: true });
        }
        console.log(`Syncing db -> ${process.env.DB_NAME} ${alter ? 'alter' : 'force'} success`);
    }catch(error){
        console.log(error);
        throw error;
    }
}


// ให้ run syncDB
if(method === 'sync-alter'){
    this.syncDB({}).then(() => process.exit(0));
}else if(method === 'sync-force'){
    this.syncDB({ force: true }).then(() => process.exit(0));
}else{
    console.log('Invalid method');
    process.exit(1);
}
