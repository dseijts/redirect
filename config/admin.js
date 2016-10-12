var crypto = require('crypto');

module.exports.admin = {

  users: {
    'ronald@vpscash' : 'UR82foi8bofd1wbcbBYPaDgGxLoNF/Tg9d24Mv852Eo=',
    'robin@vpscash'  : 'aEBmq9G7cFeNlHVYD+Qnp5CkbhQmgd1bHbfLC5s97j4=',
    'stephan@vpscash': 'Zvzex2bSGjQ5hzcfIavhhrbL9We4vhaxN55QXcUXMxk=',
    'henk@vpscash'   : 'B47o/8fIg4+LSZ1w5VgH4VzDI9ed2NpteI6eKeOHgLY=',
    'gaby@vpscash'   : 'AzJdsLwXzQ/wT6Q+SJzzzm7jGKrMwEI1IzkAM9aB+UQ='
  },

  hosts: [
    'localhost',
    'localhost:1337',
    '104.199.27.139'
  ],

  checkPassword: function(username, hash) {
        return crypto.createHash('sha256').update(username+config.admin.users[username]).digest('base64') == hash;
  },

  firewall: function(request, response) {
    var ip = request.headers['x-forwarded-for'] ||
      request.connection.remoteAddress ||
      request.socket.remoteAddress ||
      request.connection.socket.remoteAddress;

    request.clientIp = ip;

    var allowed = [
      '87.213.98.98',
      '127.0.0.1',
      '::ffff:127.0.0.1',
      '::1'
    ];

    var output = allowed.indexOf(ip) >= 0;

    console.log('Firewall        ',ip,output?'allowed':'denied');

    return allowed.indexOf(ip) >= 0;
  }

};
