import { Button, Input, Spin, Table, Tag } from "antd";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addingStatusId,
  getAppoinmentsLog,
  getAppointments,
} from "../../Redux/appointmentSlice";

const AppointmentsTable = () => {
  const { appointments, isLoading, showAppoint, getTotal,  } =
    useSelector((state) => state.appointmentsData);
  const dispatch = useDispatch();
  const [page1, setPage] = useState(1);
  const [searchedText, setSearchedText] = useState("");

  const onChangeStatusLog = (e) => {
    if (e) {
      console.log("onChangeStatusLog", e);
      const { id } = e[0];
      const appointment_id = id;
      dispatch(getAppoinmentsLog(appointment_id));
      dispatch(addingStatusId(appointment_id));
    }
  };

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
      render: (text, record) => {
        return (
          <a>
            <p>{moment(text).format("DD-MM-YYYY h:mm:ss a")}</p>
          </a>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Booked By",
      dataIndex: ["appointment_generated_by", "name"],
      render: (text, row) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span> {text}</span>
          <p
            style={{
              marginTop: "5px",
              backgroundColor: "blueviolet",
              color: "white",
              padding: "0 5px",
              borderRadius: "3px",
              fontWeight: "bold",
            }}
          >
            {row.book_via}
          </p>
        </div>
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span>{text}</span>
          <p
            style={{
              marginTop: "5px",
              backgroundColor: "pink",
              padding: "0 5px",
              borderRadius: "3px",
              fontWeight: "bold",
            }}
          >
            {row.appointment_type}
          </p>
        </div>
      ),
    },
    {
      title: "Conducted By",
      dataIndex: ["gp_details", "first_name"],
      render: (text, row) => (
        <a>
          {text} {row.gp_details?.last_name ? row.gp_details?.last_name : ""}{" "}
          {`${row.gp_details?.role ? `(${row.gp_details?.role})` : ""}`}
        </a>
      ),
    },
    {
      title: "Actions",
      render: (text, record) => (
        <>
          <Link to="/statusLogTable">
            <button
              style={{ width: "90px" }}
              onClick={() => onChangeStatusLog([record])}
            >
              {"Status Log"}
            </button>
          </Link>
        </>
      ),
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
