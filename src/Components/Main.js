import React from "react";
import { Input } from "antd";

import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { notification, Divider, Space } from "antd";

import Data from "./Data";

const { TextArea } = Input;
const Main = () => {
  const [value, setValue] = React.useState("");

  const [data, setData] = React.useState({ data: [], dataColumns: [] });

  const openNotification = (content) => {
    notification.info({
      description: content,
      placement: "top",
    });
  };

  const onQuerySubmit = async () => {
    if (value) {
      try {
        const data = await fetch(
          "http://127.0.0.1:5000/crudoperations",
          {
            method: "POST",
            body: JSON.stringify({ query: value }),
            headers: { "Content-Type": "application/json" },
          }
        );
        const json = await data.json();
        const { result } = json;
        const columns = result[0];
        let tableData = result.slice(1);
        tableData = tableData.map((row, index) => {
          let rowData = {};
          for (let i = 0; i < row.length; i++) {
            rowData[columns[i]] = row[i];
          }
          rowData.key = index;
          return rowData;
        });
        setData({ data: tableData, dataColumns: columns });
      } catch (error) {
        openNotification("query failed");
        setData({ data: [], dataColumns: [] });
      }
    }
  };

  return (
    <div>
      <div>Run your query here</div>
      <TextArea
        showCount
        style={{ height: "8%", width: "40%" }}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <Button
        type="primary"
        shape="round"
        icon={<SearchOutlined />}
        onClick={onQuerySubmit}
        style={{ marginTop: "2vh" }}
      >
        search
      </Button>
      <Data data={data} />
    </div>
  );
};

export default Main;
