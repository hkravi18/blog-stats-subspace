const asyncHandler = require('express-async-handler');

const notFoundErrorHandler = asyncHandler(async(req, res, next) => {
    //if error doesn't exists and the control reach to this middleware then the requested page does not exist
    return res.status(404).json({
        "OK": false,
        error: `Not Found: ${req.url}`
    }); 
});

const errorHandler = async(err, req, res, next) => {
    //if the error affected middleware doesn't give a status code (default is 200) then assume make it 500 (server error) 
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    
    const errorMessage = err.message;
    res.status(statusCode).json({
        "OK": false,
        error: errorMessage
    });
};

module.exports = { notFoundErrorHandler, errorHandler };