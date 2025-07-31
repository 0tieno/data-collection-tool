import { useEffect, useState } from "react";
import ViewApplicantModal from "./ViewApplicantModal"; // make sure this file exists

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  const [eduFilter, setEduFilter] = useState("");
  const [selected, setSelected] = useState(null);

  // Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  useEffect(() => {
    fetch("http://localhost:7071/api/getSubmissions")
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort((a, b) => new Date(b._ts) - new Date(a._ts));
        setSubmissions(sorted);
        setFiltered(sorted);
      })
      .catch(err => console.error("❌ Fetch error:", err));
  }, []);

  useEffect(() => {
    const filteredData = submissions.filter(sub => {
      const jobMatch = jobTypeFilter ? sub.jobType === jobTypeFilter : true;
      const eduMatch = eduFilter ? sub.educationLevel === eduFilter : true;
      return jobMatch && eduMatch;
    });
    setFiltered(filteredData);
    setPage(1); // reset page when filter changes
  }, [jobTypeFilter, eduFilter, submissions]);

  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🧾 Applicant Submissions</h2>

      <div className="flex flex-wrap gap-4 mb-4">
        <select onChange={(e) => setJobTypeFilter(e.target.value)} className="border p-2">
          <option value="">Filter by Job Type</option>
          <option value="Permanent">Permanent</option>
          <option value="Internship">Internship</option>
          <option value="Contract">Contract</option>
        </select>
        <select onChange={(e) => setEduFilter(e.target.value)} className="border p-2">
          <option value="">Filter by Education</option>
          <option value="High School Only">High School Only</option>
          <option value="Diploma/Professional Qualification">Diploma</option>
          <option value="Master’s + Diploma/Professional Qualification">Master's + Diploma</option>
        </select>
      </div>

      <table className="min-w-full text-sm border border-gray-600 mb-4">
        <thead className="bg-gray-100 text-gray-900">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Job Title</th>
            <th className="p-2 border">Job Type</th>
            <th className="p-2 border">Education</th>
            <th className="p-2 border">Submitted</th>
            <th className="p-2 border">CV</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-2 border">{item.name}</td>
              <td className="p-2 border">{item.jobTitle}</td>
              <td className="p-2 border">{item.jobType}</td>
              <td className="p-2 border">{item.educationLevel}</td>
              <td className="p-2 border">
  {new Date(item._ts * 1000).toLocaleString("en-KE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short", // Optional: shows 'EAT'
  })}
</td>

              <td className="p-2 border">
                <a
                  href={item.cvBlobUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Download
                </a>
              </td>
              <td className="p-2 border">
                <button
                  onClick={() => setSelected(item)}
                  className="text-sm text-white bg-blue-600 px-2 py-1 rounded"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center">
        <div>
          Showing page {page} of {totalPages}
        </div>
        <div className="space-x-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      <ViewApplicantModal applicant={selected} onClose={() => setSelected(null)} />
    </div>
  );
};

export default AdminDashboard;
