import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AdminEmploy } from './UseAdminEmploy.js';
import { useNavigate } from 'react-router-dom';

const ExmployDetail = () => {
  const dispatch = useDispatch();
  const Data = useSelector((store) => store.Employ.AdminData);
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(AdminEmploy());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-center text-2xl font-bold mb-4">Employee Details</h2>
      <div className="flex justify-end mb-4">
      <button onClick={()=>navigate('/video')} className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 m-2">
          Home
        </button>
        <button onClick={()=>navigate('add')} className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 m-2">
          Add Employ
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 text-left table-auto">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-2 border-r">Name</th>
              <th className="p-2 border-r">Employee ID</th>
              <th className="p-2 border-r">Email</th>
              <th className="p-2 border-r">Reporting Manager</th>
              <th className="p-2 border-r">Joining Date</th>
              <th className="p-2 border-r">Account No</th>
              <th className="p-2 border-r">IFSC Code</th>
              <th className="p-2 border-r">Department</th>
              <th className="p-2 border-r">Created At</th>
              <th className="p-2">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {Data && Data.length > 0 ? (
              Data.map((employ) => (
                <tr key={employ._id} className="border-b hover:bg-gray-50">
                  <td className="p-2 border-r">{employ.name}</td>
                  <td className="p-2 border-r">{employ.emplId}</td>
                  <td className="p-2 border-r">{employ.email}</td>
                  <td className="p-2 border-r">{employ.reportingManager}</td>
                  <td className="p-2 border-r">{new Date(employ.joiningDate).toLocaleDateString()}</td>
                  <td className="p-2 border-r">{employ.accountNo}</td>
                  <td className="p-2 border-r">{employ.ifscCode}</td>
                  <td className="p-2 border-r">{employ.department}</td>
                  <td className="p-2 border-r">{new Date(employ.createdAt).toLocaleDateString()}</td>
                  <td className="p-2">{new Date(employ.updatedAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center p-4">
                  No Employee Data Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExmployDetail;
