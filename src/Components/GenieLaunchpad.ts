import {
  Cell,
  Slice,
  Address,
  Builder,
  beginCell,
  ComputeError,
  TupleItem,
  TupleReader,
  Dictionary,
  contractAddress,
  ContractProvider,
  Sender,
  Contract,
  ContractABI,
  ABIType,
  ABIGetter,
  ABIReceiver,
  TupleBuilder,
  DictionaryValue,
} from "ton-core";

export type StateInit = {
  $$type: "StateInit";
  code: Cell;
  data: Cell;
};

export function storeStateInit(src: StateInit) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeRef(src.code);
    b_0.storeRef(src.data);
  };
}

export function loadStateInit(slice: Slice) {
  let sc_0 = slice;
  let _code = sc_0.loadRef();
  let _data = sc_0.loadRef();
  return { $$type: "StateInit" as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
  let _code = source.readCell();
  let _data = source.readCell();
  return { $$type: "StateInit" as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
  let builder = new TupleBuilder();
  builder.writeCell(source.code);
  builder.writeCell(source.data);
  return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
    },
    parse: (src) => {
      return loadStateInit(src.loadRef().beginParse());
    },
  };
}

export type Context = {
  $$type: "Context";
  bounced: boolean;
  sender: Address;
  value: bigint;
  raw: Cell;
};

export function storeContext(src: Context) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeBit(src.bounced);
    b_0.storeAddress(src.sender);
    b_0.storeInt(src.value, 257);
    b_0.storeRef(src.raw);
  };
}

export function loadContext(slice: Slice) {
  let sc_0 = slice;
  let _bounced = sc_0.loadBit();
  let _sender = sc_0.loadAddress();
  let _value = sc_0.loadIntBig(257);
  let _raw = sc_0.loadRef();
  return {
    $$type: "Context" as const,
    bounced: _bounced,
    sender: _sender,
    value: _value,
    raw: _raw,
  };
}

function loadTupleContext(source: TupleReader) {
  let _bounced = source.readBoolean();
  let _sender = source.readAddress();
  let _value = source.readBigNumber();
  let _raw = source.readCell();
  return {
    $$type: "Context" as const,
    bounced: _bounced,
    sender: _sender,
    value: _value,
    raw: _raw,
  };
}

function storeTupleContext(source: Context) {
  let builder = new TupleBuilder();
  builder.writeBoolean(source.bounced);
  builder.writeAddress(source.sender);
  builder.writeNumber(source.value);
  builder.writeSlice(source.raw);
  return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeContext(src)).endCell());
    },
    parse: (src) => {
      return loadContext(src.loadRef().beginParse());
    },
  };
}

export type SendParameters = {
  $$type: "SendParameters";
  bounce: boolean;
  to: Address;
  value: bigint;
  mode: bigint;
  body: Cell | null;
  code: Cell | null;
  data: Cell | null;
};

export function storeSendParameters(src: SendParameters) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeBit(src.bounce);
    b_0.storeAddress(src.to);
    b_0.storeInt(src.value, 257);
    b_0.storeInt(src.mode, 257);
    if (src.body !== null && src.body !== undefined) {
      b_0.storeBit(true).storeRef(src.body);
    } else {
      b_0.storeBit(false);
    }
    if (src.code !== null && src.code !== undefined) {
      b_0.storeBit(true).storeRef(src.code);
    } else {
      b_0.storeBit(false);
    }
    if (src.data !== null && src.data !== undefined) {
      b_0.storeBit(true).storeRef(src.data);
    } else {
      b_0.storeBit(false);
    }
  };
}

export function loadSendParameters(slice: Slice) {
  let sc_0 = slice;
  let _bounce = sc_0.loadBit();
  let _to = sc_0.loadAddress();
  let _value = sc_0.loadIntBig(257);
  let _mode = sc_0.loadIntBig(257);
  let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
  return {
    $$type: "SendParameters" as const,
    bounce: _bounce,
    to: _to,
    value: _value,
    mode: _mode,
    body: _body,
    code: _code,
    data: _data,
  };
}

function loadTupleSendParameters(source: TupleReader) {
  let _bounce = source.readBoolean();
  let _to = source.readAddress();
  let _value = source.readBigNumber();
  let _mode = source.readBigNumber();
  let _body = source.readCellOpt();
  let _code = source.readCellOpt();
  let _data = source.readCellOpt();
  return {
    $$type: "SendParameters" as const,
    bounce: _bounce,
    to: _to,
    value: _value,
    mode: _mode,
    body: _body,
    code: _code,
    data: _data,
  };
}

function storeTupleSendParameters(source: SendParameters) {
  let builder = new TupleBuilder();
  builder.writeBoolean(source.bounce);
  builder.writeAddress(source.to);
  builder.writeNumber(source.value);
  builder.writeNumber(source.mode);
  builder.writeCell(source.body);
  builder.writeCell(source.code);
  builder.writeCell(source.data);
  return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
    },
    parse: (src) => {
      return loadSendParameters(src.loadRef().beginParse());
    },
  };
}

export type TokensDeposited = {
  $$type: "TokensDeposited";
  user: Address;
  amount: bigint;
};

export function storeTokensDeposited(src: TokensDeposited) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2689021525, 32);
    b_0.storeAddress(src.user);
    b_0.storeUint(src.amount, 256);
  };
}

export function loadTokensDeposited(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2689021525) {
    throw Error("Invalid prefix");
  }
  let _user = sc_0.loadAddress();
  let _amount = sc_0.loadUintBig(256);
  return { $$type: "TokensDeposited" as const, user: _user, amount: _amount };
}

function loadTupleTokensDeposited(source: TupleReader) {
  let _user = source.readAddress();
  let _amount = source.readBigNumber();
  return { $$type: "TokensDeposited" as const, user: _user, amount: _amount };
}

function storeTupleTokensDeposited(source: TokensDeposited) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.user);
  builder.writeNumber(source.amount);
  return builder.build();
}

function dictValueParserTokensDeposited(): DictionaryValue<TokensDeposited> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeTokensDeposited(src)).endCell());
    },
    parse: (src) => {
      return loadTokensDeposited(src.loadRef().beginParse());
    },
  };
}

export type TokensClaimedEvent = {
  $$type: "TokensClaimedEvent";
  user: Address;
  amount: bigint;
};

export function storeTokensClaimedEvent(src: TokensClaimedEvent) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3905047194, 32);
    b_0.storeAddress(src.user);
    b_0.storeUint(src.amount, 256);
  };
}

export function loadTokensClaimedEvent(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3905047194) {
    throw Error("Invalid prefix");
  }
  let _user = sc_0.loadAddress();
  let _amount = sc_0.loadUintBig(256);
  return {
    $$type: "TokensClaimedEvent" as const,
    user: _user,
    amount: _amount,
  };
}

function loadTupleTokensClaimedEvent(source: TupleReader) {
  let _user = source.readAddress();
  let _amount = source.readBigNumber();
  return {
    $$type: "TokensClaimedEvent" as const,
    user: _user,
    amount: _amount,
  };
}

function storeTupleTokensClaimedEvent(source: TokensClaimedEvent) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.user);
  builder.writeNumber(source.amount);
  return builder.build();
}

function dictValueParserTokensClaimedEvent(): DictionaryValue<TokensClaimedEvent> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(
        beginCell().store(storeTokensClaimedEvent(src)).endCell()
      );
    },
    parse: (src) => {
      return loadTokensClaimedEvent(src.loadRef().beginParse());
    },
  };
}

export type UpdateVestingSchedules = {
  $$type: "UpdateVestingSchedules";
  _vestingStartTime: bigint;
  _vestingDuration: bigint;
  _vestingInterval: bigint;
  _cliffDuration: bigint;
  _cliffPercentage: bigint;
};

export function storeUpdateVestingSchedules(src: UpdateVestingSchedules) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3896593200, 32);
    b_0.storeUint(src._vestingStartTime, 256);
    b_0.storeUint(src._vestingDuration, 256);
    b_0.storeUint(src._vestingInterval, 256);
    let b_1 = new Builder();
    b_1.storeUint(src._cliffDuration, 256);
    b_1.storeUint(src._cliffPercentage, 256);
    b_0.storeRef(b_1.endCell());
  };
}

