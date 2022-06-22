import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import StarRatings from "react-star-ratings";

import { BiErrorCircle } from "react-icons/bi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

// import { UserContext } from "../App";

const Room = ({ room }) => {
  // console.log(room);

  // const { state, dispatch } = useContext(UserContext);
  // console.log(state);

  const [alert, setAlert] = useState(false);
  const [alertDiv, setAlertDiv] = useState({
    class: "",
    message: "",
  });

  // const addToCartFunc = async (product) => {
  //   // console.log(product);
  //   setTimeout(() => setAlert(false), 3000);

  //   if (state) {
  //     let { data } = await axios.put(`/user/update/addtocart`, product);
  //     console.log(data.response);

  //     if (data.status) {
  //       await dispatch({ type: "USER", payload: data.response });
  //       // navigate("/cart");
  //       setAlertDiv({
  //         class: "success",
  //         message: "Item added to cart.",
  //       });
  //       setAlert(true);
  //     }
  //   } else {
  //     setAlertDiv({
  //       class: "error",
  //       message: "Error: Please login first.",
  //     });
  //     setAlert(true);
  //   }
  // };

  // const removefromCartFunc = async (product) => {
  //   // console.log(product);
  //   setTimeout(() => setAlert(false), 3000);

  //   if (state) {
  //     let { data } = await axios.put(`/user/update/updatecart`, product);
  //     console.log(data.response);

  //     if (data.status) {
  //       await dispatch({ type: "USER", payload: data.response });
  //       setAlertDiv({
  //         class: "success",
  //         message: "Item removed from cart.",
  //       });
  //       setAlert(true);
  //     }
  //   } else {
  //     setAlertDiv({
  //       class: "error",
  //       message: "Error: Please login first.",
  //     });
  //     setAlert(true);
  //   }
  // };

  return (
    <Container>
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

      <div className="image">
        <NavLink
          to={`/room/${room._id}`}
          style={{ textDecoration: "none", color: "#000" }}
        >
          <img src={room.image[0]} alt="pic" />
        </NavLink>
      </div>

      <div className="details">
        <div className="up">
          <div>
            <h4> {room.title} </h4>
            <div>
              <StarRatings
                rating={room.rating}
                starRatedColor="yellow"
                numberOfStars={5}
                name="rating"
                starDimension="1rem"
                starSpacing="0.1rem"
              />
            </div>
          </div>
          <h4 className="price">Rs. {room.price}/Night </h4>
        </div>

        <div className="middle">
          <div className="desc">{room.description.slice(0, 200)}...</div>
        </div>

        <div className="down">
          <div>
            <div className="type">Type: {room.type} </div>
            <div className="category">Category: {room.category} </div>
          </div>
          <div>
            <NavLink
              to={`/room/${room._id}`}
              style={{ textDecoration: "none", color: "#000" }}
            >
              <Button>View Room</Button>
            </NavLink>
          </div>
        </div>
      </div>

    </Container>
  );
};

const Container = styled.div`
  height: 12rem;
  width: 100%;
  background: #f1f1f1;
  border: 1px solid lightgrey;
  border-radius: 0.3rem;
  margin-bottom: 1rem;
  display: flex;
  .image {
    height: 100%;
    width: 35%;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      border-left-top-radius: 0.3rem;
      border-left-bottom-radius: 0.3rem;
    }
  }
  .details {
    height: 100%;
    width: 65%;
    padding: 0.2rem 0.2rem 0.2rem 0.4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .up {
      height: 20%;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: start;
    }
    .middle {
      height: 60%;
      width: 100%;
      display: flex;
      justify-content: start;
      align-items: start;
      .desc {
        color: grey;
        font-size: 0.8rem;
        padding-top: 0.2rem;
      }
    }
    .down {
      height: 20%;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: end;
      .type,
      .category {
        color: grey;
        font-size: 0.8rem;
        font-weight: bold;
      }
    }
  }
`;

const Button = styled.button`
    width: 100%;
    background: #be743f;
    color: #fff;
    font-size: 1rem;
    padding: 0.5rem;
    border: none;
    border-radius: 0.25rem;
    transition: all 0.1s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover{
      background: #a95724;
    }
}
`;

export default Room;
