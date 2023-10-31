const _ = require('lodash');
const axios = require('axios');
const asyncHandler = require('express-async-handler');

//function which requests for the blogs from external API server
const fetchApi = async() => {
    try {
        const response = await axios.get('https://intent-kit-16.hasura.app/api/rest/blogs', {
            headers: {
                'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6'
            }
        })
        if (response.status === 200) {
            const data = response.data;
            
            //total number of blogs 
            const total_blogs = data.blogs.length;

            //blog with the longest title
            const blogWithLongestTitle = _.maxBy(data.blogs, 'title.length');

            //number of blogs with titles containing the word "privacy"
            const blogsWithPrivacyTitle = _.filter(data.blogs, (blog) => _.includes(blog.title.toLowerCase(), 'privacy')).length;

            //an array of unique blog titles (no duplicates)
            const uniqueBlogTitles = _.uniqBy(data.blogs, 'title');

            return {total_blogs, blogWithLongestTitle, blogsWithPrivacyTitle, uniqueBlogTitles};
            
        } else {
            //blog site api error  
            const error =  new Error('Response failed from blog server');
            return error;
        }
    } catch (err) {
        return err;
    }
};

//resolver for the parameters to be passed (returning nothing as the function fetchApi does not need anything as parameter)
const resolver = () => {};

//memoized function of fetchApi with the custom resolver
const memoizedFetchApi = _.memoize(fetchApi, resolver);

//main middleware function (call the memoized function)
const blogStatsMiddleware = asyncHandler(async(req, res, next) => {
    try {
        const blogStats = await memoizedFetchApi();

        return res.status(200).json({
            "OK": true, 
            stats: blogStats
        });
    } catch (err) {
        next(err);
    }
});

module.exports = blogStatsMiddleware;