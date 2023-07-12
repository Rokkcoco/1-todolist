module.exports = {
    preset: 'jest-puppeteer',
    testRegex: './*\\.test\\.js$',
    setupFilesAfterEnv: ['./setupTests.js']
};

//yarn run jest:integration --updateSnapshot обновить версию снепшота