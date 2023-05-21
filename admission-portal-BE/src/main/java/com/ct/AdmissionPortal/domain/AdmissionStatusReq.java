package com.ct.AdmissionPortal.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdmissionStatusReq {

	private String applicationStatus;
	private String remark;
}
