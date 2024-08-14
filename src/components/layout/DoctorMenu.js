import React, { useState } from "react";
import { Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { BottomNavigation } from "reactjs-bottom-navigation";
import { logOut } from "../../features/authSlice";

const DoctorMenu = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [iconItem, setIconItem] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await dispatch(logOut());
  };
  const handleItemClick = (item) => {
    setIconItem(item?.iconPath);
    setSelectedItem(item?.itemName);
    console.log(iconItem);
  };
  // console.log(iconItem);
  const generateSVGMarkup = (iconPath, itemTo) => {
    let fill =
      iconItem === iconPath || location.pathname === itemTo
        ? "#7257ff"
        : "white";
    switch (iconPath) {
      case "home":
        return `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="majesticons:home-line">
        <path id="Vector" d="M20 19V10.5C20 10.3448 19.9639 10.1916 19.8944
         10.0528C19.825 9.91393 19.7242 9.79315 19.6 9.7L12.6 4.45C12.4269
          4.32018 12.2164 4.25 12 4.25C11.7836 4.25 11.5731 4.32018 11.4 4.45L4.4 9.7C4.2758 9.79315 4.175 9.91393 4.10557
          10.0528C4.03614 10.1916 4 10.3448 4 10.5V19C4 19.2652 4.10536 19.5196 4.29289 19.7071C4.48043 19.8946 4.73478 20 
          5 20H9C9.26522 20 9.51957 19.8946 9.70711 19.7071C9.89464 19.5196 10 19.2652 10 19V16C10 15.7348 10.1054 15.4804
           10.2929 15.2929C10.4804 15.1054 10.7348 15 11 15H13C13.2652 15 13.5196 15.1054 13.7071 15.2929C13.8946 15.4804 
           14 15.7348 14 16V19C14 19.2652 14.1054 19.5196 14.2929 19.7071C14.4804 19.8946 14.7348 20 15 20H19C19.2652 20
           19.5196 19.8946 19.7071 19.7071C19.8946 19.5196 20 19.2652 20 19Z" stroke=${fill} stroke-width="2" 
           stroke-linecap="round" stroke-linejoin="round"/>
        </g>

        </svg>
        `;
      case "bookings":
        return `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <g id="solar:calendar-outline">

            <path d="M17 14C17.2652 14 17.5196 13.8946 17.7071 13.7071C17.8946 13.5196 18 13.2652 18 13C18 12.7348 17.8946 12.4804 17.7071 12.2929C17.5196 12.1054 17.2652 12 17 12C16.7348 12 16.4804 12.1054 16.2929 12.2929C16.1054 12.4804 16 12.7348 16 13C16 13.2652 16.1054 13.5196 16.2929 13.7071C16.4804 13.8946 16.7348 14 17 14ZM17 18C17.2652 18 17.5196 17.8946 17.7071 17.7071C17.8946 17.5196 18 17.2652 18 17C18 16.7348 17.8946 16.4804 17.7071 16.2929C17.5196 16.1054 17.2652 16 17 16C16.7348 16 16.4804 16.1054 16.2929 16.2929C16.1054 16.4804 16 16.7348 16 17C16 17.2652 16.1054 17.5196 16.2929 17.7071C16.4804 17.8946 16.7348 18 17 18Z" fill="${fill}"/>
            <path id="Vector_2" fill-rule="evenodd" clip-rule="evenodd" d="M6.99998 1.75C7.19889 1.75 7.38965 1.82902 7.53031 1.96967C7.67096 2.11032 7.74998 2.30109 7.74998 2.5V3.263C8.41198 3.25 9.14098 3.25 9.94298 3.25H14.056C14.859 3.25 15.588 3.25 16.25 3.263V2.5C16.25 2.30109 16.329 2.11032 16.4696 1.96967C16.6103 1.82902 16.8011 1.75 17 1.75C17.1989 1.75 17.3897 1.82902 17.5303 1.96967C17.671 2.11032 17.75 2.30109 17.75 2.5V3.327C18.01 3.347 18.256 3.372 18.489 3.403C19.661 3.561 20.61 3.893 21.359 4.641C22.107 5.39 22.439 6.339 22.597 7.511C22.75 8.651 22.75 10.106 22.75 11.944V14.056C22.75 15.894 22.75 17.35 22.597 18.489C22.439 19.661 22.107 20.61 21.359 21.359C20.61 22.107 19.661 22.439 18.489 22.597C17.349 22.75 15.894 22.75 14.056 22.75H9.94498C8.10698 22.75 6.65098 22.75 
            5.51198 22.597C4.33998 22.439 3.39098 22.107 2.64198 21.359C1.89398 20.61 1.56198 19.661 1.40398 18.489C1.25098 17.349 1.25098 15.894 1.25098 14.056V11.944C1.25098 10.106 1.25098 8.65 1.40398 7.511C1.56198 6.339 1.89398 5.39 2.64198 4.641C3.39098 3.893 4.33998 3.561 5.51198 3.403C5.74498 3.372 5.99198 3.347 6.25098 3.327V2.5C6.25098 2.30126 6.32986 2.11065 6.47029 1.97002C6.61073 1.8294 6.80124 1.75026 6.99998 1.75ZM5.70998 4.89C4.70498 5.025 4.12498 5.279 3.70198 5.702C3.27898 6.125 3.02498 6.705 2.88998 7.711C2.86698 7.881 2.84798 8.061 2.83198 8.25H21.168C21.152 8.06 21.133 7.881 21.11 7.71C20.975 6.705 20.721 6.125 20.298 5.702C19.875
             5.279 19.295 5.025 18.289 4.89C17.262 4.752 15.907 4.75 14 4.75H9.99998C8.09298 4.75 6.73898 4.752 5.70998 4.89ZM2.74998 12C2.74998 11.146 2.74998 10.403 2.76298 9.75H21.237C21.25 10.403 21.25 11.146 21.25 12V14C21.25 15.907 21.248 17.262 21.11 18.29C20.975 19.295 20.721 19.875 20.298 20.298C19.875 20.721 19.295 20.975 18.289 21.11C17.262 21.248 15.907 21.25 14 21.25H9.99998C8.09298 21.25 6.73898 21.248 5.70998 21.11C4.70498 20.975 4.12498 20.721 3.70198 20.298C3.27898 19.875 3.02498 19.295 2.88998 18.289C2.75198 17.262 2.74998 15.907 2.74998 14V12Z" fill="${fill}"/>

          </svg>
        `;
      case "evaluation":
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="fluent:document-search-16-regular">
      <path id="Vector" d="M7.5 1.5C6.70435 1.5 5.94129 1.81607 5.37868 2.37868C4.81607 2.94129 4.5 3.70435 4.5 4.5V7.884C4.977 7.716 5.4795 7.599 6 7.5405V4.5C6 4.10218 6.15803 3.72064 6.43934 3.43934C6.72064 3.15804 7.10217 3 7.5 3H12V6.75C12 7.34674 12.2371 7.91903 12.659 8.34099C13.081 8.76295 13.6533 9 14.25 9H18V19.5C18 19.8978 17.842 20.2794 17.5607 20.5607C17.2794 20.842 16.8978 21 16.5 21H16.3725C16.5435 21.4845 16.5435 22.0155 16.3725 22.5H16.5C17.2956 22.5 18.0587 22.1839 18.6213 21.6213C19.1839 21.0587 19.5 20.2956 19.5 19.5V8.121C19.4995 7.52446 19.2621 6.95255 18.84 6.531L14.4705 2.1585C14.2615 1.9496 14.0133 1.78393 13.7403 1.67094C13.4672 1.55795 13.1745 1.49987 12.879 1.5H7.5ZM17.6895 7.5H14.25C14.0511 7.5 13.8603 7.42098 13.7197 7.28033C13.579 7.13968 13.5 6.94891 13.5 
      6.75V3.3105L17.6895 7.5ZM9.894 18.4545C8.83101 19.2494 7.5064 19.6121 6.18674 19.4697C4.86709 19.3273 3.65036 18.6903 2.78141 17.687C1.91247 16.6836 1.45582 15.3884 1.50337 14.0619C1.55092 12.7355 2.09914 11.4762 3.03769 10.5377C3.97625 9.59914 5.23547 9.05092 6.56193 9.00337C7.88839 8.95582 9.18363 9.41247 10.187 10.2814C11.1903 11.1504 11.8273 12.3671 11.9697 13.6867C12.1121 15.0064 11.7494 16.331 10.9545 17.394L14.7795 21.219C14.9203 21.3596 14.9995 21.5504 14.9997 21.7495C14.9998 21.9485 14.9209 22.1394 14.7802 22.2803C14.6396 22.4211 14.4488 22.5003 14.2498 22.5004C14.0508 22.5006 13.8598 22.4216 13.719 22.281L9.894 18.4545ZM10.5 14.25C10.5 13.2554 10.1049 12.3016 9.40165 11.5983C8.69839 10.8951 7.74456 10.5 6.75 10.5C5.75544 10.5 4.80161 10.8951 4.09835 11.5983C3.39509 12.3016 3 13.2554 3 14.25C3 15.2446 3.39509 16.1984 4.09835 16.9017C4.80161 17.6049 5.75544 18 6.75 18C7.74456 18 8.69839 17.6049 9.40165 16.9017C10.1049 16.1984 10.5 15.2446 10.5 14.25Z"  fill="${fill}"/>
      </g>
      </svg>
      `;
      case "presc":
        return `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M3 10C3 6.229 3 4.343 4.172 3.172C5.343 2 7.229 2 11 2H13C16.771 2 18.657 2 19.828 3.172C21 4.343 21 6.229 21 10V14C21 17.771 21 19.657 19.828 20.828C18.657 22 16.771 22 13 22H11C7.229 22 5.343 22 4.172 20.828C3 19.657 3 17.771 3 14V10Z" stroke=${fill} stroke-width="1.5"/>
<path d="M8 10H16M8 14H13" stroke=${fill} stroke-width="1.5" stroke-linecap="round"/>
</svg>
        `;
      case "profile":
        return `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M19 20.8889C19 21.5022 18.5211 22 17.9286 22C17.3361 22 16.8571 21.5022 16.8571 20.8889C16.8571 17.8256 14.4539 15.3333 11.5 15.3333C8.54607 15.3333 6.14286 17.8256 6.14286 20.8889C6.14286 21.5022 5.66393 22 5.07143 22C4.47893 22 4 21.5022 4 20.8889C4 16.6 7.36536 13.1111 11.5 13.1111C15.6346 13.1111 19 16.6 19 20.8889ZM11.5 4.22222C12.6818 4.22222 13.6429 5.21889 13.6429 6.44444C13.6429 7.67 12.6818 8.66667 11.5 8.66667C10.3182 8.66667 9.35714 7.67 9.35714 6.44444C9.35714 5.21889 10.3182 4.22222 11.5 4.22222ZM11.5 10.8889C13.8636 10.8889 15.7857 8.89556 15.7857 6.44444C15.7857 3.99333 13.8636 2 11.5 2C9.13643 2 7.21429 3.99333 7.21429 6.44444C7.21429 8.89556 9.13643 10.8889 11.5 10.8889Z" fill="${fill}"/>
        </svg>
        

        `;
      default:
        return "";
    }
  };
  const BottomMenu = [
    {
      title: "Home",
      to: "/doctor/dashboard",
    },
    {
      title: "Bookings",
      to: "/doctor/dashboard/recent-bookings",
    },
    {
      title: "Evaluations",
      icon: "/images/icons/list-check.svg",
      to: "/doctor/dashboard/recent-evaluation2",
    },
    {
      title: "Prescription",
      icon: "/images/icons/file-lines.svg",
      to: "/doctor/dashboard/recent-prescription",
    },
    {
      title: "Profile",
      icon: "/images/icons/user.svg",
      to: "/doctor/dashboard/profile",
    },
  ];
  const bottomNavItems = BottomMenu.map((item) => ({
    title: item.title,
    onClick: () => navigate(item.to),
    icon: (
      <div
        dangerouslySetInnerHTML={{
          __html: generateSVGMarkup(item.title, item.to),
        }}
      />
    ),
  }));

  return (
    <>
      <div>
        <Row
          className="d-flex parent-of-all"
          style={{
            overflowX: "hidden",
            width: "100vw",
            backgroundColor: "#F2F8FD",
          }}
        >
          {/* <BottomNavigation
            items={bottomNavItems}
            selected={1}
            activeBgColor="slateBlue"
            activeTextColor="white"
          /> */}
          <div className="doctor-menu-cont">
            <main className="w-100 h-100 doctor-menu text-center text-secondary">
              <div style={{ height: "130px" }} className="menu-logo-cont ">
                <img
                  src="/images/DoctorMenuLogo.png"
                  alt="logo"
                  width={130}
                  className="menu-logo"
                />
              </div>
              <ul className="list-group text-left mt-5 ml-3">
                {navigationMenu.map((item, index) => (
                  <Link
                    key={index}
                    className={`list-group-item ${
                      item.to === location.pathname ||
                      (item.itemName === selectedItem &&
                        item.iconPath === iconItem)
                        ? "active"
                        : ""
                    }`}
                    to={item.to}
                    onClick={() => {
                      setIconItem(item?.iconPath);
                      setSelectedItem(item?.itemName);
                    }}
                  >
                    <div className="menu-icon-cont">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: generateSVGMarkup(item.iconPath, item.to),
                        }}
                      />
                    </div>

                    {item.itemName}
                  </Link>
                ))}
              </ul>
              {/* <ul className="list-group text-left mt-5 ml-3">
                {navigationMenu.map((item, index) => (
                  <NavLink
                    key={index}
                    className={`list-group-item ${
                      item.to === location.pathname ||
                      (item.itemName === selectedItem &&
                        item.iconPath === iconItem)
                        ? "active"
                        : ""
                    }`}
                    to={item.to}
                    onClick={() => {
                      setIconItem(item.iconPath);
                      setSelectedItem(item.itemName);
                    }}
                  >
                    <div className="menu-icon-cont">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: generateSVGMarkup(item.iconPath, item.to),
                        }}
                      />
                    </div>
                    {item.itemName}
                  </NavLink>
                ))}
              </ul> */}

              <div>
                <div
                  className="list-group-item logout-icon"
                  onClick={handleLogout}
                  style={{ position: "absolute", bottom: "0px", left: "15px" }}
                >
                  <i
                    className="fa fa-sign-out text-light mr-4"
                    aria-hidden="true"
                  />
                  Logout
                </div>
              </div>
            </main>
          </div>

          <div
            className="children-cont"
            style={{
              padding: "0px",
            }}
          >
            <div className="vh-100 p-0">
              <main>{children}</main>
            </div>
          </div>
        </Row>
      </div>
    </>
  );
};

export default DoctorMenu;

const navigationMenu = [
  {
    itemName: "Home",
    iconPath: "home",
    to: "/doctor/dashboard",
  },
  {
    itemName: "Recent Bookings",
    iconPath: "bookings",
    to: "/doctor/dashboard/recent-bookings",
  },
  {
    itemName: "Recent Evaluation",
    iconPath: "evaluation",
    to: "/doctor/dashboard/recent-evaluation2",
  },
  {
    itemName: "Recent Prescription",
    iconPath: "presc",
    to: "/doctor/dashboard/recent-prescription",
  },
  {
    itemName: "Profile",
    iconPath: "profile",
    to: "/doctor/dashboard/profile",
  },
];
// ];const navigationMenu = [
//   {
//     itemName: "Home",
//     iconPath: "/images/icons/home.svg",
//     to: "/doctor/dashboard",
//   },
//   {
//     itemName: "Recent Bookings",
//     iconPath: "/images/icons/calender.svg",
//     to: "/doctor/dashboard/recent-bookings",
//   },
//   {
//     itemName: "Recent Evaluation",
//     iconPath: "/images/icons/list-check.svg",
//     to: "/doctor/dashboard/recent-evaluation2",
//   },
//   {
//     itemName: "Recent Prescription",
//     iconPath: "/images/icons/file-lines.svg",
//     to: "/doctor/dashboard/recent-prescription",
//   },
//   {
//     itemName: "Profile",
//     iconPath: "/images/icons/user.svg",
//     to: "/doctor/dashboard/profile",
//   },
// ];
