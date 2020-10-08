import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
    styleUrls: [ './selector-popup-dialog.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorPopupDialogComponent implements OnInit, OnDestroy {

    @ViewChild(MatSelectionList) countriesList: MatSelectionList;
    public countries: ICountry[];
    public form: FormGroup;
    public multiple: boolean;
    public subscriptions: Subscription = new Subscription();
    public isAllSelected: boolean;
    public filteredCountries: ReplaySubject<ICountry[]> = new ReplaySubject<ICountry[]>();

    constructor(@Inject(MAT_DIALOG_DATA) public data: IDialogData,
                private countriesService: CountriesService,
                private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this._initForm();
        this._initData();
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    private _initForm(): void {
        this.form = this.fb.group({
            search: this.fb.control(''),
            selectionList: this.fb.control('')
        });
    }

    private _initData(): void {
        this.subscriptions.add(this.countriesService.countries$.subscribe(countries => {
            this.countries = countries;
        }));

        this.multiple = this.data.multiple;
        this.isAllSelected = this.data.isAllSelected;
        this.filteredCountries.next(this.countries.slice());
    }

    public onSelect(): void {
        this.countriesService.setSelectedCountries(this.countries, this.form.controls.selectionList.value);
    }

    private _selectAll(): void {
        this.countriesList.selectAll();
    }

    private _deselectAll(): void {
        this.countriesList.deselectAll();
    }

    public toggleAllSelection(): void {
        this.isAllSelected = !this.isAllSelected;

        if (this.isAllSelected) {
            this._selectAll();
        } else {
            this._deselectAll();
        }
    }

    public searchCountries(): void {
        const search = this.form.controls.search.value?.toLowerCase();

        this.filteredCountries.next(
            this.countries.filter(country => country.name.toLowerCase().includes(search))
        );
    }

}
