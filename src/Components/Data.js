import { Table } from "antd";
import React from "react";

const Data = ({ data }) => {
  const { dataColumns } = data;

  const columns = dataColumns.map((column) => {
    return {
      title: column,
      dataIndex: column,
      key: column,
      render: (text) => <a>{text}</a>,
    };
  });

  return <Table columns={columns} dataSource={data.data} scroll={{ y: 260 }} />;
};

export default Data;
