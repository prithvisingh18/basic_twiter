module.exports = {
    databaseConfig: {
        host: "localhost",
        user: "root",
        password: ""
    },
    schema: 'basic_twitter',
    saltRounds: 10,
    sessionSecret: 'test',
    redisConfig: { host: 'localhost', port: 6379, ttl: 260 },
    NAMESPACE : '4981e98c-fa39-11e8-aa5d-8bc1b0935338'
}