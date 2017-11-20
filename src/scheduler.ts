import { Mesos } from './mesos';

export class Scheduler {
    constructor(public name = '', public mesos: Mesos) {

    }
    
    async start() { 
        await this.mesos.subscribe(this);
    }
}
