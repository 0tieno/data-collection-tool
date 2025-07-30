// src/functions/validation.js

export const validatePersonalInfo = (data) => {
  const errors = {};
  const isEmpty = (value) =>
  typeof value !== "string" || value.trim() === "";


  if (isEmpty(data.name)) errors.name = "Name is required.";
  if (isEmpty(data.jobTitle)) errors.jobTitle = "Job Title is required.";
  if (isEmpty(data.jobType)) errors.jobType = "Job Type is required.";
  if (isEmpty(data.supervisor)) errors.supervisor = "Supervisor is required.";
  if (isEmpty(data.department)) errors.department = "Department is required.";
  if (isEmpty(data.section)) errors.section = "Section is required.";
  if (isEmpty(data.school)) errors.school = "School is required.";
  if (isEmpty(data.location)) errors.location = "Location is required.";
  if (isEmpty(data.country)) errors.country = "Country is required.";

  return errors;
};

export const validateEducationData = (data) => {
  const errors = {};
  const isEmpty = (value) =>
  typeof value !== "string" || value.trim() === "";


  if (isEmpty(data.educationLevel)) {
    errors.educationLevel = "Education level is required.";
  }

  return errors;
};

export const validateExperienceData = (data) => {
  const errors = {};
  const isEmpty = (value) =>
  typeof value !== "string" || value.trim() === "";


  // Validate experienceList
  if (!Array.isArray(data.experienceList) || data.experienceList.length === 0) {
    errors.experienceList = "At least one organization is required.";
  } else {
    data.experienceList.forEach((item, index) => {
      if (!item.organization || item.organization.trim() === "") {
        if (!errors.experienceList) errors.experienceList = {};
        if (!errors.experienceList[index]) errors.experienceList[index] = {};
        errors.experienceList[index].organization = "Organization name is required.";
      }

      if (!item.years || item.years.trim() === "") {
        if (!errors.experienceList) errors.experienceList = {};
        if (!errors.experienceList[index]) errors.experienceList[index] = {};
        errors.experienceList[index].years = "Years of experience is required.";
      }
    });
  }

  // Summary
  if (isEmpty(data.experienceSummary)) {
    errors.experienceSummary = "Experience summary is required.";
  }

  return errors;
};

export const validateFileUpload = (data) => {
  const errors = {};

  if (!data.cvFileName || typeof data.cvFileName !== "string" || data.cvFileName.trim() === "") {
    errors.cv = "CV file is required.";
  }

  return errors;
};


export const validateSubmissionData = (data) => {
  const personalErrors = validatePersonalInfo(data);
  const educationErrors = validateEducationData(data);
  const experienceErrors = validateExperienceData(data);
  const fileErrors = validateFileUpload(data);

  const combinedErrors = {
    ...personalErrors,
    ...educationErrors,
    ...experienceErrors,
    ...fileErrors,
  };

  const isValid = Object.keys(combinedErrors).length === 0;

  return { isValid, errors: combinedErrors };
};

