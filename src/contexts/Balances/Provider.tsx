import React, { useCallback, useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import { useWallet } from "use-wallet";
import { provider } from "web3-core";

import { yamv2 as yamV2Address, KAWA as KawaAddress, yycrvUniLp as yyrcvUniLpAddress, YAMETHSLPAddress } from "constants/tokenAddresses";
import { getBalance } from "utils";

import Context from "./Context";

const Provider: React.FC = ({ children }) => {
  const [yamV2Balance, setYamV2Balance] = useState<BigNumber>();
  const [kawaBalance, setKawaBalance] = useState<BigNumber>();
  const [yycrvUniLpBalance, setYycrvUniLpBalance] = useState<BigNumber>();
  const [YAMETHLPBalance, setYAMETHLPBalance] = useState<BigNumber>();

  const { account, ethereum }: { account: string | null; ethereum: provider } = useWallet();

  const fetchBalances = useCallback(
    async (userAddress: string, provider: provider) => {
      const balances = await Promise.all([
        await getBalance(provider, yamV2Address, userAddress),
        await getBalance(provider, KawaAddress, userAddress),
        await getBalance(provider, yyrcvUniLpAddress, userAddress),
        await getBalance(provider, YAMETHSLPAddress, userAddress),
      ]);
      setYamV2Balance(new BigNumber(balances[0]).dividedBy(new BigNumber(10).pow(24)));
      setKawaBalance(new BigNumber(balances[1]).dividedBy(new BigNumber(10).pow(18)));
      setYycrvUniLpBalance(new BigNumber(balances[2]).dividedBy(new BigNumber(10).pow(18)));
      setYAMETHLPBalance(new BigNumber(balances[3]).dividedBy(new BigNumber(10).pow(18)));
    },
    [setYamV2Balance, setKawaBalance, setYycrvUniLpBalance, setYAMETHLPBalance]
  );

  useEffect(() => {
    if (account && ethereum) {
      fetchBalances(account, ethereum);
    }
  }, [account, ethereum, fetchBalances]);

  useEffect(() => {
    if (account && ethereum) {
      fetchBalances(account, ethereum);
      let refreshInterval = setInterval(() => fetchBalances(account, ethereum), 10000);
      return () => clearInterval(refreshInterval);
    }
  }, [account, ethereum, fetchBalances]);

  return (
    <Context.Provider
      value={{
        yamV2Balance,
        kawaBalance,
        yycrvUniLpBalance,
        YAMETHLPBalance,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
