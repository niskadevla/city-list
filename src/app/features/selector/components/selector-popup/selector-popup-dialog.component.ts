import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CountriesService } from '../../../../shared/services/countries.service';
import { ICountry } from '../../../../shared/models/country.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialogData } from '../../../../shared/models/dialogData.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReplaySubject, Subscription } from 'rxjs';
import { MatSelectionList } from '@angular/material/list';

@Component({
    selector: 'app-selector-popup-dialog',
    templateUrl: './selector-popup-dialog.component.html',
    styleUrls: [ './selector-popup-dialog.component.scss' ]
})
export class SelectorPopupDialogComponent implements OnInit, OnDestroy {

    @ViewChild(MatSelectionList) countriesList: MatSelectionList;
    countries: ICountry[];
    form: FormGroup;
    multiple: boolean;
    subscriptions: Subscription = new Subscription();
    isAllSelected = false;
    filteredCountries: ReplaySubject<ICountry[]> = new ReplaySubject<ICountry[]>();

    constructor(@Inject(MAT_DIALOG_DATA) public data: IDialogData,
                private countriesService: CountriesService,
                private fb: FormBuilder) {
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
            search: this.fb.control(''),
            selectionList: this.fb.control('')
        });
    }

    initData(): void {
        this.subscriptions.add(this.countriesService.countries$.subscribe(countries => {
            this.countries = countries;
        }));

        this.multiple = this.data.multiple;
        this.filteredCountries.next(this.countries.slice());
    }

    onSelect(): void {
        this.countriesService.setSelectedCountries(this.countries, this.form.controls.selectionList.value);
    }

    selectAll(): void {
        this.countriesList.selectAll();
    }

    deselectAll(): void {
        this.countriesList.deselectAll();
    }

    toggleAllSelection(): void {
        this.isAllSelected = !this.isAllSelected;
        this.isAllSelected
        ? this.selectAll()
        : this.deselectAll();
    }

    searchCountries(): void {
        let search = this.form.controls.search.value;

        if (!search) {
            this.filteredCountries.next(this.countries.slice());
            return;
        } else {
            search = search.toLowerCase();
        }

        this.filteredCountries.next(
            this.countries.filter(country => country.name.toLowerCase().includes(search))
        );
    }

}
