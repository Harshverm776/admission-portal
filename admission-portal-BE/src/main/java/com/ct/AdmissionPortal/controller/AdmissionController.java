package com.ct.AdmissionPortal.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ct.AdmissionPortal.Exception.ResponseMessage;
import com.ct.AdmissionPortal.domain.AdmissionDetailsResp;
import com.ct.AdmissionPortal.domain.AdmissionStatusReq;
import com.ct.AdmissionPortal.entity.StudentAdmissionDetails;
import com.ct.AdmissionPortal.service.AdmissionPortalService;

@RestController
@CrossOrigin(origins = "*")
public class AdmissionController {

	@Autowired
	AdmissionPortalService admissionPortalService;

	ResponseEntity<String> responseEntity = new ResponseEntity<>(HttpStatus.OK);

	@GetMapping("/")
	public String check() {
		return "Working fine";
	}

	@PostMapping("/AdmissionDetails")
	public ResponseEntity<AdmissionDetailsResp> saveAdmissionDetails(
			@RequestBody StudentAdmissionDetails admissionDetails) {
		try {
			int id = admissionPortalService.saveAdmissionDetails(admissionDetails).getRequestId();
			return ResponseEntity.status(HttpStatus.OK)
					.body(new AdmissionDetailsResp("Record Created sucessfully", id));
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new AdmissionDetailsResp("Something went wrong", 0));
		}
	}

	@GetMapping("/getallStudentDetails")
	public List<StudentAdmissionDetails> getAllStudent() {
		return admissionPortalService.getAllStudentDetails();
	}

	@GetMapping("/getStudentDetails/{id}")
	public Optional<StudentAdmissionDetails> getStudentById(@PathVariable Integer id) {
		return admissionPortalService.getStudentDetails(id);
	}

	@PutMapping("/updateAdmissionStatus/{id}")
	public ResponseEntity<ResponseMessage> updateAdmissionStatus(@PathVariable int id,
			@RequestBody AdmissionStatusReq request) {
		try {
			admissionPortalService.updateAdmissionStatus(id, request);
			return ResponseEntity.status(HttpStatus.OK)
					.body(new ResponseMessage("Record Updated Succesfully with id:" + id));

		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseMessage("Something went wrong"));
		}
	}

	@PostMapping("/upload/{id}")
	public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("file") MultipartFile file,
			@PathVariable Integer id, @RequestParam("identifier") String identifier) {
		try {
			admissionPortalService.store(file, id, identifier);
			return ResponseEntity.status(HttpStatus.OK)
					.body(new ResponseMessage("Uploaded the file successfully: " + file.getOriginalFilename()));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED)
					.body(new ResponseMessage("Could not upload the file: " + file.getOriginalFilename() + "!"));
		}
	}

	@GetMapping("/files/{id}")
	public ResponseEntity<byte[]> getFile(@PathVariable Integer id) {
		String identifier="Aadhaar";
		StudentAdmissionDetails admissionDetails = admissionPortalService.getFile(id);

		if (identifier.equals("Aadhaar")) {
			return ResponseEntity.ok()
					.header(HttpHeaders.CONTENT_DISPOSITION,
							"attachment; filename=\"" + admissionDetails.getAadhaarCardFileName() + "\"")
					.body(admissionDetails.getAadhaarCardFile());
		} else if (identifier.equals("Ssc")) {
			return ResponseEntity.ok()
					.header(HttpHeaders.CONTENT_DISPOSITION,
							"attachment; filename=\"" + admissionDetails.getSscFileName() + "\"")
					.body(admissionDetails.getSscFile());
		} else {
			return ResponseEntity.ok()
					.header(HttpHeaders.CONTENT_DISPOSITION,
							"attachment; filename=\"" + admissionDetails.getHscFileName() + "\"")
					.body(admissionDetails.getHscFile());
		}

	}

	// Not in use
	@DeleteMapping("/DeleteStudentDtailsById/{id}")
	public ResponseEntity<StudentAdmissionDetails> deleteStudentById(@PathVariable Integer id) {

		ResponseEntity<StudentAdmissionDetails> responseEntity = new ResponseEntity<>(HttpStatus.OK);
		try {
			admissionPortalService.deleteStudentDetails(id);

		} catch (Exception e) {
			e.printStackTrace();
			responseEntity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return responseEntity;
	}

	// Not in use
	@DeleteMapping("/DeleteAllStudent")
	public void deleteStudent() {
		admissionPortalService.deleteAllStudentDetails();
	}

	// Not in use
	@PutMapping("/updateStudentDetailsById/{id}")
	public ResponseEntity<ResponseMessage> updateStudent(@PathVariable("id") Integer id,
			@RequestBody StudentAdmissionDetails student) {

		String message = "";
		try {
			admissionPortalService.updateStudentDetails(student, id);
			message = "Record Updated Succesfully with id:" + id;
			return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));

		} catch (Exception e) {
			e.printStackTrace();
			message = "Something went wrong";
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseMessage(message));
		}
	}

}
