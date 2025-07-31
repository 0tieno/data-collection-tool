import { useEffect, useState } from "react";
import ViewApplicantModal from "./ViewApplicantModal";

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
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => new Date(b._ts) - new Date(a._ts));
        setSubmissions(sorted);
        setFiltered(sorted);
      })
      .catch((err) => console.error("❌ Fetch error:", err));
  }, []);

  useEffect(() => {
    const filteredData = submissions.filter((sub) => {
      const jobMatch = jobTypeFilter ? sub.jobType === jobTypeFilter : true;
      const eduMatch = eduFilter ? sub.educationLevel === eduFilter : true;
      return jobMatch && eduMatch;
    });
    setFiltered(filteredData);
    setPage(1); // reset page when filters change
  }, [jobTypeFilter, eduFilter, submissions]);

  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">📥 Applicant Submissions</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          onChange={(e) => setJobTypeFilter(e.target.value)}
          className="bg-white border border-gray-300 rounded px-3 py-2 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Filter by Job Type</option>
          <option value="Permanent">Permanent</option>
          <option value="Internship">Internship</option>
          <option value="Contract">Contract</option>
        </select>
        <select
          onChange={(e) => setEduFilter(e.target.value)}
          className="bg-white border border-gray-300 rounded px-3 py-2 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Filter by Education</option>
          <option value="High School Only">High School Only</option>
          <option value="Diploma/Professional Qualification">Diploma</option>
          <option value="Master’s + Diploma/Professional Qualification">Master's + Diploma</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-700 text-left">
            <tr>
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Job Title</th>
              <th className="p-3 border-b">Job Type</th>
              <th className="p-3 border-b">Education</th>
              <th className="p-3 border-b">Submitted</th>
              <th className="p-3 border-b">CV</th>
              <th className="p-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {paginated.map((item, i) => (
              <tr key={item.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.jobTitle}</td>
                <td className="p-3">{item.jobType}</td>
                <td className="p-3">{item.educationLevel}</td>
                <td className="p-3">
                  {new Date(item._ts * 1000).toLocaleString("en-KE", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                    timeZoneName: "short",
                  })}
                </td>
                <td className="p-3">
                  <a
                    href={item.cvBlobUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Download
                  </a>
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => setSelected(item)}
                    className="bg-blue-600 text-white px-3 py-1 rounded shadow hover:bg-blue-700 transition"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 text-sm">
        <div className="text-gray-600">
          Showing page <strong>{page}</strong> of <strong>{totalPages}</strong>
        </div>
        <div className="space-x-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 rounded border text-gray-700 hover:bg-gray-100 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 rounded border text-gray-700 hover:bg-gray-100 disabled:opacity-50"
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
