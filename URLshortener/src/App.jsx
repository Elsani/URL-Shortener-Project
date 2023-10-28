// import { useState } from "react";
import { Box } from "@mui/material";
import {
  Flex,
  Button,
  Spacer,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Input,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import axios from "axios";
import index from "./index.css";
import imgsvg from "./assets/AnchorzUp logo[2602].svg";

function App() {
  // here we add a loader..
  const [loader, setLoader] = useState("false");
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);

  const fetchData = async () => {
    try {
      setLoader("true");
      const res = await axios(`https://api.shrtco.de/v2/shorten?url=${input}`);
      setLoader("false");
      setItems(res.data.result.full_short_link);
    } catch (err) {
      alert(err);
    }
  };

  //handle delete function

  function deleteItem(id) {
    const newArray = items.filter((item) => item.id !== id);
    setItems(newArray);
  }

  const handleClick = () => {
    fetchData();
    setInput("");
  };

  return (
    <Flex>
      <Box padding="0px 20px 550px 20px" className="box1" bgcolor="lightgray">
        <img className="svg" src={imgsvg} alt="" />
        <p>
          <b>My shortened URLs</b>
        </p>
        <UnorderedList className="rreshti" padding="10px">
          {/* Iterimi neper Liste nese kemi array */}

          {/* {items.map((item) => {
            return (

            )
          })}; */}
          <ListItem key={items.id}>
            {loader === "true" ? <p>Loading...</p> : <p>{items.value}</p>}
            <button className="butoni" onClick={() => deleteItem(item.id)}>
              <DeleteForeverOutlinedIcon />
            </button>
          </ListItem>
        </UnorderedList>
      </Box>
      <Box padding="200px 5px 20px 200px " className="box2">
        <div className="Container">
          <p>URL Shortener</p>

          <Input
            className="inputi"
            type="text"
            placeholder="Paste the URL to be Shortened "
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div>
            <Button
              className="Button"
              border="0px"
              colorScheme="pink"
              onClick={handleClick}
            >
              Shorten URL
            </Button>
          </div>
        </div>
      </Box>
      <Box padding="288px 40px">
        <Select className="Select" placeholder="Add expiration date">
          <option value="1 minute">1 minute</option>
          <option value="5 minute">5 minute</option>
          <option value="30 minute">30 minute</option>
          <option value="1 minute">1 hour</option>
          <option value="5 minute">5 hours</option>
        </Select>
      </Box>
    </Flex>
  );
}

export default App;
