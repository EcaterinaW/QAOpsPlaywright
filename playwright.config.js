// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 30*1000,
  retries:1,
  expect: {
    timeout: 5*1000,
  },
  reporter: 'html',

  use: {
    browserName: 'chromium',
    headless : true,
    screenshot : 'on',
    trace : 'retain-on-failure' //off,on
   
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    
  },

  
});
module.exports = config
