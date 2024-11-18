import { InfluxDB } from "@influxdata/influxdb-client";
import {
  OrgsAPI,
  UsersAPI,
  AuthorizationsAPI,
  BucketsAPI,
} from "@influxdata/influxdb-client-apis";

const url = process.env.INFLUXDB_URI || "";
const token = process.env.INFLUXDB_TOKEN;

const influxDB = new InfluxDB({ url, token });

async function createInfluxUser(
  user: string,
  password: string
): Promise<string | null> {
  // Call api instance
  const usersAPI = new UsersAPI(influxDB);
  const orgsAPI = new OrgsAPI(influxDB);
  const authorizationsAPI = new AuthorizationsAPI(influxDB);

  // create user section
  try {
    const userData = await usersAPI.postUsers({
      body: {
        name: user,
      },
    });
    const orgsData = await orgsAPI.postOrgs({
      body: {
        name: user,
      },
    });

    if (!userData.id || !orgsData.id) return null;

    await orgsAPI.postOrgsIDMembers({
      orgID: orgsData.id,
      body: {
        id: userData.id,
      },
    });
    const authorizationData = await authorizationsAPI.postAuthorizations({
      body: {
        description: `read ${user}'s bucket.`,
        orgID: orgsData.id,
        userID: userData.id,
        permissions: [
          {
            action: "read",
            resource: {
              type: "buckets",
            },
          },
          {
            action: "write",
            resource: {
              type: "buckets",
            },
          },
        ],
      },
    });

    if (!authorizationData.token) return null;

    await usersAPI.postUsersIDPassword({
      userID: userData.id,
      body: {
        password,
      },
    });
    return authorizationData.token;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function createBucket(bucketName: string, name: string) {
  const bucketsAPI = new BucketsAPI(influxDB);
  const orgsAPI = new OrgsAPI(influxDB);

  try {
    const orgs = await orgsAPI.getOrgs();
    const org = orgs.orgs?.find((org) => org.name === name);
    if (!org) return null;

    const bucket = await bucketsAPI.postBuckets({
      body: {
        name: bucketName,
        orgID: org.id || "",
      },
    });

    return bucket;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export { createInfluxUser, createBucket };
