# Rims

[![Build Status](https://travis-ci.org/chenyueban/rims.svg?branch=master)](https://travis-ci.org/chenyueban/rims)
[![codecov](https://codecov.io/gh/chenyueban/rims/branch/master/graph/badge.svg)](https://codecov.io/gh/chenyueban/rims)
[![npm](https://img.shields.io/npm/v/rims.svg)](https://www.npmjs.com/package/rims)
[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/chenyueban/rims/blob/master/LICENSE)

> 即插即用的 `react` 与 `redux` 连接池, 提供与 `react-redux` 相同的 api.

## Why not `react-redux` ?

`react-redux` 通过 `context` 将整个项目变成了一颗 "组件树", 每个组件变成了这棵树上的节点

![react-redux.png](https://i.loli.net/2018/12/27/5c2446220f4f1.png)

这就意味着如果有一个组件脱离了这颗树, 那么这个组件将无法与 `store` 通信

`rims` 架构下, 整个项目看起来像是一个圆环, 无论是子组件或父组件, 他们直接与圆环中心相关联

![rims.png](https://i.loli.net/2018/12/27/5c2446359ecae.png)

`rims` 提供与 `react-redux` 相同用法的 `connect`.

`rims` 即插即用 甚至可以与原有使用 `react-redux` 的项目共存(注意: 同一组件不要同时使用二者的 `connect`), 可将 `store` 直接传入 `createConnect`, 只维护一个 `store`.

## Quick Start

### Installation

```
npm install --save rims
```
or
```
yarn add rims
```

### Create store and connect

```js
// createConnect.js
import { createStore } from 'redux';
import reducers from './reducers';
import { createConnect } from 'rims';

const store = createStore(reducers);

export default createConnect(store);
```

需要创建一个新的文件, 用于创建 `store` 和 `createConnect`

[创建 `store`](https://redux.js.org/basics/store), 我们仅替换了 `react-redux`,
好消息是若你此前配置过 `store`, 那么 `store` 不需要变动, 仅仅导出 `createConnect` 即可. 当然这也意味着我们仍然可以用 `redux` 的插件: `redux-thunk` `redux-logger` 等.

### Connect Components

```js
import connect from './createConnect';

@connect(state => state)
class App extends React.Component{
  // ...
}
```

## 多页面应用状态共享

通过状态数据持久化实现, 使用 [`redux-persist`](https://github.com/rt2zz/redux-persist) 实现状态数据持久化.

```js
// createConnect.js
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import reducers from './reducers';
import { createConnect } from 'rims';

const persistConfig = {
  key: 'root',
  storage: storageSession,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer);

export default createConnect(store);
```

## License

MIT