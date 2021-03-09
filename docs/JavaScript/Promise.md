# promise


Promise 是 ES6 新增的语法，解决了回调地狱的问题。

可以把 Promise 看成一个状态机。初始是 `pending` 状态，可以通过函数 `resolve` 和 `reject` ，将状态转变为 `resolved` 或者 `rejected` 状态，状态一旦改变就不能再次变化。

`then` 函数会返回一个 Promise 实例，并且该返回值是一个新的实例而不是之前的实例。因为 Promise 规范规定除了 `pending` 状态，其他状态是不可以改变的，如果返回的是一个相同实例的话，多个 `then` 调用就失去意义了。

对于 `then` 来说，本质上可以把它看成是 `flatMap`

```js
// 三种状态
const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";
// promise 接收一个函数参数，该函数会立即执行
function MyPromise(fn) {
  let _this = this;
  _this.currentState = PENDING;
  _this.value = undefined;
  // 用于保存 then 中的回调，只有当 promise
  // 状态为 pending 时才会缓存，并且每个实例至多缓存一个
  _this.resolvedCallbacks = [];
  _this.rejectedCallbacks = [];

  _this.resolve = function (value) {
    if (value instanceof MyPromise) {
      // 如果 value 是个 Promise，递归执行
      return value.then(_this.resolve, _this.reject)
    }
    setTimeout(() => { // 异步执行，保证执行顺序
      if (_this.currentState === PENDING) {
        _this.currentState = RESOLVED;
        _this.value = value;
        _this.resolvedCallbacks.forEach(cb => cb());
      }
    })
  };

  _this.reject = function (reason) {
    setTimeout(() => { // 异步执行，保证执行顺序
      if (_this.currentState === PENDING) {
        _this.currentState = REJECTED;
        _this.value = reason;
        _this.rejectedCallbacks.forEach(cb => cb());
      }
    })
  }
  // 用于解决以下问题
  // new Promise(() => throw Error('error))
  try {
    fn(_this.resolve, _this.reject);
  } catch (e) {
    _this.reject(e);
  }
}

MyPromise.prototype.then = function (onResolved, onRejected) {
  var self = this;
  // 规范 2.2.7，then 必须返回一个新的 promise
  var promise2;
  // 规范 2.2.onResolved 和 onRejected 都为可选参数
  // 如果类型不是函数需要忽略，同时也实现了透传
  // Promise.resolve(4).then().then((value) => console.log(value))
  onResolved = typeof onResolved === 'function' ? onResolved : v => v;
  onRejected = typeof onRejected === 'function' ? onRejected : r => throw r;

  if (self.currentState === RESOLVED) {
    return (promise2 = new MyPromise(function (resolve, reject) {
      // 规范 2.2.4，保证 onFulfilled，onRjected 异步执行
      // 所以用了 setTimeout 包裹下
      setTimeout(function () {
        try {
          var x = onResolved(self.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (reason) {
          reject(reason);
        }
      });
    }));
  }

  if (self.currentState === REJECTED) {
    return (promise2 = new MyPromise(function (resolve, reject) {
      setTimeout(function () {
        // 异步执行onRejected
        try {
          var x = onRejected(self.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (reason) {
          reject(reason);
        }
      });
    }));
  }

  if (self.currentState === PENDING) {
    return (promise2 = new MyPromise(function (resolve, reject) {
      self.resolvedCallbacks.push(function () {
        // 考虑到可能会有报错，所以使用 try/catch 包裹
        try {
          var x = onResolved(self.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (r) {
          reject(r);
        }
      });

      self.rejectedCallbacks.push(function () {
        try {
          var x = onRejected(self.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (r) {
          reject(r);
        }
      });
    }));
  }
};
// 规范 2.3
function resolutionProcedure(promise2, x, resolve, reject) {
  // 规范 2.3.1，x 不能和 promise2 相同，避免循环引用
  if (promise2 === x) {
    return reject(new TypeError("Error"));
  }
  // 规范 2.3.2
  // 如果 x 为 Promise，状态为 pending 需要继续等待否则执行
  if (x instanceof MyPromise) {
    if (x.currentState === PENDING) {
      x.then(function (value) {
        // 再次调用该函数是为了确认 x resolve 的
        // 参数是什么类型，如果是基本类型就再次 resolve
        // 把值传给下个 then
        resolutionProcedure(promise2, value, resolve, reject);
      }, reject);
    } else {
      x.then(resolve, reject);
    }
    return;
  }
  // 规范 2.3.3.3.3
  // reject 或者 resolve 其中一个执行过得话，忽略其他的
  let called = false;
  // 规范 2.3.3，判断 x 是否为对象或者函数
  if (x !== null && (typeof x === "object" || typeof x === "function")) {
    // 规范 2.3.3.2，如果不能取出 then，就 reject
    try {
      // 规范 2.3.3.1
      let then = x.then;
      // 如果 then 是函数，调用 x.then
      if (typeof then === "function") {
        // 规范 2.3.3.3
        then.call(
          x,
          y => {
            if (called) return;
            called = true;
            // 规范 2.3.3.3.1
            resolutionProcedure(promise2, y, resolve, reject);
          },
          e => {
            if (called) return;
            called = true;
            reject(e);
          }
        );
      } else {
        // 规范 2.3.3.4
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    // 规范 2.3.4，x 为基本类型
    resolve(x);
  }
}
```

