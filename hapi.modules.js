import inert from 'inert';
import vision from 'vision';
import Good from 'good';
import goodConsole from 'good-console';
import goodFile from 'good-file';

export default (cluster) => {
  const hapiModuleConfig = [
    inert,
    vision, {
      register: Good,
      options: {
        reporters: [{
          reporter: goodConsole,
          events: {
            response: '*',
            log: '*'
          }
        }, {
          reporter: goodFile,
          events: {
            ops: '*'
          },
          config: {
            path: './log/',
            prefix: 'Ops-WorkerID-' + cluster.worker.id + '-'
          }
        }, {
          reporter: goodFile,
          events: {
            error: '*'
          },
          config: {
            path: './log/',
            prefix: 'Err-WorkerID-' + cluster.worker.id + '-'
          }
        }]
      }
    }
  ]
  return hapiModuleConfig
}
