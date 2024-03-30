// will let google pick and choose the type of authentication
/* 
    this is boiler plate to authenticate with google api
*/
import { GoogleAuth } from "google-auth-library";

async function main() {
  const auth = new GoogleAuth({
    scopes: "https://www.googleapis.com/auth/cloud-platform",
  });
  const client = await auth.getClient();
  const projectId = await auth.getProjectId();
  const url = `https://dns.googleapis.com/dns/v1/projects/${projectId}`;
  const res = await client.request({ url });
  console.log(res.data);
}

main().catch(console.error);
