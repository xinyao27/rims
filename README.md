# Rims

[![Build Status](https://travis-ci.org/chenyueban/rims.svg?branch=master)](https://travis-ci.org/chenyueban/rims)
[![codecov](https://codecov.io/gh/chenyueban/rims/branch/master/graph/badge.svg)](https://codecov.io/gh/chenyueban/rims)
[![npm](https://img.shields.io/npm/v/rims.svg)](https://www.npmjs.com/package/rims)
[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/chenyueban/rims/blob/master/LICENSE)

> 即插即用的 `react` 与 `redux` 连接池, 提供与 `react-redux` 相同的 api.

## Why not `react-redux` ?

`react` 项目一般都由一颗 "组件树" 构成, 每个组件变成了这棵树上的节点, `react-redux` 通过 `context` 作为中介与各个组件通信

![react-redux.png](https://i.loli.net/2018/12/27/5c2446220f4f1.png)

这就意味着如果有一个组件脱离了这颗树, 那么这个组件将无法与 `store` 通信.
例如 [一个特殊的弹框组件](https://chenyueban.github.io/rims/dist/#5)

另一方面, 对于一些较为特殊的 `react` 应用(即依靠浏览器或其他路由方式的多页面应用), 这样页面跳转后只能依靠数据持久化方式( `sessionStorage` `localStorage` 等)共享数据.

这种情况下, 由于基本上很难存在 `根组件` 的概念, `react-redux` 就显得无比乏力.

## Why `rims` ?

`rims` 仅仅是在一些特殊场景下代替了 `react-redux`(还是需要 `redux`)

`rims` 可以与 `react-redux` 共存(同一组件不要同时使用二者的 `connect`), 可将 `store` 直接传入 `createConnect`, 只维护一个 `store`. [=> demo](https://chenyueban.github.io/rims/dist/#14)

实质上 `rims` 的 `connect` 组件的结果是将组件直接与 `store` 相连

![rims.png](https://i.loli.net/2018/12/27/5c2446359ecae.png)

使用 `rims`, 首先需要创建 `store` 和构建 `connect` 方法

```js
import { createConnect } from 'rims';
export default createConnect(store);
```

`createConnect(store)` 就是我们创建好的 `connect` 方法, 可以看出与 `react-redux` 使用不同的地方在于: `rims` 需要自行创建 `connect`

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
好消息是若你此前配置过 `store`, 那么 `store` 不需要变动, 仅仅导出 `createConnect` 即可. 当然这也意味着我们仍然可以用 `redux` 的生态: `redux-thunk` `redux-logger` `redux-devtools` 等.

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

## 最后

`rims` 仍然有许多不足, 如果你对 `rims` 感兴趣, 欢迎加入.

## License

MIT