import { InfluxDB } from "@influxdata/influxdb-client";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

const url = process.env.INFLUXDB_URI || "";
const token = process.env.INFLUXDB_TOKEN;

const influxDB = new InfluxDB({ url, token });
dayjs.extend(timezone);
dayjs.extend(utc);

type queryResponce = {
  result: string;
  table: number;
  _start: string;
  _stop: string;
  _time: string;
  _value: number;
  _field: string;
  _measurement: string;
  _timeJP: string;
};

export async function getLatestValueOnInflux(
  org: string,
  bucket: string,
  deviceName: string
) {
  const response: queryResponce[] = await influxDB.getQueryApi(org).collectRows(
    `from(bucket: "${bucket}") \
      |> range(start: -2d)
      |> filter(fn: (r) => r["_measurement"] == "sensors")
      |> filter(fn: (r) => r["_field"] == "${deviceName}")
      |> last()`
  );
  // console.log(response)
  const data = response.map((item) => {
    return {
      ...item,
      _timeJP: dayjs(item._time).tz("Asia/Tokyo").format("MM/DD HH:mm:ss"),
    };
  });
  return data;
}

export async function getDeviceValuesOnInflux(
  org: string,
  bucket: string,
  deviceName: string,
  time: string
) {
  const response: queryResponce[] = await influxDB.getQueryApi(org).collectRows(
    `from(bucket: "${bucket}") \
      |> range(start: -${time}d)
      |> filter(fn: (r) => r["_measurement"] == "sensors")
      |> filter(fn: (r) => r["_field"] == "${deviceName}")`
  );
  // console.log(response)
  const data = response.map((item) => {
    return {
      ...item,
      _timeJP: dayjs(item._time).tz("Asia/Tokyo").format("MM/DD HH:mm:ss"),
    };
  });
  const min =
    Math.floor(
      data.reduce((prev, current) => Math.min(prev, current._value), Infinity) *
        100
    ) / 100;
  const max =
    Math.ceil(
      data.reduce(
        (prev, current) => Math.max(prev, current._value),
        -Infinity
      ) * 100
    ) / 100;

  return { data, min, max };
}
