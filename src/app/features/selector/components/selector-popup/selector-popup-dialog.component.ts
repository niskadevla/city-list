import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { CountriesService } from '../../../../shared/services/countries.service';
import { ICountry } from '../../../../shared/models/country.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialogData } from '../../../../shared/models/dialogData.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-selector-popup-dialog',
    templateUrl: './selector-popup-dialog.component.html',
    styleUrls: ['./selector-popup-dialog.component.scss']
})
export class SelectorPopupDialogComponent implements OnInit, OnDestroy {

    countries: ICountry[];
    form: FormGroup;
    multiple: boolean;
    subscriptions: Subscription = new Subscription();

    constructor(@Inject(MAT_DIALOG_DATA) public data: IDialogData,
                private countriesService: CountriesService,
                private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.initData();
        this.initForm();
        this.multiple = this.data.multiple;
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    initForm(): void {
        this.form = this.fb.group({
            search: this.fb.control(''),
            selectionList: this.fb.control(''),
        });
    }

    initData(): void {
        this.subscriptions.add(this.countriesService.countries$.subscribe(countries => {
            this.countries = countries;
        }));
    }

    onSelect(): void {
        this.countriesService.setSelectedCountries(this.countries, this.form.controls.selectionList.value);
    }
}
