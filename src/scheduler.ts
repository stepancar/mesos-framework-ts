import { Mesos } from './mesos';

export class Scheduler {
    constructor(public name = '', public mesos: Mesos) {

    }
    frameworkId: string;
    lastOffers = [];

    async start() { 
        await this.mesos.subscribe(this);
    }

    handle(event: any) {
        switch (event.type) {
            case 'SUBSCRIBED': {
                this.frameworkId = event.subscribed.framework_id.value;
                console.log(`subscribed to mesos with id ${this.frameworkId}`);
                break;
            }
            case 'OFFERS': {
                this.lastOffers = event.offers;
                console.log(`mesos offers ${this.lastOffers}`);
                break;
            }
        }
    }
}
