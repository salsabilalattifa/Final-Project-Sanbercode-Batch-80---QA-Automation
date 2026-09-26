const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl : 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
    directUrl : 'https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory',
    rectUrl : 'https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
