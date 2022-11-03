// >>>>>>>>>>>>>>>>>>>...The USER...<<<<<<<<<<<<<<<<

export const addUserToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
  //   localStorage.setItem("user", user);
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem("user");
  const user = result ? JSON.parse(result) : null;
  // console.log("User in get user funct", user);
  // console.log("result in get user funct", result);
  return user;
};

// >>>>>>>>>>>>>>>>>>>...Auth Token...<<<<<<<<<<<<<<<<

export const addAuthTokenToLocalStorage = (token) => {
  localStorage.setItem("auth", JSON.stringify(token));
  //   localStorage.setItem("user", user);
};

export const removeAuthTokenFromLocalStorage = () => {
  localStorage.removeItem("auth");
};

export const getAuthTokenFromLocalStorage = () => {
  const result = localStorage.getItem("auth");
  const auth = result ? JSON.parse(result) : null;
  // console.log("auth in get user funct", auth);
  // console.log("result in get user funct", result);
  return auth;
};

// >>>>>>>>>>>>>>>>>>>..Verified Auth Token...<<<<<<<<<<<<<<<<

export const addVerifyAuthTokenToLocalStorage = (token) => {
  localStorage.setItem("verifiedAuth", JSON.stringify(token));
  //   localStorage.setItem("user", user);
};

export const getVerifyAuthTokenFromLocalStorage = () => {
  const result = localStorage.getItem("verifiedAuth");
  const auth1 = result ? JSON.parse(result) : null;

  return auth1;
};

export const removeVerifyAuthTokenFromLocalStorage = () => {
  localStorage.removeItem("verifiedAuth");
};

// >>>>>>>>>>>>>>>>>>>>...Patient...<<<<<<<<<<<<<<<

export const addPatientToLocalStorage = (patient) => {
  localStorage.setItem("patient", JSON.stringify(patient));
};

export const getPatientsFromLocalStorage = () => {
  const result = localStorage.getItem("patient");
  const patient = result ? JSON.parse(result) : null;

  return patient;
};

export const removePatientsFromLocalStorage = () => {
  localStorage.removeItem("patient");
  // toast.info(`Please serach something in the input field...`);
};

// >>>>>>>>>>>>>>>>>>>>...Email...<<<<<<<<<<<<<<<

export const addEmailToLocalStorage = (email) => {
  localStorage.setItem("email", JSON.stringify(email));
};

export const getEmailFromLocalStorage = () => {
  const result = localStorage.getItem("email");
  const Email = result ? JSON.parse(result) : null;

  return Email;
};

export const removeEmailFromLocalStorage = () => {
  localStorage.removeItem("email");
};

// >>>>>>>>>>>>>>>>>>>>...SURGERY...<<<<<<<<<<<<<<<

export const addSurgeryToLocalStorage = (surgery) => {
  localStorage.setItem("surgery", JSON.stringify(surgery));
};

export const getSurgeryFromLocalStorage = () => {
  const result = localStorage.getItem("surgery");
  const Surgery = result ? JSON.parse(result) : null;

  return Surgery;
};

export const removeSurgeryFromLocalStorage = () => {
  localStorage.removeItem("surgery");
};

// >>>>>>>>>>>>>>>>>>>>...SURGERY ID...<<<<<<<<<<<<<<<

export const addSurgeryIDToLocalStorage = (surgeryID) => {
  localStorage.setItem("surgeryID", JSON.stringify(surgeryID));
};

export const getSurgeryIDFromLocalStorage = () => {
  const result = localStorage.getItem("surgeryID");
  const surgeryID = result ? JSON.parse(result) : null;

  return surgeryID;
};

export const removeSurgeryIDFromLocalStorage = () => {
  localStorage.removeItem("surgeryID");
};

// >>>>>>>>>>>>>>>>>>>>...USER DATA AFTER VERIFY...<<<<<<<<<<<<<<<

export const addUserDataToLocalStorage = (user) => {
  localStorage.setItem("userDATA", JSON.stringify(user));
};

