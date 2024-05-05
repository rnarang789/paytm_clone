"use client";

import { Appbar } from "@repo/ui/appbar";
import { Button } from "@repo/ui/button";

export default function Page(): JSX.Element {
  return (
    <div>
      <Appbar onSignIn={undefined} onSignOut={undefined}></Appbar>
    </div>
    // <div className="flex mt-40 justify-center">
    //   <Button onClick={() => {}}> login</Button>
    // </div>
  );
}
