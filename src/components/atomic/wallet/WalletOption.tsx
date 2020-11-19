import React from "react";
import { useDispatch } from "react-redux";
import {
  initializeWeb3
} from "../../../services/web3.service";
interface IProps {
  text: string;
  image: string;
  type: string;
  onConnected: Function;
}
function WalletOption(props: IProps) {
  const dispatch = useDispatch();


  const connectToWallet = async (value: any): Promise<any> => {
    await initializeWeb3(value, ()=>{props.onConnected()});
  };
  return (
    <button
      className="focus:outline-none flex border border-blue-300 bg-blue-300 rounded w-full mt-3"
      onClick={() => {
        connectToWallet(props.type);
      }}
    >
      <div className="py-4 w-24 flex justify-center rounded-l">
        <img src={props.image} className="h-8" />
      </div>
      <div
        className="w-full flex justify-center bg-white rounded-r text-sm font-medium"
        style={{ paddingTop: "24px", paddingBottom: "24px" }}
      >
        {props.text}
      </div>
    </button>
  );
}

export default WalletOption;
