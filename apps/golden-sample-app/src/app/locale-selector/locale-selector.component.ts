import { DOCUMENT, NgFor } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { LocalesService } from './locales.service';
import { localesCatalog } from './locales-catalog';
import { FormsModule } from '@angular/forms';
import { DropdownMenuModule } from '@backbase/ui-ang/dropdown-menu';

type Locale = typeof localesCatalog[string];

@Component({
  selector: 'app-locale-selector',
  templateUrl: 'locale-selector.component.html',
  standalone: true,
  imports: [
    NgFor,
    FormsModule,
    DropdownMenuModule,
  ],
  providers: [
    LocalesService,
  ]
})
export class LocaleSelectorComponent implements OnInit {

  @Input() locales: Array<string> = [];

  localesCatalog: Array<Locale> = [];

  protected currentLanguage = '';

  constructor(
    private localeService: LocalesService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  set language(value: object | string) {
    if (typeof value === 'string') {
      return;
    }

    this.localeService.setLocaleCookie((value as Locale).code);
    this.document.location.href = this.document.location.origin;
  }

  get language() {
    return this.currentLanguage;
  }

  ngOnInit() {
    this.localesCatalog = this.locales
      .reduce((acc: Array<Locale>, locale) => [...acc, localesCatalog[locale]], []);

    this.currentLanguage = this.findLocale(this.localeService.currentLocale);
  }

  private findLocale(locale: string): string {
    return this.localesCatalog.find(x => x.code === locale)?.language ?? '';
  }
}