export function loadUpdateVestingSchedules(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3896593200) {
    throw Error("Invalid prefix");
  }
  let __vestingStartTime = sc_0.loadUintBig(256);
  let __vestingDuration = sc_0.loadUintBig(256);
  let __vestingInterval = sc_0.loadUintBig(256);
  let sc_1 = sc_0.loadRef().beginParse();
  let __cliffDuration = sc_1.loadUintBig(256);
  let __cliffPercentage = sc_1.loadUintBig(256);
  return {
    $$type: "UpdateVestingSchedules" as const,
    _vestingStartTime: __vestingStartTime,
    _vestingDuration: __vestingDuration,
    _vestingInterval: __vestingInterval,
    _cliffDuration: __cliffDuration,
    _cliffPercentage: __cliffPercentage,
  };
}

function loadTupleUpdateVestingSchedules(source: TupleReader) {
  let __vestingStartTime = source.readBigNumber();
  let __vestingDuration = source.readBigNumber();
  let __vestingInterval = source.readBigNumber();
  let __cliffDuration = source.readBigNumber();
  let __cliffPercentage = source.readBigNumber();
  return {
    $$type: "UpdateVestingSchedules" as const,
    _vestingStartTime: __vestingStartTime,
    _vestingDuration: __vestingDuration,
    _vestingInterval: __vestingInterval,
    _cliffDuration: __cliffDuration,
    _cliffPercentage: __cliffPercentage,
  };
}

function storeTupleUpdateVestingSchedules(source: UpdateVestingSchedules) {
  let builder = new TupleBuilder();
  builder.writeNumber(source._vestingStartTime);
  builder.writeNumber(source._vestingDuration);
  builder.writeNumber(source._vestingInterval);
  builder.writeNumber(source._cliffDuration);
  builder.writeNumber(source._cliffPercentage);
  return builder.build();
}

function dictValueParserUpdateVestingSchedules(): DictionaryValue<UpdateVestingSchedules> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(
        beginCell().store(storeUpdateVestingSchedules(src)).endCell()
      );
    },
    parse: (src) => {
      return loadUpdateVestingSchedules(src.loadRef().beginParse());
    },
  };
}

export type DepositTokens = {
  $$type: "DepositTokens";
  _amount: bigint;
  _depositToken: Address;
};

export function storeDepositTokens(src: DepositTokens) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2085833122, 32);
    b_0.storeUint(src._amount, 256);
    b_0.storeAddress(src._depositToken);
  };
}

export function loadDepositTokens(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2085833122) {
    throw Error("Invalid prefix");
  }
  let __amount = sc_0.loadUintBig(256);
  let __depositToken = sc_0.loadAddress();
  return {
    $$type: "DepositTokens" as const,
    _amount: __amount,
    _depositToken: __depositToken,
  };
}

function loadTupleDepositTokens(source: TupleReader) {
  let __amount = source.readBigNumber();
  let __depositToken = source.readAddress();
  return {
    $$type: "DepositTokens" as const,
    _amount: __amount,
    _depositToken: __depositToken,
  };
}

function storeTupleDepositTokens(source: DepositTokens) {
  let builder = new TupleBuilder();
  builder.writeNumber(source._amount);
  builder.writeAddress(source._depositToken);
  return builder.build();
}

function dictValueParserDepositTokens(): DictionaryValue<DepositTokens> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeDepositTokens(src)).endCell());
    },
    parse: (src) => {
      return loadDepositTokens(src.loadRef().beginParse());
    },
  };
}

export type WithdrawToken = {
  $$type: "WithdrawToken";
  _tokenAmount: bigint;
  _token: Address;
};

export function storeWithdrawToken(src: WithdrawToken) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2629002631, 32);
    b_0.storeUint(src._tokenAmount, 256);
    b_0.storeAddress(src._token);
  };
}

export function loadWithdrawToken(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2629002631) {
    throw Error("Invalid prefix");
  }
  let __tokenAmount = sc_0.loadUintBig(256);
  let __token = sc_0.loadAddress();
  return {
    $$type: "WithdrawToken" as const,
    _tokenAmount: __tokenAmount,
    _token: __token,
  };
}

function loadTupleWithdrawToken(source: TupleReader) {
  let __tokenAmount = source.readBigNumber();
  let __token = source.readAddress();
  return {
    $$type: "WithdrawToken" as const,
    _tokenAmount: __tokenAmount,
    _token: __token,
  };
}

function storeTupleWithdrawToken(source: WithdrawToken) {
  let builder = new TupleBuilder();
  builder.writeNumber(source._tokenAmount);
  builder.writeAddress(source._token);
  return builder.build();
}

function dictValueParserWithdrawToken(): DictionaryValue<WithdrawToken> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeWithdrawToken(src)).endCell());
    },
    parse: (src) => {
      return loadWithdrawToken(src.loadRef().beginParse());
    },
  };
}

export type AddToken = {
  $$type: "AddToken";
  tokenAmount: bigint;
};

export function storeAddToken(src: AddToken) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3312669402, 32);
    b_0.storeUint(src.tokenAmount, 256);
  };
}

export function loadAddToken(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3312669402) {
    throw Error("Invalid prefix");
  }
  let _tokenAmount = sc_0.loadUintBig(256);
  return { $$type: "AddToken" as const, tokenAmount: _tokenAmount };
}

function loadTupleAddToken(source: TupleReader) {
  let _tokenAmount = source.readBigNumber();
  return { $$type: "AddToken" as const, tokenAmount: _tokenAmount };
}

function storeTupleAddToken(source: AddToken) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.tokenAmount);
  return builder.build();
}

function dictValueParserAddToken(): DictionaryValue<AddToken> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeAddToken(src)).endCell());
    },
    parse: (src) => {
      return loadAddToken(src.loadRef().beginParse());
    },
  };
}

export type User = {
  $$type: "User";
  investedAmount: bigint;
  claimedTokens: bigint;
  investedTimestamp: bigint;
  lastClaimedTimestamp: bigint;
};

export function storeUser(src: User) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(src.investedAmount, 256);
    b_0.storeUint(src.claimedTokens, 256);
    b_0.storeUint(src.investedTimestamp, 256);
    let b_1 = new Builder();
    b_1.storeUint(src.lastClaimedTimestamp, 256);
    b_0.storeRef(b_1.endCell());
  };
}

export function loadUser(slice: Slice) {
  let sc_0 = slice;
  let _investedAmount = sc_0.loadUintBig(256);
  let _claimedTokens = sc_0.loadUintBig(256);
  let _investedTimestamp = sc_0.loadUintBig(256);
  let sc_1 = sc_0.loadRef().beginParse();
  let _lastClaimedTimestamp = sc_1.loadUintBig(256);
  return {
    $$type: "User" as const,
    investedAmount: _investedAmount,
    claimedTokens: _claimedTokens,
    investedTimestamp: _investedTimestamp,
    lastClaimedTimestamp: _lastClaimedTimestamp,
  };
}

function loadTupleUser(source: TupleReader) {
  let _investedAmount = source.readBigNumber();
  let _claimedTokens = source.readBigNumber();
  let _investedTimestamp = source.readBigNumber();
  let _lastClaimedTimestamp = source.readBigNumber();
  return {
    $$type: "User" as const,
    investedAmount: _investedAmount,
    claimedTokens: _claimedTokens,
    investedTimestamp: _investedTimestamp,
    lastClaimedTimestamp: _lastClaimedTimestamp,
  };
}

function storeTupleUser(source: User) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.investedAmount);
  builder.writeNumber(source.claimedTokens);
  builder.writeNumber(source.investedTimestamp);
  builder.writeNumber(source.lastClaimedTimestamp);
  return builder.build();
}

function dictValueParserUser(): DictionaryValue<User> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeUser(src)).endCell());
    },
    parse: (src) => {
      return loadUser(src.loadRef().beginParse());
    },
  };
}

export type TransferEvent = {
  $$type: "TransferEvent";
  sender_address: Address;
  jetton_amount: bigint;
  score: bigint;
};

export function storeTransferEvent(src: TransferEvent) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1382804827, 32);
    b_0.storeAddress(src.sender_address);
    b_0.storeCoins(src.jetton_amount);
    b_0.storeUint(src.score, 128);
  };
}

