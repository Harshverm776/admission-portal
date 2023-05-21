package com.ct.AdmissionPortal.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "StudentAdmissionDetails")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentAdmissionDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int requestId;
	private String firstName;
	private String lastName;
	
	@Temporal(TemporalType.DATE)
	private Date dob;
	private String address;
	private String emailId;
	private String mobNo;
	private float sscPercentage;
	private float hscPercentage;

	@CreationTimestamp
	private Date applicationDate;

	private String applicationStatus = "In Progress";

	@UpdateTimestamp
	private Date statusUpdatedDate;

	private String remark;

	private String aadhaarCardFileName;
	private String aadhaarCardFileType;
	@Lob
	private byte[] aadhaarCardFile;

	private String sscFileName;
	private String sscFileType;
	@Lob
	private byte[] sscFile;

	private String hscFileName;
	private String hscFileType;
	@Lob
	private byte[] hscFile;

}
