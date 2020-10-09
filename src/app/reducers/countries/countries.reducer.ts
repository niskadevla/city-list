import { ICountry } from '../../shared/models/country.model';
import { CountriesActions, countriesActionsType } from './countries.actions';

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

export const countriesReducer = (state = initialState, action: CountriesActions) => {
    switch (action.type) {
        case countriesActionsType.resetSelected:
            return {
                ...state,
                countries: state.countries.map(country => ( { ...country, selected: false } ))
            };
        case countriesActionsType.setSelected:
            return {
                ...state,
                countries: state.countries.map(country => action.payload.selectedCountries.includes(country.name)
                                                                ? ( { ...country, selected: true } )
                                                                : country)
            };
        default:
            return state;
    }

};
