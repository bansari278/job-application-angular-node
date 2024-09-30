import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router ,ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-application-add',
  templateUrl: './application-add.component.html',
  styleUrls: ['./application-add.component.css'],
})
export class ApplicationAddComponent implements OnInit {
  applicationRegistrationForm: FormGroup;
  isEditMode = false;
  applicationId: string | null = null; 

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private route: ActivatedRoute, 
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.builderForm();

    this.applicationId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.applicationId;

    if (this.isEditMode) {
      this.loadApplicationDetails(this.applicationId);
    }
  }
 builderForm() {
  this.applicationRegistrationForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
    lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
    email: ['', [Validators.required, Validators.email]],
    address: ['', Validators.required],  
    gender: ['', Validators.required],    
    contact: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    educationDetails: this.fb.array([]), 
    workExperience: this.fb.array([]), 
    knownLanguages: this.fb.array(this.getKnownLanguages()), 
    technicalExperience: this.fb.array([]), 
    preference: this.fb.group({
      preferredLocation: [''],
      expectedCTC: [''],
      currentCTC: [''],
      noticePeriod: ['']
    })
  });
}

getKnownLanguages() {
  const languages = ['english', 'hindi', 'gujarati'];
  
  return languages.map(language => 
    this.fb.group({
      language: [language, Validators.required],
      canRead: [{ value: false, disabled: true }],
      canWrite: [{ value: false, disabled: true }],
      canSpeak: [{ value: false, disabled: true }]
    })
  );
}

onLanguageChange(index: number, event: any) {
  const languageControl = this.knownLanguages.at(index);

  if (event.target.checked) {
    languageControl.get('canRead').enable();
    languageControl.get('canWrite').enable();
    languageControl.get('canSpeak').enable();
  } else {
    languageControl.get('canRead').disable();
    languageControl.get('canWrite').disable();
    languageControl.get('canSpeak').disable();
  }
}
 loadApplicationDetails(id: string) {
  this.http.get(`http://localhost:3000/application/application/${id}`).subscribe(
    (data: any) => {

      this.applicationRegistrationForm.patchValue(data);
      this.educationDetails.clear();
      data.educationDetails.forEach((edu: any) => {
        this.addEducationDetail(); 
        this.educationDetails.at(this.educationDetails.length - 1).patchValue(edu); 
      });

      this.workExperience.clear();
      data.workExperience.forEach((work: any) => {
        this.addWorkExperience();
        this.workExperience.at(this.workExperience.length - 1).patchValue(work);
      });

      this.technicalExperience.clear();
      data.technicalExperience.forEach((tech: any) => {
        this.addTechnicalExperience();
        this.technicalExperience.at(this.technicalExperience.length - 1).patchValue(tech);
      });

    },
    (error) => {
      console.error('Error loading application details', error);
    }
  );
}


  get firstName() { return this.applicationRegistrationForm.get('firstName'); }
  get lastName() { return this.applicationRegistrationForm.get('lastName'); }
  get email() { return this.applicationRegistrationForm.get('email'); }
  get address() { return this.applicationRegistrationForm.get('address'); }
  get gender() { return this.applicationRegistrationForm.get('gender'); }
  get educationDetails() { return this.applicationRegistrationForm.get('educationDetails') as FormArray; }
  get workExperience() { return this.applicationRegistrationForm.get('workExperience') as FormArray; }
  get knownLanguages() { return this.applicationRegistrationForm.get('knownLanguages') as FormArray; }
  get technicalExperience() { return this.applicationRegistrationForm.get('technicalExperience') as FormArray; }
  get preference() { return this.applicationRegistrationForm.get('preference') as FormGroup; }

  addEducationDetail() {
    this.educationDetails.push(this.fb.group({
      boardOrUniversity: ['', Validators.required],
      year: ['', Validators.required],
      cgpaOrPercentage: ['', Validators.required]
    }));
  }

  addWorkExperience() {
    this.workExperience.push(this.fb.group({
      company: ['', Validators.required],
      designation: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required]
    }));
  }

  addKnownLanguage() {
    this.knownLanguages.push(this.fb.group({
      language: ['', Validators.required],
      canRead: [false],
      canWrite: [false],
      canSpeak: [false]
    }));
  }

  addTechnicalExperience() {
    this.technicalExperience.push(this.fb.group({
      technology: ['', Validators.required],
      level: ['', Validators.required]
    }));
  }

  register() {
      if (this.applicationRegistrationForm.invalid) {
      this.applicationRegistrationForm.markAllAsTouched();
      return;
    }

    if (this.isEditMode) {
      
      this.http.put(`http://localhost:3000/application/application/${this.applicationId}`, this.applicationRegistrationForm.value)
        .subscribe(
          res => {
            console.log('Form updated successfully:', res);
            alert("Application updated successfully.")
            this.router.navigate(['/viewApplication']);
          },
          err => {
            console.error('Error updating form:', err);
          }
        );
    } else {

      this.http.post('http://localhost:3000/application/application', this.applicationRegistrationForm.value)
        .subscribe(
          res => {
            console.log('Form submitted successfully:', res);
            alert("Application submitted successfully.")
            this.router.navigate(['/viewApplication']);
          },
          err => {
            console.error('Error submitting form:', err);
          }
        );
    }
  }


  cancel() {
    this.applicationRegistrationForm.reset();
    this.router.navigate(['/viewApplication']);
  }
}
