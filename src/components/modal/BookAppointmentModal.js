import { Form, Modal, Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  cancle,
  getCards,
  getDoctors,
  getPatients,
  removeDoctor,
  removePateint,
} from "../../Redux/appointmentSlice";

const BookAppointmentModal = () => {
  const { showAppoint, bookPatient, got, doctors } = useSelector(
    (store) => store.appointmentsData
  );
  console.log("bookPatient", bookPatient);
  const [searchedPatient, setSearchedPatient] = useState(null);
  const [searchedDoctor, setSearchedDoctor] = useState(null);
  const dispatch = useDispatch();
  const formRef = React.createRef();
  const firstUpdate = useRef(true);
  const navigate = useNavigate();
  const handleCancel = () => {
    dispatch(cancle());
    navigate("/appointmentsTable");
  };

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      console.log("stop");
      if (firstUpdate.current) {
        firstUpdate.current = false;
      } else {
        if (searchedPatient) {
          dispatch(getPatients(searchedPatient));
        }
      }
      if (!searchedPatient) {
        dispatch(removePateint());
      }
    }, 2000);

    return () => clearTimeout(delaySearch);
  }, [searchedPatient]);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      console.log("stop");
      if (firstUpdate.current) {
        firstUpdate.current = false;
      } else {
        if (searchedDoctor , bookPatient) {
          const patient_id = bookPatient.id;
          console.log("bookPatient.id", patient_id);
          dispatch(getDoctors({ searchedDoctor, patient_id }));
        }
      }
      if (!searchedDoctor) {
        dispatch(removeDoctor());
      }
    }, 2000);

    return () => clearTimeout(delaySearch);
  }, [searchedDoctor]);

  useEffect(() => {
    if (got && bookPatient.id) {
      const patient_id = bookPatient.id;
      console.log("patient_id", patient_id);
      dispatch(getCards(patient_id));
    }
  }, []);

  return (
    <Modal
      open={showAppoint}
      title="Book An Appointment"
      onCancel={handleCancel}
      footer=""
    >
      <div className="form-Design">
        <Form
          className="Form specificClass"
          // autoComplete="off"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 15 }}
          onFinish={(values) => {
            // dispatch(addPatients(values));
            console.log("Patient Data", values);
            formRef.current.resetFields();
            setTimeout(() => {
              navigate("/table");
            }, 2000);
          }}
          ref={formRef}
          style={{ marginTop: "20px" }}
        >
          <Form.Item
            name="patient"
            label="Patient Name"
            rules={[
              {
                required: true,
                message: "This Field is Required!",
              },
            ]}
          >
            <Select
              showSearch
              filterOption={false}
              onSearch={(e) => {
                setSearchedPatient(e);
                console.log("setSearchedPatient", e);
              }}
            >
              {bookPatient?.map((sur) => {
                return (
                  <Select.Option value={sur.id} allowClear key={sur.id}>
                    {sur.first_name} {sur.last_name} {`(${sur.email})`}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          {bookPatient ? (
            <Form.Item
              name="doctor"
              label="Doctor Name"
              rules={[
                {
                  required: true,
                  message: "This Field is Required!",
                },
              ]}
            >
              <Select
                showSearch
                filterOption={false}
                onSearch={(e) => {
                  setSearchedDoctor(e);
                  console.log("setSearchedPatient", e);
                }}
              >
                {doctors?.map((sur) => {
                  return (
                    <Select.Option value={sur.id} allowClear key={sur.id}>
                      {sur.first_name} {sur.first_name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          ) : (
            ""
          )}
        </Form>
      </div>
    </Modal>
  );
};

export default BookAppointmentModal;
