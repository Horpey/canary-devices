import { useState, useEffect } from "react";
import { useAsync } from "react-use";
import Link from "next/link";
import { Card, Table, notification } from "antd";
import { StylesWrapper } from "./styles";
import Api from "../../helper/api";

export default function HomeView() {
  const api = new Api();
  const [loading, setLoading] = useState(true);
  const [deviceCount, setDeviceCount] = useState("-");
  const [allDevices, setAllDevices] = useState([]);

  const [columns, setColumns] = useState([
    {
      title: "S/N",
      dataIndex: "sn",
      key: "sn",
    },
    {
      title: "Device Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Link href={`/device/${record.key}`}>
          <a>View Device</a>
        </Link>
      ),
    },
  ]);

  useAsync(async () => {
    try {
      setLoading(true);
      api
        .getAllDevices()
        .then((response) => {
          const { data } = response;
          const sortedDevicesList = data.sort((a, b) => {
            return a.name.localeCompare(b.name);
          });
          const devicesList = sortedDevicesList.map((device, index) => {
            return {
              key: device.id,
              sn: index + 1,
              name: device.name
                .replace(/_/g, " ")
                .replace(/(^|\s)\S/g, function (t) {
                  return t.toUpperCase();
                }),
            };
          });

          setAllDevices(devicesList);
        })
        .catch((err) => {
          notification.error({
            message: "Oops!",
            description: "Something went wrong!, Unable to load devices",
          });
        });

      api
        .getDeviceCount()
        .then((response) => {
          const { data } = response;
          setDeviceCount(data.count);
        })
        .catch((err) => {
          notification.error({
            message: "Oops!",
            description: "Something went wrong!, Unable to get device count",
          });
        });
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <StylesWrapper>
      <div>
        <p>Welcome to Canary Devices</p>
        <h1>All Devices - {deviceCount}</h1>
        <Card className="cardstyle" style={{ width: "100%" }}>
          <Table loading={loading} dataSource={allDevices} columns={columns} />
        </Card>
      </div>
    </StylesWrapper>
  );
}
