"use client";
import { Button, Col, Form, Input, Row, message } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useState } from "react";
import "./style.css";
interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}
const GA = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const handleSubmit = async () => {
    const ga = form.getFieldValue("ga");
    console.log(ga);

    const res = await fetch("http://localhost:3001/ga", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ga: ga }),
    });
    const resData = await res.json();
    setData(resData.data);
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "Thứ",
      dataIndex: "",
      render: (_value, _record, index) => {
        return `Thứ ${index + 2}`;
      },
    },
    {
      title: "Tinh bột",
      dataIndex: "",
      render: (record) => {
        return <div>Cơm trắng</div>;
      },
    },
    {
      title: "Món ăn giàu đạm",
      dataIndex: "",
      render: (record) => {
        return record[0];
      },
    },
    {
      title: "Món ăn giàu xơ",
      dataIndex: "",
      render: (record) => {
        return record[1];
      },
    },
  ];
  return (
    <div className=" container w-full flex justify-center items-center ">
      {contextHolder}
      {!(data.length > 0) ? (
        <Col className="h-screen  pt-12">
          <Row>
            <div className="flex">
              <h1 className="text-black text-5xl">
                Hệ thống lên thực đơn cho nhà trẻ 5 tuổi
              </h1>
            </div>
          </Row>
          <Row className="h-[80%] w-full justify-center flex items-center">
            <Form
              form={form}
              className="flex justify-center"
              onFinish={handleSubmit}
            >
              <Form.Item
                label={<span className="text-2xl">Nhập số tiền</span>}
                className="pr-4"
                required
                name={"ga"}
              >
                <Input
                  type="number"
                  className="input-price "
                  placeholder="Nhập trong khoảng 35000-80000"
                  min={35000}
                  addonAfter="VND"
                />
              </Form.Item>
              <Button
                type="primary"
                className="bg-blue-500 h-10 w-24"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Form>
          </Row>
        </Col>
      ) : (
        <>
          <div className=" content-table flex flex-col w-full justify-center items-center pt-10 pb-10">
            {data.map((item, index) => {
              return (
                <>
                  <div key={index} className="w-[50vw] mt-4">
                    <span className="title-table text-black ">
                      {`Generation ${item?.gen}  Fitness: ${item?.fitness}`}
                    </span>
                    <Row className="mb-2 table">
                      <Table
                        className="w-full"
                        dataSource={item?.data}
                        columns={columns}
                        pagination={false}
                      />
                    </Row>
                  </div>
                </>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
export default GA;
const sampleData = [
  {
    gen: 1,
    fitness: 14,
    data: [
      ["Thịt ba chỉ rang", "Canh rau đay"],
      ["Thịt ba chỉ luộc", "Canh rau muống"],
      ["Thịt bõ xào", "rau muống luộc"],
      ["Cá thu kho", "xu hào xào"],
      ["Thịt sốt đậu", "rau su su"],
    ],
  },
  {
    gen: 2,
    fitness: 14,
    data: [
      ["Thịt ba chỉ rang", "Canh rau đay"],
      ["Thịt ba chỉ luộc", "Canh rau muống"],
      ["Thịt bõ xào", "rau muống luộc"],
      ["Cá thu kho", "xu hào xào"],
      ["Thịt sốt đậu", "rau su su"],
    ],
  },
  {
    gen: 3,
    fitness: 14,
    data: [
      ["Thịt", "rau"],
      ["Thịt", "rau"],
      ["Thịt", "rau"],
      ["Thịt", "rau"],
      ["Thịt", "rau"],
    ],
  },
  {
    gen: 3,
    fitness: 14,
    data: [
      ["Thịt", "rau"],
      ["Thịt", "rau"],
      ["Thịt", "rau"],
      ["Thịt", "rau"],
      ["Thịt", "rau"],
    ],
  },
  {
    gen: 3,
    fitness: 14,
    data: [
      ["Thịt", "rau"],
      ["Thịt", "rau"],
      ["Thịt", "rau"],
      ["Thịt", "rau"],
      ["Thịt", "rau"],
    ],
  },
  {
    gen: 3,
    fitness: 14,
    data: [
      ["Thịt", "rau"],
      ["Thịt", "rau"],
      ["Thịt", "rau"],
      ["Thịt", "rau"],
      ["Thịt", "rau"],
    ],
  },
  {
    gen: 7,
    fitness: 15,
    data: [
      ["Thịt ba chỉ rang cháy", "rau của cải xào"],
      ["Thịt 7 món", "cà rốt luộc"],
      ["Cá thu hấp", "rau muống xào"],
      ["Thịt lợn rang", "rau su su xào"],
      ["Thịt bò xào", "rau đay nấu cua"],
    ],
  },
];