以上就是根据 Promise / A+ 规范来实现的代码，可以通过 `promises-aplus-tests` 的完整测试

## PromiseLite

```ts

const enum State {
  awaiting,
  resolved,
  rejected,
}

type TResolver = (resolve: (value: unknown) => unknown, reject: (value: unknown) => unknown) => unknown;

export default class Promise {
  public callbacks: any[] = [];
  public state = State.awaiting;
  public resolveTo: any = null;
  public rejectedTo: any = null;

  constructor(cb: TResolver) {
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
    this.next = this.next.bind(this);
    cb(this.resolve, this.reject);
  }

  public resolve(result: any) {
    this.state = State.resolved;
    this.resolveTo = result;
    this.next(result);
  }

  public reject(err: any) {
    this.state = State.rejected;
    this.rejectedTo = err;
    this.next(null, err);
  }

  private unwrap(promise: Promise, resolve: Function) {
    if (promise instanceof Promise) {
      promise.then(result => {
        this.unwrap(result, resolve);
      });
      return;
    }
    resolve(promise);
  }

  next(resolution = null, rejection = null) {
    while (this.callbacks.length > 0) {
      const deferred = this.callbacks.shift();
      if (deferred) {
        const {didResolve, didReject, reject, resolve} = deferred;
        switch (this.state) {
          case State.resolved:
            let promise = didResolve(resolution);
            this.unwrap(promise, resolve);
            break;
          case State.rejected:
            reject(didReject(rejection));
            break;
        }
      }
    }
  }

  then(didResolve, didReject) {
    if (!didResolve) {
      return new Promise((resolve, reject) => {
        if (this.state === State.resolved) {
          resolve(this.resolveTo);
        } else if (this.state === State.rejected) {
          reject(this.rejectedTo);
        } else {
          const defer = {
            didResolve: (result: any) => result,
            didReject: (result: any) => result,
            resolve,
            reject,
          };
          this.callbacks = [...this.callbacks, defer];
        }
      });
    }
  }
}


```

## 自己的

```ts

const enum Status {
  SUCCESS = 'fulfilled',
  ERROR = 'rejected',
  ING = 'pending',
}

class Promise {
  private status = Status.ING; //Promise 状态
  private successList!: Function;
  private errorList!: Function;
  private finallyList!: Function;
  constructor(process: (resolve: Function, reject: Function) => unknown) {
    process(this.onResolve.bind(this), this.onRejected.bind(this));

  }

  private onResolve(resolveMsg: any) {
    if (this.status === Status.ING) {
      this.status = Status.SUCCESS;
      this.trigger(Status.SUCCESS, resolveMsg);
    }
  }

  private onRejected(rejectedMsg: any) {
    if (this.status === Status.ING) {
      this.status = Status.ERROR;
      this.trigger(Status.ERROR, rejectedMsg);
    }

  }

  private trigger(status: Status, message: any) {
    if (status === Status.SUCCESS) {
      this.successList.call(this, message)
    }
    if (status === Status.ERROR) {
      this.errorList.call(this, message);
    }
    this.finallyList.call(this);
  }

  then(onResolve: (successMsg: any) => unknown, onRejected?: (errorMsg: any) => unknown) {
    this.successList = onResolve;
    if (onRejected) {
      this.errorList = onRejected;
    }
    return this;
  }

  catch(onReject: (errorMsg: any) => unknown) {
    !this.errorList && (this.errorList = onReject);
    return this
  }

  finally(onFinally: () => unknown) {
    this.finallyList = onFinally;
    return this;
  }
}

const p = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve('resolved');
  }, 2000);
}).then(res => {
  console.log(res);
  console.log('success');
}).catch(err => {
  console.log(err);
}).finally(()=> {
  console.log('finally');
});


```