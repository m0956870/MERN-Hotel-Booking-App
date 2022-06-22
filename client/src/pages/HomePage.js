import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";

import styled from "styled-components";
import axios from "axios";

import { UserContext } from "../App";

// import BannerImage from "../components/BannerImage";
// import CategoryCarousel from "../components/CategoryCarousel";

import city, { room, allCategory } from "../data";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const HomePage = () => {
  const { state } = useContext(UserContext);
  // console.log(state);

  const [allRooms, setAllRooms] = useState([]);

  const fetchAllRooms = async () => {
    try {
      let { data } = await axios.get("/room/allrooms");
      // console.log(data)
      if (data.status) {
        setAllRooms(data.response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllRooms();
  }, []);

  // console.log(allRooms);

  // let list = [];
  // let categories = [];

  // if (allRooms) {
  //   allRooms.map((item) => {
  //     if (!list.includes(item.category)) {
  //       categories.push({ category: item.category, image: item.image[0] });
  //     }
  //     list.push(item.category);
  //   });
  // }

  // console.log(list);
  // console.log(categories);

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
      items: 2,
    },
    xs: {
      breakpoint: { max: 300, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <Container>
        <HomeBanner>
          <img
            src="https://img.freepik.com/free-photo/beautiful-luxury-outdoor-swimming-pool-hotel-resort_74190-7433.jpg?w=2000"
            alt="banner"
          />
          <div className="booking-div">
            {/* <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOTVigqXy3QaRItjP2MDJmunz69r5TWZTFBjTGwbf6lxD5nVw2lDMZV0t6bK68SO0p_2k&usqp=CAU"
              alt="banner"
            /> */}
          </div>
          <div className="intro">
            <div className="sub-heading">WELCOME TO</div>
            <div className="heading">The Best Hotels & Resorts</div>
            <div className="sub-heading">
              The best hotel you will ever need.
            </div>
          </div>
        </HomeBanner>

        <Title>
          <h2>ENJOY OUR SERVICE</h2>
        </Title>

        <ServiceSection>
          <div className="image">
            <img
              src="https://arlingtonva.s3.amazonaws.com/wp-content/uploads/sites/25/2013/12/restaurant.jpeg"
              alt="banner"
            />
            <div className="heading">Restaurant</div>
          </div>
          <div className="image">
            <img
              src="https://www.telegraph.co.uk/content/dam/Travel/2020/July/GettyImages-1142187788-spa-massage-p-xlarge.jpg"
              alt="banner"
            />
            <div className="heading">Spa & Massage</div>
          </div>
          <div className="image">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRs5mshlYCTcct5h6TLIslliRokZq3q5uOYQ&usqp=CAU"
              alt="banner"
            />
            <div className="heading">Family Vacation</div>
          </div>
        </ServiceSection>

        <Title>
          <h2>OUR HOTELS PRESENTS IN</h2>
        </Title>

        <CitySection>
          <Carousel
            // swipeable={true}
            draggable={true}
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={1500}
          >
            {city.map((item) => (
              <>
                <NavLink
                  style={{ textDecoration: "none", color: "#000" }}
                  to={`/rooms/category/${item.route}`}
                >
                  <div className="city-card">
                    <div className="image">
                      <img src={item.image} alt="banner" />
                    </div>
                    <div className="title">
                      <h3>{item.name}</h3>
                    </div>
                  </div>
                </NavLink>
              </>
            ))}
          </Carousel>
        </CitySection>

        <Title>
          <h2>ROOMS ACCOMMODATION</h2>
        </Title>
        <RoomSection>
          {room.map((item) => (
            <div className="category-card">
              <NavLink
                style={{ textDecoration: "none", color: "#000" }}
                to={`/rooms/category/${item.route}`}
              >
                <img src={item.image} alt="banner" />
                <h2 className="heading">{item.name}</h2>
              </NavLink>
            </div>
          ))}
        </RoomSection>

        <Title>
          <h2>ALL CATEGORY</h2>
        </Title>

        <CategorySection>
          {allCategory.map((item) => (
            <div className="category-card">
              <NavLink
                style={{ textDecoration: "none", color: "#000" }}
                to={`/rooms/category/${item.route}`}
              >
                <img src={item.image} alt="banner" />
                <h3 className="heading">{item.name}</h3>
              </NavLink>
            </div>
          ))}
        </CategorySection>

        <Title></Title>

        {/* <MiniBanner>
          <img src="https://i.pinimg.com/originals/88/01/d9/8801d9948d54c7ce01bd20108fd64741.png" alt="sale"/>
        </MiniBanner> */}
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
`;

const HomeBanner = styled.div`
  height: 90vh;
  width: 100%;
  position: relative;
  .booking-div {
    position: absolute;
    top: 0;
    left: 0;
    ${"" /* height: 16vh; */}
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .intro {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .heading {
      color: #fff;
      font-size: 3rem;
      font-weight: bold;
    }
    .sub-heading {
      color: #fff;
      font-size: 2rem;
      margin: 1rem 0;
    }
  }
  img {
    height: 100%;
    width: 100%;
  }
`;

const Title = styled.div`
  height: 6rem;
  width: 100%;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// SERVICE SECTION
const ServiceSection = styled.div`
  height: 45vh;
  width: 100%;
  padding: 0 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .image {
    height: 100%;
    width: 30%;
    position: relative;
    .heading {
      width: 100%;
      text-align: center;
      color: #fff;
      font-weight: bold;
      font-size: 1.2rem;
      position: absolute;
      bottom: 3%;
    }
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      position: top;
    }
  }
`;

// CITY SECTION
const CitySection = styled.div`
  height: 32vh;
  display: grid;
  place-item: center;
  .city-card {
    height: 30vh;
    margin: 0 0.7rem;
    border-radius: 0.2rem;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    .image {
      height: 80%;
      width: 100%;
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-top-right-radius: 0.2rem;
        border-top-left-radius: 0.2rem;
      }
    }
    .title {
      height: 20%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

// ROOM SECTION
const RoomSection = styled.div`
  width: 100%;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  .category-card {
    background: #000;
    height: 10rem;
    width: 32%;
    &:hover {
      opacity: 0.8;
    }
    position: relative;
    img {
      height: 100%;
      width: 100%;
      opacity: 0.8;
    }
    .heading {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      width: 100%;
      text-align: center;
    }
  }
`;

// CTAEGORY SECTION
const CategorySection = styled.div`
  width: 100%;
  padding: 0 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  .category-card {
    background: #fff;
    height: 15rem;
    width: 23%;
    border-radius: 0.2rem;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    img {
      height: 75%;
      width: 100%;
      opacity: 0.8;
      object-fit: cover;
      border-top-right-radius: 0.2rem;
      border-top-left-radius: 0.2rem;
    }
    .heading {
      height: 25%;
      color: grey;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

// const MiniBanner = styled.div`
//   height: 40vh;
//   width: 100%;
//   overflow: hidden;
//   img{
//     max-height: 100%;
//     width: 101%;
//   }
// `;

export default HomePage;
