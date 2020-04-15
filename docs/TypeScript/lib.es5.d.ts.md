# TypeScript `lib.es5.d.ts` 文件内置类型

## ECMAScript APIs

### 类型

+ NaN
+ Infinity
+ PropertyKey
  + string | number | symbol
+ Object
  + ObjectConstructor
+ Function
  + FunctionConstructor
+ ThisParameterType
  + 提取函数类型的 `this` 参数的类型，如果函数类型没有 `this` 参数, 返回 `unknown`
  + `type ThisParameterType<T> = T extends (this: infer U, ...args: any[]) => any ? U : unknown;`
+ OmitThisParameter
  + 从函数类型中删除 `this` 参数
  + `type OmitThisParameter<T> = unknown extends ThisParameterType<T> ? T : T extends (...args: infer A) => infer R ? (...args: A) => R : T;`
+ String
  + StringConstructor
+ Boolean
  + BooleanConstructor
+ Number
  + NumberConstructor
+ Math
  + Math
+ Date
  + DateConstructor
+ RegExp
  + RegExpConstructor
+ Error
  + ErrorConstructor
+ EvalError
  + EvalErrorConstructor
+ RangeError
  + RangeErrorConstructor
+ ReferenceError
  + ReferenceErrorConstructor
+ SyntaxError
  + SyntaxErrorConstructor
+ URIError
  + URIErrorConstructor
+ JSON
  + JSON
+ ClassDecorator
+ PropertyDecorator
+ MethodDecorator
+ ParameterDecorator
+ PromiseConstructorLike
+ ArrayBufferLike
+ ArrayBuffer
  + ArrayBufferConstructor
+ DataView
  + DataViewConstructor
+ Int8Array
  + Int8ArrayConstructor
+ Uint8Array
  + Uint8ArrayConstructor

### 接口

+ Symbol
+ PropertyDescriptor 属性描述符
+ PropertyDescriptorMap
+ Object
+ ObjectConstructor
+ Function
+ FunctionConstructor
+ CallableFunction
+ NewableFunction
+ IArguments
+ String
+ StringConstructor
+ Boolean
+ BooleanConstructor
+ Number
+ NumberConstructor
+ TemplateStringsArray
+ ImportMeta
+ Math
+ Date
+ DateConstructor
+ RegExpMatchArray
+ RegExpExecArray
+ RegExp
+ RegExpConstructor
+ Error
+ ErrorConstructor
+ EvalError
+ EvalErrorConstructor
+ RangeError
+ RangeErrorConstructor
+ ReferenceError
+ ReferenceErrorConstructor
+ SyntaxError
+ SyntaxErrorConstructor
+ TypeError
+ TypeErrorConstructor
+ URIError
+ URIErrorConstructor
+ JSON
+ ReadonlyArray
+ ConcatArray
+ Array
+ ArrayConstructor
+ TypedPropertyDescriptor
+ PromiseLike
+ Promise
+ ArrayLike
+ ArrayBuffer
+ ArrayBufferTypes
+ ArrayBufferConstructor
+ ArrayBufferView
+ DataView
+ DataViewConstructor
+ Int8Array
+ Int8ArrayConstructor
+ Uint8Array
+ Uint8ArrayConstructor
+ Uint8ClampedArray
+ Uint8ClampedArrayConstructor
+ Int16Array
+ Int16ArrayConstructor
+ Uint16Array
+ Uint16ArrayConstructor
+ Int32Array
+ Int32ArrayConstructor
+ Uint32Array
+ Uint32ArrayConstructor
+ Float32Array
+ Float32ArrayConstructor
+ Float64Array
+ Float64ArrayConstructor

### 函数

+ eval
+ parseInt
+ parseFloat
+ isNaN
+ isFinite
+ decodeURI
+ decodeURIComponent
+ encodeURI
+ encodeURIComponent
+ escape
+ unescape

## ECMAScript Internationalization API

### 命名空间

+ Intl
  + CollatorOptions
  + ResolvedCollatorOptions
  + Collator
  + NumberFormatOptions
  + ResolvedNumberFormatOptions
  + NumberFormat
  + DateTimeFormatOptions
  + ResolvedDateTimeFormatOptions
  + DateTimeFormat

## 工具类型

+ Partial
+ Required
+ Readonly
+ Pick
+ Record
+ Exclude
+ Extract
+ Omit
+ NonNullable
+ Parameters
+ ConstructorParameters
+ ReturnType
+ InstanceType
+ ThisType
+ ThisParameterType
+ OmitThisParameter
