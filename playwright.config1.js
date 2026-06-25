// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  retries : 1,
  // workers: 1,
  timeout: 30 * 1000,
  expect: {
    timeout: 5 * 1000,
  },
  reporter: 'html',
  projects: [
    {
      name: 'safari',
      use: {
        browserName: 'webkit',
        headless: true,
        screenshot: 'off',
        trace: 'retain-on-failure', //off,on
        ...devices['iPhone 11']

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */

      }
    },
{
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: true,
        screenshot: 'on',
        trace: 'retain-on-failure',
        // ignoreHttpsErrors:true,
        // permissions:['geolocation'],
        // video: 'retain-on-failure',
        // viewport : {width:720,height:720} //off,on
      }
    }
  ]




});
module.exports = config
