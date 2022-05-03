import logo from "./logo.svg";
import "./App.css";
import "antd/dist/antd.css";
import Main from "./Components/Main";
import { Table } from "antd";
import { PageHeader } from "antd";

function App() {
  return (
    <div className="App">
      <PageHeader title="F1 Data Visualization" />
      <Main />
    </div>
  );
}

export default App;
