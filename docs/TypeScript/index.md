# TypeScript 学习笔记

## keyof

```ts
interface IKeyList {
    name: string
    age: number
    love: 'movie'
}

type person = keyof IKeyList; // 'name' | 'age' | 'love'

interface IObj<T> {
    [key: string]: T;
}

type keys = keyof IObj<number>; // string | number
type value = IObj<number>['a']; // number

```

## infer

+ 待推断的类型 条件类型中的类型推断
+ lib.es5.d.ts 中的应用

  ```ts
    /**
    * Obtain the parameters of a function type in a tuple
    * 获取一个元组类型的函数参数类型
    */
    type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

    /**
    * Obtain the parameters of a constructor function type in a tuple
    * 获取一个元组类型的构造函数参数类型
    */
    type ConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : never;

    /**
    * Obtain the return type of a function type
    * 获取函数的返回值类型
    */
    type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

    /**
    * Obtain the return type of a constructor function type
    */
    type InstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any;

    type f = (name: string, age: number) => boolean;
    type paramF = Parameters<f>; // [string, number]
    type name = paramF[1] // number
    type returnF = ReturnType<f> // boolean

  ```
