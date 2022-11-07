import { Button, Modal } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getStatusLogFromLocalStorage } from "../../localStorage/LocalStorageData";
import { cancleAppLog } from "../../Redux/appointmentSlice";
const StatusLogTable = () => {
  const { statusLogData, appointments } = useSelector(
    (store) => store.appointmentsData
  );
  const [isModalOpen, setIsModalOpen] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCancel = () => {
    setIsModalOpen(false);
    dispatch(cancleAppLog());
    navigate("/appointmentsTable");
  };
  const logStatus = getStatusLogFromLocalStorage();
  console.log("logStatus", logStatus);
  return (
    <>
      <Modal
        title="Appointment status log"
        open={isModalOpen}
        footer=""
        onCancel={handleCancel}
      >
        <h4>Appointment Status: {appointments.appointment_status}</h4>
      </Modal>
    </>
  );
};
export default StatusLogTable;
