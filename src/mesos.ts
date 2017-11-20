import fetch from 'node-fetch'
import { Scheduler } from "./scheduler";

export class Mesos {
    constructor(private apiUrl: string) {

    }

    async subscribe(scheduler: Scheduler) {
        const requestBody = {
            type: 'SUBSCRIBE',
            subscribe: {
               framework_info: {
                 user: '',
                 name: `${scheduler.name}`
               }
            }
        };

        const response = await fetch(this.apiUrl, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(requestBody)
        });

        const streamId = response.headers.get('Mesos-Stream-Id');

        console.log(streamId);
    }
}