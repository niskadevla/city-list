import {
    ActionReducerMap,
    MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { countriesReducer, ICountryState } from './countries/countries.reducer';

export const countriesNode = 'country';

export interface State {
    [countriesNode]: ICountryState;
}

export const reducers: ActionReducerMap<State> = {
    [countriesNode]: countriesReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
