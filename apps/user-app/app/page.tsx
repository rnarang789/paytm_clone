import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import { redirect } from "next/navigation";

export default async function Page(): Promise<JSX.Element> {
  // return (
  //   <div>
  //     <button onClick={Redirect}>CLICK ME!</button>
  //   </div>
  // );

  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect("/dashboard");
  } else {
    redirect("/api/auth/signin");
  }
}

// async function Redirect() {
//   const tokenJson = await getToken();
//   const token = tokenJson.data.token;

//   window.location.href = `http://localhost:5173/hdfc/${token}`;
// }

// async function getToken() {
//   const baseUrl = "http://localhost:3000";
//   const token = await axios.post(`${baseUrl}/api/transaction`, {
//     //TODO:: Update body
//     body: {},
//   });

//   return token;
// }
