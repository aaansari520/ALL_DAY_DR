import { Button, Form, Input, Select, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import en from "react-phone-number-input/locale/en";
import {
  getLanguages,
  getPostal,
  getPostal2,
  getSpecialities,
  removeLanguages,
  removePostalCode,
  removePostalCode2,
  removeSpeciality,
  updateUser,
} from "../../Redux/profileSlice";

const Profile = () => {
  const { userData, isLoading } = useSelector((store) => store.user);
  const { specialities, languages, postalCode, postalCode2 } = useSelector(
    (store) => store.profile
  );
  const [searchedSpeciality, setSearchedSpeciality] = useState(null);
  const [searchedLanguages, setSearchedLanguages] = useState(null);
  const [searchedPostal, setSearchedPostal] = useState(null);
  const [searchedPostal2, setSearchedPostal2] = useState(null);
  const dispatch = useDispatch();
  const formRef = React.createRef();
  const firstUpdate = useRef(true);
  const [form] = Form.useForm();
  const {
    id,
    first_name,
    last_name,
    email,
    gender,
    phone,
    role,
    line1,
    line2,
    name,
    pincode,
    town,
  } = userData;

  const [defaultvalues, setdefaultvalues] = useState({
    firstName: first_name,
    lastName: last_name,
    email: email,
    phone: phone,
    gender: gender,
    role: role,
    line1: line1,
    line2: line2,
    pincode1: pincode,
    town1: town,
  });

  console.log("userData in profile", userData);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      console.log("stop");
      if (firstUpdate.current) {
        firstUpdate.current = false;
      } else {
        if (searchedSpeciality) {
          dispatch(getSpecialities(searchedSpeciality));
        }
      }
      if (!searchedSpeciality) {
        dispatch(removeSpeciality());
      }
    }, 2000);

    return () => clearTimeout(delaySearch);
  }, [searchedSpeciality]);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      console.log("stop");
      if (firstUpdate.current) {
        firstUpdate.current = false;
      } else {
        if (searchedLanguages) {
          dispatch(getLanguages(searchedLanguages));
        }
      }
      if (!searchedLanguages) {
        dispatch(removeLanguages());
      }
    }, 2000);

    return () => clearTimeout(delaySearch);
  }, [searchedLanguages]);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      console.log("stop");
      if (firstUpdate.current) {
        firstUpdate.current = false;
      } else {
        if (searchedPostal) {
          dispatch(getPostal(searchedPostal));
        }
      }
      if (!searchedPostal) {
        dispatch(removePostalCode());
      }
    }, 2000);

    return () => clearTimeout(delaySearch);
  }, [searchedPostal]);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      console.log("stop");
      if (firstUpdate.current) {
        firstUpdate.current = false;
      } else {
        if (searchedPostal2) {
          dispatch(getPostal2(searchedPostal2));
        }
      }
      if (!searchedPostal2) {
        dispatch(removePostalCode2());
      }
    }, 2000);
    return () => clearTimeout(delaySearch);
  }, [searchedPostal2]);

  useEffect(() => {
    if (postalCode !== null) {
      setdefaultvalues((prev) => {
        return {
          ...prev,
          line1: postalCode[0]?.line_1,
          line2: postalCode[0]?.line_2,
          pincode1: postalCode[0]?.northings,
          town1: postalCode[0]?.post_town,
        };
      });
    }
  }, [postalCode]);

  useEffect(() => {
    if (postalCode2 !== null) {
      setdefaultvalues((prev) => {
        return {
          ...prev,
          line11: postalCode2[0]?.line_1,
          line22: postalCode2[0]?.line_2,
          pincode2: postalCode2[0]?.northings,
          town2: postalCode2[0]?.post_town,
        };
      });
    }
  }, [postalCode2]);

  useEffect(() => {
    form.setFieldsValue(defaultvalues);
  }, [form, defaultvalues]);

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
        form={form}
        className="Form"
        // autoComplete="off"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 15 }}
        initialValues={defaultvalues}
        onFinish={(values) => {
          dispatch(updateUser({ values, id }));
          console.log("Profile Values", values);
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
              international
              countryCallingCodeEditable={false}
              placeholder="Type your phone no."
            ></PhoneInput>
          </Form.Item>

          <Form.Item
            name="gmc"
            label="GMC"
            rules={[
              {
                required: true,
                message: "This field is required!",
              },
            ]}
            hasFeedback
          >
            <Input></Input>
          </Form.Item>

          <Form.Item
            name="doctor_speciality_id"
            label="Specialities"
            // rules={[
            //   {
            //     required: true,
            //     message: "This Field is Required!",
            //   },
            // ]}
          >
            <Select
              mode="multiple"
              showSearch
              filterOption={false}
              onSearch={(e) => {
                setSearchedSpeciality(e);
                console.log("setSearchedSpeciality", e);
              }}
              //   onChange={function (e) {
              //     gettingID(e);
              //   }}
            >
              {specialities?.map((sur) => {
                return (
                  <Select.Option value={sur.id} allowClear key={sur.id}>
                    {sur.speciality}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            name="language_ids"
            label="Languages"
            // rules={[
            //   {
            //     required: true,
            //     message: "This Field is Required!",
            //   },
            // ]}
          >
            <Select
              mode="multiple"
              showSearch
              filterOption={false}
              onSearch={(e) => {
                setSearchedLanguages(e);
                console.log("setSearchedSurgery", e);
              }}
              //   onChange={function (e) {
              //     gettingID(e);
              //   }}
            >
              {languages?.data.map((sur) => {
                return (
                  <Select.Option value={sur.id} allowClear key={sur.id}>
                    {sur.language_name}
                  </Select.Option>
                );
              })}
            </Select>
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

          <Form.Item name="role" label="Designation" hasFeedback>
            <Input readOnly></Input>
          </Form.Item>

          <Form.Item name="bio" label="Bio" hasFeedback>
            <Input placeholder="Type your bio"></Input>
          </Form.Item>
          <Form.Item>
            <div>
              <p>{`Permanents Address`}</p>
              <b>{`Search PostalCode`}</b>
              <Form.Item name="postalCode1" hasFeedback>
                <Select
                  // mode="multiple"
                  showSearch
                  filterOption={false}
                  onSearch={(e) => {
                    setSearchedPostal(e);
                    console.log("setSearchedPostal", e);
                  }}
                  //   onChange={function (e) {
                  //     gettingID(e);
                  //   }}
                >
                  {postalCode?.map((code) => {
                    return (
                      <Select.Option
                        value={code.northings}
                        allowClear
                        key={code.id}
                      >
                        {code.postcode}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </div>
          </Form.Item>
          <Form.Item>
            <div>
              <p>{`Usual Clinic Address`}</p>
              <b>{`Search PostalCode`}</b>
              <Form.Item name="postalCode2" hasFeedback>
                <Select
                  // mode="multiple"
                  showSearch
                  filterOption={false}
                  onSearch={(e) => {
                    setSearchedPostal2(e);
                    console.log("setSearchedPostal", e);
                  }}
                  //   onChange={function (e) {
                  //     gettingID(e);
                  //   }}
                >
                  {postalCode2?.map((code) => {
                    return (
                      <Select.Option
                        value={code.northings}
                        allowClear
                        key={code.id}
                      >
                        {code.postcode}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </div>
          </Form.Item>
        </div>

        <div className="inner-special">
          <div>
            <Form.Item name="line1" hasFeedback>
              <Input placeholder="Type your Add. Line 1"></Input>
            </Form.Item>
            <Form.Item name="line2" hasFeedback>
              <Input placeholder="Type your Add. Line 2"></Input>
            </Form.Item>
            <Form.Item name="line3" hasFeedback>
              <Input placeholder="Type your Add. Line 3"></Input>
            </Form.Item>
            {/* <Form.Item name="name1" hasFeedback>
              <Input placeholder="Type your Add name"></Input>
            </Form.Item> */}
            <Form.Item name="pincode1" hasFeedback>
              <Input placeholder="Type your Add pincode"></Input>
            </Form.Item>
            <Form.Item name="town1" hasFeedback>
              <Input placeholder="Type your town"></Input>
            </Form.Item>
          </div>

          <div>
            <Form.Item name="line11" hasFeedback>
              <Input placeholder="Type your Add. Line 1"></Input>
            </Form.Item>
            <Form.Item name="line22" hasFeedback>
              <Input placeholder="Type your Add. Line 2"></Input>
            </Form.Item>
            <Form.Item name="line33" hasFeedback>
              <Input placeholder="Type your Add. Line 3"></Input>
            </Form.Item>
            {/* <Form.Item name="name2" hasFeedback>
              <Input placeholder="Type your Add name"></Input>
            </Form.Item> */}
            <Form.Item name="pincode2" hasFeedback>
              <Input placeholder="Type your Add pincode"></Input>
            </Form.Item>
            <Form.Item name="town2" hasFeedback>
              <Input placeholder="Type your town"></Input>
            </Form.Item>
          </div>
        </div>

        <Form.Item className="form-btn">
          <Button block type="primary" htmlType="submit">
            Update Profile
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Profile;
