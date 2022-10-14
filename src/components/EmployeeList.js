import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import EmployeeService from "../services/EmployeeService";
import Employee from "./Employee";
import toast, { Toaster } from 'react-hot-toast';

const EmployeeList = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);

  const [showModal, setShowModal] = useState(false);

  console.log(employees)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await EmployeeService.getEmployees();
        setEmployees(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const deleteEmployee = (e, id) => {
    e.preventDefault();
    confirmAlert({
      title: "Message Delete",
      message: "Are you sure ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => EmployeeService.deleteEmployee(id).then((res) => {
            if (employees) {
              setEmployees((prevElement) => {
                return prevElement.filter((employee) => employee.id !== id);
              });
            }
          })
        },
        {
          label: "No",
          onClick: () => setShowModal(false),
        }
      ]
    });
    
    
  };

  const onSubmit = (data, e) => {
    console.log(data);
    console.log(e)
    // e.preventDefault();
    let saveEmployee = EmployeeService.saveEmployee(data)
    saveEmployee.then((response) => {
      console.log(response);
      toast.success("Success")
      setTimeout(() => {
        closeModal()
      }, 1000)
      
    })
      .catch((error) => {
        console.log(error);
      });
    return saveEmployee;
  };

  const closeModal = () => {
    setShowModal(false);
    window.location.reload();

  }


  return (
    <div className="container mx-auto my-8">
      <div className="h-12">
        <button
          className="rounded bg-slate-600 text-white px-6 py-2 font-semibold"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Add Employee
        </button>
      </div>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setShowModal(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                <div className="mt-3 sm:flex">
                  <div className="mt-2 sm:ml-4 sm:text-left">
                    <form className="w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
                      <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Full Name *
                          </label>
                          <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            type="text"
                            name="fullName"
                            {...register("fullName", { required: true, minLength: 10 })}
                          />
                          {errors?.fullName?.type === "required" && <p style={{ color: "#bf1650" }}>This field is required</p>}
                          {errors?.fullName?.type === "minLength" && (
                            <p style={{ color: "#bf1650" }}>Full name cannot less than 10 characters</p>
                          )}
                        </div>

                        <div className="w-full md:w-1/2 px-3">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Phone Number *
                          </label>
                          <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            type="number"
                            name="phoneNumber"
                            {...register("phoneNumber", { required: true, minLength: 10, maxLength: 12 })}
                          />

                          {errors?.phoneNumber?.type === "required" && <p style={{ color: "#bf1650" }}>This field is required</p>}
                          {errors?.phoneNumber?.type === "minLength" && (
                            <p style={{ color: "#bf1650" }}>Phone numbers cannot less than 10 characters</p>
                          )}
                          {errors?.phoneNumber?.type === "maxLength" && (
                            <p style={{ color: "#bf1650" }}>Phone numbers cannot more than 12 characters</p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Gender *
                          </label>
                          <select
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            name="gender" {...register("gender", { required: true })} >
                            <option value="true" defaultValue="Male">Male</option>
                            <option value="false">Female</option>
                          </select>
                        </div>

                        <div className="w-full md:w-1/2 px-3">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Created Date *
                          </label>
                          <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            type="Date"
                            name="createdDate"
                            {...register("createdDate", { required: true })}
                          />
                          {errors?.createdDate?.type === "required" && <p style={{ color: "#bf1650" }}>This field is required</p>}
                        </div>
                      </div>

                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                        Email
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        type="email"
                        name="emailId"
                        {...register("emailId", { required: true })}
                      />
                      {errors?.emailId?.type === "required" && <p style={{ color: "#bf1650" }}>This field is required</p>}
                      <div className="flex justify-end items-center h-14 w-full my-4 space-x-4 pt-4">
                        <button

                          type="submit"
                          className="rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6">
                          Save
                        </button>
                        <Toaster position="top-center"
                          reverseOrder={false} />
                        <button
                          type="reset"
                          className="rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6">
                          Clear
                        </button>
                        <button
                          onClick={() => setShowModal(false)}
                          className="rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6">
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      <div className="flex shadow border-b">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Full Name
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Phone Number
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Gender
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Created Date
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Email
              </th>
              <th className="text-right font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Actions
              </th>
            </tr>
          </thead>
          {!loading && (
            <tbody className="bg-white">
              {employees.map((employee) => (
                <Employee
                  employee={employee}
                  deleteEmployee={deleteEmployee}
                  key={employee.id}></Employee>
              ))}
            </tbody>
          )}
        </table>

      </div>
    </div >
  );
};

export default EmployeeList;
