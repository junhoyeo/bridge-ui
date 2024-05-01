
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Chain } from "@/types/common";
import { TxnData } from "@/types/transaction";
import { getTransactionsFromIndexer } from "@/services/transactions";
import useEthWallet from "@/hooks/useEthWallet";

export default function LatestTransactions(props: { pending: boolean }) {
  const {activeUserAddress} = useEthWallet()
  const [latestTransactions, setLatestTransactions] = useState<TxnData[]>([]);

  useEffect(() => {
    (async () => {
      if(!activeUserAddress) return;

      const txnData = await getTransactionsFromIndexer(activeUserAddress, Chain.ETH, Chain.AVAIL,);
      setLatestTransactions(txnData);
    })();
  }, [activeUserAddress]);


  return (
    <div className="flex flex-col ">
      <div className="rounded-xl overflow-scroll-y max-h-[35vh]">
        <Table>
          {props.pending ? (
            <TableBody>
              {latestTransactions
                .filter((txn) => txn.status !== "CLAIMED")
                .map((txn, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium w-full flex flex-row space-x-2">
                      <p className="flex flex-col">
                        <p className="text-white text-opacity-60 flex flex-col items-center justify-center">
                          <p className="text-white text-md">
                            {`${new Date(
                              txn.sourceTransactionTimestamp
                            ).toLocaleDateString("en-GB", { day: "numeric" })}
   `}{" "}
                          </p>
                          <p>{` ${new Date(txn.sourceTransactionTimestamp)
                            .toLocaleDateString("en-GB", { month: "short" })
                            .toUpperCase()}`}</p>
                        </p>
                        {/* <p className="text-white text-opacity-60">{` ${new Date(
                        txn.sourceTransactionTimestamp
                      ).getHours()}${new Date(
                        txn.sourceTransactionTimestamp
                      ).getMinutes()}`}</p> */}
                      </p>
                      <p className="flex flex-col space-y-1 ">
                        <p className="flex flex-row w-full">
                          {" "}
                          {txn.sourceChain === Chain.ETH ? (
                            <p className="flex flex-row space-x-1">
                              {" "}
                              <Image
                                src="/images/eth.png"
                                alt="eth"
                                width={18}
                                height={14}
                              ></Image>
                              <p>ETH</p>
                            </p>
                          ) : (
                            <p className="flex flex-row space-x-1">
                              {" "}
                              <Image
                                src="/images/logo.png"
                                alt="avail"
                                width={16}
                                height={1}
                              ></Image>
                              <p>AVAIL</p>
                            </p>
                          )}{" "}
                          <p className="px-1">{` --> `}</p>{" "}
                          {txn.destinationChain === Chain.ETH ? (
                            <p className="flex flex-row space-x-1">
                              {" "}
                              <Image
                                src="/images/eth.png"
                                alt="eth"
                                width={18}
                                height={14}
                              ></Image>
                              <p>ETH</p>
                            </p>
                          ) : (
                            <p className="flex flex-row space-x-1">
                              {" "}
                              <Image
                                src="/images/logo.png"
                                alt="avail"
                                width={16}
                                height={1}
                              ></Image>
                              <p>AVAIL</p>
                            </p>
                          )}{" "}
                        </p>

                        <p className="flex flex-row space-x-2">
                          <p className="text-white text-opacity-60 text-xs ml-2">
                            {" "}
                            Sent 1200 AVAIL
                          </p>
                        </p>
                      </p>

                      <br />
                    </TableCell>
                    <TableCell>
                      {txn.status === "READY_TO_CLAIM" ? (
                        <>
                          <Button variant="primary" onClick={() => { }}>
                            {txn.status === "READY_TO_CLAIM"
                              ? "Claim"
                              : txn.status}
                          </Button>
                        </>
                      ) : (
                        <>
                          <Badge>{txn.status}</Badge>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          ) : (
            <TableBody>
              {latestTransactions
                .filter((txn) => txn.status === "CLAIMED")
                .map((txn, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium w-full flex flex-row space-x-2">
                      <p className="flex flex-col">
                        <p className="text-white text-opacity-60 flex flex-col items-center justify-center">
                          <p className="text-white text-md">
                            {`${new Date(
                              txn.sourceTransactionTimestamp
                            ).toLocaleDateString("en-GB", { day: "numeric" })}
   `}{" "}
                          </p>
                          <p>{` ${new Date(txn.sourceTransactionTimestamp)
                            .toLocaleDateString("en-GB", { month: "short" })
                            .toUpperCase()}`}</p>
                        </p>
                        {/* <p className="text-white text-opacity-60">{` ${new Date(
                        txn.sourceTransactionTimestamp
                      ).getHours()}${new Date(
                        txn.sourceTransactionTimestamp
                      ).getMinutes()}`}</p> */}
                      </p>
                      <p className="flex flex-col space-y-1 ">
                        <p className="flex flex-row w-full">
                          {" "}
                          {txn.sourceChain === Chain.ETH ? (
                            <p className="flex flex-row space-x-1">
                              {" "}
                              <Image
                                src="/images/eth.png"
                                alt="eth"
                                width={18}
                                height={14}
                              ></Image>
                              <p>ETH</p>
                            </p>
                          ) : (
                            <p className="flex flex-row space-x-1">
                              {" "}
                              <Image
                                src="/images/logo.png"
                                alt="avail"
                                width={16}
                                height={1}
                              ></Image>
                              <p>AVAIL</p>
                            </p>
                          )}{" "}
                          <p className="px-1">{` --> `}</p>{" "}
                          {txn.destinationChain === Chain.ETH ? (
                            <p className="flex flex-row space-x-1">
                              {" "}
                              <Image
                                src="/images/eth.png"
                                alt="eth"
                                width={18}
                                height={14}
                              ></Image>
                              <p>ETH</p>
                            </p>
                          ) : (
                            <p className="flex flex-row space-x-1">
                              {" "}
                              <Image
                                src="/images/logo.png"
                                alt="avail"
                                width={16}
                                height={1}
                              ></Image>
                              <p>AVAIL</p>
                            </p>
                          )}{" "}
                        </p>

                        <p className="flex flex-row space-x-2">
                          <p className="text-white text-opacity-60 text-xs ml-2">
                            {" "}
                            Sent 1200 AVAIL
                          </p>
                        </p>
                      </p>

                      <br />
                    </TableCell>
                    <TableCell>
                      <Badge>{txn.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          )}
        </Table>
      </div>
    </div>
  );
}
