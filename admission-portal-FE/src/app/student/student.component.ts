import { Component } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
// const headers = new HttpHeaders().set('Content-Type', 'application/json');
export class StudentComponent {
  student: any = {
    requestId:'',
    firstName: '',
    lastName: '',
    dob: '',
    address: '',
    emailId: '',
    mobNo:'',
    sscPercentage:'',
    hscPercentage:'',
    file:''
  };
  files: any;
  formData: any;
  constructor(private http: HttpClient) {}

  aadhaarCardFile:any;
  sscFile:any;
  hscFile:any;
  
  addAadhaarCardFile(event: any) {
    this.aadhaarCardFile = event.target.files[0];
  }

  addSscFile(event: any) {
    this.sscFile = event.target.files[0];
  }

  addHscFile(event: any) {
    this.hscFile = event.target.files[0];
  }

  handleFileInput(requestId: Number, identifier: string) {
    // Handle file input logic here
    let file;
    if(identifier=="Aadhaar")
      file = this.aadhaarCardFile;
    else if(identifier=="Ssc")
      file = this.sscFile;
    else
      file = this.hscFile;
    
   // Example: Logging the selected file
   // Create a FormData object
      const formData = new FormData();
      formData.append('file', file);
      formData.append('identifier', identifier);
    
      // Make a POST request to the backend endpoint
      fetch('http://localhost:8080/upload/' + requestId, {
        method: 'POST',
        body: formData
      })
      .then(response => {
        if (response.ok) {
          // File upload successful
          console.log('File uploaded successfully!');
          // Perform any additional actions or display success message here
        } else {
          // File upload failed
          console.error('File upload failed.');
          // Handle the error or display an error message
        }
      })
      .catch(error => {
        console.error('Error occurred while uploading the file:', error);
        // Handle the error or display an error message
      });
    }
    
  formValid(): boolean {
    return this.student.firstName   && this.student.lastName &&  this.student.dob && this.student.address && this.student.emailId && this.student.mobNo   && this.student.sscPercentage  && this.student.hscPercentage && this.aadhaarCardFile && this.sscFile && this.hscFile;
  }
  
  // this.http.post(url, body, { headers }).subscribe(
  submitForm() {
    this.formData = this.student; // Assign the form data to formData
  console.log(this.formData);
    console.log(this.student);
    this.http.post('http://localhost:8080/AdmissionDetails', this.formData,{ headers }).subscribe(
      (response: any) => {
        
        setTimeout(() => {
          this.handleFileInput(response.requestId, "Aadhaar");
        }, 100);
        setTimeout(() => {
          this.handleFileInput(response.requestId, "Ssc");
        }, 500);
        setTimeout(() => {
          this.handleFileInput(response.requestId, "Hsc");
        }, 900);
        
        console.log('Data sent successfully:', response.requestId);

        // Handle successful response from the backend
      },
      (error) => {
        console.error('Error:', error);
        // Handle error response from the backend
      }
    );
  }
  
}
