import { SelectorComponent } from './selector.component';
import {
    AbstractControlOptions,
    AsyncValidatorFn,
    FormBuilder, FormControl,
    FormGroup,
    ReactiveFormsModule,
    ValidatorFn
} from '@angular/forms';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA, Provider } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICountryState } from '../../reducers/countries/countries.reducer';
import { SelectorPopupDialogModule } from './components/selector-popup/selector-popup-dialog.module';
import { BrowserTestingModule } from '@angular/platform-browser/testing';
import { CommonModule } from '@angular/common';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { SelectorModule } from './selector.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { MatIconTestingModule } from '@angular/material/icon/testing';

const STORE: Readonly<Provider> = {
    provide: 'Store', useValue: [
        { code: 'AF', name: 'Afghanistan', selected: false },
        { code: 'AL', name: 'Albania', selected: true }
    ]
};

// const MockFormBuilder = jest.createMockFromModule('FormBuilder');
// const MockMatDialog = jest.createMockFromModule('MatDialog');
// const MockChangeDetectorRef = jest.createMockFromModule('ChangeDetectorRef');
export class FormBuilderStub {
    group(controlsConfig) {
        return this;
    }

    control(formState: any) {
        return this;
    }
}

describe('SelectorComponent', () => {
    let component: SelectorComponent;

    beforeEach(() => {
        component = new SelectorComponent(new FormBuilder(), null, null, null);

        component.countries = [
            { code: 'AF', name: 'Afghanistan', selected: false },
            { code: 'AL', name: 'Albania', selected: true }
        ];
    });

    it('should create', () => {
        expect(component)
            .toBeTruthy();
    });

    it('should create form with 3 controls', () => {
        spyOn(component, 'ngOnInit')
            .and
            .callFake(() => {
                expect(component.form.contains('radioGroup'))
                    .toBeTruthy();
                expect(component.form.contains('search'))
                    .toBeTruthy();
                expect(component.form.contains('result'))
                    .toBeTruthy();
            });
    });

    it('Method getSelectedCountries return "Albania" if selected == true', () => {
        expect(component.getSelectedCountries())
            .toEqual([ { code: 'AL', name: 'Albania', selected: true } ]);
    });

    it('Method clearInput should reset input value', () => {
        spyOn(component, 'ngOnInit')
            .and
            .callFake(() => {
                component.clearInput();
                expect(component.form.controls.search.value)
                    .toBeNull();
            });
    });

});

describe('Integration tests. SelectorComponent', () => {
    let component: SelectorComponent;
    let fixture: ComponentFixture<SelectorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SelectorComponent ],
            imports: [
                ReactiveFormsModule,
                CommonModule,
                ReactiveFormsModule,
                MatAutocompleteModule,
                MatIconTestingModule,
                SelectorPopupDialogModule,
                BrowserTestingModule,
                BrowserDynamicTestingModule ],
            providers: [
                // {provide: FormBuilder, useClass: FormBuilderStub},
                // {provide: MatDialog, useValue: null},
                // {provide: ChangeDetectorRef, useValue: null},
                // STORE
                // {provide: Store, useValue: new Observable()}
            ],
            schemas: [ NO_ERRORS_SCHEMA ]
        })
               .overrideComponent(
                   FormBuilder,
                   {
                       set: {
                           providers: [
                               { provide: FormBuilder, useClass: FormBuilderStub },
                               { provide: MatDialog, useValue: null },
                               { provide: ChangeDetectorRef, useValue: null },
                               { provide: Store, useValue: STORE }
                           ]
                       }
                   }
               )
               .compileComponents();

        fixture = TestBed.createComponent(SelectorComponent);
        component = fixture.componentInstance;
        // dialog = TestBed.inject(MatDialog);

        component.countries = [
            { code: 'AF', name: 'Afghanistan', selected: false },
            { code: 'AL', name: 'Albania', selected: true }
        ];

        fixture.detectChanges();
    }));

    it('should be created', fakeAsync(() => {
        tick();
        expect(component)
            .toBeDefined();
    }));
});

