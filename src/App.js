import { useState } from "react";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);

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
      title,
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
          제목 &nbsp;
          <input value={title} onChange={titleChangeHandler} />
          내용 &nbsp;
          <input value={content} onChange={conChangeHandler} />
          <button onClick={clickAddButtonHandler}>추가하기</button>
        </div>
        <div className="app-style">
          Working.. 🔥
          {users
            .filter((item) => item.isDone == false)
            .map((item) => {
              console.log(item);
              return (
                <div key={item.id} className="component-style">
                  {item.title} <br />
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
          Done..! 🎉
          {users
            .filter((item) => item.isDone == true)
            .map((item) => {
              console.log(item);
              return (
                <div key={item.id} className="component-style">
                  {item.title} <br />
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
