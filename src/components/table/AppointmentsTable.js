import { Button, Input, Spin, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAppointments } from "../../Redux/appointmentSlice";

const AppointmentsTable = () => {
  const { appointments, isLoading, showAppoint, getTotal } = useSelector(
    (state) => state.appointmentsData
  );
  const dispatch = useDispatch();
  const [page1, setPage] = useState(1);
  const [searchedText, setSearchedText] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getAppointments(page1));
  }, [page1]);

  const gettingPage = (page) => {
    setPage(page);
    console.log("Value change horahi hai kya page ki", page);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Date & Time",
      dataIndex: "actual_start_time",
      sorter: (record1, record2) => {
        return record1.actual_start_time > record2.actual_start_time;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Booked By",
      dataIndex: "booked_by",
      render: (text, row) => (
        <a>
          {text}
          <p style={{ display: "flex", justifyContent: "center" }}>
            <b
              style={{
                marginTop: "5px",
                backgroundColor: "blueviolet",
              }}
            >
              {row.book_via}
            </b>
          </p>
        </a>
      ),
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.booked_by)
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: "Patient Detail",
      dataIndex: "email",
      render: (text, row) => (
        <a>
          {text}{" "}
          <p style={{ display: "flex", justifyContent: "center" }}>
            <b
              style={{
                marginTop: "5px",

                backgroundColor: "pink",
              }}
            >
              {row.appointment_type}
            </b>
          </p>{" "}
        </a>
      ),
    },
    {
      title: "Conducted By",
      dataIndex: "conducted_by",
    },
    {
      title: "Actions",
      //   dataIndex: "date_of_birth",
    },
  ];

  return (
    <div>
      <div className="headerApoo">
        <div>
          <b>Appointments</b> {getTotal ? `(${getTotal}  Founds)` : ""}
        </div>
        <div>
          <Link to="/bookAppointmentModal">
            <Button type="primary">Book An Appointment</Button>
          </Link>
        </div>
      </div>
      <div className="Table-Design max-width-1200">
        <div className="top">
          <Input.Search
            className="Table-input"
            placeholder="Search patients..."
            onChange={(e) => {
              const change = e.target.value;
              setSearchedText(change);
            }}
          ></Input.Search>
        </div>

        {isLoading ? (
          <div className="login-spinner">
            <Spin size="middle"></Spin>
          </div>
        ) : (
          ""
        )}

        {showAppoint ? (
          <Table
            // loading={isLoading}
            dataSource={appointments}
            columns={columns}
            pagination={{
              total: getTotal,
              onChange: (pag) => {
                gettingPage(pag);
              },
            }}
            rowKey="id"
          ></Table>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AppointmentsTable;
