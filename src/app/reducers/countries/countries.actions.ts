import { createAction, props } from '@ngrx/store';

export interface IAction {
    type: string;
    payload?: {key: string[]};
}

export const setSelected = createAction('[COUNTRIES] setSelected',
    props<{
        payload: {
            selectedCountries: string[]
        }
    }>());
export const resetSelected = createAction('[COUNTRIES] resetSelected');
