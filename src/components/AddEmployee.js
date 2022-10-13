import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import EmployeeService from "../services/EmployeeService";

const AddEmployee = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const navigaye = useNavigate();

  const onSubmit = (e) => {

    console.log(e)
    let saveEmployee = EmployeeService.saveEmployee(e)
    saveEmployee.then((response) => {
      console.log(response);
      navigaye("/employeeList");
    })
      .catch((error) => {
        console.log(error);
      });
    return saveEmployee;
  };


  const cancel = (e) => {
    navigaye("/employeeList");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-8 py-8">
        <div className="font-thin text-2xl tracking-wider">
          <h1>Add New Employee</h1>
        </div>

        <label className="block text-gray-600 text-sm font-normal">
          Full Name *
        </label>
        <input
          type="text"
          name="fullName"
          {...register("fullName", { required: true, minLength: 10 })}
          className="h-10 w-96 border mt-2 px-2 py-2" />
        {errors?.fullName?.type === "required" && <p style={{ color: "#bf1650" }}>This field is required</p>}
        {errors?.fullName?.type === "minLength" && (
          <p style={{ color: "#bf1650" }}>Full name cannot less than 10 characters</p>
        )}


        <label className="block text-gray-600 text-sm font-normal">
          Phone Number *
        </label>
        <input
          type="number"
          name="phoneNumber"
          {...register("phoneNumber", { required: true, minLength: 10, maxLength: 12 })}
          className="h-10 w-96 border mt-2 px-2 py-2" />
        
        {errors?.phoneNumber?.type === "required" && <p style={{ color: "#bf1650" }}>This field is required</p>}
        {errors?.phoneNumber?.type === "minLength" && (
          <p style={{ color: "#bf1650" }}>Phone numbers cannot less than 10 characters</p>
        )}
        {errors?.phoneNumber?.type === "maxLength" && (
          <p style={{ color: "#bf1650" }}>Phone numbers cannot more than 12 characters</p>
        )}

        <label className="block text-gray-600 text-sm font-normal">
          Gender *
        </label>
        <select name="gender" {...register("gender", { required: true })} >
          <option value="true" defaultValue="Male">Male</option>
          <option value="false">Female</option>
        </select>

        <label className="block text-gray-600 text-sm font-normal">
          Created Date *
        </label>
        <input
          type="Date"
          name="createdDate"
          {...register("createdDate", { required: true })}
          className="h-10 w-96 border mt-2 px-2 py-2" />
        {errors?.createdDate?.type === "required" && <p style={{ color: "#bf1650" }}>This field is required</p>}
        <label className="block text-gray-600 text-sm font-normal">
          Email
        </label>
        <input
          type="email"
          name="emailId"
          {...register("emailId", { required: true })}
          className="h-10 w-96 border mt-2 px-2 py-2" />
        {errors?.emailId?.type === "required" && <p style={{ color: "#bf1650" }}>This field is required</p>}
        <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
          <button
            type="submit"
            className="rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6">
            Save
          </button>
          <button
            onClick={cancel}
            className="rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6">
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddEmployee;
