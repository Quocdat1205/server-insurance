export const INSURANCE_ABI = [
  {
    inputs: [
      {
        internalType: 'address payable',
        name: 'addressNain',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
    ],
    name: 'ChainlinkCancelled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
    ],
    name: 'ChainlinkFulfilled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
    ],
    name: 'ChainlinkRequested',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_idInsurance',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_buyer',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'deposit',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'asset',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_current_price',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_liquidation',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_expire',
        type: 'uint256',
      },
    ],
    name: 'EBuyInsurance',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'requestId',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'volume',
        type: 'uint256',
      },
    ],
    name: 'ERequestVolume',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [],
    name: 'EUpdateStateInsurance',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferRequested',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_buyer',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_value',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_asset',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_current_price',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_liquidation_price',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_expire',
        type: 'uint256',
      },
    ],
    name: 'buyInsurance',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: '_idInsurance',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'asset',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'insurance_price',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'current_price',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'state',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'expire',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'recognition_date',
            type: 'uint256',
          },
        ],
        internalType: 'struct InsuranceNami.InsuranceStruct',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_requestId',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: '_volume',
        type: 'uint256',
      },
    ],
    name: 'fulfill',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_idInsurance',
        type: 'uint256',
      },
    ],
    name: 'getInsuranceById',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: '_idInsurance',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'asset',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'insurance_price',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'current_price',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'state',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'expire',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'recognition_date',
            type: 'uint256',
          },
        ],
        internalType: 'struct InsuranceNami.InsuranceStruct',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getTotalInsurance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'requestVolumeData',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'requestId',
        type: 'bytes32',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_idInsurance',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'state',
        type: 'string',
      },
    ],
    name: 'updateStateInsurance',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: '_idInsurance',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'value',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'asset',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'insurance_price',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'current_price',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'state',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'expire',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'recognition_date',
            type: 'uint256',
          },
        ],
        internalType: 'struct InsuranceNami.InsuranceStruct',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'volume',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
