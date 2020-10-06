import { Component, Inject, OnInit } from '@angular/core';
import { CountriesService } from '../../../../shared/services/countries.service';
import { ICountry } from '../../../../shared/models/country.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialogData } from '../../../../shared/models/dialogData.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-selector-popup-dialog',
    templateUrl: './selector-popup-dialog.component.html'
})
export class SelectorPopupDialogComponent implements OnInit {

    countries: ICountry[];
    form: FormGroup;

    constructor(@Inject(MAT_DIALOG_DATA) public data: IDialogData,
                private countriesService: CountriesService,
                private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.initData();
    }

    initData(): void {
        this.countries = this.countriesService.countries;
        this.form = this.fb.group({
            search: this.fb.control('')
        });
    }

}
