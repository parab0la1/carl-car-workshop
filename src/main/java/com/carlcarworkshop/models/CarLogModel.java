package com.example.carlcarworkshop.models;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@SuppressWarnings("serial")
@Entity
public class CarLogModel implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private String repairLogTitle;
	private String repairLog;
	private String repairDate;
	private Integer ownerCarId;

	public CarLogModel() {

	}

	public String getRepairLogTitle() {
		return repairLogTitle;
	}

	public void setRepairLogTitle(String repairLogTitle) {
		this.repairLogTitle = repairLogTitle;
	}

	public Long getId() {
		return id;
	}

	public Integer getOwnerCarId() {
		return ownerCarId;
	}

	public void setOwnerCarId(Integer ownerCarId) {
		this.ownerCarId = ownerCarId;
	}

	public String getRepairLog() {
		return repairLog;
	}

	public void setRepairLog(String repairLog) {
		this.repairLog = repairLog;
	}

	public String getRepairDate() {
		return repairDate;
	}

	public void setRepairDate(String repairDate) {
		this.repairDate = repairDate;
	}

}
