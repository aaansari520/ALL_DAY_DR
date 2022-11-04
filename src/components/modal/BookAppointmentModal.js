import { DatePicker, Form, Modal, Radio, Select, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBookPatientsFromLocalStorage } from "../../localStorage/LocalStorageData";
import {
  cancle,
  getCards,
  getDoctors,
  getPatients,
  getTimeSlot,
  removeDoctor,
  removePateint,
} from "../../Redux/appointmentSlice";
import moment from "moment";

const BookAppointmentModal = () => {
  const { showAppoint, bookPatient, startTime, doctors, isLoading, timeSlot } =
    useSelector((store) => store.appointmentsData);

  const [searchedPatient, setSearchedPatient] = useState(null);
  const [searchedDoctor, setSearchedDoctor] = useState(null);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [docId, setDocId] = useState(null);
  // const [timeSlot, setTimeSlot] = useState(null);

  const dispatch = useDispatch();
  const formRef = React.createRef();
  const firstUpdate = useRef(true);
  const DATE_FORMAT = "DD-MM-YYYY";
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

  const gettingDocID = (id) => {
    setDocId(id);
    console.log("gettingDocID", id);
  };

  const handleDatepicker = (e) => {
    const date = moment(e).format();
    console.log("Date.....", date);
    dispatch(getTimeSlot({ date, docId }));
  };

  const formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours %= 12;
    hours = hours || 12;
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    const strTime = `${hours}:${minutes} ${ampm}`;

    return strTime;
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
                onChange={(e) => {
                  gettingDocID(e);
                  console.log("Change in ", e);
                }}
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

          {docId ? (
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
              <DatePicker
                picker="date"
                format={DATE_FORMAT}
                onChange={handleDatepicker}
              />
            </Form.Item>
          ) : (
            ""
          )}

          {startTime ? (
            <Form.Item
              name="time"
              label="Time Slots"
              rules={[
                {
                  required: true,
                  message: "This Field is Required!",
                },
              ]}
            >
              <Select filterOption={false}>
                {startTime?.map((time) => {
                  let date = new Date(Date.parse(time.start_time));
                  // console.log("Time kaise chalraha", date);
                  // let newTime = `${date.getMinutes()}:${date.getSeconds()}`;
                  let newTime = formatAMPM(date);
                  // console.log("Time kaise chalraha", newTime);
                  return (
                    <Select.Option
                      value={time.start_time}
                      allowClear
                      key={time.start_time}
                    >
                      {newTime}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          ) : (
            ""
          )}

          {timeSlot && timeSlot ? (
            <Form.Item
              name="duration"
              label="Select Duration"
              rules={[
                {
                  required: true,
                  message: "This Field is Required!",
                },
              ]}
            >
              {timeSlot.slot_durations && (
                <Select filterOption={false}>
                  {timeSlot?.slot_durations.split(",").map((time) => {
                    return (
                      <Select.Option value={time} allowClear key={time}>
                        {time}
                      </Select.Option>
                    );
                  })}
                </Select>
              )}
            </Form.Item>
          ) : (
            ""
          )}

          <label>Appointment Type</label>
          <Radio.Group name="appointment_type">
            <Radio value={"video"}>Video</Radio>
            <Radio value={"phone_call"}>Phone Call</Radio>
            <Radio value={"face_to_face"}>Face to Face</Radio>
          </Radio.Group>
        </Form>
      </div>
    </Modal>
  );
};

export default BookAppointmentModal;
