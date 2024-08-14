import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BottomNavigation } from "reactjs-bottom-navigation";
import { logOut } from "../../features/authSlice";
import "../../styles/athele.css";

const AtheleteMenu = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
  };
  const handleLogout = async () => {
    await dispatch(logOut());
  };
  const [windowDimension, setWindowDimension] = useState(null);

  useEffect(() => {
    setWindowDimension(window.innerWidth);
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowDimension(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowDimension <= 640;
  const navigationMenu = [
    {
      itemName: "Home",
      iconPath: "/images/icons/home.svg",
      to: "/a-home",
    },
    {
      itemName: "Transactions",
      iconPath: "/images/icon/transactions.svg",
      to: "/a-transactions",
    },
    {
      itemName: "Bookings",
      iconPath: "/images/icon/bookings.svg",
      to: "/a-booking",
    },
    {
      itemName: "Profile",
      iconPath: "/images/icons/user.svg",
      to: "/a-profile",
    },
  ];
  const BottomMenu = [
    {
      itemName: "Home",
      iconPath: "/images/icons/home.svg",
      to: "/doctor/dashboard",
    },
    {
      itemName: "Transactions",
      iconPath: "/images/icons/list-check.svg",
      to: "/doctor/dashboard/recent-evaluation2",
    },
    {
      itemName: "Bookings",
      iconPath: "/images/icons/file-lines.svg",
      to: "/doctor/dashboard/recent-prescription",
    },
    {
      itemName: "Profile",
      iconPath: "/images/icons/user.svg",
      to: "/doctor/dashboard/profile",
    },
  ];
  const bottomNavItems = BottomMenu.map((item) => ({
    title: item.title,
    onClick: () => navigate(item.to), // Fix: Wrap the function in another function
    icon: <img src={item.icon} />,
  }));
  return (
    <>
      <div>
        <Row
          className="d-flex parent-of-all"
          style={{
            overflowX: "hidden",
            // width: "100vw",
            backgroundColor: "#F2F8FD",
          }}
        >
          {isMobile ? (
            <BottomNavigation
              items={bottomNavItems}
              selected={1}
              activeBgColor="slateBlue"
              activeTextColor="white"
            />
          ) : (
            <div className="athel-menu-cont">
              <main className="w-100 h-100 athel-menu text-center text-secondary">
                <div style={{ height: "130px" }}>
                  <img
                    src="/images/DoctorMenuLogo.png
              "
                    alt="logo"
                    width={130}
                    className="menu-logo"
                  />
                  <img
                    src="/images/Logo.png"
                    alt="logo"
                    width={60}
                    className="menu-logo-collapse"
                  />
                </div>
                <ul className="list-unstyled text-start ">
                  {navigationMenu.map((item, index) => (
                    <NavigationItem
                      key={index}
                      itemName={item.itemName}
                      iconPath={item.iconPath}
                      to={item.to}
                      handleItemClick={() => handleItemClick(item.itemName)}
                      isSelected={selectedItem === item.itemName}
                    />
                  ))}
                </ul>
                <Link
                  to="/privacy-policy"
                  className="d-flex text-left position-absolute "
                  style={{ bottom: "140px" }}
                >
                  <div className="menu-icon-cont">
                    <img src="/images/icon/privacy.svg" className=" icons" />
                  </div>
                  <span className="menu-list-items"> Privacy Policy</span>
                </Link>{" "}
                <Link
                  to="/terms-of-use"
                  className="d-flex text-left position-absolute "
                  style={{ bottom: "80px" }}
                >
                  <div className="menu-icon-cont">
                    <img src="/images/icon/terms.svg" className=" icons" />
                  </div>
                  <span className="menu-list-items">Terms Of Use</span>
                </Link>
                <Link
                  onClick={handleLogout}
                  className="d-flex text-left position-absolute "
                  style={{ bottom: "30px" }}
                >
                  <div className="menu-icon-cont">
                    <img
                      src="/images/icon/logout.svg"
                      className=" icons"
                      width={20}
                    />
                  </div>
                  <span className="menu-list-items">Logout</span>
                </Link>
              </main>
            </div>
          )}
          <div
            className="athel-children-cont"
            style={{
              backgroundColor: "#F2F8FD",
              padding: "0px",
            }}
            // style={{ backgroundColor: "#F2F8FD", padding: "0px" }}
          >
            <div className="vh-100 p-0">
              <main>{children}</main>
              {/* <ToastContainer position="top-center" /> */}
            </div>
          </div>
        </Row>
      </div>
    </>
  );
};

export default AtheleteMenu;
const NavigationItem = ({
  itemName,
  iconPath,
  to,
  handleItemClick,
  isSelected,
}) => {
  return (
    <li className={isSelected ? "selected" : ""}>
      <Link to={to} onClick={handleItemClick} className="d-flex">
        <div className="menu-icon-cont">
          <img src={iconPath} alt={itemName} className="icons" />
        </div>
        <span className="menu-list-items">{itemName}</span>
      </Link>
    </li>
  );
};
