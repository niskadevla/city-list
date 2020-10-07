import { Injectable } from '@angular/core';
import { ICountry } from '../models/country.model';
import { BehaviorSubject } from 'rxjs';

const COUNTRIES: ICountry[] = [
    { code: 'AF', name: 'Afghanistan', selected: false },
    { code: 'AL', name: 'Albania', selected: false },
    { code: 'DZ', name: 'Algeria', selected: false },
    { code: 'AS', name: 'American Samoa', selected: false },
    { code: 'AD', name: 'Andorra', selected: false },
    { code: 'AO', name: 'Angola', selected: false },
    { code: 'AI', name: 'Anguilla', selected: false }
];

@Injectable({
    providedIn: 'root'
})
export class CountriesService {

    countries$: BehaviorSubject<ICountry[]> = new BehaviorSubject<ICountry[]>(this.getCountries());

    constructor() {
    }

    getCountries(): ICountry[]  {
        return COUNTRIES;
    }

    updateCountries(countries: ICountry[]): void {
        this.countries$.next(countries);
    }

    setSelectedCountries(countries: ICountry[], selectedCountries: string[]): void {
        const newCountries = countries.map(country => {
            if (selectedCountries.includes(country.name)) {
                country.selected = true;
            }

            return country;
        });

        this.updateCountries(newCountries);
    }

    getSelectedCountries(countries): ICountry[] {
        return countries.filter(country => country.selected);
    }

    resetSelectedCountries(countries: ICountry[]): void {
        const newCountries = countries.map(country => {
            country.selected = false;

            return country;
        });

        this.updateCountries(newCountries);
    }
}
