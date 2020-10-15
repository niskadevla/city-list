import { AppComponent } from './app.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectorComponent } from './features/selector/selector.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { SelectorModule } from './features/selector/selector.module';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserTestingModule } from '@angular/platform-browser/testing';
import { By } from '@angular/platform-browser';
import { AppModule } from './app.module';



describe('AppComponent', () => {
    let app: AppComponent;

    beforeEach(() => {
        app = new AppComponent();
    });

    it('should create the app', () => {
      expect(app).toBeTruthy();
    });
});

describe('Integration tests. AppComponent', () => {
    let app: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ AppComponent ],
            imports: [ReactiveFormsModule,
                      BrowserTestingModule],
            schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(AppComponent);
        app = fixture.debugElement.componentInstance;
    });

    it('should create the app', () => {
        expect(app).toBeDefined();
    });

    xit('should have app-selector directive', () => {
        const de = fixture.debugElement.query(By.directive(SelectorComponent));

        expect(de).not.toBeNull();
    });
});
