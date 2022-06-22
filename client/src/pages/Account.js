import React, { useState, useEffect, useContext } from "react";
import { useParams, NavLink } from "react-router-dom";
import styled from "styled-components";
import { Avatar } from "@material-ui/core";

import { UserContext } from "../App";

import AccountDetails from "../components/profile/AccountDetails";
import EditProfile from "../components/profile/EditProfile";
import Security from "../components/profile/Security";

// import Wishlist from "./Wishlist";
import BookingSummery from "./BookingSummery";

// ADMIN
import AddRoom from "../components/admin/AddRoom";
import EditRoom from "../components/admin/EditRoom";

import AllRooms from "../components/admin/AllRooms";
// import AllOrders from "../components/admin/AllOrders";
import AllUsers from "../components/admin/AllUsers";

// import MyProducts from "../components/seller/MyProducts";
// import SellerOrders from "../components/seller/SellerOrders";


const Account = () => {
  const { route } = useParams();

  const { state } = useContext(UserContext);
  // console.log(state);

  const [value, setValue] = useState("1");

  const getRoute = () => {
    // console.log(route);
    try {
      if (route === undefined) {
        setValue("1");
      } else if (route === "account-details") {
        setValue("1");
      } else if (route === "edit-details") {
        setValue("2");
      } else if (route === "password-&-security") {
        setValue("3");
        // CUSTOMER
      } else if (route === "wishlist") {
        setValue("11");
      } else if (route === "my-bookings") {
        setValue("12");
        // ADMIN
      } else if (route === "add-room") {
        setValue("21");
      } else if (route === "edit-room") {
        setValue("22");
      } else if (route === "all-rooms") {
        setValue("23");
      } else if (route === "allbookings") {
        setValue("24");
      } else if (route === "all-users") {
        setValue("25");

      } else {
        setValue("10");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRoute();
  }, [route]);

  //   let verifyUser = async () => {
  //     try {
  //       let { data } = await axios.get("/user/details");
  //       // console.log(data.response);
  //       if (data.status) {
  //         return dispatch({ type: "USER", payload: data.response });
  //       }
  //     } catch (error) {
  //       // console.log(error)
  //       return navigate("/login");
  //     }
  //   };

  // useEffect(() => {
  //   // verifyUser(); //I have varified in navbar component just redirect if needed
  // }, []);

  return (
    <>
      {state && (
        <Container>
          <Left>
            <div className="profile-pic">
              <Avatar alt="Profile Pic" src={state ? state.profilePic : null} />
            </div>

            <div className="acc-links">
              <div className="up-links">
                {state && state.role === "customer" ? (
                  <>
                    <NavLink to="#">Wishlist</NavLink>
                    <NavLink to="/account/my-bookings">My Bookings</NavLink>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/account/add-room"
                      onClick={(e) => setValue("21")}
                    >
                      Add Room
                    </NavLink>
                    <NavLink
                      to="/account/all-rooms"
                      onClick={(e) => setValue("23")}
                    >
                      All Rooms
                    </NavLink>
                    <NavLink
                      onClick={(e) => setValue("24")}
                      to="/account/allbookings"
                    >
                      All Bookings
                    </NavLink>
                    <NavLink
                      onClick={(e) => setValue("25")}
                      to="/account/all-users"
                    >
                      All Users
                    </NavLink>
                  </>
                )}
              </div>

              <div className="down-links">
                <>
                  <NavLink to="/account/account-details">
                    Account Details
                  </NavLink>
                  <NavLink
                    to="/account/edit-details"
                    onClick={(e) => setValue("2")}
                  >
                    Edit Details
                  </NavLink>
                  <NavLink
                    to="/account/password-&-security"
                    onClick={(e) => setValue("3")}
                  >
                    Password & Security
                  </NavLink>
                  <NavLink to="/logout">Logout</NavLink>
                </>
              </div>
            </div>
          </Left>

          <Right>
            {value === "1" ? <AccountDetails /> : null}
            {value === "2" ? <EditProfile /> : null}
            {value === "3" ? <Security /> : null}

            {/* {value === "11" && <Wishlist />} */}
            {value === "12" && <BookingSummery route={"my-bookings"} />}

            {value === "21" && <AddRoom />}
            {value === "22" && <EditRoom />}

            {value === "23" && <AllRooms />}
            {value === "24" && <BookingSummery route={"allbookings"} />}
            {value === "25" && <AllUsers />}

            {/* {value === "24" && <SellerOrders />} */}
            {/* {value === "23" && <MyProducts />} */}

            {value === "10" && (
              <h4 style={{ textAlign: "center", margin: "2rem auto" }}>
                Page not found
              </h4>
            )}
          </Right>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  ${'' /* height: 90vh; */}
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: start;
`;
const Left = styled.div`
  ${"" /* background: #3151b5; */}
  height: 90vh;
  width: 19%;
  .profile-pic {
    width: 100%;
    height: 30%;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    .MuiAvatar-root {
      width: 100%;
      height: auto;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  .acc-links {
    height: 70%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    .up-links {
      height: 50%;
      width: 100%;
      display: flex;
      flex-direction: column;

      a {
        width: 100%;
        border: none;
        text-decoration: none;
        border-bottom: 0.5px solid #fff;
        color: #000;
        padding: 0.5rem 0.5rem 0.5rem 1rem;
        text-align: left;
        transition: all 0.1s ease-in-out;
        &:hover {
          color: grey;
        }
      }
    }
    .down-links {
      height: 50%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: end;
      align-items: end;

      a {
        width: 100%;
        border: none;
        text-decoration: none;
        color: #000;
        padding: 0.5rem 0.5rem 0.5rem 1rem;
        text-align: left;
        ${"" /* background: #3151b5; */}
        transition: all 0.1s ease-in-out;
        &:hover {
          ${"" /* background: #2c387e; */}
          color: grey;
        }
      }
    }
  }
`;

const Right = styled.div`
  border-left: 1px solid grey;
  width: 83%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  overflow-x: hidden;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default Account;
