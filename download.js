const loadtest = require('loadtest')

loadtest.loadTest({
    url: 'https://dvla.govuk-ref0llp.com?c=2',
    requestsPerSecond: 1,
    concurrency: 1
})