export function loadTransferEvent(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1382804827) {
    throw Error("Invalid prefix");
  }
  let _sender_address = sc_0.loadAddress();
  let _jetton_amount = sc_0.loadCoins();
  let _score = sc_0.loadUintBig(128);
  return {
    $$type: "TransferEvent" as const,
    sender_address: _sender_address,
    jetton_amount: _jetton_amount,
    score: _score,
  };
}

function loadTupleTransferEvent(source: TupleReader) {
  let _sender_address = source.readAddress();
  let _jetton_amount = source.readBigNumber();
  let _score = source.readBigNumber();
  return {
    $$type: "TransferEvent" as const,
    sender_address: _sender_address,
    jetton_amount: _jetton_amount,
    score: _score,
  };
}

function storeTupleTransferEvent(source: TransferEvent) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.sender_address);
  builder.writeNumber(source.jetton_amount);
  builder.writeNumber(source.score);
  return builder.build();
}

function dictValueParserTransferEvent(): DictionaryValue<TransferEvent> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeTransferEvent(src)).endCell());
    },
    parse: (src) => {
      return loadTransferEvent(src.loadRef().beginParse());
    },
  };
}

export type Mint = {
  $$type: "Mint";
  amount: bigint;
  receiver: Address;
};

export function storeMint(src: Mint) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(4235234258, 32);
    b_0.storeInt(src.amount, 257);
    b_0.storeAddress(src.receiver);
  };
}

export function loadMint(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 4235234258) {
    throw Error("Invalid prefix");
  }
  let _amount = sc_0.loadIntBig(257);
  let _receiver = sc_0.loadAddress();
  return { $$type: "Mint" as const, amount: _amount, receiver: _receiver };
}

function loadTupleMint(source: TupleReader) {
  let _amount = source.readBigNumber();
  let _receiver = source.readAddress();
  return { $$type: "Mint" as const, amount: _amount, receiver: _receiver };
}

function storeTupleMint(source: Mint) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.amount);
  builder.writeAddress(source.receiver);
  return builder.build();
}

function dictValueParserMint(): DictionaryValue<Mint> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeMint(src)).endCell());
    },
    parse: (src) => {
      return loadMint(src.loadRef().beginParse());
    },
  };
}

export type JettonData = {
  $$type: "JettonData";
  total_supply: bigint;
  mintable: boolean;
  owner: Address;
  content: Cell;
  wallet_code: Cell;
};

export function storeJettonData(src: JettonData) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeInt(src.total_supply, 257);
    b_0.storeBit(src.mintable);
    b_0.storeAddress(src.owner);
    b_0.storeRef(src.content);
    b_0.storeRef(src.wallet_code);
  };
}

export function loadJettonData(slice: Slice) {
  let sc_0 = slice;
  let _total_supply = sc_0.loadIntBig(257);
  let _mintable = sc_0.loadBit();
  let _owner = sc_0.loadAddress();
  let _content = sc_0.loadRef();
  let _wallet_code = sc_0.loadRef();
  return {
    $$type: "JettonData" as const,
    total_supply: _total_supply,
    mintable: _mintable,
    owner: _owner,
    content: _content,
    wallet_code: _wallet_code,
  };
}

function loadTupleJettonData(source: TupleReader) {
  let _total_supply = source.readBigNumber();
  let _mintable = source.readBoolean();
  let _owner = source.readAddress();
  let _content = source.readCell();
  let _wallet_code = source.readCell();
  return {
    $$type: "JettonData" as const,
    total_supply: _total_supply,
    mintable: _mintable,
    owner: _owner,
    content: _content,
    wallet_code: _wallet_code,
  };
}

function storeTupleJettonData(source: JettonData) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.total_supply);
  builder.writeBoolean(source.mintable);
  builder.writeAddress(source.owner);
  builder.writeCell(source.content);
  builder.writeCell(source.wallet_code);
  return builder.build();
}

function dictValueParserJettonData(): DictionaryValue<JettonData> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeJettonData(src)).endCell());
    },
    parse: (src) => {
      return loadJettonData(src.loadRef().beginParse());
    },
  };
}

export type JettonWalletData = {
  $$type: "JettonWalletData";
  balance: bigint;
  owner: Address;
  master: Address;
  wallet_code: Cell;
};

export function storeJettonWalletData(src: JettonWalletData) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeInt(src.balance, 257);
    b_0.storeAddress(src.owner);
    b_0.storeAddress(src.master);
    b_0.storeRef(src.wallet_code);
  };
}

export function loadJettonWalletData(slice: Slice) {
  let sc_0 = slice;
  let _balance = sc_0.loadIntBig(257);
  let _owner = sc_0.loadAddress();
  let _master = sc_0.loadAddress();
  let _wallet_code = sc_0.loadRef();
  return {
    $$type: "JettonWalletData" as const,
    balance: _balance,
    owner: _owner,
    master: _master,
    wallet_code: _wallet_code,
  };
}

function loadTupleJettonWalletData(source: TupleReader) {
  let _balance = source.readBigNumber();
  let _owner = source.readAddress();
  let _master = source.readAddress();
  let _wallet_code = source.readCell();
  return {
    $$type: "JettonWalletData" as const,
    balance: _balance,
    owner: _owner,
    master: _master,
    wallet_code: _wallet_code,
  };
}

function storeTupleJettonWalletData(source: JettonWalletData) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.balance);
  builder.writeAddress(source.owner);
  builder.writeAddress(source.master);
  builder.writeCell(source.wallet_code);
  return builder.build();
}

function dictValueParserJettonWalletData(): DictionaryValue<JettonWalletData> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeJettonWalletData(src)).endCell());
    },
    parse: (src) => {
      return loadJettonWalletData(src.loadRef().beginParse());
    },
  };
}

export type TokenTransfer = {
  $$type: "TokenTransfer";
  query_id: bigint;
  amount: bigint;
  destination: Address;
  response_destination: Address;
  custom_payload: Cell | null;
  forward_ton_amount: bigint;
  forward_payload: Cell;
};

export function storeTokenTransfer(src: TokenTransfer) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(260734629, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeCoins(src.amount);
    b_0.storeAddress(src.destination);
    b_0.storeAddress(src.response_destination);
    if (src.custom_payload !== null && src.custom_payload !== undefined) {
      b_0.storeBit(true).storeRef(src.custom_payload);
    } else {
      b_0.storeBit(false);
    }
    b_0.storeCoins(src.forward_ton_amount);
    b_0.storeBuilder(src.forward_payload.asBuilder());
  };
}

export function loadTokenTransfer(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 260734629) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _destination = sc_0.loadAddress();
  let _response_destination = sc_0.loadAddress();
  let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _forward_ton_amount = sc_0.loadCoins();
  let _forward_payload = sc_0.asCell();
  return {
    $$type: "TokenTransfer" as const,
    query_id: _query_id,
    amount: _amount,
    destination: _destination,
    response_destination: _response_destination,
    custom_payload: _custom_payload,
    forward_ton_amount: _forward_ton_amount,
    forward_payload: _forward_payload,
  };
}

function loadTupleTokenTransfer(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _destination = source.readAddress();
  let _response_destination = source.readAddress();
  let _custom_payload = source.readCellOpt();
  let _forward_ton_amount = source.readBigNumber();
  let _forward_payload = source.readCell();
  return {
    $$type: "TokenTransfer" as const,
    query_id: _query_id,
    amount: _amount,
    destination: _destination,
    response_destination: _response_destination,
    custom_payload: _custom_payload,
    forward_ton_amount: _forward_ton_amount,
    forward_payload: _forward_payload,
  };
}

function storeTupleTokenTransfer(source: TokenTransfer) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.destination);
  builder.writeAddress(source.response_destination);
  builder.writeCell(source.custom_payload);
  builder.writeNumber(source.forward_ton_amount);
  builder.writeSlice(source.forward_payload);
  return builder.build();
}

function dictValueParserTokenTransfer(): DictionaryValue<TokenTransfer> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeTokenTransfer(src)).endCell());
    },
    parse: (src) => {
      return loadTokenTransfer(src.loadRef().beginParse());
    },
  };
}

