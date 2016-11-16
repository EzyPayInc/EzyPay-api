module.exports = {
    MySQL01: {
        port: 3306,
        dialect: 'mysql',
        host: '172.16.122.12',
        user: 'ezypay01',
        password: 'EzyPay123#',
        database: 'ezypay',
        pool: {
            min: 0,
            max: 5,
            idle: 10000
        }
    }
};