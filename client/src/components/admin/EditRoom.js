import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import { BiErrorCircle } from "react-icons/bi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

import { UserContext } from "../../App";

const EditRoom = ({room}) => {
  // console.log(room)
  
  const navigate = useNavigate();
  const { state } = useContext(UserContext);
  // console.log(state);

  const [url, setUrl] = useState([]);

  const [roomItem, setRoomItem] = useState({
    _id: room._id,
    title: room.title,
    description: room.description,
    category: room.category,
    type: room.type,
    city: room.city,
    location: room.location,
    price: room.price,
    rating: room.rating,
    capacity: room.capacity,
    image: room.image,
    date: room.date,
  });

  const [service, setService] = useState({
    wifi: room.service.wifi,
    parking: room.service.parking,
    pets: room.service.pets,
    children: room.service.children,
    roomService: room.service.roomService,
    pool: room.service.pool,
  });

  const handleInput = (e) => {
    setRoomItem({ ...roomItem, [e.target.name]: e.target.value });
  };

  const checkHandleInput = (e) => {
    setService({
      ...service, [e.target.name]: e.target.checked
    })
  };

  const [alert, setAlert] = useState(false);
  const [alertDiv, setAlertDiv] = useState({
    class: "",
    message: "",
  });

  const [error, setError] = useState({
    title: {
      status: false,
      text: "",
    },
    description: {
      status: false,
      text: "",
    },
    category: {
      status: false,
      text: "",
    },
    type: {
      status: false,
      text: "",
    },
    city: {
      status: false,
      text: "",
    },
    location: {
      status: false,
      text: "",
    },
    price: {
      status: false,
      text: "",
    },
    rating: {
      status: false,
      text: "",
    },
    capacity: {
      status: false,
      text: "",
    },
    service: {
      status: false,
      text: "",
    },
  });

  const changePicFunc = async (e) => {
    try {
      const file = e.target.files[0];
      // console.log(file);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", process.env.REACT_APP_CPRESET);
      formData.append("cloud_name", process.env.REACT_APP_CCLOUD);

      let { data } = await axios.post(process.env.REACT_APP_CURL, formData);
      // console.log(data.url);

      setUrl((url) => [...url, data.url]);
    } catch (error) {
      console.log(error);
    }
  };


  const postFunc = async () => {
    setTimeout(() => setAlert(false), 3000);

    setTimeout(
      () =>
        setError({
          ...error,
          status: false,
        }),
      3000
    );

    if (!state) {
      setAlertDiv({
        class: "error",
        message: "Error: Log in first.",
      });
      return setAlert(true);
    }

    // if (url.length === 0) {
    //   setAlertDiv({
    //     class: "error",
    //     message: "Error: Upload image first!",
    //   });
    //   return setAlert(true);
    // }

    if (roomItem.title === "") {
      return setError({
        ...error,
        title: {
          status: true,
          text: "Please enter roomItem title!",
        },
      });
    }
    if (roomItem.description === "") {
      return setError({
        ...error,
        description: {
          status: true,
          text: "Please enter roomItem description!",
        },
      });
    }
    if (roomItem.category === "") {
      return setError({
        ...error,
        category: {
          status: true,
          text: "Please enter roomItem category!",
        },
      });
    }
    if (roomItem.type === "") {
      return setError({
        ...error,
        type: {
          status: true,
          text: "Please enter roomItem type!",
        },
      });
    }
    if (roomItem.city === "") {
      return setError({
        ...error,
        city: {
          status: true,
          text: "Please enter roomItem city!",
        },
      });
    }
    if (roomItem.location === "") {
      return setError({
        ...error,
        location: {
          status: true,
          text: "Please enter roomItem location!",
        },
      });
    }
    if (roomItem.price === undefined) {
      return setError({
        ...error,
        price: {
          status: true,
          text: "Please enter roomItem price!",
        },
      });
    }
    if (roomItem.rating === undefined) {
      return setError({
        ...error,
        rating: {
          status: true,
          text: "Please enter roomItem rating!",
        },
      });
    }
    if (roomItem.capacity === undefined) {
      return setError({
        ...error,
        capacity: {
          status: true,
          text: "Please enter roomItem capacity!",
        },
      });
    }

    let fullDate = new Date().toLocaleString(navigator.language, {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
    });

    let postData = {
      _id: roomItem._id,
      title: roomItem.title,
      description: roomItem.description,
      category: roomItem.category,
      type: roomItem.type,
      city: roomItem.city,
      location: roomItem.location,
      price: roomItem.price,
      rating: roomItem.rating,
      capacity: roomItem.capacity,
      service: {
        wifi: service.wifi,
        parking: service.parking,
        pets: service.pets,
        children: service.children,
        roomService: service.roomService,
        pool: service.pool,
      },
      image: roomItem.image,
      date: fullDate,
    };

    // console.log(postData);

    try {
      let { data } = await axios.post("/room/edit", postData);
      // console.log(data);
      if (data.status) {
        setAlertDiv({
          class: "success",
          message: data.response,
        });
        setAlert(true);
        setTimeout(() => {
          navigate("/account/all-rooms");
        }, 1000);
      }
    } catch (error) {
      // console.log(error);
      if (!error.response.data.status) {
        setAlertDiv({
          class: "error",
          message: error.response.data.response,
        });
        return setAlert(true);
      }
    }
  };

  // console.log(url);
  // console.log(roomItem);
  // console.log(service);

  return (
    <>
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

        <CreatePostDiv>
          <h2 style={{ margin: "1rem 0" }}>Add Room</h2>

          <div class="image-upload">
            {room.image.map((item) => (
              <img className="img" src={item} />
            ))}

            <label>
              <img
                style={{ width: "100%", height: "6.35rem" }}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA_RhLhMFQptcSkzBWhnq13UqR12y7mXuSVw&usqp=CAU"
              />

              <input
                type="file"
                onChange={(e) => changePicFunc(e)}
                name="myfile"
                style={{ display: "none" }}
              />
            </label>
          </div>

          <div className="form">
            {/* <p className="label">Image</p>
            <input
              className="detail"
              type="text"
              name="image"
              value={roomItem.image}
              onChange={handleInput}
              autoComplete="off"
            /> */}

            <p className="label">Title</p>
            <input
              className="detail"
              type="text"
              name="title"
              value={roomItem.title}
              onChange={handleInput}
              autoComplete="off"
            />
            {error.title.status && (
              <>
                <BiErrorCircle style={{ color: "red" }} />{" "}
                <span style={{ color: "red" }}>{error.title.text}</span>
              </>
            )}

            <p className="label">Description</p>
            <textarea
              style={{
                minHeight: "4rem",
                maxHeight: "4rem",
                minWidth: "100%",
                maxWidth: "100%",
              }}
              className="detail"
              type="text"
              name="description"
              value={roomItem.description}
              onChange={handleInput}
              autoComplete="off"
            />
            {error.description.status && (
              <>
                <BiErrorCircle style={{ color: "red" }} />{" "}
                <span style={{ color: "red" }}>{error.description.text}</span>
              </>
            )}

            <div style={{ display: "flex" }}>
              <p className="label half">Category</p>
              <p className="label half">Type</p>
            </div>
            <div style={{ display: "flex" }}>
              <input
                className="detail half"
                type="text"
                name="category"
                value={roomItem.category}
                onChange={handleInput}
                autoComplete="off"
              />

              <input
                className="detail half"
                type="text"
                name="type"
                value={roomItem.type}
                onChange={handleInput}
                autoComplete="off"
              />
            </div>

            {error.category.status && (
              <>
                <BiErrorCircle style={{ color: "red" }} />{" "}
                <span style={{ color: "red" }}>{error.category.text}</span>
              </>
            )}
            {error.type.status && (
              <>
                <BiErrorCircle style={{ color: "red" }} />{" "}
                <span style={{ color: "red" }}>{error.type.text}</span>
              </>
            )}

            <div style={{ display: "flex" }}>
              <p className="label half">City</p>
              <p className="label half">Location</p>
            </div>
            <div style={{ display: "flex" }}>
              <input
                className="detail half"
                type="text"
                name="city"
                value={roomItem.city}
                onChange={handleInput}
                autoComplete="off"
              />

              <input
                className="detail half"
                type="text"
                name="location"
                value={roomItem.location}
                onChange={handleInput}
                autoComplete="off"
              />
            </div>

            {error.city.status && (
              <>
                <BiErrorCircle style={{ color: "red" }} />{" "}
                <span style={{ color: "red" }}>{error.city.text}</span>
              </>
            )}
            {error.location.status && (
              <>
                <BiErrorCircle style={{ color: "red" }} />{" "}
                <span style={{ color: "red" }}>{error.location.text}</span>
              </>
            )}

            <div style={{ display: "flex" }}>
              <p className="label half">Price</p>
              <div className="label half half-half">
                <div>Rating</div>
                <div>Capacity</div>
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <input
                className="detail half"
                type="text"
                name="price"
                value={roomItem.price}
                onChange={handleInput}
                autoComplete="off"
              />

              <div className="detail half half-half" style={{ border: "none" }}>
                <div>
                  <select
                    name="rating"
                    onChange={handleInput}
                    value={roomItem.rating}
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                </div>
                <div>
                  <select
                    name="capacity"
                    onChange={handleInput}
                    value={roomItem.capacity}
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                    <option value={11}>11</option>
                    <option value={12}>12</option>
                    <option value={13}>13</option>
                    <option value={14}>14</option>
                    <option value={15}>15</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <p className="label">Services</p>
              <div className="detail" onChange={checkHandleInput}>
                <div>
                  <input type="checkbox" name="wifi" checked={service.wifi} />
                  Wi-Fi
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="parking"
                    checked={service.parking}
                  />
                  Parking
                </div>
                <div>
                  <input type="checkbox" name="pets" checked={service.pets} />
                  Pets
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="children"
                    checked={service.children}
                  />
                  Children
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="roomService"
                    checked={service.roomService}
                  />
                  Room-Service
                </div>
                <div>
                  <input type="checkbox" name="pool" checked={service.pool} />
                  Pool
                </div>
              </div>
            </div>

            {error.price.status && (
              <>
                <BiErrorCircle style={{ color: "red" }} />{" "}
                <span style={{ color: "red" }}>{error.price.text}</span>
              </>
            )}
            {error.rating.status && (
              <>
                <BiErrorCircle style={{ color: "red" }} />{" "}
                <span style={{ color: "red" }}>{error.rating.text}</span>
              </>
            )}
            {error.capacity.status && (
              <>
                <BiErrorCircle style={{ color: "red" }} />{" "}
                <span style={{ color: "red" }}>{error.capacity.text}</span>
              </>
            )}
          </div>

          <Button
            onClick={() => postFunc()}
            // style={{ margin: "0" }}
          >
            Edit Detail
          </Button>
        </CreatePostDiv>
      </Container>
    </>
  );
};

