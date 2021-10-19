import React, { useState } from "react";
import Main from "./components/Main";
import "./App.css";

const App: React.FC = () => {

    const [value, setValue] = useState(0);

    return (
        <div className="App">
            <Main />
        </div>
    );
};
export default App;
