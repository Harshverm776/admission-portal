import { Component , Injectable, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})

export class StudentDetailsComponent implements OnInit{
  requestId!: string;
  student: any;
  isAccepted: boolean = false;
  isRejected: boolean = false;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.requestId = params['requestId'];
      this.fetchStudentDetails();
    });
  }

  fetchStudentDetails() {
    // Make an API request to fetch the student details for the given request ID
    this.http.get<any>('http://localhost:8080/getStudentDetails/' + this.requestId).subscribe(
      (response) => {
        this.student = response;
      },
      (error) => {
        console.error('Error:', error);
        // Handle error response from the backend
      }
    );
  }
  acceptRequest(){
    // Code to handle accepting the request
    this.isAccepted = true;
    const requestBody = {
      applicationStatus: 'Accepted',
      remark: 'remark'
    };
    const requestIdInt = parseInt(this.requestId);
    console.log(typeof requestIdInt);
    console.log(requestIdInt);
   // Make an HTTP POST request to send the action to the backend
    this.http.put('http://localhost:8080/updateAdmissionStatus/'+ requestIdInt, requestBody, {responseType: 'text'}).subscribe(
      
      (response:any) => {
  //       console.log('Action sent successfully:', response);
  //       // Handle successful response from the backend
  //       const message = response as string;
  // console.log('Response message:', message);
  const jsonResponse = JSON.parse(response);
    console.log(jsonResponse);
    try {
      const jsonResponse = JSON.parse(response);
      // Handle the JSON response here
    } catch (error) {
      console.error('Error parsing JSON:', error);
      // Handle the error when parsing JSON
    }
      },
      (error) => {
        console.error('Error:', error);
        
        
  console.log('Response body:', error.error);
        // Handle error response from the backend
      }
    );
  }

  rejectRequest(){
    this.isRejected = true;
    const requestBody = {
      applicationStatus: 'Rejected',
      remark: 'remark'
    };
    const requestIdInt = parseInt(this.requestId);
    console.log(typeof requestIdInt);
    console.log(requestIdInt);
   // Make an HTTP POST request to send the action to the backend
    this.http.put('http://localhost:8080/updateAdmissionStatus/'+ requestIdInt, requestBody, {responseType: 'text'}).subscribe(
      
      (response:any) => {
  //       console.log('Action sent successfully:', response);
  //       // Handle successful response from the backend
  //       const message = response as string;
  // console.log('Response message:', message);
  const jsonResponse = JSON.parse(response);
    console.log(jsonResponse);
    try {
      const jsonResponse = JSON.parse(response);
      // Handle the JSON response here
    } catch (error) {
      console.error('Error parsing JSON:', error);
      // Handle the error when parsing JSON
    }
      },
      (error) => {
        console.error('Error:', error);
        
        
  console.log('Response body:', error.error);
        // Handle error response from the backend
      }
    );
  }

getFiles() {

      const url = 'http://localhost:8080/files/'+this.requestId;
      this.http.get(url, {
        headers: {
          "Accept": "application/pdf"
        },
        responseType: "blob"
      }).subscribe(
        (reponse: any) => {
          console.log("response", reponse);
          // It is necessary to create a new blob object with mime-type explicitly set
          // otherwise only Chrome works like it should

          var newBlob = new Blob([reponse], { type: "application/pdf" });

          // IE doesn't allow using a blob object directly as link href  
          // instead it is necessary to use msSaveOrOpenBlob
  //         if (window.navigator && window.navigator.msSaveOrOpenBlob) {
  //           window.navigator.msSaveOrOpenBlob(newBlob);
  //           return;
  //         }
          // For other browsers:
          // Create a link pointing to the ObjectURL containing the blob.
          const data = window.URL.createObjectURL(newBlob);

          var link = document.createElement("a");
          link.href = data;
  //         link.download = "file.pdf";

          // this is necessary as link.click() does not work on the latest firefox  
          link.dispatchEvent(
            new MouseEvent("click", {
              bubbles: true,
              cancelable: true,
              view: window
            })
          );
  
          setTimeout(function() {
            // For Firefox it is necessary to delay revoking the ObjectURL
            window.URL.revokeObjectURL(data);
            link.remove();
          }, 100);
  
        },
        err => {
          console.log("ERR", err);
        }
      );
    }
}




