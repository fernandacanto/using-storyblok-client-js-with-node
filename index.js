'use strict';

const express = require('express');
const app = express()
const port = 3000

const StoryblokClient = require('storyblok-js-client');

let client = new StoryblokClient({ 
    accessToken: 'YOUR TOKEN', 
}, 'https://api.storyblok.com/v1/')
  
app.get('/', function(req, res){
    client.get('cdn/stories', { 
        filter_query: { 
            is_featured: { in: true } 
        }, 
        version: 'published', 
        resolve_relations: 'page.relations', 
        resolve_links: 'page.links',
        page: '1', 
        per_page: '10' 
    }).then((data) => { 
        res.send(data);
        console.log('stories =>', data) 
    }).catch((err) => console.log('error', err))
 });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
