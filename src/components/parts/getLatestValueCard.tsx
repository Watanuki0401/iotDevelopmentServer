import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLatestValueOnInflux } from "@/lib/influxdb/queries";

export async function LatestValueComponent({org, bucket, deviceName}: {org?: string | null, bucket: string|null, deviceName: string}) {
  if(!org) return "ko";
  if(!bucket) return "ko";
  // console.log(org, bucket, deviceName)
  const data = await getLatestValueOnInflux(org, bucket, deviceName)

  // console.log(data)

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle className="text-lg font-medium">デバイス : {deviceName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid">
          <h1>Latest Value</h1>
          {data[0] ? (
            <>
            <div>{data[0]._value}</div>
            <div>{data[0]._timeJP}</div>
            </>
          ) : (
            <div>Nodata</div>
          )}
          
        </div>
      </CardContent>
    </Card>
  )
}