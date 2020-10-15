import { SelectorComponent } from './selector.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { ChangeDetectorRef, Provider } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICountryState } from '../../reducers/countries/countries.reducer';

const STORE: Readonly<Provider> = {
    provide: 'STORE', useValue: [
        { code: 'AF', name: 'Afghanistan', selected: false },
        { code: 'AL', name: 'Albania', selected: true }
    ]
};

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
    // let fb: FormBuilder;
    // let dialog: MatDialog;
    // let cdr: ChangeDetectorRef;
    // let store$: Store<ICountryState>;

    beforeEach(async (() => {
        TestBed.configureTestingModule({
            declarations: [ SelectorComponent ],
            imports: [ReactiveFormsModule],
            providers: [ FormBuilder,
                         MatDialog,
                         ChangeDetectorRef,
                         Store ]
        }).compileComponents();

        fixture = TestBed.createComponent(SelectorComponent);
        component = fixture.debugElement.componentInstance;
        // dialog = TestBed.inject(MatDialog);

        component.countries = [
            { code: 'AF', name: 'Afghanistan', selected: false },
            { code: 'AL', name: 'Albania', selected: true }
        ];
    }));

    xit('should be created', () => {
        fixture.detectChanges();
        expect(component).toBeDefined();
    });
});

