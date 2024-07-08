import { useState } from "react";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Comming Soon</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <div>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4OTpMSw0dyLk2vahdpl2juD-95MV3el9vnQ&s"
          alt=""
        />
      </div>
    </>
  );
}

export default App;
