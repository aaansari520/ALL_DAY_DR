import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../Redux/userSlice";
import { Button, Dropdown, Menu } from "antd";

const NavBar = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { auth } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: <Link to="/profile">Profile</Link>,
        },
        {
          key: "2",
          label: <Link to="/changePass">Change Password</Link>,
        },
        {
          key: "3",
          label: <Link to="/table">Patients</Link>,
        },
        {
          key: "4",
          label: <Link to="/appointmentsTable">Appointments</Link>,
        },
        {
          key: "5",
          label: (
            <button
              style={{ border: "none", background: "white" }}
              onClick={() => dispatch(logOutUser())}
            >
              Logout
            </button>
          ),
        },
      ]}
    />
  );

  return (
    <div className="nav-bar">
      {!auth ? (
        <>
          <Link to="/">
            <h2 style={{ marginTop: "15px" }}>User Authentication App</h2>
          </Link>
          <Link to="/sign_in">
            <button className="common-nav-button green">Sign In</button>
          </Link>
        </>
      ) : (
        <Link to="/home">
          <h2 style={{ marginTop: "15px" }}>The Shop For You</h2>
        </Link>
      )}

      {auth ? (
        <Link to="/cart">
          <div className="nav-bag">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              fill="currentColor"
              className="bi bi-handbag-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 1a2 2 0 0 0-2 2v2H5V3a3 3 0 1 1 6 0v2h-1V3a2 2 0 0 0-2-2zM5 5H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11v1.5a.5.5 0 0 1-1 0V5H6v1.5a.5.5 0 0 1-1 0V5z" />
            </svg>

            <span className="bag-quantity">
              <span>{cartItems.length}</span>
            </span>
          </div>
        </Link>
      ) : (
        ""
      )}

      {auth ? (
        <>
          {/* <Link to="/table">
            <button className="common-nav-button blue">Patients</button>
          </Link> */}

          {/* <Link to="/profile">
            <button className="common-nav-button blue">Profile</button>
          </Link> */}

          {/* <button
            onClick={() => dispatch(logOutUser())}
            className="common-nav-button red"
          >
            {auth ? "Logout" : ""}
          </button> */}

          <Dropdown overlay={menu} placement="bottomRight" arrow>
            <Button style={{ color: "black" }}>MoreOptions</Button>
          </Dropdown>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default NavBar;