export const getUserDataFromLocalStorage = () => {
  const result = localStorage.getItem("userDATA");
  const userData = result ? JSON.parse(result) : null;

  return userData;
};

export const removeUserDataFromLocalStorage = () => {
  localStorage.removeItem("userDATA");
};

// >>>>>>>>>>>>>>>>>>>>...Specialities ID...<<<<<<<<<<<<<<<

export const addSpecialitiesToLocalStorage = (specialities) => {
  localStorage.setItem("specialities", JSON.stringify(specialities));
};

export const getSpecialitiesFromLocalStorage = () => {
  const result = localStorage.getItem("specialities");
  const Specialities = result ? JSON.parse(result) : null;

  return Specialities;
};

export const removeSpecialitiesFromLocalStorage = () => {
  localStorage.removeItem("specialities");
};

// >>>>>>>>>>>>>>>>>>>>...Languages ID...<<<<<<<<<<<<<<<

export const addLanguagesToLocalStorage = (Languages) => {
  localStorage.setItem("languages", JSON.stringify(Languages));
};

export const getLanguagesFromLocalStorage = () => {
  const result = localStorage.getItem("languages");
  const Languages = result ? JSON.parse(result) : null;

  return Languages;
};

export const removeLanguagesFromLocalStorage = () => {
  localStorage.removeItem("languages");
};

// >>>>>>>>>>>>>>>>>>>>...Postal Code 1...<<<<<<<<<<<<<<<

export const addPostalToLocalStorage = (postal) => {
  localStorage.setItem("postal", JSON.stringify(postal));
};

export const getPostalFromLocalStorage = () => {
  const result = localStorage.getItem("postal");
  const Postal = result ? JSON.parse(result) : null;

  return Postal;
};

export const removePostalFromLocalStorage = () => {
  localStorage.removeItem("postal");
};

// >>>>>>>>>>>>>>>>>>>>...Postal Code 2...<<<<<<<<<<<<<<<

export const addPostal2ToLocalStorage = (postal2) => {
  localStorage.setItem("postal2", JSON.stringify(postal2));
};

export const getPostal2FromLocalStorage = () => {
  const result = localStorage.getItem("postal2");
  const Postal2 = result ? JSON.parse(result) : null;

  return Postal2;
};

export const removePostal2FromLocalStorage = () => {
  localStorage.removeItem("postal2");
};

// >>>>>>>>>>>>>>>>>>>>..getAppointments...<<<<<<<<<<<<<<<

export const addAppointmentsToLocalStorage = (appointments) => {
  localStorage.setItem("appointments", JSON.stringify(appointments));
};

export const getAppointmentsFromLocalStorage = () => {
  const result = localStorage.getItem("appointments");
  const Appointments = result ? JSON.parse(result) : null;

  return Appointments;
};

export const removeAppointmentsFromLocalStorage = () => {
  localStorage.removeItem("appointments");
};

// >>>>>>>>>>>>>>>>>>>>..getPatients...<<<<<<<<<<<<<<<

export const addBookPatientsToLocalStorage = (bookPatients) => {
  localStorage.setItem("bookPatients", JSON.stringify(bookPatients));
};

export const getBookPatientsFromLocalStorage = () => {
  const result = localStorage.getItem("bookPatients");
  const BookPatients = result ? JSON.parse(result) : null;

  return BookPatients;
};

export const removeBookPatientsFromLocalStorage = () => {
  localStorage.removeItem("bookPatients");
};

// >>>>>>>>>>>>>>>>>>>>..getDoctors...<<<<<<<<<<<<<<<

export const addDoctorsToLocalStorage = (doctors) => {
  localStorage.setItem("doctors", JSON.stringify(doctors));
};

export const getDoctorsFromLocalStorage = () => {
  const result = localStorage.getItem("doctors");
  const Doctors = result ? JSON.parse(result) : null;

  return Doctors;
};

export const removeDoctorsFromLocalStorage = () => {
  localStorage.removeItem("doctors");
};
