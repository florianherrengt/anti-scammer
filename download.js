const loadtest = require('loadtest')

loadtest.loadTest({
    url: 'https://dvla.govuk-ref0llp.com/code_files/3d.css',
    requestsPerSecond: 10,
    concurrency: 10
})
