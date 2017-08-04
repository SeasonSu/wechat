//数据库配置

module.exports = {
    "development":{
        "timezone" : "+08:00",
        "username": "root",
        "password": "123456",
        "database": "node_wx",
        "host": "localhost",
        "dialect": "mysql",
        "port":"3307",
        "define": {
            "timestamps": false
        }
    },
    "test":{
        "timezone" : "+08:00",
        "username": "root",
        "password": "123456",
        "database": "node_wx",
        "host": "localhost",
        "dialect": "mysql",
        "port":"3307",
        "define": {
            "timestamps": false
        }
    }
}