const Container = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: start;
  width: 100%;
  padding: 0 2rem;
`;

const CreatePostDiv = styled.div`
  height: auto;
  width: 60%;
  background: #fff;
  .image-upload {
    height: 14rem;
    width: 100%;
    border: 1px solid lightgrey;
    border-radius: 0.3rem;
    display: flex;
    justify-content: start;
    align-items: start;
    flex-wrap: wrap;
    gap: 1.5%;
    overflow: hidden;
    padding: 0.5rem;
    .img {
      width: 32.3%;
      height: 50%;
    }
  }
  .form {
    width: 100%;
    margin-top: 1rem;
    font-size: 0.8rem;
    &:focus {
      outline: none;
    }
    .label {
      color: grey;
      padding: 0.3rem 0.2rem 0.2rem 0;
    }
    .half {
      width: 50%;
    }
    .detail {
      width: 100%;
      min-height: 25px;
      border: 1px solid lightgrey;
      padding: 0.3rem;
      margin: 0 0.2rem 0.2rem 0;
      border-radius: 0.3rem;
    }

    .half-half {
      display: flex;
      div{
      width: 50%;
    }
  }
`;

const Button = styled.button`
    background: #3151b5;
    color: #fff;
    margin: 0.5rem 0;
    padding: 0.5rem;
    border: none;
    border-radius: 0.25rem;
    transition: all 0.1s ease-in-out;
    &:hover{
      background: #2c387e;
    }
}
`;

export default EditRoom;