import { Injectable } from '@angular/core';
import { TrackerHandler } from '@backbase/foundation-ang/observability';

@Injectable()
export class ConsoleTrackerHandler extends TrackerHandler {
  register(): void {
    this.tracker.subscribeAll((event) => {
      console.log('TRACKER EVENT', event);
    });
  }
}