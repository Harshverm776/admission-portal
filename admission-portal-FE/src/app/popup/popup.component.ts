// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-popup',
//   templateUrl: `
//   <div class="modal-header">
//     <h4 class="modal-title">Popup</h4>
//     <button type="button" class="close" aria-label="Close" (click)="close()">
//       <span aria-hidden="true">&times;</span>
//     </button>
//   </div>
//   <div class="modal-body">
//     <!-- Add your popup content here -->
//     <p>This is the content of the popup.</p>
//   </div>
//   <div class="modal-footer">
//     <button type="button" class="btn btn-secondary" (click)="close()">Close</button>
//   </div>
// `,
//   styleUrls: ['./popup.component.css']
// })
// export class PopupComponent {
//   close() {
//     // Code to close the popup
//   }
// }



import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-popup',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Popup</h4>
      <button type="button" class="close" aria-label="Close" (click)="close()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p><strong>Student Name:</strong> {{ student.name }}</p>
      <p><strong>Request ID:</strong> {{ student.requestId }}</p>
      <!-- Add more fields here -->
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="close()">Close</button>
    </div>
  `,
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  @Input() student: any;

  close() {
    // Code to close the popup
  }
}

