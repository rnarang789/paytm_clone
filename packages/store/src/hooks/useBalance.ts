import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { balanceAtom } from "../atoms/balance";

export const useBalance = () => {
  const value = useRecoilValue(balanceAtom);
  return value;
};

export const updateBalance = (num: number) => {
  const fn = useSetRecoilState(balanceAtom);
  fn(num);
};
