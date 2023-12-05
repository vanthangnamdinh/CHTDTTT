"use client";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Spin,
  message,
  notification,
} from "antd";
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
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const [disable, setDisable] = useState(true);
  const validateStartDate = (_rule: unknown, value: string) => {
    if (!value && !form.getFieldValue("ga")) {
      return Promise.reject("Vui lòng nhập số tiền mỗi bữa ăn");
    } else if (form.getFieldValue("ga") < 35000) {
      return Promise.reject("Số tiền nhập vào không đủ để tính toán");
    }
    return Promise.resolve();
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
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

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const resData = await res.json();
      setData(resData.data);
    } catch (error) {
      notification.error({
        message: "Lỗi server!",
      });
    } finally {
      setLoading(false);
    }
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
    {
      title: "Calo",
      dataIndex: "",
      render: (record) => {
        return record[2];
      },
    },
    {
      title: "Tổng tiền",
      dataIndex: "",
      render: (record) => {
        return record[3];
      },
    },
  ];
  return (
    <Spin tip="Loading..." spinning={loading}>
      <div className=" container w-full flex justify-center items-center m-auto">
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
                  name={"ga"}
                  rules={[{ required: true, validator: validateStartDate }]}
                >
                  <Input
                    type="number"
                    className="h-10 w-56 input-price "
                    onChange={(e) => {
                      Number(e.target.value) >= 35000
                        ? setDisable(false)
                        : setDisable(true);
                    }}
                    placeholder="Nhập trong khoảng 35000-80000"
                  />
                </Form.Item>
                <Button
                  type="primary"
                  disabled={disable}
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
              {data.map((item: Data, index) => {
                return (
                  <>
                    <div key={index} className=" mt-4">
                      <span className="title-table text-black ">
                        {`Generation ${item?.gen}  Fitness: ${item?.fitness}`}
                      </span>
                      <Row className="mb-2 table">
                        <Table
                          className="w-[50vw]"
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
    </Spin>
  );
};
export default GA;
type Data = {
  gen: number;
  fitness: number;
  data: [];
};
