import { useState, useEffect } from "react";
import { useAsync } from "react-use";
import Link from "next/link";
import { Card, notification, Spin } from "antd";
import { StylesWrapper } from "./styles";
import Api from "../../helper/api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

const DeviceView = ({ id }) => {
  const api = new Api();
  const [loading, setLoading] = useState(true);
  const [deviceData, setDeviceData] = useState([]);
  const [renderChart, setRenderChart] = useState(false);

  const [options, setOptions] = useState({
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  });

  const [data, setData] = useState();

  const viewDeviceName = (device) => {
    if (!device) return;
    return device.replace(/_/g, " ").replace(/(^|\s)\S/g, function (t) {
      return t.toUpperCase();
    });
  };

  const filterReadings = (readings, type) => {
    if (!readings) return;
    const filteredReadings = readings.filter(
      (reading) => reading.type === type
    );
    return filteredReadings;
  };

  useAsync(async () => {
    try {
      setLoading(true);
      api
        .getDeviceByID(id)
        .then((response) => {
          const { data } = response;
          setDeviceData(data);
        })
        .catch((err) => {
          notification.error({
            message: "Oops!",
            description: "Something went wrong!, Unable to load device data",
          });
        });

      api
        .getDeviceReadings(id)
        .then((response) => {
          const { data } = response;

          let labels = [];
          labels = data.map((reading) => reading.created);
          setData({
            labels,
            datasets: [
              {
                label: "Temperature",
                data: filterReadings(data, "temperature").map(
                  (reading) => reading.value
                ),
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
              },
              {
                label: "Humidity",
                data: filterReadings(data, "humidity").map(
                  (reading) => reading.value
                ),
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
              },
              {
                label: "Air Quality",
                data: filterReadings(data, "air_quality").map(
                  (reading) => reading.value
                ),
                borderColor: "rgb(240 134 19)",
                backgroundColor: "rgba(240, 134, 19, 0.5)",
              },
            ],
          });

          setRenderChart(true);
        })
        .catch((err) => {
          notification.error({
            message: "Oops!",
            description:
              "Something went wrong!, Unable to load device readings",
          });
        });
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <StylesWrapper>
      <div>
        <Link href="/">
          <a>← View all devices</a>
        </Link>
        {loading ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px 0px",
            }}
          >
            <Spin />
            <p>Loading...</p>
          </div>
        ) : (
          <>
            <h1>{viewDeviceName(deviceData.name) || "..."}</h1>

            <Card className="cardstyle" style={{ width: "100%" }}>
              {renderChart && <Line options={options} data={data} />}
            </Card>
          </>
        )}
      </div>
    </StylesWrapper>
  );
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default DeviceView;
