import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICountryState } from './countries.reducer';
import { countriesNode } from '../index';
import { ICountry } from '../../shared/models/country.model';

export const selectCountriesFeature = createFeatureSelector<ICountryState>(countriesNode);

export const selectCountries = createSelector(
    selectCountriesFeature,
    (state: ICountryState): ICountry[] => state.countries
);

