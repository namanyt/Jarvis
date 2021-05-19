const { botOnline } = require('../Utils/Logger');

module.exports = {
    name: 'ready',
    once: false,
    run: function () {
        botOnline();
    }
}