export type TokenTransferInternal = {
  $$type: "TokenTransferInternal";
  query_id: bigint;
  amount: bigint;
  from: Address;
  response_destination: Address;
  forward_ton_amount: bigint;
  forward_payload: Cell;
};

export function storeTokenTransferInternal(src: TokenTransferInternal) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(395134233, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeCoins(src.amount);
    b_0.storeAddress(src.from);
    b_0.storeAddress(src.response_destination);
    b_0.storeCoins(src.forward_ton_amount);
    b_0.storeBuilder(src.forward_payload.asBuilder());
  };
}

export function loadTokenTransferInternal(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 395134233) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _from = sc_0.loadAddress();
  let _response_destination = sc_0.loadAddress();
  let _forward_ton_amount = sc_0.loadCoins();
  let _forward_payload = sc_0.asCell();
  return {
    $$type: "TokenTransferInternal" as const,
    query_id: _query_id,
    amount: _amount,
    from: _from,
    response_destination: _response_destination,
    forward_ton_amount: _forward_ton_amount,
    forward_payload: _forward_payload,
  };
}

function loadTupleTokenTransferInternal(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _from = source.readAddress();
  let _response_destination = source.readAddress();
  let _forward_ton_amount = source.readBigNumber();
  let _forward_payload = source.readCell();
  return {
    $$type: "TokenTransferInternal" as const,
    query_id: _query_id,
    amount: _amount,
    from: _from,
    response_destination: _response_destination,
    forward_ton_amount: _forward_ton_amount,
    forward_payload: _forward_payload,
  };
}

function storeTupleTokenTransferInternal(source: TokenTransferInternal) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.from);
  builder.writeAddress(source.response_destination);
  builder.writeNumber(source.forward_ton_amount);
  builder.writeSlice(source.forward_payload);
  return builder.build();
}

function dictValueParserTokenTransferInternal(): DictionaryValue<TokenTransferInternal> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(
        beginCell().store(storeTokenTransferInternal(src)).endCell()
      );
    },
    parse: (src) => {
      return loadTokenTransferInternal(src.loadRef().beginParse());
    },
  };
}

export type TokenNotification = {
  $$type: "TokenNotification";
  query_id: bigint;
  amount: bigint;
  from: Address;
  forward_payload: Cell;
};

export function storeTokenNotification(src: TokenNotification) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1935855772, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeCoins(src.amount);
    b_0.storeAddress(src.from);
    b_0.storeBuilder(src.forward_payload.asBuilder());
  };
}

export function loadTokenNotification(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1935855772) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _from = sc_0.loadAddress();
  let _forward_payload = sc_0.asCell();
  return {
    $$type: "TokenNotification" as const,
    query_id: _query_id,
    amount: _amount,
    from: _from,
    forward_payload: _forward_payload,
  };
}

function loadTupleTokenNotification(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _from = source.readAddress();
  let _forward_payload = source.readCell();
  return {
    $$type: "TokenNotification" as const,
    query_id: _query_id,
    amount: _amount,
    from: _from,
    forward_payload: _forward_payload,
  };
}

function storeTupleTokenNotification(source: TokenNotification) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.from);
  builder.writeSlice(source.forward_payload);
  return builder.build();
}

function dictValueParserTokenNotification(): DictionaryValue<TokenNotification> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(
        beginCell().store(storeTokenNotification(src)).endCell()
      );
    },
    parse: (src) => {
      return loadTokenNotification(src.loadRef().beginParse());
    },
  };
}

export type TokenBurn = {
  $$type: "TokenBurn";
  query_id: bigint;
  amount: bigint;
  response_destination: Address;
  custom_payload: Cell | null;
};

export function storeTokenBurn(src: TokenBurn) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1499400124, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeCoins(src.amount);
    b_0.storeAddress(src.response_destination);
    if (src.custom_payload !== null && src.custom_payload !== undefined) {
      b_0.storeBit(true).storeRef(src.custom_payload);
    } else {
      b_0.storeBit(false);
    }
  };
}

export function loadTokenBurn(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1499400124) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _response_destination = sc_0.loadAddress();
  let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
  return {
    $$type: "TokenBurn" as const,
    query_id: _query_id,
    amount: _amount,
    response_destination: _response_destination,
    custom_payload: _custom_payload,
  };
}

function loadTupleTokenBurn(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _response_destination = source.readAddress();
  let _custom_payload = source.readCellOpt();
  return {
    $$type: "TokenBurn" as const,
    query_id: _query_id,
    amount: _amount,
    response_destination: _response_destination,
    custom_payload: _custom_payload,
  };
}

function storeTupleTokenBurn(source: TokenBurn) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.response_destination);
  builder.writeCell(source.custom_payload);
  return builder.build();
}

function dictValueParserTokenBurn(): DictionaryValue<TokenBurn> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeTokenBurn(src)).endCell());
    },
    parse: (src) => {
      return loadTokenBurn(src.loadRef().beginParse());
    },
  };
}

export type TokenBurnNotification = {
  $$type: "TokenBurnNotification";
  query_id: bigint;
  amount: bigint;
  response_destination: Address;
};

export function storeTokenBurnNotification(src: TokenBurnNotification) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2078119902, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeCoins(src.amount);
    b_0.storeAddress(src.response_destination);
  };
}

export function loadTokenBurnNotification(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2078119902) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _response_destination = sc_0.loadAddress();
  return {
    $$type: "TokenBurnNotification" as const,
    query_id: _query_id,
    amount: _amount,
    response_destination: _response_destination,
  };
}

function loadTupleTokenBurnNotification(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _response_destination = source.readAddress();
  return {
    $$type: "TokenBurnNotification" as const,
    query_id: _query_id,
    amount: _amount,
    response_destination: _response_destination,
  };
}

function storeTupleTokenBurnNotification(source: TokenBurnNotification) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.response_destination);
  return builder.build();
}

function dictValueParserTokenBurnNotification(): DictionaryValue<TokenBurnNotification> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(
        beginCell().store(storeTokenBurnNotification(src)).endCell()
      );
    },
    parse: (src) => {
      return loadTokenBurnNotification(src.loadRef().beginParse());
    },
  };
}

export type TokenExcesses = {
  $$type: "TokenExcesses";
  query_id: bigint;
};

export function storeTokenExcesses(src: TokenExcesses) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3576854235, 32);
    b_0.storeUint(src.query_id, 64);
  };
}

export function loadTokenExcesses(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3576854235) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  return { $$type: "TokenExcesses" as const, query_id: _query_id };
}

function loadTupleTokenExcesses(source: TupleReader) {
  let _query_id = source.readBigNumber();
  return { $$type: "TokenExcesses" as const, query_id: _query_id };
}

function storeTupleTokenExcesses(source: TokenExcesses) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  return builder.build();
}

function dictValueParserTokenExcesses(): DictionaryValue<TokenExcesses> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeTokenExcesses(src)).endCell());
    },
    parse: (src) => {
      return loadTokenExcesses(src.loadRef().beginParse());
    },
  };
}

export type TokenUpdateContent = {
  $$type: "TokenUpdateContent";
  content: Cell;
};

export function storeTokenUpdateContent(src: TokenUpdateContent) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2937889386, 32);
    b_0.storeRef(src.content);
  };
}

export function loadTokenUpdateContent(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2937889386) {
    throw Error("Invalid prefix");
  }
  let _content = sc_0.loadRef();
  return { $$type: "TokenUpdateContent" as const, content: _content };
}

function loadTupleTokenUpdateContent(source: TupleReader) {
  let _content = source.readCell();
  return { $$type: "TokenUpdateContent" as const, content: _content };
}

function storeTupleTokenUpdateContent(source: TokenUpdateContent) {
  let builder = new TupleBuilder();
  builder.writeCell(source.content);
  return builder.build();
}

function dictValueParserTokenUpdateContent(): DictionaryValue<TokenUpdateContent> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(
        beginCell().store(storeTokenUpdateContent(src)).endCell()
      );
    },
    parse: (src) => {
      return loadTokenUpdateContent(src.loadRef().beginParse());
    },
  };
}

export type ProvideWalletAddress = {
  $$type: "ProvideWalletAddress";
  query_id: bigint;
  owner_address: Address;
  include_address: boolean;
};

