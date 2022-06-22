import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
} from "@material-ui/core";

import EditRoom from "./EditRoom";

import { BiErrorCircle } from "react-icons/bi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const AllRooms = () => {
  const [allRooms, setAllRooms] = useState(null);

  const [currentData, setCurrentData] = useState(undefined);
  const [editDataModel, setEditDataModel] = useState(false);

  // const [deleteModel, setDeleteModel] = useState(false);

  const [alert, setAlert] = useState(false);
  const [alertDiv, setAlertDiv] = useState({
    class: "",
    message: "",
  });

  const [model, setModel] = useState({
    status: false,
    heading: "",
    btnText: "",
    func: "",
  });

  const fetchAllRooms = async () => {
    try {
      let { data } = await axios.get("/room/allrooms");
      //   console.log(data.response);
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

  const deleteDataFunc = async (item) => {
    setTimeout(() => setAlert(false), 3000);
    // console.log(item)
    try {
      let { data } = await axios.delete(`/room/delete/${item._id}`);
      // console.log(data);
      if (data.status) {
        setAlertDiv({
          class: "success",
          message: data.response,
        });
        setAlert(true);
        fetchAllRooms();
        // setDeleteModel(false)
      }
    } catch (error) {
      console.log(error);
      setAlertDiv({
        class: "error",
        message: "Error: Some error!",
      });
      setAlert(true);
    }
  };

  const editDataFunc = async (item) => {
    // console.log(item);
    setCurrentData(item);
    setEditDataModel(true);
  };

  const closeEditModel = () => {
    fetchAllRooms();
    setEditDataModel(false);
  };

  // console.log(allRooms);

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

      {model.status && (
        <Model>
          <h4>{model.heading}</h4>
          <p>You can not undo it</p>
          <div className="buttons">
            <Button
              onClick={() => setModel(false)}
              style={{
                background: "#fff",
                color: "#000",
                border: "1px solid grey",
              }}
            >
              Cancel
            </Button>
            <Button
              style={{ color: "#fff", background: "red" }}
              onClick={() => {
                eval(model.func);
              }}
            >
              {model.icon}
              {model.btnText}
            </Button>
          </div>
        </Model>
      )}

      {editDataModel ? (
        <>
          <EditModel>
            <Button className="close-btn" onClick={() => closeEditModel()}>
              Close
            </Button>
            <EditRoom room={currentData} />
          </EditModel>
        </>
      ) : (
        <>
          <h2 style={{ margin: "0 0 1rem 0" }}>All Rooms</h2>
          <Table style={{ overflow: "scroll" }}>
            <TableHead style={{ backgroundColor: "#000" }}>
              <TableRow>
                <TableCell style={{ color: "#fff" }}>Image</TableCell>
                <TableCell style={{ color: "#fff" }}>City</TableCell>
                <TableCell style={{ color: "#fff" }}>Rating</TableCell>
                <TableCell style={{ color: "#fff" }}>Category</TableCell>
                <TableCell style={{ color: "#fff" }}>Type</TableCell>
                <TableCell style={{ color: "#fff" }}>Price</TableCell>
                <TableCell style={{ color: "#fff" }}>Date</TableCell>
                <TableCell style={{ color: "#fff" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allRooms &&
                allRooms.map((item) => (
                  <>
                    <TableRow key={item._id}>
                      <NavLink
                        to={`/room/${item._id}`}
                        style={{ textDecoration: "none", color: "#000" }}
                      >
                        <TableCell>
                          <img
                            src={item.image[0]}
                            alt="pic"
                            style={{
                              width: "5rem",
                              height: "5em",
                            }}
                          />
                        </TableCell>
                      </NavLink>
                      <TableCell>
                        <NavLink
                          to={`/room/${item._id}`}
                          style={{ textDecoration: "none", color: "#000" }}
                        >
                          {item.city}
                        </NavLink>
                      </TableCell>
                      <TableCell>{item.rating}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>{item.date.slice(0, 12)}</TableCell>
                      <TableCell>
                        <div
                          style={{
                            display: "flex",
                          }}
                        >
                          <Button onClick={() => editDataFunc(item)}>
                            Edit
                          </Button>
                          <Button
                            onClick={() =>
                              setModel({
                                status: true,
                                heading: "Do you want to delete product?",
                                btnText: "Delete product",
                                func: `deleteDataFunc("${item._id}")`,
                              })
                            }
                            style={{ background: "#f44336" }}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>

                    {/* {deleteModel && (
                  <Model>
                    <h4>Do you want to delete order?</h4>
                    <p>You can not undo it</p>
                    <div className="buttons">
                      <Button
                        onClick={() => setDeleteModel(false)}
                        style={{
                          background: "#fff",
                          color: "#000",
                          border: "1px solid grey",
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        style={{ color: "#fff", background: "red" }}
                        onClick={() => deleteDataFunc(item)}
                      >
                        Delete Order
                      </Button>
                    </div>
                  </Model>
                )} */}
                  </>
                ))}
            </TableBody>
          </Table>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 1rem 2rem;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    ${"" /* display: none; */}
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

const EditModel = styled.div`
  width: 100%;
  position: relative;
  .close-btn {
    position: absolute;
    top: 0;
    right: 0;
  }
`;

const Model = styled.div`
  width: 50%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
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
    justify-content: center;
  }
`;

export default AllRooms;
