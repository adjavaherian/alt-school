//config.js
var config = { };

// should end in /
config.rootUrl  = process.env.ROOT_URL                  || 'http://alt-rulz.herokuapp.com/';


config.env = {
    prod: {
        sqlDriver: 'driver://inuwvtvagyudpx:vXvTonI46H-6HBtlUllai726-s@ec2-54-243-49-204.compute-1.amazonaws.com:5432/dapgarjped5d70'
    },
    dev: {
        sqlDriver: 'driver://amir@localhost/slyce'
    }
}

config.rest = {
    options : {
        context: '/api',
        logger:{ level: 'debug' },
        apiKeys: [ '849b7648-14b8-4154-9ef2-8d1dc4c2b7e9' ],
        discoverPath: 'discover',
        protoPath: 'proto'
    }
}

module.exports = config;
