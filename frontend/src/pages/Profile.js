import Profile from "../Component/Profile/Profile";
import React, { useEffect, useState } from 'react';
import axios from "axios";


function ProfilePage() {
  const [date, setDate] = useState('')
  const [toDos, setToDos] = useState([])
  const [toDo, setToDo] = useState('')
  const today = new Date();

  const handleToDo = async () => {
    const task = toDo.trim()
    if (!task || task == '') {
      return alert('please add a value')
    }
    const token = localStorage.getItem("todojwt");
    const { data } = await axios.post("http://localhost:4000/addTask", {
      todo: toDo
    }, {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token in the Authorization header
      },
    });

    console.log(data, "output");


    setToDos([...toDos, data.savedTodo])
    setToDo("")
  }


  useEffect(() => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = daysOfWeek[today.getDay()];

    setDate(dayName)

    const token = localStorage.getItem("todojwt");
    axios.post("http://localhost:4000/listTodo", {
      todo: toDo
    }, {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token in the Authorization header
      },
    }).then((res) => {
      console.log(res.data);
      setToDos(res.data)

    }).catch((err) => {
      console.log(err);
    })

  }, [])


  const deleteTask = async (id) => {
    console.log(id, "delete Id");
    const token = localStorage.getItem("todojwt");
    axios.delete(`http://localhost:4000/deleteTodo/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token in the Authorization header
      },
    }).then((res) => {
      console.log(res.data, "output on delete");
      const filteredOne = toDos.filter((todo) => {
        return todo._id !== res.data.todoId
      })
      console.log(filteredOne);
      // setToDo(filteredOne)

      setToDos((prev) => {
        return prev.filter((obj) => obj._id !== res.data.todoId);
      });
    })
  }


  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's {date} 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input type="text" value={toDo} onChange={(e) => setToDo(e.target.value)} placeholder="🖊️ Add item..." />

        <i onClick={handleToDo} className="fas fa-plus"></i>
      </div>
      <div className="todos">
        {
          toDos.map((obj) => {
            return (
              <div key={obj.id} className="todo">
                <div className="left">

                  <p >{obj.task}</p>
                </div>
                <div className="right">
                  <i onClick={() => deleteTask(obj._id)} className="fas fa-times"></i>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );

}

export default ProfilePage