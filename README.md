# Rims

> redux 与 react 结合的另一种方式, 提供与 `react-redux` 相同的 api, 底层使用闭包实现, 告别 context!

## Why not `react-redux` ?

`react-redux` 使用 `context` 链接各个组件, 这意味着一旦两个组件不属于同一个根组件, 二者数据将无法共享.

`rims` 提供与 `react-redux` 相同用法的 `connect`, 但是 `rims` 不需要写 `Provider`, 你需要的仅仅是创建 `store` 与 `createConnect`.

`rims` 利用闭包实现组件之间的联系, 如果结合 `redux-persist` 甚至可以达到不同页面之间的数据流通.

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