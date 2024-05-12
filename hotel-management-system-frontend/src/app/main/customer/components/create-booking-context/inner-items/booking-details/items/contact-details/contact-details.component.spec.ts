// import { ComponentFixture, TestBed } from '@angular/core/testing';
//
// import { ContactDetailsComponent } from './contact-details.component';
// import {ReactiveFormsModule} from "@angular/forms";
//
// describe('ContactDetailsComponent', () => {
//   let component: ContactDetailsComponent;
//   let fixture: ComponentFixture<ContactDetailsComponent>;
//
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ContactDetailsComponent],
//       imports: [ReactiveFormsModule], // Import ReactiveFormsModule for working with forms
//     }).compileComponents();
//   });
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(ContactDetailsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });
//
//   it('should initialize with a valid form', () => {
//     expect(component.contactForm.valid).toBeTrue();
//   });
//
//   it('should emit contact details when form is valid', () => {
//     spyOn(component.contactDetailsChanged, 'emit'); // Spy on the emit method of contactDetailsChanged
//
//     const validContactData = {
//       firstName: 'John',
//       lastName: 'Doe',
//       email: 'johndoe@example.com',
//       phoneNumber: '123-456-7890'
//     };
//
//     // Set form values
//     component.contactForm.setValue(validContactData);
//
//     // Trigger valueChanges manually
//     component.emitContactDetails();
//
//     // Expect that emit was called with the valid contact data
//     expect(component.contactDetailsChanged.emit).toHaveBeenCalledWith(validContactData);
//   });
//
//   it('should display required error messages for empty fields', () => {
//     // Set form to invalid state (empty)
//     component.contactForm.setValue({
//       firstName: '',
//       lastName: '',
//       email: '',
//       phoneNumber: ''
//     });
//
//     // Trigger valueChanges manually
//     component.emitContactDetails();
//
//     // Expect form to be invalid
//     expect(component.contactForm.valid).toBeFalse();
//
//     // Expect required error messages to be displayed
//     expect(fixture.nativeElement.querySelector('#firstNameError').textContent).toContain('First name is required');
//     expect(fixture.nativeElement.querySelector('#lastNameError').textContent).toContain('Last name is required');
//     expect(fixture.nativeElement.querySelector('#emailError').textContent).toContain('Email is required');
//     expect(fixture.nativeElement.querySelector('#phoneNumberError').textContent).toContain('Phone number is required');
//   });
//
//   it('should display email format error message for invalid email', () => {
//     // Set invalid email format
//     component.contactForm.setValue({
//       firstName: 'John',
//       lastName: 'Doe',
//       email: 'invalidemail', // Invalid email format
//       phoneNumber: '123-456-7890'
//     });
//
//     // Trigger valueChanges manually
//     component.emitContactDetails();
//
//     // Expect form to be invalid
//     expect(component.contactForm.valid).toBeFalse();
//
//     // Expect email format error message to be displayed
//     expect(fixture.nativeElement.querySelector('#emailError').textContent).toContain('Invalid email format');
//   });
//
//   it('should display phone number format error message for invalid phone number', () => {
//     // Set invalid phone number format
//     component.contactForm.setValue({
//       firstName: 'John',
//       lastName: 'Doe',
//       email: 'johndoe@example.com',
//       phoneNumber: '123' // Invalid phone number format
//     });
//
//     // Trigger valueChanges manually
//     component.emitContactDetails();
//
//     // Expect form to be invalid
//     expect(component.contactForm.valid).toBeFalse();
//
//     // Expect phone number format error message to be displayed
//     expect(fixture.nativeElement.querySelector('#phoneNumberError').textContent).toContain('Invalid phone number format (123-456-7890)');
//   });
// });
