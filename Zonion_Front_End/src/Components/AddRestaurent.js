import React, { useState, useEffect } from "react";
import TimePicker from "react-time-picker";
import axios from "axios";
import Timekeeper from "react-timekeeper";

function AddRestaurent() {
  const [restaurentName, setRestaurentName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState();
  const [openningTime, setOpenningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [restaurents, setRestaurents] = useState([]);
  const [restroId, setRestroId] = useState("");
  const [edit, setEdit] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [lastUpdated, setUpdated] = useState(new Date().toLocaleString());
  const [srcImg, setImg] = useState("");
  const [showTime, setShowTime] = useState(true);
  const [showOpenningTime, setShowOpenningTime] = useState(true);
  const [closeClosingTime, setCloseClosingTime] = useState(false);
  const [closeOpenningTime, setCloseOpenningTime] = useState(false);
  const [activate, setActivate] = useState(true);
  const [acknowledegement, setAcknowledegement] = useState('')

  function validate() {
    let isValidate = false;
    if (restaurentName.length == 0 || !restaurentName.match(/^[A-Za-z0-9\s]+$/)) {
      alert("enter valid name");
      isValidate = false;
      return isValidate;
   
    } else if (restaurentName.length > 0) {
      isValidate = true;
   
    }
    if (address.length == 0) {
      alert("enter valid address");
      isValidate = false;
      return isValidate;
   
    } else if (address.length > 0) {
      isValidate = true;
    }

    if (!phone.match(/^[789]\d{9}$/)) {
      alert("please enter correct number starting from 7,9,8 ");
      isValidate = false;
      return isValidate;
   
    } else if (phone.match("^[789]d{9}$")) {
      isValidate = true;
    }
    return isValidate;

  }
  const re_render = () => {
    axios
      .get("http://localhost:1337/restaurent")
      .then((res) => {
        console.log(res.data);
        setRestaurents(res.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    re_render();
  }, []);

  const handleEdit = (r) => {
    setRestaurentName(r.restaurentName);
    setAddress(r.address);
    setPhone(r.phone);
    setOpenningTime(r.openningTime);
    setClosingTime(r.closingTime);
    setRestroId(r.id);
    setEdit(true);
    setIsEdited(true);
    setUpdated(new Date().toLocaleString());
    setImg(r.srcImg);
    setActivate(activate);
    console.log("while editing", activate);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:1337/restaurent/${id}`)
      .then((res) => {
        console.log(res.data);
        setAcknowledegement("Restaurant deleted...")
        re_render();
      })
      .catch((error) => console.log(error));
  };
  const handleActivation = (restro) => {
    setActivate(!restro);
  };

  const onFileChange = (event) => {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      console.log("RESULT", reader.result);
      setImg(reader.result);
    };
    var res = reader.readAsDataURL(file);
    console.log("asd", res);
  };

  const submithandler = async (e) => {
    e.preventDefault();
    // console.log(validate())
    if (validate()) {
      if (setEdit && restroId) {
        e.preventDefault();
        console.log("last updated=", lastUpdated);
        await axios
          .put(`http://localhost:1337/restaurent/${restroId}`, {
            restaurentName,
            address,
            phone,
            openningTime,
            closingTime,
            lastUpdated,
            srcImg,
            activate,
          })
          .then((res) => {
            console.log(res.data);
            setAcknowledegement("restaurent edit successful...!!!")
            re_render();
          })
          .catch((error) => console.log(error));
      } else {
        {
          setUpdated(new Date().toLocaleTimeString())
          await axios
            .post("http://localhost:1337/restaurent", {
              restaurentName,
              address,
              phone,
              openningTime,
              closingTime,
              lastUpdated,
              srcImg,
              activate,
            })
            .then((res) => {
              console.log(res.data);
                setAcknowledegement("New Restaurant Added...")
              re_render();
            })
            .catch((error) => console.log(error));
        }
      }
    }
    else{
      alert("please enter valid information...")
    }
  };

  return (
    <div className="container ">
      <form className="form-formation">
        <div className="form-group ">
          <h1>Add New Restaurant</h1>
          <input
            className="form-align"
            placeholder="Enter Restaurant Name "
            type="text"
            value={restaurentName}
            onChange={(e) => setRestaurentName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <textarea
            className="form-align"
            placeholder="Enter Address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            className="form-align"
            type="number"
            placeholder="Enter phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-group">
          Openning-Time{" "}
          {closeOpenningTime ? (
            <Timekeeper
              openningTime={openningTime}
              onChange={(newTime) => setOpenningTime(newTime.formatted24)}
              onDoneClick={() => setCloseOpenningTime(false)}
            />
          ) : (
            <button onClick={() => setCloseOpenningTime(true)}>Open</button>
          )}
          <span>time is{openningTime} AM </span>
        </div>
        <div className="form-group">
          Closing-Time{" "}
          {closeClosingTime ? (
            <Timekeeper
              closingTime={closingTime}
              onChange={(newTime) => setClosingTime(newTime.formatted24)}
              onDoneClick={() => setCloseClosingTime(false)}
            />
          ) : (
            <button onClick={() => setCloseClosingTime(true)}>Open</button>
          )}
          <span>time is{closingTime} PM </span>
        </div>
        <div>
          <label for="restaurantImg">Select an image file:</label>
          <input
            type="file"
            id="restaurantImg"
            name="restaurantImg"
            onChange={(e) => onFileChange(e)}
          ></input>
          <br/>
         { srcImg? <img
            src={srcImg}
            alt="Menu-image/card"
            width="500"
            height="600"
          ></img>:null }
         
        </div>
        <div className="form-group">
          <button onClick={submithandler} className="btn btn-primary">
            submit
          </button>
        </div>
      <h2> Acknowledegement:{acknowledegement} </h2>

      </form>
      <table className="table table-hover table-dark">
        <thead>
          <tr>
            <th>Restaurent</th>
            <th>Address</th>
            <th>OpenningTime</th>
            <th>ClosingTime</th>
            <th>last_Updated</th>
            <th>Activate</th>
          </tr>
        </thead>
        <tbody>
          {restaurents.map((restaurent) => (
            <tr>
              <td> {restaurent.restaurentName} </td>
              <td> {restaurent.address} </td>
              <td> {restaurent.openningTime} </td>
              <td> {restaurent.closingTime} </td>
              <td> {restaurent.lastUpdated} </td>
              <td>
                <button
                  className={
                    restaurent.activate
                      ? "btn btn-outline-success"
                      : "btn btn-outline-danger"
                  }
                  onClick={() => handleActivation(restaurent.activate)}
                >
                  {restaurent.activate ? "Activated" : "deactivated"}
                </button>{" "}
              </td>
              <td>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => handleEdit(restaurent)}
                >
                  edit
                </button>
              </td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleDelete(restaurent.id)}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AddRestaurent;
