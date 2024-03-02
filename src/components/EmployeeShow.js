import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_EMPLOYEE, DELETE_EMPLOYEE } from '../queries';

const EmployeeShow = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();

  const { loading, error, data, refetch } = useQuery(GET_EMPLOYEE, {
    variables: { employeeId },
  });

  React.useEffect(() => {
    refetch();
  }, [refetch]);

  const [removeEmployee, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_EMPLOYEE, {
    onCompleted: () => navigate('/'),
  });

  const handleDelete = (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      removeEmployee({ variables: { id: employeeId } });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const employee = data.employee;

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{employee.firstName}'s Details</h3>
        </div>
        <div className="card-body">
          <dl className="row">
            <dt className="col-sm-3">First Name:</dt>
            <dd className="col-sm-9">{employee.firstName}</dd>
            <dt className="col-sm-3">Last Name:</dt>
            <dd className="col-sm-9">{employee.lastName}</dd>
            <dt className="col-sm-3">Age:</dt>
            <dd className="col-sm-9">{employee.age}</dd>
            <dt className="col-sm-3">Date of Joining:</dt>
            <dd className="col-sm-9">{new Date(employee.dateOfJoining).toLocaleDateString()}</dd>
            <dt className="col-sm-3">Title:</dt>
            <dd className="col-sm-9">{employee.title}</dd>
            <dt className="col-sm-3">Department:</dt>
            <dd className="col-sm-9">{employee.department}</dd>
            <dt className="col-sm-3">Employee Type:</dt>
            <dd className="col-sm-9">{employee.employeeType}</dd>
            <dt className="col-sm-3">Current Status:</dt>
            <dd className="col-sm-9">{employee.currentStatus ? 'Active' : 'Inactive'}</dd>
          </dl>
          <div>
            <Link to={`/edit/${employeeId}`} className="btn btn-success mr-2">
              Edit
            </Link>
            <button onClick={() => handleDelete(employeeId)} className="btn btn-danger">
              Delete
            </button>
          </div>
          {deleteLoading && <p>Loading...</p>}
          {deleteError && <p>Error: Please try again</p>}
        </div>
      </div>
    </div>
  );
};

export default EmployeeShow;
