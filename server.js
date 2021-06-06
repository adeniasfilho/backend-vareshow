import cors from 'cors';
import express, { json, static } from 'express';

const http = require ('http');
const app = require ('./backend/app');
const port = process.env.PORT || 3000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);

app.use('/assets', static('assets'));
app.use('/views', static('views'));


app.use(cors());
app.use(cors({
    exposedHeaders: ['Location'],
}));

app.listen(port, function(err) {
    if (!err) {
        console.log(' app is listening on '  +host+ ' and port ' + port);
    }
    else {
        console.log(err);
    }
});

require = (' ./loader.js');


