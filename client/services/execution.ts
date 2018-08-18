import * as uuid from 'uuid/v1';

import { EXECUTORS } from '../../config';

// export type OutputFunc = (...args: any[]) => void;

// export const original = Symbol('original');
// const consoleMethods = ['dir', 'log', 'info', 'error', 'warn', 'assert', 'debug', 'timeEnd', 'trace'];
// consoleMethods.forEach(method => {
//   const originMethod = (console as any)[method];
//   function patchedMethod(...args: any[]) {
//     originMethod(...args);
//     if (!Zone.current.get('isExecutionZone')) {
//       return;
//     }
//     const onOutput = Zone.current.get('onOutput');
//     Zone.root.run(() => {
//       onOutput(...args);
//     });
//   }
//   Object.defineProperty(patchedMethod, original, { value: patchedMethod });
//   (console as any)[method] = patchedMethod;
// });

// export const exec = (onOutput: OutputFunc, id: string, code: string) => {
//   const zone = Zone.current.fork({
//     name: id,
//     properties: {
//       onOutput,
//       isExecutionZone: true,
//     },
//     onHandleError(parentZoneDelegate: ZoneDelegate, currentZone: Zone, targetZone: Zone, error: any): boolean {
//       onOutput(error);
//       return true;
//     },
//   });
//   zone.runGuarded(() => {
//     eval(code);
//   });
// };

export class Executor {
  executors = new Map<string, Worker>();

  execute(type: string, code: string) {
    const e = EXECUTORS[type];
    if (!e) {
      return;
    }
    const id = uuid();
    const worker = new Worker(e);
    worker.postMessage({
      type: 'execution',
      code,
    });
    
  }
}