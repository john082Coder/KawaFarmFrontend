import kawaCoin from "../../assets/kawaCoin.svg";
import shibaCoin from "../../assets/shibaCoin.svg";
import kishuCoin from "../../assets/kishuCoin.svg";
import akitaCoin from "../../assets/akitaCoin.svg";
import dogeCoin from "../../assets/dogeCoin.svg";
export const contractAddresses = {
  erc20: {
    42: "0x175D9b7BEf31cC753D1d94Ee70d90F23aBF94070",
    1: "0x0",
    4: "0x2f997B58a2a21f179dd76De40aA2277C81948084",
  },
  farm: {
    42: "0x91B35B2f90f283A093e14B2d8578Afcd67C18876",
    1: "0x0",
    4: "0xcD985084E40C62033779BfC664f543c483363Fa7",
  },
  weth: {
    42: "0xa050886815cfc52a24b9c4ad044ca199990b6690",
    1: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    4: "0xc778417e063141139fce010982780140aa0cd5ab",
  },
};

export const supportedPools = [
  {
    pid: 0,
    lpAddresses: {
      42: "0xf9f89F9dF418664cFAF5f8669d846269e49Ca6f1",
      1: "0x0",
      4: "0x073f6BF68De1f157508aa00baB5F6B2f544382bE",
    },
    farmAddresses: {
      4: "0x41cA4c2aE4B2a80E7f1955ff544be02c9da8ae37",
    },
    tokenAddresses: {
      42: "0x175D9b7BEf31cC753D1d94Ee70d90F23aBF94070",
      1: "0x0",
      4: "0xa3a5F9dC5FD2b7170Aaac1d749d609a3783bf383",
    },
    name: "KAWA",
    symbol: "KAWA",
    tokenSymbol: "xKawa",
    icon: kawaCoin,
    poolTitle: "Kawakami Inu Pool",
    pool: "100%",
  },
  {
    pid: 1,
    lpAddresses: {
      42: "0xf9f89F9dF418664cFAF5f8669d846269e49Ca6f1",
      1: "0x0",
      4: "0x37d3C98483745bc273B813c16922D76020C40BBA",
    },
    farmAddresses: {
      4: "0xf868eAC45EDf821CF7ccd05bcbE383B97855498F",
    },
    tokenAddresses: {
      42: "0x175D9b7BEf31cC753D1d94Ee70d90F23aBF94070",
      1: "0x0",
      4: "0xa3a5F9dC5FD2b7170Aaac1d749d609a3783bf383",
    },
    name: "SHIB",
    symbol: "SHIB",
    tokenSymbol: "xKawa",
    icon: shibaCoin,
    poolTitle: "Shiba Inu Pool",
    pool: "100%",
  },
  {
    pid: 2,
    lpAddresses: {
      42: "0xf9f89F9dF418664cFAF5f8669d846269e49Ca6f1",
      1: "0x0",
      4: "0x020b2db78e5603271f623C9A6bF73A3758293319",
    },
    farmAddresses: {
      4: "0x398aDBe8e62eeA6e2ce70294457545D186C2ac14",
    },
    tokenAddresses: {
      42: "0x175D9b7BEf31cC753D1d94Ee70d90F23aBF94070",
      1: "0x0",
      4: "0xa3a5F9dC5FD2b7170Aaac1d749d609a3783bf383",
    },
    name: "ELON",
    symbol: "ELON",
    tokenSymbol: "xKawa",
    icon: dogeCoin,
    poolTitle: "Dogelon Pool",
    pool: "100%",
  },
  {
    pid: 3,
    lpAddresses: {
      42: "0xf9f89F9dF418664cFAF5f8669d846269e49Ca6f1",
      1: "0x0",
      4: "0x37d3C98483745bc273B813c16922D76020C40BBA",
    },
    farmAddresses: {
      4: "0xcD985084E40C62033779BfC664f543c483363Fa7",
    },
    tokenAddresses: {
      42: "0x175D9b7BEf31cC753D1d94Ee70d90F23aBF94070",
      1: "0x0",
      4: "0xa3a5F9dC5FD2b7170Aaac1d749d609a3783bf383",
    },
    name: "KISHU",
    symbol: "KISHU",
    tokenSymbol: "xKawa",
    icon: kishuCoin,
    poolTitle: "Kishu Inu Pool",
    pool: "100%",
  },
  {
    pid: 4,
    lpAddresses: {
      42: "0xf9f89F9dF418664cFAF5f8669d846269e49Ca6f1",
      1: "0x0",
      4: "0xf4aF961bDf68c2c3fD6f9C87BF78852Ac7d7068f",
    },
    tokenAddresses: {
      42: "0x175D9b7BEf31cC753D1d94Ee70d90F23aBF94070",
      1: "0x0",
      4: "0xa3a5F9dC5FD2b7170Aaac1d749d609a3783bf383",
    },
    farmAddresses: {
      4: "0x19F494d25e945e139940861A7859717346470D7D",
    },
    name: "AKITA",
    symbol: "AKITA",
    tokenSymbol: "xKawa",
    icon: akitaCoin,
    poolTitle: "Akita Inu Pool",
    pool: "100%",
  },
];
