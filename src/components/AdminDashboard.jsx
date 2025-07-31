import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [filters, setFilters] = useState({ jobType: "", educationLevel: "" });

 useEffect(() => {
  fetch("http://localhost:7071/api/getSubmissions")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch submissions");
      return res.json();
    })
    .then((data) => {
      console.log("✅ Submissions:", data);
      setSubmissions(data);
    })
    .catch((err) => {
      console.error("❌ Error fetching submissions:", err);
    });
}, []);


  const filtered = submissions.filter(sub => {
    const matchJob = filters.jobType ? sub.jobType === filters.jobType : true;
    const matchEdu = filters.educationLevel ? sub.educationLevel === filters.educationLevel : true;
    return matchJob && matchEdu;
  });

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>

      <div className="flex gap-4 mb-4">
        <select
          onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}
          value={filters.jobType}
        >
          <option value="">All Job Types</option>
          <option value="Permanent">Permanent</option>
          <option value="Contract">Contract</option>
        </select>

        <select
          onChange={(e) => setFilters({ ...filters, educationLevel: e.target.value })}
          value={filters.educationLevel}
        >
          <option value="">All Education Levels</option>
          <option value="High School Only">High School Only</option>
          <option value="Bachelor’s Degree">Bachelor’s Degree</option>
          <option value="Master’s Qualification">Master’s Qualification</option>
        </select>
      </div>

      <table className="w-full text-left border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Job Title</th>
            <th>Education Level</th>
            <th>CV</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((sub, i) => (
            <tr key={i} className="border-t">
              <td>{sub.name}</td>
              <td>{sub.jobTitle}</td>
              <td>{sub.educationLevel}</td>
              <td>
                <a href={sub.cvBlobUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  Download CV
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
