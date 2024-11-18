import { InfluxDB } from "@influxdata/influxdb-client";
import {
  BucketsAPI,
  OrgsAPI,
  UsersAPI,
} from "@influxdata/influxdb-client-apis";

const url = process.env.INFLUXDB_URI || "";
const token = process.env.INFLUXDB_TOKEN;

const influxDB = new InfluxDB({ url, token });

async function removeInfluxUser(username: string) {
  // Call api instance
  const usersAPI = new UsersAPI(influxDB);
  const orgsAPI = new OrgsAPI(influxDB);

  try {
    const rawUser = await usersAPI.getUsers({
      name: username,
    });
    const rawOrg = await orgsAPI.getOrgs({
      org: username,
    });
    if (!rawUser.users || !rawOrg.orgs) throw new Error("get error");

    const user = rawUser.users[0];
    const org = rawOrg.orgs[0];
    if (!user.id || !org.id) throw new Error("extract error");
    
    await usersAPI.deleteUsersID({
      userID: user.id,
    });
    await orgsAPI.deleteOrgsID({
      orgID: org.id,
    });

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

async function removeInfluxBuckets(
  org: string,
  bucketName: string,
) {
  const bucketAPI = new BucketsAPI(influxDB)

  try {
    const buckets = await bucketAPI.getBuckets({
      org,
    });
    if (!buckets.buckets) throw new Error("none Bucket");

    const bucket = buckets.buckets.find(item => item.name === bucketName);
    if (!bucket?.id) throw new Error("id none");
    const result = await bucketAPI.deleteBucketsID({
      bucketID: bucket.id
    })
    console.log(result)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export { removeInfluxUser, removeInfluxBuckets };
