import { Action } from '@ngrx/store';

export enum countriesActionsType {
    setSelected = '[COUNTRIES] setSelected',
    resetSelected = '[COUNTRIES] resetSelected',
}

export class CountriesSetSelectedAction implements Action {
    readonly type = countriesActionsType.setSelected;

    constructor(public payload: {
        selectedCountries: string[]
    }) {}
}

export class CountriesResetSelectedAction implements Action {
    readonly type = countriesActionsType.resetSelected;
}

export type CountriesActions = CountriesSetSelectedAction | CountriesResetSelectedAction;
