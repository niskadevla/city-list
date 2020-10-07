import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SelectorPopupDialogComponent } from './components/selector-popup/selector-popup-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MULTIPLE } from '../../shared/Utils/constants';
import { ICountry } from '../../shared/models/country.model';
import { CountriesService } from '../../shared/services/countries.service';

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

    constructor(private fb: FormBuilder,
                private dialog: MatDialog,
                private countriesService: CountriesService) {
    }

    ngOnInit(): void {
        this.initData();
        this.initForm();
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
    }

    changeMode($event: MatRadioChange): void {
        this.multiple = $event.value;
    }

    showAllCountries(): void {
        const dialogRef = this.dialog.open(SelectorPopupDialogComponent, {
            data: {
                multiple: this.multiple
            }, autoFocus: false
        });

        this.subscriptions.add(dialogRef.afterClosed()
                                        .subscribe(result => {
                                            console.log(`Dialog result: ${ result }`);
                                        }));
    }

    reset(): void {
        this.countriesService.resetSelectedCountries(this.countries);
    }

}
