import { Button, Form, Input, Spin } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { notVerified, verifyUser } from "../Redux/userSlice";

const Verify = () => {
  const { user, auth, isLoading, email } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  var navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      setTimeout(() => {
        navigate("/home");
      });
    }
  }, [auth]);

  return (
    <div className="form-Design signinForm">
      <div className="nav-bar">
        <Link to="/verify">
          <h2 style={{ marginTop: "15px" }}>Verify to your self...</h2>
        </Link>

        <Link to="/sign_in">
          <button
            className="common-nav-button green "
            onClick={() => dispatch(notVerified())}
          >
            Sign In
          </button>
        </Link>
      </div>

      {isLoading ? (
        <div className="login-spinner">
          <Spin size="middle"></Spin>
        </div>
      ) : (
        ""
      )}

      <Form
        className="Form"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        initialValues={{
          phone: user.phone,
          role: user.role,
        }}
        onFinish={(values) => {
          console.log("Verify me otp", values);
          dispatch(verifyUser(values));
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "15px",
          }}
        >
          <p style={{ margin: "0" }}>
            A verification code has sent to your email
          </p>
          <b style={{ color: "green" }}>{email} </b>
          <p style={{ margin: "0" }}>Check your spam/junk as well.</p>
        </div>

        <Form.Item
          label="Enter OTP"
          name="otp"
          rules={[
            {
              required: true,
              message: "Please enter your otp!",
            },
          ]}
        >
          <Input></Input>
        </Form.Item>

        <Form.Item label="Phone No." name="phone">
          <Input readOnly></Input>
        </Form.Item>

        <Form.Item label="Role" name="role">
          <Input readOnly></Input>
        </Form.Item>

        <Form.Item
          wrapperCol={{ span: 12 }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            style={{ padding: "5px 50px" }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Verify;
