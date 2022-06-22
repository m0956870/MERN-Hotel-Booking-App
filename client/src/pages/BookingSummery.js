import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import { BiErrorCircle } from "react-icons/bi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

import { UserContext } from "../App";

const BookingSummery = ({ route }) => {
  // console.log(route);

  const { state } = useContext(UserContext);
  // console.log(state);

  const [myBookings, setMyBookings] = useState([]);
  const [cancelModel, setCancelModel] = useState(false);

  const [alert, setAlert] = useState(false);
  const [alertDiv, setAlertDiv] = useState({
    class: "",
    message: "",
  });

  const fetchMyBookings = async () => {
    try {
      let { data } = await axios.get(`/booking/${route}`);
      // console.log(data.response)

      if (data.status) {
        setMyBookings(data.response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancelBookingFunc = async (_id) => {
    // console.log(_id);
    setTimeout(() => setAlert(false), 3000);

    try {
      let { data } = await axios.post("/booking/cancel", { _id });
      // console.log(data.response)
      if (data.status) {
        setCancelModel(false);
        setAlertDiv({
          class: "success",
          message: data.response,
        });
        setAlert(true);
        fetchMyBookings();
      }
    } catch (error) {
      // console.log(error);
      if (!error.response.data.status) {
        setAlertDiv({
          class: "error",
          message: "Error: Try again later!",
        });
        setAlert(true);
      }
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  // console.log(myBookings);

  return (
    <Container>
      <>
        {alert && (
          <div id="alert">
            <div className={alertDiv.class}>
              {alertDiv.class === "success" ? (
                <IoMdCheckmarkCircleOutline
                  style={{ marginRight: "0.5rem", fontSize: "1.5rem" }}
                />
              ) : (
                <BiErrorCircle
                  style={{ marginRight: "0.5rem", fontSize: "1.5rem" }}
                />
              )}
              {alertDiv.message}
            </div>
          </div>
        )}

        <div className="head">
          <h2>My Bookings</h2>
        </div>

        {myBookings &&
          myBookings.map((item) => (
            <>
              {item.status !== "Canceled" ? (
                <>
                  {cancelModel && (
                    <Model>
                      <h4>Do you want to cancel booking?</h4>
                      <p>You can not undo it</p>
                      <div className="buttons">
                        <Button
                          onClick={() => setCancelModel(false)}
                          style={{
                            background: "#fff",
                            color: "#000",
                            border: "1px solid grey",
                          }}
                        >
                          Cancel
                        </Button>
                        <Button onClick={() => cancelBookingFunc(item._id)}>
                          Cancel Booking
                        </Button>
                      </div>
                    </Model>
                  )}
                  <OrderDiv>
                    <OrderDetail>
                      <div className="left">
                        <h2 className="id">Booking ID: {item._id} </h2>
                        <div className="date">Booking Date: {item.date}</div>
                      </div>
                      <div className="right">
                        <Button onClick={() => setCancelModel(true)}>
                          Cancel Booking
                        </Button>
                      </div>
                    </OrderDetail>

                    <OrderItems>
                      {item.room &&
                        item.room.map((room) => (
                          <div className="order">
                            <div className="image">
                              <img src={room.image[0]} alt="pic" />
                            </div>
                            <div className="details">
                              <div className="left">
                                <div className="title"> {room.title} </div>
                                <div className="info">
                                  Adult: {item.guest.adult}, Children:{" "}
                                  {item.guest.children}
                                </div>
                                <div className="info">
                                  Stay: {item.stay.checkIn}-{item.stay.checkOut}
                                </div>
                                <div className="info">
                                  Booking Days: {item.totalNights}
                                </div>
                              </div>

                              <div className="right">
                                <div className="price">
                                  Rs. {room.price}/Night
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </OrderItems>

                    <DeliveryDetails>
                      <div className="left">
                        <div className="customer">
                          <h4> Personal Detail </h4>
                          <p>Name: {item.customerDetails.name} </p>
                          <p>Email: {item.customerDetails.email} </p>
                          <p>Phone: {item.customerDetails.phone} </p>
                        </div>
                      </div>

                      <div className="right">
                        <div className="payment">
                          Payment Type: {item.paymentType}
                        </div>
                        <div className="status">
                          Booking Status: {item.status}{" "}
                        </div>
                        <div className="total">
                          Total Amount: {item.totalPrice}{" "}
                        </div>
                      </div>
                    </DeliveryDetails>
                  </OrderDiv>
                </>
              ) : (
                <CancelOrderDiv>
                  <OrderDetail>
                    <div className="left">
                      <h2 className="id">Booking ID: {item._id} </h2>
                      <div className="date">Booking Date: {item.date}</div>
                    </div>
                    <div className="right">
                      <Button onClick={() => setCancelModel(true)}>
                        Cancel Booking
                      </Button>
                    </div>
                  </OrderDetail>

                  <OrderItems>
                    {item.room &&
                      item.room.map((room) => (
                        <div className="order">
                          <div className="image">
                            <img src={room.image[0]} alt="pic" />
                          </div>
                          <div className="details">
                            <div className="left">
                              <div className="title"> {room.title} </div>
                              <div className="info">
                                Adult: {item.guest.adult}, Children:{" "}
                                {item.guest.children}
                              </div>
                              <div className="info">
                                Stay: {item.stay.checkIn}-{item.stay.checkOut}
                              </div>
                              <div className="info">
                                Booking Days: {item.totalNights}
                              </div>
                            </div>

                            <div className="right">
                              <div className="price">
                                Rs. {room.price}/Night
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </OrderItems>

                  <DeliveryDetails>
                    <div className="left">
                      <div className="customer">
                        <h4> Personal Detail </h4>
                        <p>Name: {item.customerDetails.name} </p>
                        <p>Email: {item.customerDetails.email} </p>
                        <p>Phone: {item.customerDetails.phone} </p>
                      </div>

                      <div className="address">
                        <h4>Delivery Address</h4>
                        {/* <p>{item.customerDetails.address} </p>
                          <p>
                            {item.customerDetails.city},{" "}
                            {item.customerDetails.state}
                          </p>
                          <p>
                            {item.customerDetails.country},{" "}
                            {item.customerDetails.zip}
                          </p> */}
                      </div>
                    </div>

                    <div className="right">
                      <div className="payment">
                        Payment Type: {item.paymentType}
                      </div>
                      <div className="status">
                        Booking Status: {item.status}{" "}
                      </div>
                      <div className="total">
                        Total Amount: {item.totalPrice}{" "}
                      </div>
                    </div>
                  </DeliveryDetails>
                </CancelOrderDiv>
              )}
            </>
          ))}
      </>
    </Container>
  );
};

const Container = styled.div`
  min-height: 90vh;
  width: 100%;
  background: #d3d3d350;
  padding: 0 3rem 3rem 3rem;
  .head {
    height: 8vh;
    width: 100%;
    display: flex;
    align-items: center;
  }
`;

const Model = styled.div`
  width: 50%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
  p {
    color: grey;
    font-size: 0.8rem;
    padding: 0.4rem 0;
  }
  .buttons {
    width: 70%;
    display: flex;
    justify-content: space-between;
  }
`;

const OrderDiv = styled.div`
  width: 90%;
  background: #fff;
  border-radius: 0.5rem;
  padding: 1rem 1.5rem;
  margin-bottom: 2rem;
  overflow: hidden;
`;

const CancelOrderDiv = styled.div`
  width: 90%;
  background: #fff;
  border-radius: 0.5rem;
  padding: 1rem 1.5rem;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
  &:after {
    content: "Booking is canceled.";
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: lightgrey;
    opacity: 0.7;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

const OrderDetail = styled.div`
  height: 4rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  .left {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    .date {
      color: grey;
      font-size: 0.8rem;
    }
  }
  .right {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
  }
`;
const OrderItems = styled.div`
  width: 100%;
  border-top: 1px solid lightgrey;
  border-bottom: 1px solid lightgrey;
  padding: 0.8rem 0;
  .order {
    height: 8rem;
    width: 100%;
    padding: 0.2rem 0;
    display: flex;
    background: #fff;
    .image {
      height: 100%;
      width: 20%;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .details {
      height: 100%;
      width: 80%;
      display: flex;
      justify-content: center;
      align-items: center;
      .left {
        width: 70%;
        height: 100%;
        padding-left: 0.5rem;
        .title {
          font-weight: bold;
          font-size: 1.2rem;
          margin-bottom: 0.3rem;
        }
        .info {
          font-size: 0.8rem;
          color: grey;
        }
        .description {
          font-size: 0.9rem;
          color: grey;
          margin-bottom: 0.2rem;
        }
      }
      .right {
        width: 30%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: end;
        .price {
          font-weight: bold;
          font-size: 1rem;
          margin-bottom: 0.3rem;
        }
        .quantity {
          font-size: 0.9rem;
          color: grey;
        }
      }
    }
  }
`;

const DeliveryDetails = styled.div`
  height: 4rem;
  width: 100%;
  margin-top: 1rem;
  display: flex;
    justify-content: space-between;
    align-items: center;
  .left {
    height: 100%;
    width: 50%;
    display: flex;
        justify-content: start;
    align-items: end;
     .customer {
         h4 {
             font-size: 1rem;
             font-weight: bold;
             margin-bottom: 0.2rem;
           }
         p {
             font-size: 0.8rem;
             color: grey;
           }
         }
  }
  .right {
    height: 100%;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: end;
     .payment {
       font-size: 0.8rem;
       color: grey;
     }
     .status {
       font-size: 0.8rem;
       color: grey;
       margin-top: 0.1rem;
     }
     .total {
       font-weight: bold;
       font-size: 1.1rem;
       margin-top: 0.3rem;
     }
   }
  }
`;

const Button = styled.button`
    width: 100%;
    background: red;
    color: #fff;
    font-size: 1rem;
    padding: 0.5rem 0.8rem;
    border: none;
    border-radius: 0.25rem;
    transition: all 0.1s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover{
      background: #e91e63;
    }
}
`;

export default BookingSummery;
