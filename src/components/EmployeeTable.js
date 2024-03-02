import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_EMPLOYEES } from '../queries';

const EmployeeTable = () => {
  const { loading, error, data, refetch } = useQuery(GET_EMPLOYEES);
  const [searchQuery, setSearchQuery] = useState('');
  const [jobTitleFilter, setJobTitleFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [employeeTypeFilter, setEmployeeTypeFilter] = useState('');

  React.useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">Error: {error.message}</p>;

  const handleClearSearch = () => {
    setSearchQuery('');
    setJobTitleFilter('');
    setDepartmentFilter('');
    setEmployeeTypeFilter('');
  };

  const filteredEmployees = data.employees.filter(employee => {
    const searchLowerCase = searchQuery.toLowerCase();
    const jobTitleMatch = !jobTitleFilter || employee.title.toLowerCase() === jobTitleFilter.toLowerCase();
    const departmentMatch = !departmentFilter || employee.department.toLowerCase() === departmentFilter.toLowerCase();
    const employeeTypeMatch = !employeeTypeFilter || employee.employeeType.toLowerCase() === employeeTypeFilter.toLowerCase();

    return (
      jobTitleMatch &&
      departmentMatch &&
      employeeTypeMatch &&
      (employee.firstName.toLowerCase().includes(searchLowerCase) ||
        employee.lastName.toLowerCase().includes(searchLowerCase) ||
        employee.age.toString().includes(searchQuery) ||
        employee.currentStatus.toString().toLowerCase().includes(searchQuery)
      )
    );
  });

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Employee List</h2>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <select
                className="form-control"
                value={jobTitleFilter}
                onChange={(e) => setJobTitleFilter(e.target.value)}
              >
                <option value="">Filter by Job Title</option>
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
                <option value="Director">Director</option>
                <option value="VP">VP</option>
              </select>
            </div>
            <div className="col-md-3">
              <select
                className="form-control"
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                <option value="">Filter by Department</option>
                <option value="IT">IT</option>
                <option value="Marketing">Marketing</option>
                <option value="HR">HR</option>
                <option value="Engineering">Engineering</option>
              </select>
            </div>
            <div className="col-md-3">
              <select
                className="form-control"
                value={employeeTypeFilter}
                onChange={(e) => setEmployeeTypeFilter(e.target.value)}
              >
                <option value="">Filter by Employee Type</option>
                <option value="FullTime">Full-Time</option>
                <option value="PartTime">Part-Time</option>
                <option value="Contract">Contract</option>
                <option value="Seasonal">Seasonal</option>
              </select>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Age</th>
                  <th>Date of Joining</th>
                  <th>Title</th>
                  <th>Department</th>
                  <th>Employee Type</th>
                  <th>Current Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td>
                      <Link to={`/show/${employee.id}`}>{employee.firstName}</Link>
                    </td>
                    <td>{employee.lastName}</td>
                    <td>{employee.age}</td>
                    <td>{new Date(employee.dateOfJoining).toLocaleDateString()}</td>
                    <td>{employee.title}</td>
                    <td>{employee.department}</td>
                    <td>{employee.employeeType}</td>
                    <td>{employee.currentStatus ? 'Active' : 'Inactive'}</td>
                    <td>
                      <Link to={`/edit/${employee.id}`} className="btn btn-primary btn-sm">
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTable;