export function storeProvideWalletAddress(src: ProvideWalletAddress) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(745978227, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeAddress(src.owner_address);
    b_0.storeBit(src.include_address);
  };
}

export function loadProvideWalletAddress(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 745978227) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  let _owner_address = sc_0.loadAddress();
  let _include_address = sc_0.loadBit();
  return {
    $$type: "ProvideWalletAddress" as const,
    query_id: _query_id,
    owner_address: _owner_address,
    include_address: _include_address,
  };
}

function loadTupleProvideWalletAddress(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _owner_address = source.readAddress();
  let _include_address = source.readBoolean();
  return {
    $$type: "ProvideWalletAddress" as const,
    query_id: _query_id,
    owner_address: _owner_address,
    include_address: _include_address,
  };
}

function storeTupleProvideWalletAddress(source: ProvideWalletAddress) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeAddress(source.owner_address);
  builder.writeBoolean(source.include_address);
  return builder.build();
}

function dictValueParserProvideWalletAddress(): DictionaryValue<ProvideWalletAddress> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(
        beginCell().store(storeProvideWalletAddress(src)).endCell()
      );
    },
    parse: (src) => {
      return loadProvideWalletAddress(src.loadRef().beginParse());
    },
  };
}

export type TakeWalletAddress = {
  $$type: "TakeWalletAddress";
  query_id: bigint;
  wallet_address: Address;
  owner_address: Address | null;
};

export function storeTakeWalletAddress(src: TakeWalletAddress) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3513996288, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeAddress(src.wallet_address);
    b_0.storeAddress(src.owner_address);
  };
}

export function loadTakeWalletAddress(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3513996288) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  let _wallet_address = sc_0.loadAddress();
  let _owner_address = sc_0.loadMaybeAddress();
  return {
    $$type: "TakeWalletAddress" as const,
    query_id: _query_id,
    wallet_address: _wallet_address,
    owner_address: _owner_address,
  };
}

function loadTupleTakeWalletAddress(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _wallet_address = source.readAddress();
  let _owner_address = source.readAddressOpt();
  return {
    $$type: "TakeWalletAddress" as const,
    query_id: _query_id,
    wallet_address: _wallet_address,
    owner_address: _owner_address,
  };
}

function storeTupleTakeWalletAddress(source: TakeWalletAddress) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeAddress(source.wallet_address);
  builder.writeAddress(source.owner_address);
  return builder.build();
}

function dictValueParserTakeWalletAddress(): DictionaryValue<TakeWalletAddress> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(
        beginCell().store(storeTakeWalletAddress(src)).endCell()
      );
    },
    parse: (src) => {
      return loadTakeWalletAddress(src.loadRef().beginParse());
    },
  };
}

export type Deploy = {
  $$type: "Deploy";
  queryId: bigint;
};

export function storeDeploy(src: Deploy) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2490013878, 32);
    b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeploy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2490013878) {
    throw Error("Invalid prefix");
  }
  let _queryId = sc_0.loadUintBig(64);
  return { $$type: "Deploy" as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
  let _queryId = source.readBigNumber();
  return { $$type: "Deploy" as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
    },
    parse: (src) => {
      return loadDeploy(src.loadRef().beginParse());
    },
  };
}

export type DeployOk = {
  $$type: "DeployOk";
  queryId: bigint;
};

export function storeDeployOk(src: DeployOk) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2952335191, 32);
    b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeployOk(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2952335191) {
    throw Error("Invalid prefix");
  }
  let _queryId = sc_0.loadUintBig(64);
  return { $$type: "DeployOk" as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
  let _queryId = source.readBigNumber();
  return { $$type: "DeployOk" as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
    },
    parse: (src) => {
      return loadDeployOk(src.loadRef().beginParse());
    },
  };
}

export type FactoryDeploy = {
  $$type: "FactoryDeploy";
  queryId: bigint;
  cashback: Address;
};

export function storeFactoryDeploy(src: FactoryDeploy) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1829761339, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeAddress(src.cashback);
  };
}

export function loadFactoryDeploy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1829761339) {
    throw Error("Invalid prefix");
  }
  let _queryId = sc_0.loadUintBig(64);
  let _cashback = sc_0.loadAddress();
  return {
    $$type: "FactoryDeploy" as const,
    queryId: _queryId,
    cashback: _cashback,
  };
}

function loadTupleFactoryDeploy(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _cashback = source.readAddress();
  return {
    $$type: "FactoryDeploy" as const,
    queryId: _queryId,
    cashback: _cashback,
  };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.cashback);
  return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
    },
    parse: (src) => {
      return loadFactoryDeploy(src.loadRef().beginParse());
    },
  };
}

export type ChangeOwner = {
  $$type: "ChangeOwner";
  queryId: bigint;
  newOwner: Address;
};

export function storeChangeOwner(src: ChangeOwner) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2174598809, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeAddress(src.newOwner);
  };
}

export function loadChangeOwner(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2174598809) {
    throw Error("Invalid prefix");
  }
  let _queryId = sc_0.loadUintBig(64);
  let _newOwner = sc_0.loadAddress();
  return {
    $$type: "ChangeOwner" as const,
    queryId: _queryId,
    newOwner: _newOwner,
  };
}

function loadTupleChangeOwner(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _newOwner = source.readAddress();
  return {
    $$type: "ChangeOwner" as const,
    queryId: _queryId,
    newOwner: _newOwner,
  };
}

function storeTupleChangeOwner(source: ChangeOwner) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.newOwner);
  return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
    },
    parse: (src) => {
      return loadChangeOwner(src.loadRef().beginParse());
    },
  };
}

export type ChangeOwnerOk = {
  $$type: "ChangeOwnerOk";
  queryId: bigint;
  newOwner: Address;
};

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(846932810, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeAddress(src.newOwner);
  };
}

export function loadChangeOwnerOk(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 846932810) {
    throw Error("Invalid prefix");
  }
  let _queryId = sc_0.loadUintBig(64);
  let _newOwner = sc_0.loadAddress();
  return {
    $$type: "ChangeOwnerOk" as const,
    queryId: _queryId,
    newOwner: _newOwner,
  };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _newOwner = source.readAddress();
  return {
    $$type: "ChangeOwnerOk" as const,
    queryId: _queryId,
    newOwner: _newOwner,
  };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.newOwner);
  return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
    },
    parse: (src) => {
      return loadChangeOwnerOk(src.loadRef().beginParse());
    },
  };
}

type GenieLaunchpad_init_args = {
  $$type: "GenieLaunchpad_init_args";
  cliffDuration: bigint;
  vestingStartTime: bigint;
  vestingDuration: bigint;
  vestingInterval: bigint;
  cliffPercentage: bigint;
  projectName: string;
  projectStartTime: bigint;
  projectEndTime: bigint;
  ICOToken: Address;
  investmentToken: Address;
  owner: Address;
  maxCap: bigint;
  minBuy: bigint;
  maxBuy: bigint;
  tokenPrice: bigint;
};

function initGenieLaunchpad_init_args(src: GenieLaunchpad_init_args) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeInt(src.cliffDuration, 257);
    b_0.storeInt(src.vestingStartTime, 257);
    b_0.storeInt(src.vestingDuration, 257);
    let b_1 = new Builder();
    b_1.storeInt(src.vestingInterval, 257);
    b_1.storeInt(src.cliffPercentage, 257);
    b_1.storeStringRefTail(src.projectName);
    b_1.storeInt(src.projectStartTime, 257);
    let b_2 = new Builder();
    b_2.storeInt(src.projectEndTime, 257);
    b_2.storeAddress(src.ICOToken);
    b_2.storeAddress(src.investmentToken);
    let b_3 = new Builder();
    b_3.storeAddress(src.owner);
    b_3.storeInt(src.maxCap, 257);
    b_3.storeInt(src.minBuy, 257);
    let b_4 = new Builder();
    b_4.storeInt(src.maxBuy, 257);
    b_4.storeInt(src.tokenPrice, 257);
    b_3.storeRef(b_4.endCell());
    b_2.storeRef(b_3.endCell());
    b_1.storeRef(b_2.endCell());
    b_0.storeRef(b_1.endCell());
  };
}

