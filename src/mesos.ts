import fetch from 'node-fetch'
import { StringDecoder } from 'string_decoder';
import { Scheduler } from "./scheduler";
import { Task } from './task';

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
        //const td = new StringDecoder();
        response.body.on('data', function(chunk: Buffer) {
            const dataStr = chunk.toString();
            const event = JSON.parse(dataStr.slice(dataStr.indexOf('{'))); // trim size;
            scheduler.handle(event);
        });

        console.log(streamId);
    }

    run(task: Task) {
        // call mesos
    }

    stop(taskId: string) {
        // call mesos
    }
}