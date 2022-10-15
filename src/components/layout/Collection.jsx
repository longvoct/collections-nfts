import React from "react";
import styled from "styled-components";
import PAP from "../../assets/top-collection/PAP.png";
import Ethereum from "../../assets/outside/ethereum.png";

const CollectionStyles = styled.div`
  .cell {
    position: relative;
    height: 80px;
    border-radius: 12px;
    padding: 10px 20px;
    &:after {
      content: "";
      position: absolute;
      inset: 0;
      border: 1px solid transparent;
      border-radius: 12px;
      background: linear-gradient(
          93deg,
          rgba(235, 235, 235, 0) -6.21%,
          rgba(235, 235, 235, 0.33) -6.2%,
          rgba(219, 219, 219, 0.14) 118.18%
        )
        border-box;
      -webkit-mask: linear-gradient(#fff 0 0) padding-box,
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
    }
  }
`;

const Collection = () => {
  return (
    <CollectionStyles>
      <div className="cell flex justify-between  text-[14px]">
        <div className="cell-left flex  gap-[6px]">
          <img
            src={PAP}
            alt=""
            className="rounded-full w-[60px] h-[60px] object-cover"
          />
          <div className="title flex flex-col py-[5px]">
            <span className="font-bold">Prime Ape Planet </span>
            <div className="mt-auto flex gap-[5px] items-center">
              <span>Floor price:</span>
              <img src={Ethereum} alt="" className="h-[20px]" />
              <span>97.99</span>
            </div>
          </div>
        </div>

        <div className="cell-right flex flex-col items-end py-[5px]">
          <span className="text-[#1CFD76]">+194.13%</span>
          <div className="mt-auto flex gap-[5px] items-center">
            <img src={Ethereum} alt="" className="h-[20px]" />
            <span className="text-[#FF910F]">36,294.95</span>
          </div>
        </div>
      </div>
    </CollectionStyles>
  );
};

export default Collection;
