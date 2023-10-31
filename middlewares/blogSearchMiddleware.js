const _ = require('lodash');
const axios = require('axios');
const asyncHandler = require('express-async-handler');

//function which requests for the blogs from external API server
const fetchApi = async(query) => {
    try {
        const response = await axios.get('https://intent-kit-16.hasura.app/api/rest/blogs', {
            headers: {
                'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6'
            }
        })
        
        if (response.status === 200) {
            const data = response.data;
            const filteredBlogs = data.blogs.filter((blog) => blog.title.toLowerCase().includes(query.toLowerCase()));
            
            return filteredBlogs;
        } else {
            const error = new Error('Response failed from blog server');
            return error;
        }  
    } catch (err) {
        return err;
    }
};

//resolver for the parameters to be passed
const resolver = (query) => query;

//memoized function of fetchApi with the custom resolver
const memoizedFetchApi = _.memoize(fetchApi, resolver);

//main middleware function (extracts query from url and call the memoized function)
const blogSearchMiddleware = asyncHandler(async(req, res, next) => {
    try {
        const query = req.query.query;
        if (!query) throw new Error('Invalid query string'); 
        
        const filteredBlogs = await memoizedFetchApi(query);
        
        return res.status(200).json({
            "OK": true, 
            blogs: filteredBlogs
        }); 
    } catch (err) {
        next(err);
    }
});

module.exports = blogSearchMiddleware;