import { Button, Form, Input, Spin } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../Redux/profileSlice";

const ResetPass = () => {
  const { isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const formRef = React.createRef();

  return (
    <div className="form-Design signinForm">
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
        // initialValues={{
        //   phone: user.phone,
        //   role: user.role,
        // }}
        onFinish={(values) => {
          dispatch(changePassword(values));
          formRef.current.resetFields();
        }}
        ref={formRef}
      >
        <Form.Item
          label="Old Password"
          name="existing_password"
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
        >
          <Input.Password placeholder="Type your existing_password"></Input.Password>
        </Form.Item>

        <Form.Item
          name="password"
          label="New Password"
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
          <Input.Password placeholder="Type your new password"></Input.Password>
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
          <Input.Password placeholder="Type your confirm password"></Input.Password>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <Button
            block
            type="primary"
            htmlType="submit"
            style={{ padding: "5px 50px" }}
          >
            Change Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPass;
