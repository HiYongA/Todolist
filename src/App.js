import { useState } from "react"; // {useState} hook을 react 경로로 불러온다.
import "./App.css"; // css를 불러온다.

const App = () => {
  const [users, setUsers] = useState([
    { id: 1, title: "리액트 공부하기", content: "Todo 추가하기", isDone: true },
    {
      id: 2,
      title: "리액트 공부하기",
      content: "Todo 삭제/완료하기",
      isDone: false,
    }, // item
  ]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };
  const conChangeHandler = (event) => {
    setContent(event.target.value);
  };

  // 추가 버튼 클릭
  const clickAddButtonHandler = (e) => {
    e.preventDefault();
    // 1. 새로운 형태의 이놈을 만든다.
    // 2. 이놈 : { id: 1, age: 30, name: "송중기" }
    // 3. 이놈을 배열에 더한다.
    const newUser = {
      id: users.length + 1,
      title: title,
      content,
      isDone: false, // 미완료 상태이기 때문에
    };
    // 스프레드 문법, 불변성을 유지해서 React로 하여금 state가 바뀌었다는 것을 인식하기 위해서 하는거예요.
    setUsers([...users, newUser]);
  };

  // 삭제 버튼 클릭
  const clickRemoveButtonHandler = (id) => {
    const newUsers = users.filter((user) => user.id !== id);
    setUsers(newUsers);
  };

  // 취소, 완료 버튼 클릭
  const clickEditButtonHandler = (e, id) => {
    e.preventDefault();
    const addWorkiing = users.map((initial) => {
      if (initial.id === id) {
        return {
          ...initial,
          isDone: !initial.isDone,
        };
      } else {
        return { ...initial };
      }
    });
    setUsers(addWorkiing);
  };

  return (
    <form action="">
      <div>
        <div className="header-style">
          <div>My Todo List</div>
          <div>React</div>
        </div>
        <div className="input-style">
          <div className="input">
            <b>제목</b>
            <input
              className="add-input"
              value={title}
              onChange={titleChangeHandler}
              required
            />
            <b>내용</b>
            <input
              className="add-input"
              value={content}
              onChange={conChangeHandler}
            />
          </div>
          <div className="button">
            <button className="add-button" onClick={clickAddButtonHandler}>
              <b>추가하기</b>
            </button>
          </div>
        </div>
        <div className="app-style">
          <b className="font-size">Working.. 🔥</b>
          {users
            .filter((item) => item.isDone == false)
            .map((item) => {
              console.log(item);
              return (
                <div key={item.id} className="component-style">
                  <b>{item.title}</b>
                  <br />
                  {item.content} <br />
                  <button
                    className="delete-botton"
                    onClick={() => clickRemoveButtonHandler(item.id)}
                  >
                    삭제하기
                  </button>
                  <button onClick={(e) => clickEditButtonHandler(e, item.id)}>
                    {item.isDone ? "취소" : "완료"}
                  </button>
                </div>
              );
            })}
          <b className="font-size">Done..! 🎉</b>
          {users
            .filter((item) => item.isDone == true)
            .map((item) => {
              console.log(item);
              return (
                <div key={item.id} className="component-style">
                  <b>{item.title}</b>
                  <br />
                  {item.content} <br />
                  <button onClick={() => clickRemoveButtonHandler(item.id)}>
                    삭제하기
                  </button>
                  <button onClick={(e) => clickEditButtonHandler(e, item.id)}>
                    {item.isDone ? "취소" : "완료"}
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </form>
  );
};

export default App;
