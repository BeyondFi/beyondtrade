import React from "react";
import PairSearch from "../../atomic/trade/PairSearch";
import PairTable from "./PairTable";

function PairSelection() {
  return (
    <div className="w-56">
      <PairSearch />
      <PairTable />
    </div>
  );
}

export default PairSelection;
