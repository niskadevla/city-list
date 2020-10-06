import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-selector',
    templateUrl: './selector.component.html',
    styleUrls: [ './selector.component.scss' ]
})
export class SelectorComponent implements OnInit {

    form: FormGroup;
    isChecked = true;
    mode = 'multiply';
    searchResult = [];

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.initForm();
    }

    initForm(): void {
        this.form = this.fb.group({
            radioGroup: this.fb.control(this.mode),
            search: this.fb.control(''),
            result: this.fb.control('')
        });
    }

    changeMode($event: MatRadioChange): void {
        this.mode = $event.value;
    }

    showAllCountries(): void {

    }

}
