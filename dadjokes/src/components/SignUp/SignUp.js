import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const SignUp = ({ errors, touched, handleSubmit, values, status }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (status) {
      setUser(...user, status);
    }
  }, [status]);

  return (
    <>
      <Form>
        <h1>Create new account</h1>
        <Field type="text" placeholder="username" name="username" />
        {touched.username && errors.username && (
          <p className="error">{errors.username}</p>
        )}

        <Field type="password" placeholder="password" name="password" />
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}
        <Field type="password" placeholder="confirm password" name="confirm" />
        {touched.confirm && errors.confirm && (
          <p className="error">{errors.confirm}</p>
        )}
        <button type="submit">accept and submit</button>
        <div>By submitting you accept the terms and conditions</div>
      </Form>
    </>
  );
};

const FormikForm = withFormik({
  mapPropsToValues({ username, password, confirm }) {
    return {
      username: username || "",

      password: password || "",
      confirm: confirm || ""
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required("Username Required"),

    password: Yup.string()
      .min(8, "8 character minimum")
      .required("Password required"),
    confirm: Yup.string()
      .oneOf([Yup.ref("password"), null], "passwords don't match")
      .required("must confirm password")
  }),

  handleSubmit(values) {
    if (values.password === values.confirm) {
      const username = values.username;
      const password = values.password;
      axios
        .post(
          "https://api-dadjokes.herokuapp.com/createnewuser",
          JSON.stringify({ username, password }),
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          axios
            .post(
              "https://api-dadjokes.herokuapp.com/login",
              `grant_type=password&username=${username}&password=${password}`,
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                  Authorization: "Basic bGFtYmRhOmxhbWJkYS1zZWNyZXQ="
                }
              }
            )
            .then(res => {
              console.log(res.data);
            })
            .catch(err => {
              console.log(err);
            });
        });
    }
  }
})(SignUp);

export default FormikForm;
