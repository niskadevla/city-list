import { SelectorComponent } from './selector.component';
import { FormBuilder } from '@angular/forms';
// import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('SelectorComponent', () => {
    let component: SelectorComponent;
    // let fixture: ComponentFixture<SelectorComponent>;

    beforeEach(() => {
        component = new SelectorComponent(new FormBuilder(), null, null, null);
        // TestBed.configureTestingModule({
        //     declarations: [SelectorComponent],
        //     providers: [  ]
        // });
        // fixture = TestBed.createComponent(SelectorComponent);
        // component = fixture.componentInstance;
        component.countries = [
            { code: 'AF', name: 'Afghanistan', selected: false },
            { code: 'AL', name: 'Albania', selected: true },
        ];
    });

    it('should create', () => {
        expect(component)
            .toBeTruthy();
    });

    it('should create form with 3 controls', () => {
        spyOn(component, 'ngOnInit').and.callFake(() => {
            expect(component.form.contains('radioGroup')).toBeTruthy();
            expect(component.form.contains('search')).toBeTruthy();
            expect(component.form.contains('result')).toBeTruthy();
        });
    });

    it('Method getSelectedCountries return "Albania" if selected == true', () => {
        expect(component.getSelectedCountries()).toEqual([{ code: 'AL', name: 'Albania', selected: true }]);
    });

    it('Method clearInput should reset input value', () => {
        spyOn(component, 'ngOnInit').and.callFake(() => {
            component.clearInput();
            expect(component.form.controls.search.value).toBeNull();
        });
    });

});

