import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { LocalesService } from './locales.service';
import { localesCatalog } from './locales-catalog';
import { FormsModule } from '@angular/forms';
import { DropdownSingleSelectModule } from '@backbase/ui-ang/dropdown-single-select';

@Component({
  selector: 'app-locale-selector',
  templateUrl: 'locale-selector.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DropdownSingleSelectModule,
  ],
  providers: [
    LocalesService,
  ]
})
export class LocaleSelectorComponent implements OnInit {

  @Input() locales: Array<string> = [];

  localesCatalog = localesCatalog;

  private currentLanguage = '';

  constructor(
    private localeService: LocalesService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  set language(value: string) {
    this.localeService.setLocaleCookie(value);
    this.document.location.href = this.document.location.origin;
  }

  get language() {
    return this.currentLanguage;
  }

  ngOnInit() {
    this.currentLanguage = this.findLocale(this.localeService.currentLocale);
  }

  private findLocale(locale: string): string {
    if (this.locales.includes(locale)) {
      return locale;
    }

    return '';
  }
}
