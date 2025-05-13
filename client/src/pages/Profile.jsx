import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { updateProfile } from "../store/Slice/auth-slice";
import { toast } from "react-hot-toast";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "./Profile.scss";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.auth);
  const [initialValues, setInitialValues] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setInitialValues({
        username: user.username || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters long")
      .matches(/^[A-Z]/, "Username must start with a capital letter"),
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(updateProfile(values)).unwrap();
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h2>Update Profile</h2>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username</label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.username && errors.username}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </div>

              <div className="form-group">
                <label>Email address</label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.email && errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </div>

              <Button
                variant="primary"
                type="submit"
                className="btn-update"
                disabled={isSubmitting || status === "pending"}
              >
                {status === "pending" ? "Updating..." : "Update Profile"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Profile;
