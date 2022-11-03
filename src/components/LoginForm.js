import { Button, Form, Input, Select, Spin } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../Redux/userSlice";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import en from "react-phone-number-input/locale/en";

const SignUp = () => {
  const { user, isLoading } = useSelector((store) => store.user);
  var navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = React.createRef();

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/verify");
      });
    }
  }, [user]);

  return (
    <div className="form-Design">
      {isLoading ? (
        <div className="login-spinner">
          <Spin size="middle"></Spin>
        </div>
      ) : (
        ""
      )}

      <Form
        className="Form"
        // autoComplete="off"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 15 }}
        initialValues={{ role: "doctor" }}
        onFinish={(values) => {
          dispatch(registerUser(values));
          formRef.current.resetFields();
        }}
        ref={formRef}
        style={{ marginTop: "20px" }}
      >
        <div className="inner">
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              {
                required: true,
                message: "This Field is Required!",
              },
              {
                pattern: new RegExp("^[a-zA-Z]+$"),
                message:
                  "This field accepts only alphabets, minimum 3 alphabets are required!",
              },
              {
                whitespace: true,
              },
              { min: 3, message: false },
            ]}
            hasFeedback
          >
            <Input placeholder="Type your firstName"></Input>
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[
              {
                required: true,
                message: "This Field is Required!",
              },
              {
                pattern: new RegExp("^[a-zA-Z]+$"),
                message:
                  "This field accepts only alphabets, minimum 3 alphabets are required!",
              },
              {
                whitespace: true,
              },
              { min: 3, message: false },
            ]}
            hasFeedback
          >
            <Input placeholder="Type your lastName"></Input>
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "This Field is Required!",
              },
              { whitespace: true },
              { type: "email", message: "Email is not valid" },
            ]}
            hasFeedback
          >
            <Input placeholder="Type your email" type="email"></Input>
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              {
                required: true,
                message: "This Field is Required!",
              },
              {
                whitespace: true,
              },
              { min: 13, message: "Phone must contain 10 digits only!" },
              { max: 13, message: "Limit exceeded" },
            ]}
            hasFeedback
          >
            <PhoneInput
              label={en}
              defaultCountry="IN"
              international
              countryCallingCodeEditable={false}
              placeholder="Type your phone no."
            ></PhoneInput>
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[
              {
                required: true,
                message: "This Field is Required!",
              },
            ]}
          >
            <Select placeholder="Gender">
              {["male", "female", "transgender"].map((gender, index) => {
                return (
                  <Select.Option value={gender} allowClear key={index}>
                    {gender}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "This Field is Required!",
              },
              {
                // type: "regexp", ye use karneki zrurat nahi hai
                pattern: new RegExp(
                  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
                ),
                message: "Pattern is not matching the requirement",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Type your password"></Input.Password>
          </Form.Item>

          <Form.Item
            name="confirmpassword"
            label="Confirm Password"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "This Field is Required!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "Confirm Password is not matching with the Password!"
                  );
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Type your Confirm password"></Input.Password>
          </Form.Item>

          <Form.Item name="role" label="Role" hasFeedback>
            <Input readOnly></Input>
          </Form.Item>

          <Form.Item
            name="deviceType"
            label="Device Type"
            rules={[
              {
                required: true,
                message: "This Field is Required!",
              },
              { type: "text" },
            ]}
            hasFeedback
          >
            <Input placeholder="Type your deviceType"></Input>
          </Form.Item>

          <Form.Item
            name="player_id"
            label="Player Id"
            rules={[
              {
                required: true,
                message: "This Field is Required!",
              },
              { type: "text" },
            ]}
            hasFeedback
          >
            <Input placeholder="Type your player_id"></Input>
          </Form.Item>
        </div>

        <Form.Item className="form-btn">
          <Button block type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;
