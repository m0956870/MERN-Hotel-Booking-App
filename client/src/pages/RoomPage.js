import React, { useState, useEffect, useContext } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { Avatar } from "@material-ui/core";

import axios from "axios";
import styled from "styled-components";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import StarRatings from "react-star-ratings";

import { BiErrorCircle } from "react-icons/bi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

import { GoLocation } from "react-icons/go";
import { GrView } from "react-icons/gr";
import { AiOutlineWifi } from "react-icons/ai";
import { MdFastfood } from "react-icons/md";
import { GiFireFlower } from "react-icons/gi";
import { BiCctv, BiLockAlt } from "react-icons/bi";
import { FaParking } from "react-icons/fa";
import { BsClockHistory } from "react-icons/bs";

import Map from "../components/Map";

import { UserContext } from "../App";

const RoomPage = () => {
  const params = useParams();
  //   console.log(params._id);

  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  // console.log(state);

  const [alert, setAlert] = useState(false);
  const [alertDiv, setAlertDiv] = useState({
    class: "",
    message: "",
  });

  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  const fetchRoomDetail = async () => {
    try {
      let { data } = await axios.get(`/room/find/${params._id}`);
      //   console.log(data.response);

      if (data.status) {
        setRoom(data.response);
        setMainImage(data.response.image[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRoomDetail();
  }, []);

  // console.log(room);
  //   console.log(mainImage);

  const [booking, setBooking] = useState({
    checkIn: new Date().toISOString().slice(0, 10),
    checkOut: new Date().toISOString().slice(0, 10),
    adult: 1,
    children: 0,
  });

  const handleInput = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const bookingFunc = async () => {
    // console.log(booking);
    setTimeout(() => setAlert(false), 3000);

    if (!state) {
      setAlertDiv({
        class: "error",
        message: "Error: Please login first.",
      });
      return setAlert(true);
    }

    let nights = booking.checkOut.slice(8, 10) - booking.checkIn.slice(8, 10);
    // console.log(nights);

    let nightCount = nights === 0 ? 1 : nights;
    // console.log(nightCount);

    let bookingData = {
      room: [room],
      stay: {
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
      },
      guest: {
        adult: booking.adult,
        children: booking.children,
      },
      totalNights: nightCount,
      totalPrice: nightCount * room.price,
    };

    // console.log(bookingData);
    dispatch({ type: "USER", payload: { ...state, bookingData } });
    return navigate("/booking");
  };

  const [reviewRating, setReviewRating] = useState(0);
  const changeRating = (newRating, name) => {
    // console.log(newRating);
    setReviewRating(newRating);
  };

  const [comment, setComment] = useState("");

  const reviewFunc = async () => {
    // console.log(reviewRating);
    setTimeout(() => setAlert(false), 3000);

    let reviewData = {
      profilePic: state.profilePic,
      name: state.name,
      rating: reviewRating,
      comment: comment,
      date: new Date().toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      postedBy: state._id,
    };

    // console.log(reviewData)
    try {
      let { data } = await axios.post(
        `/room/review/add/${room._id}`,
        reviewData
      );
      // console.log(data)

      if (data.status) {
        fetchRoomDetail();
        setComment("");
        setReviewRating(0);
        setAlertDiv({
          class: "success",
          message: data.response,
        });
        setAlert(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteReviewFunc = async (_id) => {
    // console.log(_id);

    setTimeout(() => setAlert(false), 3000);

    try {
      let { data } = await axios.get(`/room/review/delete/${_id}`);
      // console.log(data);

      if (data.status) {
        fetchRoomDetail();
        setAlertDiv({
          class: "success",
          message: data.response,
        });
        setAlert(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const responsive = {
    xl: {
      breakpoint: { max: 2000, min: 900 },
      items: 6,
    },
    lg: {
      breakpoint: { max: 900, min: 700 },
      items: 5,
    },
    md: {
      breakpoint: { max: 700, min: 500 },
      items: 4,
    },
    sm: {
      breakpoint: { max: 500, min: 300 },
      items: 3,
    },
    xs: {
      breakpoint: { max: 300, min: 0 },
      items: 2,
    },
  };

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

      {room && (
        <>
          <Title>
            <span className="title">{room.title} </span>
            <StarRatings
              rating={room.rating}
              starRatedColor="yellow"
              numberOfStars={5}
              name="rating"
              starDimension="1rem"
              starSpacing="0.1rem"
            />
            <div>
              <GoLocation /> {room.location}
            </div>
          </Title>

          <Images>
            <div className="big-image">
              <img src={mainImage} alt="pic" />
            </div>
            <div className="small-image">
              <div className="image">
                <Carousel
                  swipeable={true}
                  draggable={true}
                  responsive={responsive}
                  //   infinite={true}
                  //   autoPlay={true}
                  //   autoPlaySpeed={1500}
                >
                  {room.image.map((item) => (
                    <img
                      src={item}
                      alt="pic"
                      onClick={() => setMainImage(item)}
                    />
                  ))}
                </Carousel>
              </div>
            </div>
          </Images>

          <HighLight>
            <div>
              <GrView />
              <p>View</p>
            </div>
            <div>
              <GiFireFlower />
              <p>Garden</p>
            </div>
            <div>
              <AiOutlineWifi />
              <p>Wi-Fi</p>
            </div>
            <div>
              <MdFastfood />
              <p>Food</p>
            </div>
            <div>
              <BiCctv />
              <p>CCTV</p>
            </div>
            <div>
              <FaParking />
              <p>Free Parking</p>
            </div>
            <div>
              <BiLockAlt />
              <p>Privacy</p>
            </div>
          </HighLight>

          <Details>
            <div className="left">
              <Description>
                <h2>Description</h2>
                <p>{room.description} </p>
                <br />
                <h4>Dining and things to do</h4>
                <p>
                  Nothing starts a morning better than a delicious breakfast,
                  which you can always enjoy in-house at Beleza by the Beach.
                  Everyone loves a good cup of coffee! A coffee shop on-site
                  means you can enjoy a cup of real, freshly brewed coffee every
                  morning -- or anytime you feel like it. If you don't feel like
                  going out to eat, you can always opt for the delicious dining
                  options at the resort. A night in at the resort's bar can be
                  as fun as a night out with your travel companions. Beleza by
                  the Beach lets you make the most of your time! Once there, you
                  can enjoy countless recreational facilities offered to all
                  guests. Finish your vacation days right by dropping in at the
                  massage, spa and sauna. Start your vacation off right with a
                  dip in the pool. Skip the dress code and opt for a casual
                  cocktail or beer at the resort's poolside bar. Fitness lovers
                  who want to keep up their routine on vacation can drop in at
                  the resort's fitness facility. Have fun with your friends or
                  family, or even meet new people at the games room.
                </p>
                <br />
                <h4>Reasons to stay here</h4>
                <p>
                  Guests who stayed here rated the facilities above 98% of other
                  accommodations in the city. Know you'll get excellent dining
                  options here, where past guests have rated onsite or nearby
                  dining above 98% of the city's accommodation. This resort
                  scores higher than 98% of the city's accommodations for
                  cleanliness.
                </p>
              </Description>

              <h2 style={{ marginTop: "1rem" }}>Hotel Amenities</h2>
              <Amenities>
                <div className="row">
                  <div>
                    <h4>Bedroom</h4>
                    <ul>
                      <li>Bed</li>
                      <li>AC</li>
                      <li>Sofa</li>
                      <li>Wardrobe</li>
                      <li>TV with Speakers</li>
                      <li>Living Area</li>
                      <li>Terrace</li>
                      <li>Balcony</li>
                      <li>Room Service</li>
                      <li>Suitable for Children</li>
                    </ul>
                  </div>
                  <div>
                    <h4>Kitchen</h4>
                    <ul>
                      <li>Dining Table</li>
                      <li>Microwave</li>
                      <li>Electronic Kettle</li>
                      <li>Tea/Coffee Maker</li>
                      <li>Dish-Washer</li>
                      <li>Dryer</li>
                    </ul>
                  </div>
                  <div>
                    <h4>Bathroom</h4>
                    <ul>
                      <li>Toilet</li>
                      <li>Private Bathroom</li>
                      <li>Bath & Shower</li>
                      <li>Towels</li>
                      <li>Toilet paper</li>
                    </ul>
                  </div>
                </div>

                <div className="row">
                  <div>
                    <h4>Activities</h4>
                    <ul>
                      <li>Kid's Club</li>
                      <li>Yoga Classes</li>
                      <li>Full Body Massage</li>
                      <li>Couple Massage</li>
                      <li>Gym Center</li>
                      <li>Spa Center</li>
                      <li>Wellnes Center</li>
                    </ul>
                  </div>
                  <div>
                    <h4>Food & Drinks</h4>
                    <ul>
                      <li>Restaurent</li>
                      <li>Minibar</li>
                      <li>Tea/Coffee Cafe</li>
                      <li>Specail Diet Menu</li>
                      <li>Full Vegetarian</li>
                      <li>Non-Veg Menu</li>
                    </ul>
                  </div>
                  <div>
                    <h4>Enterteinent & Family</h4>
                    <ul>
                      <li>Kid Playgrouond</li>
                      <li>Outdoor Play Equipment</li>
                      <li>Board games</li>
                      <li>Puzzle games</li>
                      <li>Family Game Events</li>
                    </ul>
                  </div>
                </div>

                <div className="row">
                  <div>
                    <h4>Reception Services</h4>
                    <ul>
                      <li>Invoice Provided</li>
                      <li>Concierge Service</li>
                      <li>24-Hour Front-Desk</li>
                      <li>Room Services</li>
                    </ul>
                  </div>
                  <div>
                    <h4>Language</h4>
                    <ul>
                      <li>English</li>
                      <li>Hindi</li>
                    </ul>
                  </div>
                  <div>
                    <h4>Privacy & Security</h4>
                    <ul>
                      <li>CCTV Camera</li>
                      <li>Fire Extinguishers</li>
                      <li>Emergency Exits</li>
                    </ul>
                  </div>
                </div>
              </Amenities>
            </div>

            <div className="right">
              <Booking>
                <div className="head">BOOK ROOM</div>

                <div className="body" onChange={handleInput}>
                  <div className="input">
                    <p>Destination</p>
                    <input type="text" value={room.city} />
                  </div>
                  <div className="input">
                    <p>Check-in date</p>
                    <input
                      name="checkIn"
                      type="date"
                      value={booking.checkIn}
                      min={new Date().toISOString().slice(0, 10)}
                    />
                  </div>
                  <div className="input">
                    <p>Check-out date</p>
                    <input
                      name="checkOut"
                      type="date"
                      value={booking.checkOut}
                      min={new Date().toISOString().slice(0, 10)}
                    />
                  </div>
                  <div className="input-dbl">
                    <div>
                      <p>Adult</p>
                      <input
                        name="adult"
                        type="number"
                        value={booking.adult}
                        min={1}
                      />
                    </div>
                    <div>
                      <p>Children</p>
                      <input
                        name="children"
                        type="number"
                        value={booking.children}
                        min={0}
                      />
                    </div>
                  </div>
                  <button onClick={() => bookingFunc()}>Book Now</button>
                </div>
              </Booking>
            </div>
          </Details>

          <Location>
            <Map />
          </Location>

          <h2 style={{ margin: "1rem 0" }}>Reviews</h2>

          <Reviews>
            <div className="add-review">
              <div className="head">
                <div className="image">
                  <Avatar
                    alt="Profile Pic"
                    src={state ? state.profilePic : null}
                  />
                </div>
                <div className="user">
                  <div className="name"> {state && state.name} </div>
                  <StarRatings
                    rating={reviewRating}
                    changeRating={changeRating}
                    starRatedColor="yellow"
                    numberOfStars={5}
                    name="rating"
                    starDimension="1rem"
                    starSpacing="0.1rem"
                  />
                </div>
              </div>
              <div className="body">
                <textarea
                  style={{
                    minHeight: "100%",
                    maxHeight: "100%",
                    minWidth: "70%",
                    maxWidth: "70%",
                    padding: "0.5rem",
                  }}
                  className="detail"
                  type="text"
                  name="review"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  autoComplete="off"
                />
                <Button onClick={() => reviewFunc()}>Post Review</Button>
              </div>
            </div>
            <div className="reviews">
              {room.reviews &&
                room.reviews.map((review) => (
                  <div className="review">
                    <div className="head">
                      <div className="image">
                        <Avatar alt="Profile Pic" src={review.profilePic} />
                      </div>
                      <div className="user">
                        <div className="name"> {review.name} </div>
                        <StarRatings
                          rating={review.rating}
                          starRatedColor="yellow"
                          numberOfStars={5}
                          name="rating"
                          starDimension="1rem"
                          starSpacing="0.1rem"
                        />
                      </div>
                    </div>
                    <div className="body">
                      <div className="comment">{review.comment}</div>
                      <div className="action">
                        <div className="date"> {review.date} </div>
                        <div className="btn">
                          {state && state._id === review.postedBy && (
                            <div
                              style={{ color: "red" }}
                              onClick={() => deleteReviewFunc(review._id)}
                            >
                              Delete Review
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </Reviews>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  min-height: 90vh;
  width: 100%;
  padding: 1.5rem;
`;

const Title = styled.div`
  width: 100%;
  margin-bottom: 0.5rem;
  .title {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

const Images = styled.div`
  height: 30rem;
  width: 100%;
  .big-image {
    height: 80%;
    width: 100%;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  .small-image {
    height: 20%;
    width: 100%;
    .image {
      height: 100%;
      width: 100%;
      background: #fff;
      display: grid;
      place-item: center;
      margin: 0.2rem 0;
    }
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      border: 1px solid #fff;
    }
  }
`;

const HighLight = styled.div`
  margin: 1rem 0;
  padding: 0 2rem;
  height: 5rem;
  width: 100%;
  border: 1px solid grey;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    svg {
      font-size: 2rem;
    }
  }
`;

const Details = styled.div`
  width: 100%;
  ${"" /* border: 1px solid #000; */}
  display: flex;
  justify-content: space-between;
  .left {
    width: 70%;
  }
  .right {
    width: 29%;
  }
`;

// LEFT
const Booking = styled.div`
  height: 25rem;
  width: 100%;
  background: #febb02;
  .head {
    height: 12%;
    width: 100%;
    background: black;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-weight: bold;
  }
  .body {
    height: 88%;
    width: 100%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .input {
      width: 100%;
      p {
        font-size: 0.9rem;
        color: #fff;
      }
      input {
        width: 100%;
        height: 100%;
        padding: 0 0.5rem;
      }
    }
    .input-dbl {
      width: 100%;
      display: flex;
      justify-content: space-between;
      div {
        width: 48%;
        p {
          font-size: 0.9rem;
          color: #fff;
        }
        input {
          width: 100%;
          height: 100%;
          padding: 0 0.5rem;
          &::-webkit-outer-spin-button,
          &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
        }
      }
    }
    button {
      width: 100%;
      height: 12%;
      background: black;
      color: #fff;
      font-weight: bold;
    }
  }
`;

// RIGHT
const Description = styled.div`
  width: 100%;
  h2 {
    margin-bottom: 0.5rem;
  }
  p {
    font-size: 0.9rem;
  }
`;

const Amenities = styled.div`
  width: 100%;
  margin: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: start;
  .row {
    width: 30%;
    div {
      margin-bottom: 1rem;
      ul {
        list-style: none;
        li {
          font-size: 0.8rem;
          &:before {
            content: "✔ ";
          }
        }
      }
    }
  }
`;

const Location = styled.div`
  width: 100%;
  height: 60vh;
`;

const Reviews = styled.div`
  width: 100%;
  padding: 0.5rem;
  .add-review {
    height: 10rem;
    width: 100%;
    margin-bottom: 1rem;
    background: #f1f1f1;
    border-radius: 0.3rem;
    padding: 0.5rem;
    .head {
      height: 30%;
      width: 100%;
      display: flex;
      justify-content: start;
      align-items: center;
      .image {
        height: 100%;
        width: auto;
        .MuiAvatar-root {
          width: 100%;
          height: 100%;
        }
      }
      .user {
        height: 100%;
        width: 100%;
        padding-left: 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;
      }
    }
    .body {
      height: 70%;
      width: 100%;
      display: flex;
      justify-content: start;
      align-items: end;
      button {
        margin-left: 0.5rem;
      }
    }
  }
  .reviews {
    width: 100%;
   .review {
    width: 100%;
    margin-bottom: 1rem;
    background: #f1f1f1;
    border-radius: 0.3rem;
    padding: 0 0.5rem;
    .head {
      height: 3rem;
      width: 70%;
      display: flex;
      justify-content: start;
      align-items: center;
      .image {
        height: 100%;
        width: auto;
        .MuiAvatar-root {
          width: 100%;
          height: 100%;
        }
      }
      .user {
        height: 100%;
        width: 100%;
        padding-left: 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;
      }
    }
    .body {
      width: 70%;
      .comment{
        padding: 0.5rem;
        background: #fff;
      }
      .action{
        height: 1.5rem;
                display: flex;
        justify-content: space-between;
        align-items: center;
        .date{
          font-size: 0.8rem;
          color: grey;
        }
        .btn{
          font-size: 0.8rem;
          font-weight: bold;
          cursor: pointer;
          &:hover{
            text-decoration: underline;
          }
        }
    }
  }
`;

const Button = styled.button`
    background: #3151b5;
    color: #fff;
    margin: 0 0 0 0.5rem;
    padding: 0.5rem;
    border: none;
    border-radius: 0.25rem;
    transition: all 0.1s ease-in-out;
    &:hover{
      background: #2c387e;
    }
}
`;

export default RoomPage;
