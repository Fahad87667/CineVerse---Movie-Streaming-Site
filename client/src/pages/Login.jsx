import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { login, clearError } from "../store/Slice/auth-slice";
import { toast } from "react-hot-toast";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status, error } = useSelector((state) => state.auth);

  // Regex patterns
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/;

  useEffect(() => {
    if (user) {
      navigate("/");
    }
    return () => {
      dispatch(clearError());
    };
  }, [user, navigate, dispatch]);

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!passwordPattern.test(formData.password)) {
      newErrors.password =
        "Password must be at least 6 characters long and contain both letters and numbers";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidated(true);

    if (!validateForm()) {
      return;
    }

    try {
      await dispatch(login(formData)).unwrap();
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Login failed");
    }
  };

  return (
    <Container className="min-vh-100 d-flex align-items-center justify-content-center">
      <Row className="w-100">
        <Col md={6} className="mx-auto">
          <div className="bg-netflix-dark p-4 rounded">
            <h2 className="text-center mb-4 text-netflix-red">Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "error" : ""}
                  required
                />
                {errors.email && (
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? "error" : ""}
                  required
                  minLength={6}
                />
                {errors.password && (
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100"
                disabled={status === "pending"}
              >
                {status === "pending" ? "Logging in..." : "Login"}
              </Button>

              <div className="text-center mt-3">
                <p className="mb-0">
                  Don't have an account?{" "}
                  <Button
                    variant="link"
                    className="p-0 text-netflix-red"
                    onClick={() => navigate("/register")}
                  >
                    Register here
                  </Button>
                </p>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
