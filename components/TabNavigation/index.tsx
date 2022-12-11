import React from "react";
import Trade from "../../pages/Trade";
import DexSwap from "../DexSwap";

type TabNavigationProps = {};

const TabNavigation = (props: TabNavigationProps) => {
  return (
    <div>
      <div className="flex justify-center ">
        <ul className="flex border-b border-gray-100">
          <li className="flex-1">
            <a className="relative block p-4" href="">
              <span className="absolute inset-x-0 -bottom-px h-px w-full bg-pink-600"></span>

              <div className="flex items-center justify-center">
                <i className="ri-swap-line"></i>

                <span className="ml-3 text-sm font-medium text-gray-900">
                  Trade
                </span>
              </div>
            </a>
          </li>

          <li className="flex-1">
            <a className="relative block p-4" href="">
              <div className="flex items-center justify-center">
                <i className="ri-file-2-line"></i>

                <span className="ml-3 text-sm font-medium text-gray-900">
                  Docs
                </span>
              </div>
            </a>
          </li>

          <li className="flex-1">
            <a className="relative block p-4" href="">
              <div className="flex items-center justify-center">
                <i className="ri-bar-chart-2-line"></i>

                <span className="ml-3 text-sm font-medium text-gray-900">
                  Stat
                </span>
              </div>
            </a>
          </li>

          <li className="flex-1">
            <a className="relative block p-4" href="">
              <div className="flex items-center justify-center">
                <i className="ri-history-line"></i>

                <span className="ml-3 text-sm font-medium text-gray-900">
                  History
                </span>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div className="flex justify-center">
        <DexSwap />
      </div>
    </div>
  );
};

export default TabNavigation;
