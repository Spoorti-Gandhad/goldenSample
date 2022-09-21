import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideRoutes, Route } from '@angular/router';
import { TRANSLATIONS } from './constants/dynamic-translations';
import { ArrangementsService } from './services/arrangements.service';
import { TransactionsJourneyConfiguration } from './services/transactions-journey-config.service';
import { TransactionsRouteTitleResolverService } from './services/transactions-route-title-resolver.service';
import { TransactionsHttpService } from './services/transactions.http.service';
import { TransactionsViewComponent } from './views/transactions-view/transactions-view.component';
import {
  TRANSACTION_EXTENSIONS_CONFIG,
  TransactionsJourneyExtensionsConfig,
} from './extensions';

const defaultRoute: Route = {
  path: '',
  component: TransactionsViewComponent,
  data: {
    title: TRANSLATIONS.transactionsTitle,
  },
  resolve: {
    title: TransactionsRouteTitleResolverService,
  },
};

export interface TransactionsJourneyModuleConfig {
  route?: Route;
  extensionSlots?: TransactionsJourneyExtensionsConfig;
}

@NgModule({
  imports: [
    TransactionsViewComponent,
  ],
  providers: [
    TransactionsHttpService,
    TransactionsJourneyConfiguration,
    ArrangementsService,
    TransactionsRouteTitleResolverService,
  ],
})
export class TransactionsJourneyModule {
  static forRoot({
    route,
    extensionSlots,
  }: TransactionsJourneyModuleConfig = {}): ModuleWithProviders<TransactionsJourneyModule> {
    return {
      ngModule: TransactionsJourneyModule,
      providers: [
        provideRoutes([route || defaultRoute]),
        {
          provide: TRANSACTION_EXTENSIONS_CONFIG,
          useValue: extensionSlots || {},
        },
      ],
    };
  }
}
