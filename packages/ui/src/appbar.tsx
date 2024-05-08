import { Button } from "./button";

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  onSignIn: any;
  onSignOut: any;
}

export const Appbar = ({ user, onSignIn, onSignOut }: AppbarProps) => {
  return (
    <div className=" flex justify-between px-4 border-b border-slate-300">
      <div className="text-lg flex flex-col justify-center">PAYTM</div>
      <div className="text-lg flex flex-col justify-center pt-2">
        <Button onClick={user ? onSignOut : onSignIn}>
          {user ? "Logout" : "Login"}
        </Button>
      </div>
    </div>
  );
};
