import { Route } from '@angular/router';
import {
  MakeTransferCommunicationService,
  MakeTransferJourneyConfiguration,
  transferJourneyRoutes
} from '@libs/transfer';
import { environment } from '../../environments/environment';
import { JourneyCommunicationService } from '../services/journey-communication.service';

export const routes: Array<Route> = transferJourneyRoutes.map(route => ({
  ...route,
  providers: [
    ...(route.providers || []),
    {
      provide: MakeTransferJourneyConfiguration,
      useValue: {
        maskIndicator: false,
        maxTransactionAmount: 100,
        slimMode: environment.common.designSlimMode,
      } as MakeTransferJourneyConfiguration,
    },
    {
      provide: MakeTransferCommunicationService,
      useExisting: JourneyCommunicationService,
    },
  ]
}));
