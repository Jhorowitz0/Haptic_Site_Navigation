import express from 'express';
import bodyParser from 'body-parser';
import routes from "./src/routes/routes.js";

const server = express();
const PORT = 3000;

//body parser init
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

server.use(express.static('public')); 

routes(server);

server.listen(PORT, () => {
    console.log(`Your server is running on port ${PORT}`);
});

