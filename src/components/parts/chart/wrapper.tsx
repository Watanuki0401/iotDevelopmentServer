import { UserChartComponent } from "@/components/parts/chart/chartcontents"
import { getDeviceValuesOnInflux } from "@/lib/influxdb/queries"

export async function ChartViewer({org, bucket, deviceName}: {org?: string | null, bucket: string|null, deviceName: string}) {
  if(!org || !bucket || !deviceName) return <div>failure</div>;

  const {data, min, max} = await getDeviceValuesOnInflux(org, bucket, deviceName, "10")

  return (
    <UserChartComponent data={data} min={min} max={max} deviceName={deviceName}/>
  )
}