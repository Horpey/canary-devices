import { useState, useEffect } from "react";
import { useAsync } from "react-use";
import moment from "moment";
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
  const [charts, setCharts] = useState([
    "temperature",
    "humidity",
    "air_quality",
  ]);

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
          labels = filterReadings(data, "temperature").map(
            (reading) => reading.id
            // moment(reading.created).format("ddd, MMM Do YYYY, h:mm:ss a")
          );

          setData({
            labels,
            datasets: [
              {
                label: "Temperature",
                data:
                  data &&
                  filterReadings(data, "temperature").map((reading) =>
                    Number(reading.value)
                  ),
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.6)",
                cubicInterpolationMode: "monotone",
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 4,
              },
              {
                label: "Humidity",
                data:
                  data &&
                  filterReadings(data, "humidity").map((reading) =>
                    Number(reading.value)
                  ),
                borderColor: "rgb(50, 108, 177)",
                backgroundColor: "rgba(50, 108, 177, 0.6)",
                cubicInterpolationMode: "monotone",
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 4,
              },
              {
                label: "Air Quality",
                data:
                  data &&
                  filterReadings(data, "air_quality").map((reading) =>
                    Number(reading.value)
                  ),
                borderColor: "rgb(146, 222, 24)",
                backgroundColor: "rgb(146, 222, 24, 0.6)",
                cubicInterpolationMode: "monotone",
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 4,
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
