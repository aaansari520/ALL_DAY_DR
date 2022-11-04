import { DatePicker, Form, Modal, Select, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBookPatientsFromLocalStorage } from "../../localStorage/LocalStorageData";
import {
  cancle,
  getCards,
  getDoctors,
  getPatients,
  removeDoctor,
  removePateint,
} from "../../Redux/appointmentSlice";

const BookAppointmentModal = () => {
  const { showAppoint, bookPatient, doctors, isLoading } = useSelector(
    (store) => store.appointmentsData
  );

  const [searchedPatient, setSearchedPatient] = useState(null);
  const [searchedDoctor, setSearchedDoctor] = useState(null);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

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
        if (searchedDoctor) {
          const patient_id = selectedPatientId.id;
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
    if (selectedPatientId) {
      const patient_id = selectedPatientId.id;
      const corporate_id = selectedPatientId.c_id;
      console.log("patient_id", patient_id);
      dispatch(getCards({ patient_id, corporate_id }));
    }
  }, [selectedPatientId]);

  const gettingID = (id, c_id) => {
    //  dispatch(updateId(id));
    setSelectedPatientId({ id, c_id });
    console.log("gettingID", id);
  };

  return (
    <Modal
      open={showAppoint}
      title="Book An Appointment"
      onCancel={handleCancel}
      footer=""
    >
      {isLoading ? (
        <div className="login-spinner">
          <Spin size="middle"></Spin>
        </div>
      ) : (
        ""
      )}

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
              onChange={function (e) {
                const corp_id = getBookPatientsFromLocalStorage();
                const c_id = corp_id.find((prev) => prev.id === e).corporate_id;
                console.log("Onchange Me Filtering kya mila", c_id);
                gettingID(e, c_id);
                console.log("Onchange Me E kya mila", e, c_id);
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

          {selectedPatientId ? (
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
                // onChange={(e) => {
                //   const change = e.target.value;
                //   setDocId(change);
                // }}
              >
                {doctors?.map((sur) => {
                  return (
                    <Select.Option value={sur.id} allowClear key={sur.id}>
                      {sur.first_name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          ) : (
            ""
          )}

          {doctors ? (
            <Form.Item
              name="date"
              label="Date"
              rules={[
                {
                  required: true,
                  message: "This Field is Required!",
                },
              ]}
            >
              <DatePicker picker="date" />
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
