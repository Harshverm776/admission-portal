import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from '../popup/popup.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent  {
    name!: string;
    requestId!: number;
    isAccepted: boolean = false;
    students: any[] = [];
    constructor(private http: HttpClient,private router: Router) {}
    ngOnInit() {
      this.fetchData();
    }
  
    // Function to fetch data from the backend and assign it to the variables
    fetchDataFromBackend() {
      // Code to make API request and assign the response data to 'name' and 'requestId'
    }
    fetchData() {
      this.http.get<any[]>('http://localhost:8080/getallStudentDetails').subscribe(
        // http://localhost:8080/AdmissionDetails
        (response) => {
          this.students = response.map(student => {
            return {
              requestId: student.requestId,
              firstName: student.firstName,
              lastName: student.lastName,
              applicationStatus: student.applicationStatus
            };
          });
          // this.name = response.name;
          // this.requestId = response.requestId;
        },
        (error) => {
          console.error('Error:', error);
          // Handle error response from the backend
        }
      );
    }
  
    acceptRequest() {
      // Code to handle accepting the request
      this.isAccepted = true;
      const requestBody = {
        action: 'accepted'
      };
  
      // Make an HTTP POST request to send the action to the backend
      this.http.post('backend-url', requestBody).subscribe(
        (response) => {
          console.log('Action sent successfully:', response);
          // Handle successful response from the backend
        },
        (error) => {
          console.error('Error:', error);
          // Handle error response from the backend
        }
      );
    }
  
    rejectRequest() {
      // Code to handle rejecting the request
    }
  
    downloadData() {
      // Code to download the data associated with the request ID
      this.http.get('download-url', { responseType: 'blob' }).subscribe(
        (response) => {
          const blob = new Blob([response], { type: 'application/octet-stream' });
          const url = window.URL.createObjectURL(blob);
  
          // Create a temporary link element and trigger the download
          const link = document.createElement('a');
          link.href = url;
          link.download = 'data.txt';
          link.click();
  
          // Clean up the temporary link
          URL.revokeObjectURL(url);
        },
        (error) => {
          console.error('Error:', error);
          // Handle error response from the backend
        }
      );
    }

    redirectToNewPage(requestId: string) {
      // Redirect to a new page with the student details for the given request ID
      this.router.navigate(['/student-details', requestId]);
    }
    
    
    }
   
  
  
