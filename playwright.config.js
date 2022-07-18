const config = {
    timeout: 5 * 60 * 1000,
    expect: {
        timeout: 10 * 1000,
      },
    
    projects: [
        {
            name : 'api-dev',
            use: {
                baseURL: 'https://api.westfielddev.com',
                extraHTTPHeaders: {
                    Accept: 'application/json',
                  },
            }
        },
        {
            name : 'ui-dev',
            use: {
                baseURL: 'https://www.westfielddev.com/',
                browserName: 'webkit',
                headless: false,
                screenshot: 'on',
                video: 'on-first-retry',
            }
        },
        {
            name : 'ui-stage',
            use: {
                baseURL: 'https://www.westfielddev.com/',
                browserName: 'chromium',
                headless: false,
                screenshot: 'only-on-failure',
                video: 'on-first-retry',
            }
        }
    ]
    
  };
  module.exports = config;