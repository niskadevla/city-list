import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { SelectorPopupDialogComponent } from './components/selector-popup/selector-popup-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ICountry } from '../../shared/models/country.model';
import { map, take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { ICountryState } from '../../reducers/countries/countries.reducer';
import { selectCountries } from '../../reducers/countries/countries.selector';
import { CountriesResetSelectedAction } from '../../reducers/countries/countries.actions';

@Component({
    selector: 'app-selector',
    templateUrl: './selector.component.html',
    styleUrls: [ './selector.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorComponent implements OnInit, OnDestroy {
    public form: FormGroup;
    @Input() multiple: boolean;
    @Input() isAllSelected: boolean;
    public countries: ICountry[];
    public selectedCountries: ICountry[];
    public subscriptions: Subscription = new Subscription();
    public filteredCountries$: Observable<string[]>;

    constructor(private fb: FormBuilder,
                private dialog: MatDialog,
                private cdr: ChangeDetectorRef,
                private store$: Store<ICountryState>) {
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
            radioGroup: this.fb.control(this.multiple),
            search: this.fb.control(''),
            result: this.fb.control('')
        });
    }

    private _initData(): void {
        this.subscriptions.add(this.store$.pipe(select(selectCountries))
                                   .subscribe(countries => {
                                       this.countries = countries;
                                       this.selectedCountries = this.getSelectedCountries();
                                   }));

        this.filteredCountries$ = this.form.controls.search.valueChanges
                                      .pipe(
                                          map(value => this._filter(value))
                                      );
    }

    public changeMode($event: MatRadioChange): void {
        this.multiple = $event.value;
    }

    public showAllCountries(): void {
        const dialogRef = this.dialog.open(SelectorPopupDialogComponent, {
            data: {
                multiple: this.multiple,
                isAllSelected: this.isAllSelected
            }, autoFocus: false
        });

        this.clearInput();

        dialogRef.afterClosed()
                 .pipe(take(1))
                 .subscribe(result => {
                     if (result) {
                         this.cdr.detectChanges();
                     }
                 });
    }

    public reset(): void {
        this.store$.dispatch(new CountriesResetSelectedAction());
    }

    private _filter(value: string): string[] {
        return this.countries.map(country => country.name)
                   .filter(option => option.toLowerCase()
                                           .includes(value?.toLowerCase()));
    }

    public getSelectedCountries(): ICountry[] {
        return this.countries.filter(country => country.selected);
    }

    public clearInput(): void {
        this.form.controls.search?.reset();
    }
}
