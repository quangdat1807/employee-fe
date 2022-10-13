import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";


const Employee = ({ employee, deleteEmployee }) => {
  const navigate = useNavigate();
  const editEmployee = (e, id) => {
    e.preventDefault();
    navigate(`/editEmployee/${id}`);
  };

  let gender;
  employee.gender === true ?
    gender = 'Male'
    :
    gender = 'Female'

  return (
    <tr key={employee.id}>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{employee.fullName}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">0{employee.phoneNumber}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{gender}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{employee.createdDate}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{employee.emailId}</div>
      </td>
      <td className="text-right px-6 py-4 whitespace-nowrap font-medium text-sm">
        <a
          onClick={(e, id) => editEmployee(e, employee.id)}
          className="text-indigo-600 hover:text-indigo-800 px-4 hover:cursor-pointer">
          Edit
        </a>
        <a
          onClick={(e, id) => deleteEmployee(e, employee.id)}
          className="text-indigo-600 hover:text-indigo-800 hover:cursor-pointer">
          Delete
        </a>
      </td>
    </tr>
  );
};

export default Employee;
