/*const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 8080;
import express from 'express';*/

import { createServer } from 'http';
import express, { json, static } from 'express';
const app = express();
app.use = (express.json());
const porta = 3000;
app.set('port', porta);
const server = createServer(app);
server.listen(3000); 

app.use('/assets', static('assets'));
app.use('/views', static('views'));

import cors from 'cors';
app.use(cors());
app.use(cors({
    exposedHeaders: ['Location'],
}));
const permittedLinker = ['localhost', '127.0.0.1', 'htttp://eventos.esmad.ipp.pt/vareshow',
                                                    'http://eventos.esmad.ipp.pt/',
                                                process.env.IP];
app.listen(port, function(err) {
    if (!err) {
        console.log(' app is listening on '  +host+ ' and port ' + port);
    }
    else {
        console.log(err);
    }
});


export default app;
require = (' ./loader.js');


