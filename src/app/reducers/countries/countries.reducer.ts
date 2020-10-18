import { ICountry } from '../../shared/models/country.model';
import * as CountriesActions from './countries.actions';
import { createReducer, on } from '@ngrx/store';
import { IAction } from './countries.actions';

export interface ICountryState {
    countries: ICountry[];
}

const initialState: ICountryState = {
    countries: [
        { code: 'AF', name: 'Afghanistan', selected: false },
        { code: 'AL', name: 'Albania', selected: false },
        { code: 'DZ', name: 'Algeria', selected: false },
        { code: 'AS', name: 'American Samoa', selected: false },
        { code: 'AD', name: 'Andorra', selected: false },
        { code: 'AO', name: 'Angola', selected: false },
        { code: 'AI', name: 'Anguilla', selected: false },
        { code: 'BR', name: 'Brazil', selected: false },
    ]
};

const reducer = createReducer(
    initialState,
    on(CountriesActions.resetSelected, state => ({
        ...state,
        countries: state.countries.map(country => ( { ...country, selected: false } ))
    })),
    on(CountriesActions.setSelected, (state, action) => ({
        ...state,
        countries: state.countries.map(country => action.payload.selectedCountries.includes(country.name)
                                                  ? ( { ...country, selected: true } )
                                                  : country)
    }))
);

export function countriesReducer(state: ICountryState, action: IAction): ICountryState {
    return reducer(state, action);
}
