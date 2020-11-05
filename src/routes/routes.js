const controller = {
    sendP5js: (req,res)=>{
        res.sendfile('index.html');
    },
}

const routes = (server) => {
    server.route('/')
        .get(controller.sendP5js);
}

export default routes;