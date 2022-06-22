import React, { useState, useEffect, useContext } from "react";
import { NavLink, useParams } from "react-router-dom";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Slider,
} from "@material-ui/core";

import axios from "axios";
import styled from "styled-components";

import Room from "../components/Room";

// import { UserContext } from "../App";

const AllRoomPage = () => {
  const { route } = useParams();
  // console.log(route);

  // const { state } = useContext(UserContext);
  // console.log(state);

  const [allRooms, setAllRooms] = useState(null);

  // // FILTERS
  const [usedFilter, setUsedFilter] = useState(false);
  const [filteredRooms, setFilteredRooms] = useState(null);

  const [category, setCategory] = useState(null);
  let categoryList = [];

  const [sortByValue, setSortByValue] = useState("");
  const [dualRangeValue, setDualRangeValue] = React.useState([500, 10000]);

  const fetchAllRooms = async () => {
    try {
      let { data } = await axios.get(`/room/${route}`);
      // console.log(data.response)
      if (data.status) {
        setAllRooms(data.response);
        setFilteredRooms(data.response);

        data.response.map((item) => {
          if (!categoryList.includes(item.category)) {
            categoryList.push(item.category);
          }
          // console.log(categoryList);
        });

        data.response.map((item) => {
          if (!categoryList.includes(item.type)) {
            categoryList.push(item.type);
          }
          // console.log(typeList);
        });
      }
      setCategory(categoryList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllRooms();
  }, []);

  // console.log(allRooms);
  // console.log(filteredRooms);

  // console.log(category);

  // console.log(usedFilter);

  const checkboxAllFunc = () => {
    document
      .querySelectorAll("input[type=checkbox]")
      .forEach((el) => (el.checked = false));
    // setCategory([]) // second option but rerender category

    fetchAllRooms();
    setUsedFilter(false);
  };

  const checkboxFunc = (e) => {
    // console.log(e.target.value);
    // console.log(e.target.checked);

    if (!usedFilter) {
      setFilteredRooms([]);
    }

    setUsedFilter(true);

    if (e.target.checked) {
      let newList = allRooms.map((item) => {
        if (item.category === e.target.value || item.type === e.target.value) {
          // console.log(item)
          setFilteredRooms((filteredRooms) => [
            ...filteredRooms,
            item,
          ]);
        }
      });
      // console.log(newList);
    } else {
      let newList = filteredRooms.filter(
        (item) =>
          item.category !== e.target.value && item.type !== e.target.value
      );
      // console.log(newList);
      setFilteredRooms(newList);
    }
  };

  const sortByHandleInput = async (e) => {
    // console.log(e.target.value);
    setSortByValue(e.target.value);

    if (e.target.value === 10) {
      // console.log("ten");

      try {
        let { data } = await axios.get(`/room/${route}`);
        // console.log(data.response)
        if (data.status) {
          setAllRooms(data.response);
          setFilteredRooms(data.response);
        }
      } catch (error) {
        console.log(error);
      }
    } else if (e.target.value === 20) {
      // console.log("twenty");

      try {
        let { data } = await axios.get(`/room/newest/${route}`);
        // console.log(data.response)
        if (data.status) {
          setAllRooms(data.response);
          setFilteredRooms(data.response);
        }
      } catch (error) {
        console.log(error);
      }
    } else if (e.target.value === 50) {
      // console.log("fifty");

      let lowToHigh = allRooms.sort((a, b) => a.price - b.price);
      // console.log(lowToHigh)

      setAllRooms(lowToHigh);
      setFilteredRooms(lowToHigh);
    } else if (e.target.value === 60) {
      // console.log("sixty");

      let highToLow = allRooms.sort((a, b) => b.price - a.price);
      // console.log(highToLow)

      setAllRooms(highToLow);
      setFilteredRooms(highToLow);
    } else {
      // console.log(e.target.value);
    }
  };

  const handleChangeDual = (event, newValue) => {
    setDualRangeValue(newValue);
    // console.log(newValue);
    // console.log(newValue[0])
    // console.log(newValue[1])

    if (allRooms) {
      let newList = allRooms.filter(
        (item) => item.price > newValue[0] && item.price < newValue[1]
      );
      // console.log(newList);
      setFilteredRooms(newList);
    }
  };

  const dualHandle0 = (e) => {
    // console.log(e.target.value);
    setDualRangeValue([e.target.value, dualRangeValue[1]]);

    if (allRooms) {
      let newList = allRooms.filter(
        (item) => item.price > e.target.value && item.price < dualRangeValue[1]
      );
      // console.log(newList);
      setFilteredRooms(newList);
    }
  };

  const dualHandle1 = (e) => {
    // console.log(e.target.value);
    setDualRangeValue([dualRangeValue[0], e.target.value]);

    if (allRooms) {
      let newList = allRooms.filter(
        (item) => item.price > dualRangeValue[0] && item.price < e.target.value
      );
      // console.log(newList);
      setFilteredRooms(newList);
    }
  };

  return (
    <>
      <Container>
        <nav>
          <SubCategory>
            <div className="all" onClick={() => checkboxAllFunc()}>
              All Rooms
            </div>

            {category &&
              category.map((item) => (
                <div className="checkbox">
                  <input
                    type="checkbox"
                    name="catgory"
                    value={item}
                    onClick={(e) => checkboxFunc(e)}
                    // checked={checked}
                  />
                  <span className="sub-room"> {item}</span>
                </div>
              ))}
          </SubCategory>

          <SortBy>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Sort By:</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sortByValue}
                label="Age"
                onChange={sortByHandleInput}
              >
                <MenuItem value={10}>None</MenuItem>
                <MenuItem value={20}>Newest Added</MenuItem>
                <MenuItem value={50}>Price: Low to High</MenuItem>
                <MenuItem value={60}>Price: High to Low</MenuItem>
              </Select>
            </FormControl>
          </SortBy>

          <DualRange>
            <h3>Price</h3>
            <Slider
              getAriaLabel={() => "Price range"}
              value={dualRangeValue}
              onChange={handleChangeDual}
              valueLabelDisplay="auto"
              defaultValue={10000}
              min={0}
              max={20000}
              // getAriaValueText={valuetext}
              style={{ color: "#000" }}
            />
            <div className="input">
              <span>र</span>{" "}
              <input
                className="number-input"
                type="number"
                min="0"
                max="20000"
                value={dualRangeValue[0]}
                onChange={dualHandle0}
              />
              <div style={{ color: "lightgrey" }}> - </div>
              <span>र</span>{" "}
              <input
                className="number-input"
                type="number"
                min="0"
                max="20000"
                value={dualRangeValue[1]}
                onChange={dualHandle1}
              />
            </div>
          </DualRange>
        </nav>

        <main>
          <h2>{route.toUpperCase()}</h2>
          <AllRooms>
            {filteredRooms && filteredRooms.map((room) => <Room room={room} />)}
          </AllRooms>
        </main>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: start;

  nav {
    min-height: 90vh;
    width: 20%;
    border-right: 1px solid lightgrey;
    padding: 0.8rem;
  }
  main {
    width: 80%;
    padding: 0 2rem;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    h2 {
      margin: 1rem 0;
    }
  }
`;

const AllRooms = styled.div`
  width: 100%;
`;

const SubCategory = styled.div`
  width: 100%;
  height: auto;
  ${"" /* border: 1px solid grey; */}

  .all {
    font-size: 1.4rem;
    font-weight: bold;
    margin: 0 0 0.2rem 0;
    background: #000;
    color: #fff;
    padding: 0.2rem 0.3rem;
    cursor: pointer;
  }
  .checkbox .sub-room {
    font-size: 1rem;
    color: grey;
  }
`;

const SortBy = styled.div`
  width: 100%;
  margin: 1.5rem 0;
  .select {
    width: 100%;
  }
`;

const DualRange = styled.div`
  width: 100%;
  margin: 1rem 0;
  ${"" /* border: 1px solid red; */}
  .input {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    .number-input {
      height:2rem;
      width: 50%;
      padding: 0 0.5rem;
      background: #f1f1f1;
      border: none;
    }
  }
`;

export default AllRoomPage;
