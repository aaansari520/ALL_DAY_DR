import { Button, Modal, Spin } from "antd";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getCardsDetailFromLocalStorage,
  getStatusLogFromLocalStorage,
} from "../../localStorage/LocalStorageData";
import { cancleAppLog } from "../../Redux/appointmentSlice";
const StatusLogTable = () => {
  const { statusLogData, appointments, StatusId, isLoading } = useSelector(
    (store) => store.appointmentsData
  );
  const [isModalOpen, setIsModalOpen] = useState(true);
  // const [settingStatusId, setSettingStatusId] = useState(null);
  console.log("appointments", appointments);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCancel = () => {
    setIsModalOpen(false);
    dispatch(cancleAppLog());
    navigate("/appointmentsTable");
  };
  console.log("statusLogData in sttsu", statusLogData);

  // useEffect(() => {
  //   setSettingStatusId(StatusId);
  // }, []);

  return (
    <>
      <Modal
        title="Appointment status log"
        open={isModalOpen}
        footer=""
        onCancel={handleCancel}
        // {getTotal ? `(${getTotal}  Founds)` : ""}
      >
        {isLoading ? (
          <div className="login-spinner">
            <Spin size="middle"></Spin>
          </div>
        ) : (
          ""
        )}

        {appointments && (
          <div>
            <h5>Appointment Status: </h5>&nbsp;
            <span style={{ color: "red" }}>
              {appointments
                ? `${appointments?.find((ele) => ele.id === StatusId).status}`
                : ""}
            </span>
          </div>
        )}
        {statusLogData && (
          <div>
            {statusLogData?.map((status) => {
              return (
                <div>
                  <h5 style={{ color: "blue" }}>{status.event} : </h5>
                  <span>{status.created_by}</span>&nbsp;
                  <span>
                    {moment(status.created_at).format("DD-MM-YYYY h:mm:ss a")}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </Modal>
    </>
  );
};
export default StatusLogTable;
