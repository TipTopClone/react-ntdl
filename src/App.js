import { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({});
  const [taskList, setTaskList] = useState([]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const obj = {
      ...form,
      type: "entry",
      id: randomStr(),
    };

    setTaskList([...taskList, obj]);
  };

  const handleOnDelte = (id, task) => {
    if (window.confirm(`Are you sure you want to delete  ${task}?`)) {
      //filter
      const filteredArg = taskList.filter((item) => item.id !== id);

      setTaskList(filteredArg);
    }
  };

  const randomStr = () => {
    const charLength = 6;
    const str = "qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM";
    let id = "";

    for (let i = 0; i < charLength; i++) {
      const randNum = Math.round(Math.random() * (str.length - 1));
      id += str[randNum];
    }

    return id;
  };

  const switchTask = (id, type) => {
    const arg = taskList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          type,
        };
      }

      return item;
    });

    setTaskList(arg);
  };

  const entry = taskList.filter((item) => item.type === "entry");
  const bad = taskList.filter((item) => item.type === "bad");

  console.log(taskList);
  return (
    <div class="wrapper">
      <div class="container">
        {/* <!-- top title  --> */}
        <div class="row g-2">
          <div class="col mt-5 text-center">
            <h1>Not to do list</h1>
          </div>
        </div>

        {/* <!-- form  --> */}
        <form
          onSubmit={handleOnSubmit}
          class="mt-5 border p-5 rounded shadow-lg bg-transparent"
        >
          <div class="row g-2">
            <div class="col-md-6">
              <input
                type="text"
                class="form-control"
                placeholder="Coding.."
                aria-label="First name"
                name="task"
                required
                onChange={handleOnChange}
              />
            </div>
            <div class="col-md-3">
              <input
                type="number"
                min="1"
                class="form-control"
                placeholder="23"
                aria-label="Last name"
                name="hr"
                required
                onChange={handleOnChange}
              />
            </div>
            <div class="col-md-3">
              <div class="d-grid">
                <button class="btn btn-primary">Add Task</button>
              </div>
            </div>
          </div>
        </form>

        {/* <!-- table area  --> */}
        <div class="row mt-5 pt-2">
          {/* <!-- 1. entry list --> */}
          <div class="col-md">
            <h3 class="text-center">Task Entry List</h3>
            <hr />
            <table class="table table-striped table-hover border opacity">
              <tbody id="entry">
                {entry.map((item, i) => (
                  <tr key={item.id}>
                    <td>{i + 1}</td>
                    <td>{item.task}</td>
                    <td>{item.hr}hr</td>
                    <td class="text-end">
                      <button
                        onClick={() => handleOnDelte(item.id, item.task)}
                        class="btn btn-danger"
                      >
                        <i class="fa-solid fa-trash"></i>
                      </button>
                      <button
                        onClick={() => switchTask(item.id, "bad")}
                        class="btn btn-success"
                      >
                        <i class="fa-solid fa-arrow-right"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* <!-- 2. bad list  --> */}
          <div class="col-md">
            <h3 class="text-center">Bad List</h3>
            <hr />
            <table class="table table-striped table-hover border opacity">
              <tbody id="bad">
                {bad.map((item, i) => (
                  <tr key={item.id}>
                    <td>{i + 1}</td>
                    <td>{item.task}</td>
                    <td>{item.hr}hr</td>
                    <td class="text-end">
                      <button
                        onClick={() => switchTask(item.id, "entry")}
                        class="btn btn-warning"
                      >
                        <i class="fa-solid fa-arrow-left"></i>
                      </button>
                      <button
                        onClick={() => handleOnDelte(item.id, item.task)}
                        class="btn btn-danger"
                      >
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div class="alert alert-info">
              You could have save = <span id="badHr">0</span>hr
            </div>
          </div>
        </div>

        {/* <!-- toat time allocated --> */}
        <div class="alert alert-info">
          Total hrs per week allocated = <span id="totalHr">0</span>hr
        </div>
      </div>
    </div>
  );
}

export default App;
