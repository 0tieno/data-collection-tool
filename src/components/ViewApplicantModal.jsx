import React from "react";

const ViewApplicantModal = ({ applicant, onClose }) => {
  if (!applicant) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg p-6 w-full max-w-2xl shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4">Applicant Details</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div><strong>Name:</strong> {applicant.name}</div>
          <div><strong>Job Title:</strong> {applicant.jobTitle}</div>
          <div><strong>Job Type:</strong> {applicant.jobType}</div>
          <div><strong>Supervisor:</strong> {applicant.supervisor}</div>
          <div><strong>Department:</strong> {applicant.department}</div>
          <div><strong>Section:</strong> {applicant.section}</div>
          <div><strong>School:</strong> {applicant.school}</div>
          <div><strong>Location:</strong> {applicant.location}</div>
          <div><strong>Country:</strong> {applicant.country}</div>
          <div><strong>Education Level:</strong> {applicant.educationLevel}</div>
          <div><strong>Qualifications:</strong> {applicant.qualifications || "—"}</div>
          <div><strong>Other Education:</strong> {applicant.otherEducation || "—"}</div>
          <div><strong>Other Skills:</strong> {applicant.otherSkills || "—"}</div>
          <div className="col-span-full"><strong>Experience Summary:</strong> {applicant.experienceSummary}</div>
          <div className="col-span-full">
            <strong>Experience List:</strong>
            <ul className="list-disc ml-6">
              {Array.isArray(applicant.experienceList) &&
                applicant.experienceList.map((exp, idx) => (
                  <li key={idx}>
                    {exp.organization} — {exp.years}
                  </li>
                ))}
            </ul>
          </div>
          <div className="col-span-full">
            <strong>CV:</strong>{" "}
            {applicant.cvBlobUrl ? (
              <a
                href={applicant.cvBlobUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Download CV
              </a>
            ) : (
              "No CV uploaded"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewApplicantModal;
