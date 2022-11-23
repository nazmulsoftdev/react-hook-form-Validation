import React from "react";
import "./FormComponent.css";

import { useForm } from "react-hook-form";

function FormComponent() {
  // use default value in react-hook-form

  const values = {
    defaultValues: { Name: "Nazmul", email: "nazmul@gmail.com" },
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm(values);

  // form submit action
  const FormSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="Form-container">
      <form onSubmit={handleSubmit(FormSubmit)}>
        <label>Name:</label>
        <input
          type="text"
          {...register("Name", {
            required: "Name is required",
            minLength: {
              value: 6,
              message: "Name length will be more than 6 characters",
            },
            maxLength: {
              value: 10,
              message: "Name length will be within 12 character",
            },
          })}
        />
        <small className="errorMessage">{errors.Name?.message}</small>
        <label>Email:</label>
        <input
          type="text"
          {...register("email", {
            pattern: /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,63})$/,
          })}
        />
        <small className="errorMessage">
          {errors?.email?.type === "pattern" && "Provide a valid email address"}
        </small>
        <label>Profession:</label>
        <select {...register("profession")}>
          <option value="Student" selected>
            Student
          </option>
          <option value="Job Holder">Job Holder</option>
          <option value="Others">Others</option>
        </select>
        <label>Age:</label>
        <input
          type="number"
          {...register("age", {
            required: "Age Must be required",
            min: { value: 18, message: "Age must be above 18" },
            max: { value: 50, message: "Age must be under 50" },
          })}
        />
        <small className="errorMessage">{errors.age?.message}</small>
        <label>Password:</label>
        <input type="password" {...register("password")} />
        <label>Confirm Password:</label>
        <input
          type="password"
          {...register("confirmPassword", {
            validate: (data) => {
              if (watch("password") !== data) {
                return "Password not match";
              }
            },
          })}
        />
        <small className="errorMessage">
          {errors.confirmPassword?.message}
        </small>
        <button className="submit-btn">Submit</button>
      </form>
    </div>
  );
}

export default FormComponent;
