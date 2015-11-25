// Cluster
import cluster from 'cluster';
const numCPUs = require('os').cpus().length;

// Hapi
import Hapi from 'hapi';
import hapiReactViews from 'hapi-react-views';

// Load our module configuration
import hapiModuleConfig from './hapi.modules';

module.exports = function() {

  if (cluster.isMaster) {
    // For each available CPU we spawn a process
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('online', (worker) => {
      console.log('Worker ' + worker.process.pid + ' is online, expecting: ' + numCPUs + ' workers.');
    });

    // Get a new worker if one dies
    cluster.on('exit', (worker, code, signal) => {
      console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
      console.log('Starting a new worker');
      cluster.fork();
    });
  } else if (cluster.isWorker) {

    // Server connection for this worker
    const serverConfig = {
        host: '127.0.0.1',
        port: 3000
      }
    const server = new Hapi.Server();
    server.connection(serverConfig);

    // Register Hapi Modules
    // We are passing in the cluster object as we might want to have access to the worker information
    server.register(hapiModuleConfig(cluster), (err) => {
      if (err) throw err;

      // Hapi Views with React as Engine
      server.views({
        engines: {
          jsx: hapiReactViews
        },
        relativeTo: __dirname,
        path: 'views'
      });

      // Example for a catch-all route returning a reply
      // & rendered with React template 'default' in views folder
      server.route({
        method: 'GET',
        path: '/{path*}',
        handler: (request, reply) => {
          return reply.view('default',{
            title: 'Node Hapi React Cluster in ES6',
            message: 'Get the Repo on Github',
            link: 'https://github.com/Gattermeier/Node-Hapi-React-Cluster-in-ES6'
          })
        }
      })

    });

    // Finally, let's fire up the server for this worker
    server.start((err) => {
      if (err) throw err;
      console.log('HAPI server running as cluster worker with ID ' + cluster.worker.id + ' on:', serverConfig.host, ':', serverConfig.port);
    });
  }
}