async function GenieLaunchpad_init(
  cliffDuration: bigint,
  vestingStartTime: bigint,
  vestingDuration: bigint,
  vestingInterval: bigint,
  cliffPercentage: bigint,
  projectName: string,
  projectStartTime: bigint,
  projectEndTime: bigint,
  ICOToken: Address,
  investmentToken: Address,
  owner: Address,
  maxCap: bigint,
  minBuy: bigint,
  maxBuy: bigint,
  tokenPrice: bigint
) {
  const __code = Cell.fromBase64(
    "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"
  );
  const __system = Cell.fromBase64(
    "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yMnQKVVAOlUFCchVYNs8yS5QRBRDMG1tZVVkVAEE2zxiAfYjgQELIln0C2+hkjBt3yBukjBtjhTQ0//T/9P/1AHQ0/8wFEMwbBRvBOJukjBw4IEBCyQCWfQLb6GSMG3fIG6SMG2OFNDT/9P/0//UAdDT/zAUQzBsFG8E4iBu8tCAbyRbURWpBPgjVhRWFqC5kltw4PgjVhRWFqBWFKBWAFC+kgGh4PgjVhRWFqChVhKpBCFWEqiAZKkEUSKhAahWEqhWE6kEoAGhArYREhEUERIRERETEREREBEUERAPERMPDhEUDg0REw0MERQMCxETCwoRFAoJERMJCBEUCAcREwcGERQGBRETBQQRFAQDERMDAhEUAgEREwERFNs8OVYTARETAREUaFgBxMhZghAyeytKUAPLH8s/ASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFskRERETEREREBESERAPEREPDhEQDhDfEM4QvRCsEJsQmhB5EGgQVxBGEDVEMBL4QgF/bds8WQE6bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zxiAWow0x8BghCcs2WHuvLggdP/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEts8f1sC8hESERQREhERERMREREQERQREA8REw8OERQODRETDQwRFAwLERMLChEUCgkREwkIERQIBxETBwYRFAYFERMFBBEUBAMREwMCERQCARETAREU2zyBPpZWFMIA8vRwgEJwIvhBbyQQI18D+ChtggiYloDIydAQVgURHAVoXAJSyFVg2zzJBBEXBEEwAREWARRDMG1t2zwREBESERAPEREPDhEQDhDfVRxkYgFqMNMfAYIQfFNJorry4IHT//pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSbBLbPH9eAvAREhEUERIRERETEREREBEUERAPERMPDhEUDg0REw0MERQMCxETCwoRFAoJERMJCBEUCAcREwcGERQGBRETBQQRFAQDERMDAhEUAgEREwERFNs8ggCn3fgjLr7y9IIA3Dr4Iy278vSCAPCiIlYWxwXy9IEBC/hCJFllXwHMWfQLb6GSMG3fIG6SMG2OFNDT/9P/0//UAdDT/zAUQzBsFG8E4m6OLYEBC/hCcFRwAMhVMFA0y//L/8v/AcjL/8kBzMkQNSBulTBZ9FkwlEEz9BPiAt6BAQv4QiRZWfQLb6GSMG3fYAP+IG6SMG2OFNDT/9P/0//UAdDT/zAUQzBsFG8E4iBu8tCAbyRfA1YUIaCBMWpTGL7y9IIA72hRF7vy9IIA91BWFSugKbvy9HCAQnAi+Cj4QW8kECNfA22CCJiWgMjJ0FYdVUDIVWDbPMkEERkEFEMwbW3bPFYUwACTB6QH3ghWE2RiYQC0oIEBC/hCAREWAREVoHD4IyHIVTBQNMv/y//L/wHIy//JAczJAhEVAgERFAEgbpUwWfRZMJRBM/QT4hEQERIREA8REQ8OERAOEN8QzhC9EKwQmxCKEHkQeFUVAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7AGMAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwAyIIQD4p+pVAIyx8Wyz9QBPoCWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYhbrOVfwHKAMyUcDLKAOIB+gIBzxYAEIIAnbAhs/L0AvQREhEXERIREREWEREREBEVERAPERQPDhETDg0RFw0MERYMCxEVCwoRFAoJERMJCBEXCAcRFgcGERUGBREUBQQREwQDERcDAhEWAgERFQERFNs8Pj4+Pw3DAJmBV78v+CO+8vTeU+a88uW5ERAREhEQDhERDhDvEI0QfGhnABoQaxBaEEkQOEdVRhYEABL4QlKgxwXy4IQDbO1E0NQB+GPSAAGOlts8VxMRERESEREREBERERAPERAPVQ7g+CjXCwqDCbry4InbPA/RVQ3bPG1ragB0bYIAzvclwgCTIsIAkXDi8vSCAM73JMIAkyPCAJFw4vL0ggDT8Cr4I76TU5q8kXDi8vRwUgZVQAcIcAHggQEB1wCBAQHXAIEBAdcA1AHQgQEB1wCBAQHXANQB0AGBAQHXANQw0IEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdQw0GwAfPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wCBAQHXANQw0IEBAdcAgQEB1wAwEM8QzhDNAdjT/9P/0//UAdDT/9Mf1AHQAdP/0//UMND6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0//TH9Qw0NP/0//T/9Qw0NP/9ARuAGr6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdIAMBEQERMREBEQERIREBEQEREREFOVjT4="
  );
  let builder = beginCell();
  builder.storeRef(__system);
  builder.storeUint(0, 1);
  initGenieLaunchpad_init_args({
    $$type: "GenieLaunchpad_init_args",
    cliffDuration,
    vestingStartTime,
    vestingDuration,
    vestingInterval,
    cliffPercentage,
    projectName,
    projectStartTime,
    projectEndTime,
    ICOToken,
    investmentToken,
    owner,
    maxCap,
    minBuy,
    maxBuy,
    tokenPrice,
  })(builder);
  const __data = builder.endCell();
  return { code: __code, data: __data };
}

const GenieLaunchpad_errors: { [key: number]: { message: string } } = {
  2: { message: `Stack undeflow` },
  3: { message: `Stack overflow` },
  4: { message: `Integer overflow` },
  5: { message: `Integer out of expected range` },
  6: { message: `Invalid opcode` },
  7: { message: `Type check error` },
  8: { message: `Cell overflow` },
  9: { message: `Cell underflow` },
  10: { message: `Dictionary error` },
  13: { message: `Out of gas error` },
  32: { message: `Method ID not found` },
  34: { message: `Action is invalid or not supported` },
  37: { message: `Not enough TON` },
  38: { message: `Not enough extra-currencies` },
  128: { message: `Null reference exception` },
  129: { message: `Invalid serialization prefix` },
  130: { message: `Invalid incoming message` },
  131: { message: `Constraints error` },
  132: { message: `Access denied` },
  133: { message: `Contract stopped` },
  134: { message: `Invalid argument` },
  135: { message: `Code of a contract was not found` },
  136: { message: `Invalid address` },
  137: { message: `Masterchain support is not enabled for this contract` },
  1465: { message: `Vesting Timestamp is greater than project end time` },
  2639: { message: `No tokens to claim` },
  3688: { message: `Not mintable` },
  4159: { message: `Invalid value!!` },
  4429: { message: `Invalid sender` },
  12241: { message: `Max supply exceeded` },
  12650: { message: `Contribution amount must be at least minBuy amount` },
  14534: { message: `Not owner` },
  16022: { message: `Amount must greater than zero` },
  18668: { message: `Can't Mint Anymore` },
  22463: { message: `Vesting Already Started` },
  23951: { message: `Insufficient gas` },
  40368: { message: `Contract stopped` },
  41108: { message: `Sale still active` },
  42708: { message: `Invalid sender!` },
  42973: { message: `Sale not started yet` },
  43422: { message: `Invalid value - Burn` },
  52983: { message: `Invalid max cap or token price` },
  53296: { message: `Contract not stopped` },
  54256: { message: `Invalid start or end timestamp.` },
  56378: { message: `Sale Ended` },
  61135: { message: `Amount must be positive` },
  61288: { message: `Contribution amount exceeds the maximum allowed amount.` },
  61602: { message: `We can only use investmentToken or USDC for trade` },
  62972: { message: `Invalid balance` },
  63312: {
    message: `Total contribution amount would exceed the campaign's maximum cap.`,
  },
};

