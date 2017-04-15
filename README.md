# Wikipedia-Viewer

http://www.knowwhatsup.net

The purpose of this webpage is to help people learn more about the issues being discussed in their local and global community without reliance on any specific news provider. This is done by monitoring social media for trending topics and then finding popular Wikipedia articles relating to those discussions.

## Technical Details

In addition to providing a Wikipedia search engine, this webpage generates 4 carousels dynamically as follows:

### Trending near you:

get user IP => get user geolocation => get WOEID (Yahoo's area code needed for Twitter query)
=> check if data for that WOEID exists in MongoDB database and is less than 1 hour old
=> (if no recent data is found) search Twitter for top 50 trending topics
=> search Wikipedia for popular articles relating to each topic
=> select articles based on image availability and pageviews from the previous day
=> return data to frontend and cache to MongoDB

### Trending Worldwide:

The same as above but getting IP and geolocation is not necessary as the world WOEID is constant.

### Popular

Generated based on top 10 most searched items and sorted by pageviews.

### Most Liked

Every user had the ability to upvote an given page once. The most liked carousel displays these pages in descending order. 

### Performance

This page takes full advantage of Node.js' asynchronous nature by allowing many API calls (potentially 100 at a time) to run in parallel. Furthermore,
care is taken to cache data whenever possible and images are compressed by middleware. To avoid 'callback hell', promises are used heavily and code is broken in several reusable functions.

### Tests
Several automated tests have been written in Jest to test the asynchronous output of the various Express modules. These can be found in the 'tests' folder.
