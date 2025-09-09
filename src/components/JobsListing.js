import React, { useState, useEffect } from "react";

const JobsListing = ({ apiUrl }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    department: "",
    city: "",
    state: "",
  });

  // Mock data for development - replace with actual API call
  const mockJobs = [
    {
      id: 1,
      department: "Maintenance",
      position: "Maintenance Supervisor #142",
      city: "Coeur d'Alene",
      state: "ID",
    },
    {
      id: 2,
      department: "Maintenance",
      position: "Groundskeeper #912",
      city: "Tempe",
      state: "AZ",
    },
    {
      id: 3,
      department: "Maintenance",
      position: "Maintenance Technician #113",
      city: "Mesa",
      state: "AZ",
    },
    {
      id: 4,
      department: "Maintenance",
      position: "Landscaping & Maintenance #147",
      city: "North Mankato",
      state: "MN",
    },
    {
      id: 5,
      department: "Office - Manager - Clerical",
      position: "Activities Director RV #134",
      city: "Mesa",
      state: "AZ",
    },
    {
      id: 6,
      department: "Salon",
      position: "Part-Time Salon Stylist #120",
      city: "Mesa",
      state: "AZ",
    },
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        // Replace this with actual API call when ready
        if (apiUrl) {
          const response = await fetch(apiUrl);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setJobs(data);
          setLoading(false);
        } else {
          // Use mock data for now
          setTimeout(() => {
            setJobs(mockJobs);
            setLoading(false);
          }, 500);
        }
      } catch (err) {
        console.warn("API fetch failed, using mock data:", err.message);
        // Fall back to mock data if API fails
        setTimeout(() => {
          setJobs(mockJobs);
          setLoading(false);
          setError(null); // Clear error since we're showing mock data
        }, 500);
      }
    };

    fetchJobs();
  }, [apiUrl]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const filteredJobs = jobs.filter((job) => {
    return (
      (!filters.department ||
        job.department
          .toLowerCase()
          .includes(filters.department.toLowerCase())) &&
      (!filters.city ||
        job.city.toLowerCase().includes(filters.city.toLowerCase())) &&
      (!filters.state ||
        job.state.toLowerCase().includes(filters.state.toLowerCase()))
    );
  });

  const uniqueDepartments = [...new Set(jobs.map((job) => job.department))];
  const uniqueCities = [...new Set(jobs.map((job) => job.city))];
  const uniqueStates = [...new Set(jobs.map((job) => job.state))];

  if (loading) {
    return (
      <div className="jobs-listing">
        <div className="loading">Loading available positions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="jobs-listing">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="jobs-listing">
      <h2 className="jobs-title">Available Jobs Listing</h2>

      {/* Filter Section */}
      <div className="filter-section">
        <div className="filter-label">Filter Jobs:</div>
        <div className="filter-controls">
          <select
            className="filter-select"
            value={filters.department}
            onChange={(e) => handleFilterChange("department", e.target.value)}
          >
            <option value="">- All Areas of Interest -</option>
            {uniqueDepartments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          <select
            className="filter-select"
            value={filters.city}
            onChange={(e) => handleFilterChange("city", e.target.value)}
          >
            <option value="">- All Cities -</option>
            {uniqueCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>

          <select
            className="filter-select"
            value={filters.state}
            onChange={(e) => handleFilterChange("state", e.target.value)}
          >
            <option value="">- All States -</option>
            {uniqueStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>

          <button
            className="search-button"
            onClick={() => setFilters({ department: "", city: "", state: "" })}
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="jobs-table-container">
        <table className="jobs-table">
          <thead>
            <tr>
              <th>Department</th>
              <th>Position Title</th>
              <th>City</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <tr key={job.id} className="job-row">
                  <td>{job.department}</td>
                  <td>
                    <a
                      href="#"
                      className="position-link"
                      onClick={(e) => {
                        e.preventDefault();
                        // Handle job click - could open modal, navigate, etc.
                        console.log("Job clicked:", job);
                      }}
                    >
                      {job.position}
                    </a>
                  </td>
                  <td>{job.city}</td>
                  <td>{job.state}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-jobs">
                  No jobs found matching your filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="jobs-portal-link">
        <a href="#" className="portal-link">
          Jobs Portal ↗
        </a>
      </div>

      <style jsx>{`
        .jobs-listing {
          font-family: Arial, sans-serif;
          max-width: 100%;
          margin: 0 auto;
        }

        .jobs-title {
          color: #2c5aa0;
          font-size: 24px;
          margin-bottom: 20px;
          font-weight: normal;
        }

        .filter-section {
          margin-bottom: 20px;
        }

        .filter-label {
          font-weight: bold;
          margin-bottom: 10px;
        }

        .filter-controls {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          align-items: center;
        }

        .filter-select {
          padding: 5px 10px;
          border: 1px solid #ccc;
          border-radius: 3px;
          font-size: 14px;
          min-width: 150px;
        }

        .search-button {
          background-color: #8b1538;
          color: white;
          border: none;
          padding: 6px 15px;
          border-radius: 3px;
          cursor: pointer;
          font-size: 14px;
        }

        .search-button:hover {
          background-color: #6d1028;
        }

        .jobs-table-container {
          border: 1px solid #ddd;
          border-radius: 5px;
          overflow: hidden;
          margin-bottom: 20px;
        }

        .jobs-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }

        .jobs-table th {
          background-color: #2c5aa0;
          color: white;
          padding: 12px 8px;
          text-align: left;
          font-weight: bold;
        }

        .jobs-table td {
          padding: 10px 8px;
          border-bottom: 1px solid #eee;
        }

        .job-row:nth-child(even) {
          background-color: #f9f9f9;
        }

        .job-row:hover {
          background-color: #f0f8ff;
        }

        .position-link {
          color: #2c5aa0;
          text-decoration: underline;
          cursor: pointer;
        }

        .position-link:hover {
          color: #1a3d6f;
        }

        .no-jobs {
          text-align: center;
          font-style: italic;
          color: #666;
          padding: 20px;
        }

        .jobs-portal-link {
          text-align: right;
          margin-top: 10px;
        }

        .portal-link {
          color: #2c5aa0;
          text-decoration: none;
          font-size: 14px;
        }

        .portal-link:hover {
          text-decoration: underline;
        }

        .loading,
        .error {
          text-align: center;
          padding: 40px;
          font-size: 16px;
        }

        .error {
          color: #d32f2f;
        }

        @media (max-width: 768px) {
          .filter-controls {
            flex-direction: column;
            align-items: stretch;
          }

          .filter-select {
            min-width: auto;
            width: 100%;
          }

          .jobs-table {
            font-size: 12px;
          }

          .jobs-table th,
          .jobs-table td {
            padding: 8px 4px;
          }
        }
      `}</style>
    </div>
  );
};

export default JobsListing;