const GenieLaunchpad_types: ABIType[] = [
  {
    name: "StateInit",
    header: null,
    fields: [
      { name: "code", type: { kind: "simple", type: "cell", optional: false } },
      { name: "data", type: { kind: "simple", type: "cell", optional: false } },
    ],
  },
  {
    name: "Context",
    header: null,
    fields: [
      {
        name: "bounced",
        type: { kind: "simple", type: "bool", optional: false },
      },
      {
        name: "sender",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "value",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      { name: "raw", type: { kind: "simple", type: "slice", optional: false } },
    ],
  },
  {
    name: "SendParameters",
    header: null,
    fields: [
      {
        name: "bounce",
        type: { kind: "simple", type: "bool", optional: false },
      },
      {
        name: "to",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "value",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "mode",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      { name: "body", type: { kind: "simple", type: "cell", optional: true } },
      { name: "code", type: { kind: "simple", type: "cell", optional: true } },
      { name: "data", type: { kind: "simple", type: "cell", optional: true } },
    ],
  },
  {
    name: "TokensDeposited",
    header: 2689021525,
    fields: [
      {
        name: "user",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "amount",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
    ],
  },
  {
    name: "TokensClaimedEvent",
    header: 3905047194,
    fields: [
      {
        name: "user",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "amount",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
    ],
  },
  {
    name: "UpdateVestingSchedules",
    header: 3896593200,
    fields: [
      {
        name: "_vestingStartTime",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
      {
        name: "_vestingDuration",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
      {
        name: "_vestingInterval",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
      {
        name: "_cliffDuration",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
      {
        name: "_cliffPercentage",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
    ],
  },
  {
    name: "DepositTokens",
    header: 2085833122,
    fields: [
      {
        name: "_amount",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
      {
        name: "_depositToken",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "WithdrawToken",
    header: 2629002631,
    fields: [
      {
        name: "_tokenAmount",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
      {
        name: "_token",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "AddToken",
    header: 3312669402,
    fields: [
      {
        name: "tokenAmount",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
    ],
  },
  {
    name: "User",
    header: null,
    fields: [
      {
        name: "investedAmount",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
      {
        name: "claimedTokens",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
      {
        name: "investedTimestamp",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
      {
        name: "lastClaimedTimestamp",
        type: { kind: "simple", type: "uint", optional: false, format: 256 },
      },
    ],
  },
  {
    name: "TransferEvent",
    header: 1382804827,
    fields: [
      {
        name: "sender_address",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "jetton_amount",
        type: {
          kind: "simple",
          type: "uint",
          optional: false,
          format: "coins",
        },
      },
      {
        name: "score",
        type: { kind: "simple", type: "uint", optional: false, format: 128 },
      },
    ],
  },
  {
    name: "Mint",
    header: 4235234258,
    fields: [
      {
        name: "amount",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "receiver",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "JettonData",
    header: null,
    fields: [
      {
        name: "total_supply",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "mintable",
        type: { kind: "simple", type: "bool", optional: false },
      },
      {
        name: "owner",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "content",
        type: { kind: "simple", type: "cell", optional: false },
      },
      {
        name: "wallet_code",
        type: { kind: "simple", type: "cell", optional: false },
      },
    ],
  },
  {
    name: "JettonWalletData",
    header: null,
    fields: [
      {
        name: "balance",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "owner",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "master",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "wallet_code",
        type: { kind: "simple", type: "cell", optional: false },
      },
    ],
  },
  {
    name: "TokenTransfer",
    header: 260734629,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "amount",
        type: {
          kind: "simple",
          type: "uint",
          optional: false,
          format: "coins",
        },
      },
      {
        name: "destination",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "response_destination",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "custom_payload",
        type: { kind: "simple", type: "cell", optional: true },
      },
      {
        name: "forward_ton_amount",
        type: {
          kind: "simple",
          type: "uint",
          optional: false,
          format: "coins",
        },
      },
      {
        name: "forward_payload",
        type: {
          kind: "simple",
          type: "slice",
          optional: false,
          format: "remainder",
        },
      },
    ],
  },
  {
    name: "TokenTransferInternal",
    header: 395134233,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "amount",
        type: {
          kind: "simple",
          type: "uint",
          optional: false,
          format: "coins",
        },
      },
      {
        name: "from",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "response_destination",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "forward_ton_amount",
        type: {
          kind: "simple",
          type: "uint",
          optional: false,
          format: "coins",
        },
      },
      {
        name: "forward_payload",
        type: {
          kind: "simple",
          type: "slice",
          optional: false,
          format: "remainder",
        },
      },
    ],
  },
  {
    name: "TokenNotification",
    header: 1935855772,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "amount",
        type: {
          kind: "simple",
          type: "uint",
          optional: false,
          format: "coins",
        },
      },
      {
        name: "from",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "forward_payload",
        type: {
          kind: "simple",
          type: "slice",
          optional: false,
          format: "remainder",
        },
      },
    ],
  },
  {
    name: "TokenBurn",
    header: 1499400124,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "amount",
        type: {
          kind: "simple",
          type: "uint",
          optional: false,
          format: "coins",
        },
      },
      {
        name: "response_destination",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "custom_payload",
        type: { kind: "simple", type: "cell", optional: true },
      },
    ],
  },
  {
    name: "TokenBurnNotification",
    header: 2078119902,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "amount",
        type: {
          kind: "simple",
          type: "uint",
          optional: false,
          format: "coins",
        },
      },
      {
        name: "response_destination",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "TokenExcesses",
    header: 3576854235,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
    ],
  },
  {
    name: "TokenUpdateContent",
    header: 2937889386,
    fields: [
      {
        name: "content",
        type: { kind: "simple", type: "cell", optional: false },
      },
    ],
  },
  {
    name: "ProvideWalletAddress",
    header: 745978227,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "owner_address",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "include_address",
        type: { kind: "simple", type: "bool", optional: false },
      },
    ],
  },
  {
    name: "TakeWalletAddress",
    header: 3513996288,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "wallet_address",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "owner_address",
        type: { kind: "simple", type: "address", optional: true },
      },
    ],
  },
  {
    name: "Deploy",
    header: 2490013878,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
    ],
  },
  {
    name: "DeployOk",
    header: 2952335191,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
    ],
  },
  {
    name: "FactoryDeploy",
    header: 1829761339,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "cashback",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "ChangeOwner",
    header: 2174598809,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "newOwner",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "ChangeOwnerOk",
    header: 846932810,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "newOwner",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
];

const GenieLaunchpad_getters: ABIGetter[] = [
  {
    name: "calculateUnlockedToken",
    arguments: [
      {
        name: "_wallet",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
    returnType: { kind: "simple", type: "int", optional: false, format: 257 },
  },
  {
    name: "userDetails",
    arguments: [
      {
        name: "_address",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
    returnType: { kind: "simple", type: "User", optional: true },
  },
  {
    name: "cliffDuration",
    arguments: [],
    returnType: { kind: "simple", type: "int", optional: false, format: 257 },
  },
  {
    name: "vestingStartTime",
    arguments: [],
    returnType: { kind: "simple", type: "int", optional: false, format: 257 },
  },
  {
    name: "vestingDuration",
    arguments: [],
    returnType: { kind: "simple", type: "int", optional: false, format: 257 },
  },
  {
    name: "vestingInterval",
    arguments: [],
    returnType: { kind: "simple", type: "int", optional: false, format: 257 },
  },
  {
    name: "cliffPercentage",
    arguments: [],
    returnType: { kind: "simple", type: "int", optional: false, format: 257 },
  },
  {
    name: "projectName",
    arguments: [],
    returnType: { kind: "simple", type: "string", optional: false },
  },
  {
    name: "projectStartTime",
    arguments: [],
    returnType: { kind: "simple", type: "int", optional: false, format: 257 },
  },
  {
    name: "projectEndTime",
    arguments: [],
    returnType: { kind: "simple", type: "int", optional: false, format: 257 },
  },
  {
    name: "ICOToken",
    arguments: [],
    returnType: { kind: "simple", type: "address", optional: false },
  },
  {
    name: "totalRaised",
    arguments: [],
    returnType: { kind: "simple", type: "int", optional: false, format: 257 },
  },
  {
    name: "totalParticipants",
    arguments: [],
    returnType: { kind: "simple", type: "int", optional: false, format: 257 },
  },
  {
    name: "maxCap",
    arguments: [],
    returnType: { kind: "simple", type: "int", optional: false, format: 257 },
  },
  {
    name: "minBuy",
    arguments: [],
    returnType: { kind: "simple", type: "int", optional: false, format: 257 },
  },
  {
    name: "maxBuy",
    arguments: [],
    returnType: { kind: "simple", type: "int", optional: false, format: 257 },
  },
  {
    name: "tokenPrice",
    arguments: [],
    returnType: { kind: "simple", type: "int", optional: false, format: 257 },
  },
  {
    name: "investmentToken",
    arguments: [],
    returnType: { kind: "simple", type: "address", optional: false },
  },
  {
    name: "owner",
    arguments: [],
    returnType: { kind: "simple", type: "address", optional: false },
  },
  {
    name: "stopped",
    arguments: [],
    returnType: { kind: "simple", type: "bool", optional: false },
  },
];

const GenieLaunchpad_receivers: ABIReceiver[] = [
  {
    receiver: "internal",
    message: { kind: "typed", type: "UpdateVestingSchedules" },
  },
  { receiver: "internal", message: { kind: "typed", type: "DepositTokens" } },
  { receiver: "internal", message: { kind: "text", text: "Claim" } },
  { receiver: "internal", message: { kind: "typed", type: "WithdrawToken" } },
  { receiver: "internal", message: { kind: "typed", type: "AddToken" } },
  { receiver: "internal", message: { kind: "typed", type: "Deploy" } },
  { receiver: "internal", message: { kind: "typed", type: "ChangeOwner" } },
  { receiver: "internal", message: { kind: "text", text: "Stop" } },
  { receiver: "internal", message: { kind: "text", text: "Resume" } },
];

export class GenieLaunchpad implements Contract {
  static async init(
    cliffDuration: bigint,
    vestingStartTime: bigint,
    vestingDuration: bigint,
    vestingInterval: bigint,
    cliffPercentage: bigint,
    projectName: string,
    projectStartTime: bigint,
    projectEndTime: bigint,
    ICOToken: Address,
    investmentToken: Address,
    owner: Address,
    maxCap: bigint,
    minBuy: bigint,
    maxBuy: bigint,
    tokenPrice: bigint
  ) {
    return await GenieLaunchpad_init(
      cliffDuration,
      vestingStartTime,
      vestingDuration,
      vestingInterval,
      cliffPercentage,
      projectName,
      projectStartTime,
      projectEndTime,
      ICOToken,
      investmentToken,
      owner,
      maxCap,
      minBuy,
      maxBuy,
      tokenPrice
    );
  }

  static async fromInit(
    cliffDuration: bigint,
    vestingStartTime: bigint,
    vestingDuration: bigint,
    vestingInterval: bigint,
    cliffPercentage: bigint,
    projectName: string,
    projectStartTime: bigint,
    projectEndTime: bigint,
    ICOToken: Address,
    investmentToken: Address,
    owner: Address,
    maxCap: bigint,
    minBuy: bigint,
    maxBuy: bigint,
    tokenPrice: bigint
  ) {
    const init = await GenieLaunchpad_init(
      cliffDuration,
      vestingStartTime,
      vestingDuration,
      vestingInterval,
      cliffPercentage,
      projectName,
      projectStartTime,
      projectEndTime,
      ICOToken,
      investmentToken,
      owner,
      maxCap,
      minBuy,
      maxBuy,
      tokenPrice
    );
    const address = contractAddress(0, init);
    return new GenieLaunchpad(address, init);
  }

  static fromAddress(address: Address) {
    return new GenieLaunchpad(address);
  }

  readonly address: Address;
  readonly init?: { code: Cell; data: Cell };
  readonly abi: ContractABI = {
    types: GenieLaunchpad_types,
    getters: GenieLaunchpad_getters,
    receivers: GenieLaunchpad_receivers,
    errors: GenieLaunchpad_errors,
  };

  private constructor(address: Address, init?: { code: Cell; data: Cell }) {
    this.address = address;
    this.init = init;
  }

  async send(
    provider: ContractProvider,
    via: Sender,
    args: { value: bigint; bounce?: boolean | null | undefined },
    message:
      | UpdateVestingSchedules
      | DepositTokens
      | "Claim"
      | WithdrawToken
      | AddToken
      | Deploy
      | ChangeOwner
      | "Stop"
      | "Resume"
  ) {
    let body: Cell | null = null;
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "UpdateVestingSchedules"
    ) {
      body = beginCell().store(storeUpdateVestingSchedules(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "DepositTokens"
    ) {
      body = beginCell().store(storeDepositTokens(message)).endCell();
    }
    if (message === "Claim") {
      body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "WithdrawToken"
    ) {
      body = beginCell().store(storeWithdrawToken(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "AddToken"
    ) {
      body = beginCell().store(storeAddToken(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "Deploy"
    ) {
      body = beginCell().store(storeDeploy(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "ChangeOwner"
    ) {
      body = beginCell().store(storeChangeOwner(message)).endCell();
    }
    if (message === "Stop") {
      body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
    }
    if (message === "Resume") {
      body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
    }
    if (body === null) {
      throw new Error("Invalid message type");
    }

    await provider.internal(via, { ...args, body: body });
  }

  async getCalculateUnlockedToken(
    provider: ContractProvider,
    _wallet: Address
  ) {
    let builder = new TupleBuilder();
    builder.writeAddress(_wallet);
    let source = (await provider.get("calculateUnlockedToken", builder.build()))
      .stack;
    let result = source.readBigNumber();
    return result;
  }

  async getUserDetails(provider: ContractProvider, _address: Address) {
    let builder = new TupleBuilder();
    builder.writeAddress(_address);
    let source = (await provider.get("userDetails", builder.build())).stack;
    const result_p = source.readTupleOpt();
    const result = result_p ? loadTupleUser(result_p) : null;
    return result;
  }

  async getCliffDuration(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("cliffDuration", builder.build())).stack;
    let result = source.readBigNumber();
    return result;
  }

  async getVestingStartTime(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("vestingStartTime", builder.build()))
      .stack;
    let result = source.readBigNumber();
    return result;
  }

  async getVestingDuration(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("vestingDuration", builder.build())).stack;
    let result = source.readBigNumber();
    return result;
  }

  async getVestingInterval(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("vestingInterval", builder.build())).stack;
    let result = source.readBigNumber();
    return result;
  }

  async getCliffPercentage(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("cliffPercentage", builder.build())).stack;
    let result = source.readBigNumber();
    return result;
  }

  async getProjectName(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("projectName", builder.build())).stack;
    let result = source.readString();
    return result;
  }

  async getProjectStartTime(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("projectStartTime", builder.build()))
      .stack;
    let result = source.readBigNumber();
    return result;
  }

  async getProjectEndTime(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("projectEndTime", builder.build())).stack;
    let result = source.readBigNumber();
    return result;
  }

  async getIcoToken(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("ICOToken", builder.build())).stack;
    let result = source.readAddress();
    return result;
  }

  async getTotalRaised(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("totalRaised", builder.build())).stack;
    let result = source.readBigNumber();
    return result;
  }

  async getTotalParticipants(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("totalParticipants", builder.build()))
      .stack;
    let result = source.readBigNumber();
    return result;
  }

  async getMaxCap(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("maxCap", builder.build())).stack;
    let result = source.readBigNumber();
    return result;
  }

  async getMinBuy(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("minBuy", builder.build())).stack;
    let result = source.readBigNumber();
    return result;
  }

  async getMaxBuy(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("maxBuy", builder.build())).stack;
    let result = source.readBigNumber();
    return result;
  }

  async getTokenPrice(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("tokenPrice", builder.build())).stack;
    let result = source.readBigNumber();
    return result;
  }

  async getInvestmentToken(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("investmentToken", builder.build())).stack;
    let result = source.readAddress();
    return result;
  }

  async getOwner(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("owner", builder.build())).stack;
    let result = source.readAddress();
    return result;
  }

  async getStopped(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("stopped", builder.build())).stack;
    let result = source.readBoolean();
    return result;
  }
}
