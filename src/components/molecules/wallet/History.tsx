import React, { useEffect, useState } from "react";
import { getUserContractTransactions } from "../../../services/axios.service";
import { ContractLookup } from "../../../contracts/contracts.lookup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/reducers/Index";
import { Trade } from "../../../store/types/ExchangeState";
import { setTransations } from "../../../store/actions/ExchangeActions";
function History() {
  const { balances, selected } = useSelector(
    (state: RootState) => state.wallet
  );
  const dispatch=useDispatch()
  const { transationsHistory } = useSelector((state: RootState) => state.exchange);
  console.log(selected, "AND", ContractLookup);
  useEffect(() => {
    if(transationsHistory.length > 0) return
    ContractLookup.forEach((element, i) => {
      setTimeout(() => {
        getUserContractTransactions(
          element.contractAddress,
          selected.address
        ).then((res: Trade[]) =>
          res?.length > 0
            // ? setDataArray((prev: Trade[]) => [...prev, ...res])
           ? dispatch(setTransations(res))
            : null
        );
      }, 500 * i);
    });
  }, []);
  console.log("AFTER USEEFFECT >>>>>>>>.",transationsHistory)
  return (
    <div className="px-8 xl:px-24 lg:px-24 mt-8 mb-8">
      <div className="w-full bg-customGray-100 rounded mr-8">
        <div className="bg-gray-300 rounded-t pl-2 pt-2">
          <h3 className="font-medium text-xs xxl:text-lg text-gray-600">
            HISTORY
          </h3>
        </div>
        <table width="100%">
          <tr className="bg-gray-300 text-xxs xxl:text-base text-left text-gray-600 font-medium">
            <td className="w-1/5 pl-2 flex items-center">
              ASSETS
              <img
                src="/assets/Icons/up-down-arrow.svg"
                alt="img"
                className="ml-1 h-2"
              />
            </td>
            <td className="w-1/5">
              <div className="flex items-center">
                AMOUNT
                <img
                  src="/assets/Icons/up-down-arrow.svg"
                  alt="img"
                  className="ml-1 h-2"
                />
              </div>
            </td>
            <td className="w-1/5">
              <div className="flex items-center">
                DATE
                <img
                  src="/assets/Icons/up-down-arrow.svg"
                  alt="img"
                  className="ml-1 h-2"
                />
              </div>
            </td>
            <td className="w-1/5">
              <div className="flex items-center">
               CONFIRMATIONS
                <img
                  src="/assets/Icons/up-down-arrow.svg"
                  alt="img"
                  className="ml-1 h-2"
                />
              </div>
            </td>
            <td className="w-1/5">
              <div className="flex items-center">ACTION</div>
            </td>
          </tr>
          <tbody>
            {transationsHistory.map((item) => (
              <tr className="py-20 text-xs xxl:text-base border-b-2 text-left font-normal">
                <td className="w-1/5 pl-2 flex items-center my-2">
                  {item.tokenSymbol}
                </td>
                <td className="w-1/5">
                  {item.amount} {item.tokenSymbol}
                </td>
                <td className="w-1/5">
                  {item.time}
                </td>
                <td className="w-1/5">
                  {item.confirmations}
                </td>
                <td className="w-1/5">
                <a
                href={item.infoURL ? item.infoURL : "#"}
                style={item.infoURL === "" ? {pointerEvents:"none",cursor:"default",color:"gray"}:{}}
                target="_blank"
                className="focus:outline-none cursor-pointer text-customBlue-200 underline px-2 py-1 font-bold text-xs rounded-sm"
              >
                VIEW
              </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       {transationsHistory.length === 0 && <div className="py-20 flex justify-center items-center">
          <h6 className="text-gray-600 font-normal text-xs xxl:text-base">
            No exchange history found for associated wallet
          </h6>
        </div>} 
      </div>
    </div>
  );
}

export default History;
