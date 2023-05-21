package com.ct.AdmissionPortal.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.ct.AdmissionPortal.Exception.ResourceNotFoundException;
import com.ct.AdmissionPortal.domain.AdmissionStatusReq;
import com.ct.AdmissionPortal.entity.StudentAdmissionDetails;
import com.ct.AdmissionPortal.repository.StudentAdmissionDetailsRepository;

@Service
public class AdmissionPortalService {

	@Autowired
	StudentAdmissionDetailsRepository admissionDetailsRepository;

	public StudentAdmissionDetails saveAdmissionDetails(StudentAdmissionDetails admissionDetails) {
		return admissionDetailsRepository.save(admissionDetails);
	}

	public List<StudentAdmissionDetails> getAllStudentDetails() {
		return admissionDetailsRepository.findAll();
	}

	public Optional<StudentAdmissionDetails> getStudentDetails(Integer id) {
		return admissionDetailsRepository.findById(id);
	}

	public StudentAdmissionDetails updateAdmissionStatus(int id, AdmissionStatusReq request) {
		String applicationStatus = request.getApplicationStatus();
		String remark = request.getRemark();
		StudentAdmissionDetails studentAdmissionDetails = admissionDetailsRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Student", "id", id));

		studentAdmissionDetails.setApplicationStatus(applicationStatus);
		studentAdmissionDetails.setRemark(remark);
		admissionDetailsRepository.save(studentAdmissionDetails);
		return studentAdmissionDetails;
	}

	public StudentAdmissionDetails store(MultipartFile file, int id, String identifier) throws IOException {
		StudentAdmissionDetails studentAdmissionDetails = admissionDetailsRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Student", "id", id));

		if (identifier.equals("Aadhaar")) {
			studentAdmissionDetails.setAadhaarCardFileName(StringUtils.cleanPath(file.getOriginalFilename()));
			studentAdmissionDetails.setAadhaarCardFileType(file.getContentType());
			studentAdmissionDetails.setAadhaarCardFile(file.getBytes());
		} else if (identifier.equals("Ssc")) {
			studentAdmissionDetails.setSscFileName(StringUtils.cleanPath(file.getOriginalFilename()));
			studentAdmissionDetails.setSscFileType(file.getContentType());
			studentAdmissionDetails.setSscFile(file.getBytes());
		} else {
			studentAdmissionDetails.setHscFileName(StringUtils.cleanPath(file.getOriginalFilename()));
			studentAdmissionDetails.setHscFileType(file.getContentType());
			studentAdmissionDetails.setHscFile(file.getBytes());
		}

		return admissionDetailsRepository.save(studentAdmissionDetails);
	}

	public StudentAdmissionDetails getFile(Integer id) {
		return admissionDetailsRepository.findById(id).get();
	}

	// Not in use
	public void deleteStudentDetails(Integer id) {
		admissionDetailsRepository.deleteById(id);
	}

	// Not in use
	public void deleteAllStudentDetails() {
		admissionDetailsRepository.deleteAll();

	}

	// Not in use
	public StudentAdmissionDetails updateStudentDetails(StudentAdmissionDetails studentData, Integer id) {
		StudentAdmissionDetails existingStudentDetails = admissionDetailsRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Student", "id", id));

		existingStudentDetails.setFirstName(studentData.getFirstName());
		existingStudentDetails.setLastName(studentData.getLastName());
		existingStudentDetails.setMobNo(studentData.getMobNo());
		existingStudentDetails.setEmailId(studentData.getEmailId());
		existingStudentDetails.setAddress(studentData.getAddress());
		existingStudentDetails.setApplicationDate(studentData.getApplicationDate());
		existingStudentDetails.setApplicationStatus(studentData.getApplicationStatus());
		existingStudentDetails.setRemark(studentData.getRemark());
		existingStudentDetails.setStatusUpdatedDate(studentData.getStatusUpdatedDate());
		existingStudentDetails.setSscPercentage(studentData.getSscPercentage());
		existingStudentDetails.setHscPercentage(studentData.getHscPercentage());
		admissionDetailsRepository.save(existingStudentDetails);
		return existingStudentDetails;
	}

}
