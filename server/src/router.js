const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
    response.send('Server running');
});

module.exports = router;