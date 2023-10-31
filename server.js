const express = require('express');
const cors = require('cors');

const app = express();

//port 
const port = 3000;

//express middleware
app.use(express.urlencoded({ extended: true }));

//middleware
const blogStatsMiddleware = require('./middlewares/blogStatsMiddleware');
const blogSearchMiddleware = require('./middlewares/blogSearchMiddleware');

//error handler middleware
const { notFoundErrorHandler, errorHandler } = require('./errorHandler/errorHandler');

//cors middleware
app.use(cors({ origin: "*" }));

//routes
app.route('/api/blog-stats').get(blogStatsMiddleware);
app.route('/api/blog-search').get(blogSearchMiddleware);

//if no error encountered in any above middlewares then the requested page does not exist
app.use(notFoundErrorHandler);

//if any error encountered, the control flow will skip all other middlewares and come to the error handler
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})