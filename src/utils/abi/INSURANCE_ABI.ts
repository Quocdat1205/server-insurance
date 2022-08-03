export const INSURANCE_ABI = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'idInsurance',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'buyer',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'cover_payout',
        type: 'uint256',
      },
      { indexed: false, internalType: 'string', name: 'asset', type: 'string' },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'insurance_value',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'current_price',
        type: 'uint256',
      },
      { indexed: false, internalType: 'string', name: 'state', type: 'string' },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'expire',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'recognition_date',
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
        indexed: false,
        internalType: 'uint256',
        name: 'idInsurance',
        type: 'uint256',
      },
    ],
    name: 'EUpdateStateInsurance',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'address', name: '_buyer', type: 'address' },
      { internalType: 'uint256', name: '_cover_payout', type: 'uint256' },
      { internalType: 'string', name: '_asset', type: 'string' },
      { internalType: 'uint256', name: '_current_price', type: 'uint256' },
      { internalType: 'uint256', name: '_insurance_value', type: 'uint256' },
      { internalType: 'uint256', name: '_expire', type: 'uint256' },
    ],
    name: 'createInsurance',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_insuranceId', type: 'uint256' },
    ],
    name: 'insuranceState',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'idInsurance', type: 'uint256' },
          { internalType: 'address', name: 'buyer', type: 'address' },
          { internalType: 'uint256', name: 'cover_payout', type: 'uint256' },
          { internalType: 'string', name: 'asset', type: 'string' },
          { internalType: 'uint256', name: 'insurance_value', type: 'uint256' },
          { internalType: 'uint256', name: 'current_price', type: 'uint256' },
          { internalType: 'string', name: 'state', type: 'string' },
          { internalType: 'uint256', name: 'expire', type: 'uint256' },
          {
            internalType: 'uint256',
            name: 'recognition_date',
            type: 'uint256',
          },
        ],
        internalType: 'struct Insurance.InsuranceStruct',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalInsurance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_idInsurance', type: 'uint256' },
      { internalType: 'string', name: '_state', type: 'string' },
    ],
    name: 'updateStateInsurance',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
