import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import InputSearch from "../input/InputSearch";
import logo from "../../assets/logo.png";
import bell from "../../assets/icons/bell.png";
import useClickOutSide from "../../hooks/useClickOutSide";
import avatarUserImage from "../../assets/userImages/user.jpg";
import { baseURL } from "../../config/getConfig";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import useAuth from "../../hooks/useAuth";
import AuthUser from "../../config/AuthUser";
import axios from "axios";
import { useReducer } from "react";
const ListLink = [
  {
    id: 1,
    title: "Home",
    to: "/",
  },
  {
    id: 2,
    title: "Explore",
    to: "/explore",
  },
  {
    id: 3,
    title: "Stats",
    to: "/stats",
  },
];

const HeaderStyles = styled.div`
  margin-bottom: 58px;
  #header {
    --transition-curve: cubic-bezier(0.05, 0, 0.2, 1);
    transition: top 0.5s var(--transition-curve),
      background-color 0.2s var(--transition-curve),
      box-shadow 0.2s var(--transition-curve),
      color 0.2s var(--transition-curve);
  }
  .header-fixed {
    position: fixed;
    --transition-curve: cubic-bezier(0.05, 0, 0.2, 1);
    transition: top 0.5s var(--transition-curve),
      background-color 0.2s var(--transition-curve),
      box-shadow 0.2s var(--transition-curve),
      color 0.2s var(--transition-curve);
    top: 0;
    z-index: 50;
    background: linear-gradient(
      180deg,
      rgba(52, 51, 53, 0.5) 50%,
      rgba(64, 59, 69, 0.5) 100%
    );
    backdrop-filter: blur(50px);
  }
  span.connect {
    background: linear-gradient(180deg, #ddb9ff 0%, #a749f8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  a {
    display: inline-block;
    text-decoration: none;
  }
  .menu-item {
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0.32px;
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    background-image: linear-gradient(180deg, #ddb9ff 0%, #a749f8 100%);
  }
`;

