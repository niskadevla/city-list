import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { SelectorPopupDialogComponent } from './components/selector-popup/selector-popup-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MULTIPLE } from '../../shared/Utils/constants';
import { ICountry } from '../../shared/models/country.model';
import { CountriesService } from '../../shared/services/countries.service';
import { map, startWith } from 'rxjs/operators';

@Component({
    selector: 'app-selector',
    templateUrl: './selector.component.html',
    styleUrls: [ './selector.component.scss' ]
})
export class SelectorComponent implements OnInit, OnDestroy {
    form: FormGroup;
    multiple = MULTIPLE;
    countries: ICountry[];
    selectedCountries: ICountry[];
    subscriptions: Subscription = new Subscription();
    filteredCountries: Observable<string[]>;

    constructor(private fb: FormBuilder,
                private dialog: MatDialog,
                private countriesService: CountriesService) {
    }

    ngOnInit(): void {
        this.initForm();
        this.initData();
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    initForm(): void {
        this.form = this.fb.group({
            radioGroup: this.fb.control(this.multiple),
            search: this.fb.control(''),
            result: this.fb.control('')
        });
    }

    initData(): void {
        this.subscriptions.add(this.countriesService.countries$.subscribe(countries => {
            this.countries = countries;
            this.selectedCountries = this.countriesService.getSelectedCountries(countries);
        }));

        this.filteredCountries = this.form.controls.search.valueChanges
                                     .pipe(
                                         startWith(''),
                                         map(value => this._filter(value))
                                     );

        console.log(this.form.controls.search.valueChanges);
    }

    changeMode($event: MatRadioChange): void {
        this.multiple = $event.value;
    }

    showAllCountries(): void {
        this.dialog.open(SelectorPopupDialogComponent, {
            data: {
                multiple: this.multiple
            }, autoFocus: false
        });
    }

    reset(): void {
        this.countriesService.resetSelectedCountries(this.countries);
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        const countries: string[] = this.countries.map(country => country.name);

        return countries.filter(option => option.toLowerCase()
                                                     .includes(filterValue));
    }
}
