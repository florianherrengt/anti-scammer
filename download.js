const loadtest = require('loadtest')

loadtest.loadTest({
    url: 'https://dvla.govuk-ref0llp.com/7?&sessionid=&c=2',
    requestsPerSecond: 1,
    concurrency: 10
})
