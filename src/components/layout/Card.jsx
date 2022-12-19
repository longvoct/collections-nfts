import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import slugify from "slugify";
import styled from "styled-components";
import Ethereum from "../../assets/outside/ethereum.png";

const CardStyles = styled.div`
  .text-wrap {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .before-layout {
    top: 0;
    left: 0;
    background: linear-gradient(
      93deg,
      rgba(235, 235, 235, 0) -6.21%,
      rgba(235, 235, 235, 0.33) -6.2%,
      rgba(219, 219, 219, 0.02) 118.18%
    );
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
      drop-shadow(0px 4px 4px rgba(26, 25, 25, 0.25));
    backdrop-filter: blur(25px);
    z-index: 1;
    border-radius: 8px;
  }
  .after-layout {
    top: 13px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(180deg, #b444ff 0%, #f582ff 100%);
    backdrop-filter: blur(200px);
    border-radius: 8px;
    width: calc(100% - 28px);
    z-index: 0;
  }
`;

const Card = ({
  srcTop,
  name,
  owner,
  price,
  remaining,
  crypto,
  status,
  id,
  ...props
}) => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate(`/${slugify(name)}&query=${id}`);
  };

  return (
    <CardStyles>
      <div className="card-item h-[355px] flex flex-col relative p-[14px]">
        <div className="w-full h-full before-layout absolute"></div>
        <div className="h-full after-layout absolute"></div>
        <div className="content relative z-10 flex-col items-center ">
          <img
            src={srcTop}
            alt=""
            className="h-[240px] w-full object-cover rounded-lg cursor-pointer"
            onClick={handleNavigation}
          />
          <div className="px-1 text-[13px] flex-1 flex flex-col">
            <div className="top flex justify-between mt-[10px]">
              <div className="top-left flex flex-col">
                <div className="w-[140px]">
                  <span className="text-wrap cursor-pointer leading-[20px] font-bold">
                    {name}
                  </span>
                </div>
                <Link to="/collection/123">
                  <span className=" cursor-pointer leading-[16px]">
                    {owner}
                  </span>
                </Link>
              </div>
              <div className="top-right flex gap-[5px] font-bold">
                {crypto === 1 && (
                  <img
                    src={Ethereum}
                    alt=""
                    className="w-[18px] h-[18px] object-cover"
                  />
                )}
                <div className="w-[70px]">
                  <span className="text-wrap">
                    {parseFloat(price).toFixed(3).replace(/\.0+$/, "")} ETH
                  </span>
                </div>
              </div>
            </div>
            <div className="bottom mt-auto text-[#141118] font-[600] flex items-center justify-between">
              <div className="bottom-left ">
                <span className="cursor-pointer">
                  {parseInt(remaining?.slice(8, 10)) + 30}d{" "}
                  {parseInt(remaining?.slice(11, 13))}h{" "}
                  {parseInt(remaining?.slice(14, 16))}s
                </span>
              </div>
              <div className="bottom-right">
                <button
                  className="w-[90px] h-[34px] rounded-lg bg-[#FBFF2A]"
                  onClick={handleNavigation}
                >
                  {status === 1 && "Buy Now"}
                  {status === 0 && "Make Offer"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardStyles>
  );
};

export default Card;
