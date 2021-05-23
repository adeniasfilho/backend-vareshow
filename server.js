const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 8080;
import express from 'express';
const app = express();



app.use('/assets', express.static('assets'));
app.use('/views', express.static('views'));

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

/*const module = module.exports; 
module.exports = app;
const require = (' ./loader.js');*/


