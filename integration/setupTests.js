const { toMatchImageSnapshot } = require('jest-image-snapshot');

expect.extend({ toMatchImageSnapshot });


//yarn run jest:integration --updateSnapshot обновить версию снепшота