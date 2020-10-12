import { SelectorComponent } from './selector.component';
import { FormBuilder } from '@angular/forms';

describe('SelectorComponent', () => {
    let component: SelectorComponent;

    beforeEach(() => {
        component = component = new SelectorComponent(new FormBuilder(), null, null, null);
    });

    it('should create', () => {
        expect(component)
            .toBeTruthy();
    });
});
