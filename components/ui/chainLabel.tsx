/* eslint-disable @next/next/no-img-element */
import * as React from "react"
import { Chain } from "@/types/common"
import Image from "next/image"

type ChainLabelProps = {
    chain: Chain
}

function ChainLabel({ chain }: ChainLabelProps) {
    return (
        chain === Chain.ETH ? (
            <p className="flex flex-row items-center justify-center space-x-1">
                {" "}
                <img
                    src="/images/ETHEREUMsmall.png"
                    alt="eth"
                    className=" w-4 h-4"
                  
                ></img>
                <p className=" text-opacity-70 text-white text-sm">ETH</p>
            </p>
        ) : (
            <p className="flex flex-row items-center justify-center space-x-1">
                {" "}
                <img
                    src="/images/AVAILsmall.png"
                    alt="avail"
                    className=" w-4 h-4"
                 
                ></img>
                <p className=" text-opacity-70 text-white text-sm m">AVAIL</p>
            </p>
        )
    )
}

export { ChainLabel }