const HeaderAuth = ({ handleSignOut, userId, ...props }) => {
  const navigate = useNavigate();
  const { userName, userType, userImage } = useAuth();
  const { show, setShow, nodeRef: nodeRefUser } = useClickOutSide();
  const { http, token } = AuthUser();
  const [countNotSeen, setCountNotSeen] = useState();
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

  const {
    show: showNotif,
    setShow: setShowNotif,
    nodeRef: nodeRefNotif,
  } = useClickOutSide();
  const [notifications, setShowNotification] = useState([]);

  useEffect(() => {
    (async () => {
      if (userId) {
        try {
          const res = await http?.get(`/notifies?user_id=${userId}`);
          setShowNotification(res?.data.notifies);
          setCountNotSeen(
            res?.data.notifies?.filter((item) => item.seen === 0).length
          );
          forceUpdate();
        } catch (error) {}
      }
    })();
  }, [userId, reducerValue]);

  const handleMarkAsRead = (id, index) => {
    (async () => {
      await axios
        .post(
          `${baseURL}/api/notifies/${id}?_method=PUT`,
          {
            user_id: notifications[notifications.length - 1 - index].user_id,
            notify: notifications[notifications.length - 1 - index]?.notify,
            seen: parseInt(1),
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {})
        .catch((err) => {
          console.log("err: ", err);
        });
    })();
  };

  useEffect(() => {
    const header = document.getElementById("header");
    const sticky = header.offsetTop;
    const handleFixed = () => {
      if (window.pageYOffset > sticky) {
        header.classList.add("header-fixed");
      } else {
        header.classList.remove("header-fixed");
      }
    };

    window.onscroll = function () {
      handleFixed();
    };
    return () => {
      window.onscroll = null;
    };
  }, []);

  return (
    <HeaderStyles>
      <div className="w-full py-[7px]" id="header">
        <header className="grid grid-cols-2 gap-[100px] w-full max-w-[1240px] mx-auto">
          <div className="header-left flex items-center">
            <Link
              to="/"
              onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }}
            >
              <div className="w-[185px] h-[59px]">
                <img src={logo} alt="" className="w-full h-full object-cover" />
              </div>
            </Link>
            {userImage ? (
              <InputSearch
                className="ml-[85px]"
                placeholder="Search item here..."
                kind="search"
              ></InputSearch>
            ) : (
              <div className="ml=[85px] w-[300px] h-[53px]">{""}</div>
            )}
          </div>

          <div className="header-right flex items-center justify-between">
            <ul className="flex items-center gap-10">
              {ListLink.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.to}
                  className={({ isActive }) =>
                    isActive ? "menu-item" : "text-white"
                  }
                  onClick={() => {
                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                  }}
                >
                  {item.title}
                </NavLink>
              ))}
            </ul>
            <div className="relative flex items-center gap-[30px]">
              <div
                className="relative z-[100] cursor-pointer"
                ref={nodeRefUser}
                onClick={() => setShow(!show)}
              >
                {userImage.avatar ? (
                  <>
                    {userImage.avatar === "user.jpg" ? (
                      <img
                        src={avatarUserImage}
                        alt=""
                        className="w-[35px] h-[35px] object-cover rounded-full"
                      />
                    ) : (
                      <img
                        src={`${baseURL}/storage/avatarImages/${userImage.avatar}`}
                        alt=""
                        className="w-[35px] h-[35px] object-cover rounded-full"
                      />
                    )}
                  </>
                ) : (
                  <div className="relative z-[9]">
                    <SkeletonTheme baseColor="#28282E" highlightColor="#383844">
                      <Skeleton width={35} height={35} circle />
                    </SkeletonTheme>
                  </div>
                )}
                {show === true ? (
                  <div className="transition-all duration-100 absolute top-[150%] rounded-lg -right-[30px] min-w-[220px] p-3 shadow-lg bg-[#ffffff] text-[#141418]">
                    <span className="px-3 font-bold">
                      Hello {userName.split(" ")[0]}!
                    </span>
                    <div className="mt-3">
                      {userType === 1 && (
                        <div
                          onClick={() => navigate("/create")}
                          className="text-sm hover:bg-[#c084fc] font-[500] hover:text-[white] transition-all cursor-pointer w-full px-3 py-4 rounded-md"
                        >
                          <div className="flex gap-x-4">
                            <span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                className="bi bi-plus-circle-fill"
                                viewBox="0 0 16 16"
                              >
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                              </svg>
                            </span>
                            <span>Create</span>
                          </div>
                        </div>
                      )}
                      <NavLink
                        to="/profile"
                        onClick={() => {
                          window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: "smooth",
                          });
                        }}
                        className="w-full px-3 text-sm py-4 rounded-md hover:bg-slate-500 hover:bg-opacity-10 transition-all cursor-pointer font-[500] "
                      >
                        <div className="flex items-center gap-x-4">
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              className="bi bi-person-bounding-box"
                              viewBox="0 0 16 16"
                            >
                              <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z" />
                              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                            </svg>
                          </span>
                          <span>My Profile</span>
                        </div>
                      </NavLink>
                      <div
                        className="hover:bg-slate-500 text-sm hover:bg-opacity-10 transition-all cursor-pointer w-full px-3 py-4 rounded-md font-[500]"
                        onClick={handleSignOut}
                      >
                        <div className="flex items-center gap-x-4">
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              className="bi bi-box-arrow-left"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
                              />
                              <path
                                fillRule="evenodd"
                                d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
                              />
                            </svg>
                          </span>
                          <span>Sign Out</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="absolute"></div>
                )}
              </div>

              {userImage?.avatar ? (
                <div
                  className="relative z-[51] cursor-pointer"
                  onClick={() => setShowNotif(!showNotif)}
                >
                  <div
                    className="w-[35px] bg-white p-1 relative h-[35px] grid place-items-center rounded-full"
                    ref={nodeRefNotif}
                  >
                    <img
                      src={bell}
                      alt=""
                      className="w-[80%] h-[80%] object-cover rotate-[-15deg]"
                    />
                    {notifications?.length > 0 && (
                      <div
                        className={`flex items-center justify-center w-[18px] h-[18px] rounded-full bg-red-500 absolute -top-[5px] -right-[5px] text-[12px] ${
                          countNotSeen === 0 ? "hidden" : "block"
                        }`}
                      >
                        <span className="px-3 font-[400]">{countNotSeen}</span>
                      </div>
                    )}
                  </div>
                  {showNotif === true ? (
                    <div className="transition-all duration-100 absolute top-[150%] rounded-lg -right-[130px] w-[360px] max-h-[450px] overflow-auto p-3 shadow-lg bg-[#ffffff] text-[#141418] flex flex-col">
                      <span className="px-3 font-bold">Notification!</span>
                      {notifications.length > 0 &&
                        notifications
                          .slice(0)
                          .reverse()
                          .map((item, index) => (
                            <div
                              key={item.id}
                              className="mt-5 hover:bg-slate-500 text-sm hover:bg-opacity-10 transition-all cursor-pointer w-full p-3 rounded-md font-[500] flex items-center"
                            >
                              <img
                                src={`${baseURL}/storage/nftImages/${
                                  item.notify.split("\n")[1]
                                }`}
                                alt=""
                                className="mr-3 w-[50px] h-[50px] rounded-lg object-cover"
                              />
                              <span className="mr-3 font-[300]">
                                {item.notify.split("\n")[0]}
                              </span>
                              <button
                                onClick={() => {
                                  handleMarkAsRead(item.id, index);
                                }}
                                className="inline-flex items-center justify-center font-sans font-semibold tracking-wide text-white rounded-full"
                              >
                                {item.seen === 0 ? (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="25"
                                    height="25"
                                    fill="#c084fc"
                                    className="bi bi-check-circle-fill"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                  </svg>
                                ) : (
                                  ""
                                )}
                              </button>
                            </div>
                          ))}
                      {notifications.length === 0 && (
                        <span className="p-3 text-[14px]">
                          No new notifications{" "}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="absolute"></div>
                  )}
                </div>
              ) : (
                <SkeletonTheme baseColor="#28282E" highlightColor="#383844">
                  <Skeleton width={35} height={35} circle />
                </SkeletonTheme>
              )}

              {userType !== undefined ? (
                <>
                  {userType === 0 ? (
                    <button
                      className="h-[53px]  px-5 py-4 flex items-center justify-center font-medium tracking-[0.02em] bg-purple-400 rounded-lg border border-solid border-purple-700"
                      onClick={() => navigate("/create")}
                    >
                      <span className="text-white">Create</span>
                    </button>
                  ) : (
                    <button
                      className="h-[53px]  px-5 py-4 flex items-center justify-center font-medium tracking-[0.02em] bg-purple-400 rounded-lg border border-solid border-purple-700"
                      onClick={() => navigate("/dashboard")}
                    >
                      <span className="text-white">Dashboard</span>
                    </button>
                  )}
                </>
              ) : (
                <SkeletonTheme baseColor="#28282E" highlightColor="#383844">
                  <Skeleton width={135} height={53} className="rounded-lg" />
                </SkeletonTheme>
              )}
            </div>
          </div>
        </header>
      </div>
    </HeaderStyles>
  );
};

export default HeaderAuth;
