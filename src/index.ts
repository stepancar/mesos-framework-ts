import { Scheduler } from './scheduler';
import { Mesos } from './mesos';

const scheduler = new Scheduler(
    'my-mesos-framework',
    new Mesos('http://localhost:5050/api/v1/scheduler')
);

scheduler.start();
