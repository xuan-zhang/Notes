/**
 * @Date: 2020-05-20
 */
// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.

/// <reference no-default-lib="true" />
/// <reference lib="esnext" />

declare namespace Deno {
  /** A set of error constructors that are raised by Deno APIs. 
   * 
   * @i18n 一组由 Deno API 提出的错误构造函数
  */
  export const errors: {
    NotFound: ErrorConstructor;
    PermissionDenied: ErrorConstructor;
    ConnectionRefused: ErrorConstructor;
    ConnectionReset: ErrorConstructor;
    ConnectionAborted: ErrorConstructor;
    NotConnected: ErrorConstructor;
    AddrInUse: ErrorConstructor;
    AddrNotAvailable: ErrorConstructor;
    BrokenPipe: ErrorConstructor;
    AlreadyExists: ErrorConstructor;
    InvalidData: ErrorConstructor;
    TimedOut: ErrorConstructor;
    Interrupted: ErrorConstructor;
    WriteZero: ErrorConstructor;
    UnexpectedEof: ErrorConstructor;
    BadResource: ErrorConstructor;
    Http: ErrorConstructor;
    Busy: ErrorConstructor;
  };

  /** The current process id of the runtime. 
   * 
   * @i18n 当前运行时的进程ID
  */

  export let pid: number;

  /** Reflects the `NO_COLOR` environment variable.
   *
   * @i18n 显示环境变量 `NO_COLOR` 的值。
   * See: https://no-color.org/ */
  export let noColor: boolean;

  export interface TestDefinition {
    fn: () => void | Promise<void>;
    name: string;
    ignore?: boolean;
    /** Check that the number of async completed ops after the test is the same
     * as number of dispatched ops. Defaults to true.
     * 
     * @i18n 检查测试后的异步完成操作数是否与分发的操作数相同。默认为 "true"。
     * */
    sanitizeOps?: boolean;
    /** Ensure the test case does not "leak" resources - ie. the resource table
     * after the test has exactly the same contents as before the test. Defaults
     * to true. 
     * 
     * @i18n 确保测试用例不会 "泄露 "资源--即测试后的资源表的内容与测试前完全相同。默认为true
     * */
    sanitizeResources?: boolean;
  }

  /** Register a test which will be run when `deno test` is used on the command
   * line and the containing module looks like a test module.
   * `fn` can be async if required.
   * 
   * @i18n 注册一个测试, 它将在命令行执行 `deno test` 操作并且它包含的模块看起来像一个测试模块时运行
   * 如果需要 `fn` 可以是一个异步函数.
   *
   *          import {assert, fail, assertEquals} from "https://deno.land/std/testing/asserts.ts";
   *
   *          Deno.test({
   *            name: "example test",
   *            fn(): void {
   *              assertEquals("world", "world");
   *            },
   *          });
   *
   *          Deno.test({
   *            name: "example ignored test",
   *            ignore: Deno.build.os === "windows"
   *            fn(): void {
   *              // This test is ignored only on Windows machines
   *              // 只有在 windows 机器上 忽略这个测试
   *            },
   *          });
   *
   *          Deno.test({
   *            name: "example async test",
   *            async fn() {
   *              const decoder = new TextDecoder("utf-8");
   *              const data = await Deno.readFile("hello_world.txt");
   *              assertEquals(decoder.decode(data), "Hello world")
   *            }
   *          });
   */
  export function test(t: TestDefinition): void;

  /** Register a test which will be run when `deno test` is used on the command
   * line and the containing module looks like a test module.
   * `fn` can be async if required.
   * 
   * @i18n 注册一个测试, 它将在命令行执行 `deno test` 操作并且它包含的模块看起来像一个测试模块时运行
   * 如果需要 `fn` 可以是一个异步函数.
   *
   *        import {assert, fail, assertEquals} from "https://deno.land/std/testing/asserts.ts";
   *
   *        Deno.test("My test description", ():void => {
   *          assertEquals("hello", "hello");
   *        });
   *
   *        Deno.test("My async test description", async ():Promise<void> => {
   *          const decoder = new TextDecoder("utf-8");
   *          const data = await Deno.readFile("hello_world.txt");
   *          assertEquals(decoder.decode(data), "Hello world")
   *        });
   * */
  export function test(name: string, fn: () => void | Promise<void>): void;

  /** Exit the Deno process with optional exit code. If no exit code is supplied
   * then Deno will exit with return code of 0.
   * 
   * @i18n 退出 Deno 进程， 可以指定退出码，若无则为 0
   *
   *       Deno.exit(5);
   */
  export function exit(code?: number): never;

  export const env: {
    /** Retrieve the value of an environment variable. Returns undefined if that
     * key doesn't exist.
     * 
     * @i18n 取回环境变量的值，如果没有， 返回 undefined
     *
     *       console.log(Deno.env.get("HOME"));  // e.g. outputs "/home/alice"
     *       console.log(Deno.env.get("MADE_UP_VAR"));  // outputs "Undefined"
     *
     * Requires `allow-env` permission.
     * 
     * @i81n 需要 `allow-env` 权限
     * 
     * */
    get(key: string): string | undefined;

    /** Set the value of an environment variable.
     * 
     * @i18n 设置环境变量的值
     *
     *       Deno.env.set("SOME_VAR", "Value"));
     *       Deno.env.get("SOME_VAR");  // outputs "Value"
     *
     * Requires `allow-env` permission.
     * 
     * @i81n 需要 `allow-env` 权限
     * 
     *  */
    set(key: string, value: string): void;

    /** Returns a snapshot of the environment variables at invocation.
     * 
     * @i18n 返回调用时环境变量的快照
     *
     *       Deno.env.set("TEST_VAR", "A");
     *       const myEnv = Deno.env.toObject();
     *       console.log(myEnv.SHELL);
     *       Deno.env.set("TEST_VAR", "B");
     *       console.log(myEnv.TEST_VAR);  // outputs "A"
     *
     * Requires `allow-env` permission.
     * 
     * @i81n 需要 `allow-env` 权限
     * 
     *  */
    toObject(): { [index: string]: string };
  };

  /**
   * Returns the path to the current deno executable.
   *
   * @i18n 返回当前 deno 可执行文件路径
   *
   *       console.log(Deno.execPath());  // e.g. "/home/alice/.local/bin/deno"
   *
   * Requires `allow-read` permission.
   * 
   * @i18n 需要 `allow-read` 权限
   * 
   */
  export function execPath(): string;

  /**
   * Change the current working directory to the specified path.
   * 
   * @i18n 更改当前工作目录为指定路径 (类似 bash cd 命令)
   *
   *       Deno.chdir("/home/userA");
   *       Deno.chdir("../userB");
   *       Deno.chdir("C:\\Program Files (x86)\\Java");
   *
   * Throws `Deno.errors.NotFound` if directory not found.
   * 
   * @i18n 抛出 `Deno.errors.NotFound` 错误, 如果目录不存在
   * Throws `Deno.errors.PermissionDenied` if the user does not have access
   * rights
   * 
   * @i18n 抛出 `Deno.errors.PermissionDen` 错误，如果无访问权限
   *
   * Requires --allow-read.
   */
  export function chdir(directory: string): void;

  /**
   * Return a string representing the current working directory.
   *
   * @i18n 返回当前工作目录的字符串。
   * 
   * If the current directory can be reached via multiple paths (due to symbolic
   * links), `cwd()` may return any one of them.
   * 
   * @i18n 如果当前目录可以通过多个路径访问（由于符号链接导致），可能会返回其中任意一个。
   *
   *       const currentWorkingDirectory = Deno.cwd();
   *
   * Throws `Deno.errors.NotFound` if directory not available.
   * 
   * @i18n 如果目录不存在，则抛出 `Deno.errors.NotFound`。
   * 
   * Requires --allow-read
   */
  export function cwd(): string;

  export enum SeekMode {
    Start = 0,
    Current = 1,
    End = 2,
  }

  export interface Reader {
    /** Reads up to `p.byteLength` bytes into `p`. It resolves to the number of
     * bytes read (`0` < `n` <= `p.byteLength`) and rejects if any error
     * encountered. Even if `read()` resolves to `n` < `p.byteLength`, it may
     * use all of `p` as scratch space during the call. If some data is
     * available but not `p.byteLength` bytes, `read()` conventionally resolves
     * to what is available instead of waiting for more.
     * 
     * @i18n 最多读取 `p.byteLength` 个字节到p中，然后返回读取的字节数（`0 < n <= p.byteLength`），并在遇到任何错误时返回拒绝状态的回调函数。
     * 即使 `read()` 返回值为 `n < p.byteLength`，p也可能在调用期间被用作临时空间。
     * 如果有数据可用，而不是 `p.byteLength` 个字节，`read()` 通常会返回可用值，而不是等待更多。
     *
     * When `read()` encounters end-of-file condition, it resolves to EOF
     * (`null`).
     * 
     * @i18n 当 `read()` 遇到文件结束条件时，将返回 `EOF` (`null`)。
     *
     * When `read()` encounters an error, it rejects with an error.
     * 
     * @i18n 当 `read()` 遇到错误时，它会返回拒绝状态的回调函数，参数值为错误信息。
     *
     * Callers should always process the `n` > `0` bytes returned before
     * considering the EOF (`null`). Doing so correctly handles I/O errors that
     * happen after reading some bytes and also both of the allowed EOF
     * behaviors.
     *
     * @i18n 调用者应始终处理返回值为 `n > 0` 的情况，然后再考虑 `EOF`。
     * 应正确处理在读取一些字节以及两种被允许的EOF行为之后可能发生的 I/O 错误。
     *
     * Implementations should not retain a reference to `p`.
     * 
     * @i18n 实现不应保留对 `p` 的引用
     *
     * Use Deno.iter() to turn a Reader into an AsyncIterator.
     * @i18n 使用Deno.iter()将 Reader 变成异步迭代器。 
     */
    read(p: Uint8Array): Promise<number | null>;
  }

  export interface ReaderSync {
    /** Reads up to `p.byteLength` bytes into `p`. It resolves to the number
     * of bytes read (`0` < `n` <= `p.byteLength`) and rejects if any error
     * encountered. Even if `read()` returns `n` < `p.byteLength`, it may use
     * all of `p` as scratch space during the call. If some data is available
     * but not `p.byteLength` bytes, `read()` conventionally returns what is
     * available instead of waiting for more.
     *
     * When `readSync()` encounters end-of-file condition, it returns EOF
     * (`null`).
     *
     * When `readSync()` encounters an error, it throws with an error.
     *
     * Callers should always process the `n` > `0` bytes returned before
     * considering the EOF (`null`). Doing so correctly handles I/O errors that happen
     * after reading some bytes and also both of the allowed EOF behaviors.
     *
     * Implementations should not retain a reference to `p`.
     *
     * Use Deno.iterSync() to turn a ReaderSync into an Iterator.
     */
    readSync(p: Uint8Array): number | null;
  }

  export interface Writer {
    /** Writes `p.byteLength` bytes from `p` to the underlying data stream. It
     * resolves to the number of bytes written from `p` (`0` <= `n` <=
     * `p.byteLength`) or reject with the error encountered that caused the
     * write to stop early. `write()` must reject with a non-null error if
     * would resolve to `n` < `p.byteLength`. `write()` must not modify the
     * slice data, even temporarily.
     * 
     * @i18n 将 `p` 中的 `p.byteLength` 字节写入底层数据流。 它 resolve 时返回值为从 `p` 写入的
     * 字节数(`0` <= `n` <= `p.byteLength`），reject 时返回值为导致写入提前停止的错误。
     * 如果将要 resolve 一个 `n` < `p.byteLength` 的值时， `write()` 必须 reject，并且返回
     * 一个非空错误。`write()` 禁止修改分片数据，即使是临时修改。
     * 
     * Implementations should not retain a reference to `p`.
     */
    write(p: Uint8Array): Promise<number>;
  }

  export interface WriterSync {
    /** Writes `p.byteLength` bytes from `p` to the underlying data
     * stream. It returns the number of bytes written from `p` (`0` <= `n`
     * <= `p.byteLength`) and any error encountered that caused the write to
     * stop early. `writeSync()` must throw a non-null error if it returns `n` <
     * `p.byteLength`. `writeSync()` must not modify the slice data, even
     * temporarily.
     *
     * Implementations should not retain a reference to `p`.
     */
    writeSync(p: Uint8Array): number;
  }

  export interface Closer {
    close(): void;
  }

  export interface Seeker {
    /** Seek sets the offset for the next `read()` or `write()` to offset,
     * interpreted according to `whence`: `Start` means relative to the
     * start of the file, `Current` means relative to the current offset,
     * and `End` means relative to the end. Seek resolves to the new offset
     * relative to the start of the file.
     * 
     * @i18n 设置下一个 `read()` 或 `write()` 的偏移量，根据 `whence` 进行决定从哪个位置开始偏移：
     * `Start` 表示相对于文件开头，`Current` 表示相对于当前位置，`End` 表示相对于文件末尾。
     * Seek 解析（resolve）的值为相对于文件开头的新偏移量。
     *
     * Seeking to an offset before the start of the file is an error. Seeking to
     * any positive offset is legal, but the behavior of subsequent I/O
     * operations on the underlying object is implementation-dependent.
     * It returns the number of cursor position.
     * 
     * @i18n 把偏移量设置到文件开始之前是错误的。
     * 设置任何正偏移都是合法的，但是对于之后的 I/O 操作的行为则取决于实现。
     * 它返回设置之后的偏移位置。
     * 
     */
    seek(offset: number, whence: SeekMode): Promise<number>;
  }

  export interface SeekerSync {
    /** Seek sets the offset for the next `readSync()` or `writeSync()` to
     * offset, interpreted according to `whence`: `Start` means relative
     * to the start of the file, `Current` means relative to the current
     * offset, and `End` means relative to the end.
     *
     * Seeking to an offset before the start of the file is an error. Seeking to
     * any positive offset is legal, but the behavior of subsequent I/O
     * operations on the underlying object is implementation-dependent.
     */
    seekSync(offset: number, whence: SeekMode): number;
  }

  /** Copies from `src` to `dst` until either EOF (`null`) is read from `src` or
   * an error occurs. It resolves to the number of bytes copied or rejects with
   * the first error encountered while copying.
   *
   * @i18n 从 `src` 拷贝文件至 `dst`，拷贝至 `src` 的 `EOF` 或有异常出现时结束。
   * `copy()` 函数返回一个 `Promise`, 成功时 resolve 并返回拷贝的字节数，失败时 reject 并返回拷贝过程中的首个异常。
   *
   *       const source = await Deno.open("my_file.txt");
   *       const buffer = new Deno.Buffer()
   *       const bytesCopied1 = await Deno.copy(source, Deno.stdout);
   *       const bytesCopied2 = await Deno.copy(source, buffer);
   *
   * @param src The source to copy from 拷贝源文件
   * @param dst The destination to copy to 拷贝至目标位置
   * @param options Can be used to tune size of the buffer. Default size is 32kB 
   *                可用于调整缓冲区的大小。默认大小为32kB
   */
  export function copy(
    src: Reader,
    dst: Writer,
    options?: {
      bufSize?: number;
    }
  ): Promise<number>;

  /** Turns a Reader, `r`, into an async iterator.
   * 
   * @i18n 将 Reader 对象 (`r`) 转换为异步迭代器。
   *
   *      let f = await Deno.open("/etc/passwd");
   *      for await (const chunk of Deno.iter(f)) {
   *        console.log(chunk);
   *      }
   *      f.close();
   *
   * Second argument can be used to tune size of a buffer.
   * Default size of the buffer is 32kB.
   * 
   * @i18n 第二个参数用于修改 buffer 的大小
   * 默认 buffer 的大小为 32kB
   *
   *      let f = await Deno.open("/etc/passwd");
   *      const iter = Deno.iter(f, {
   *        bufSize: 1024 * 1024
   *      });
   *      for await (const chunk of iter) {
   *        console.log(chunk);
   *      }
   *      f.close();
   *
   * Iterator uses an internal buffer of fixed size for efficiency; it returns
   * a view on that buffer on each iteration. It is therefore caller's
   * responsibility to copy contents of the buffer if needed; otherwise the
   * next iteration will overwrite contents of previously returned chunk.
   * 
   * @i18n 为了提高效率，迭代器使用一个固定大小的内部缓冲区；
   * 它在每次迭代时返回一个关于该缓冲区的视图。因此，如果需要的话，
   * 调用者有责任复制缓冲区的内容，否则下一次迭代将覆盖之前返回的块的内容。
   * 
   */
  export function iter(
    r: Reader,
    options?: {
      bufSize?: number;
    }
  ): AsyncIterableIterator<Uint8Array>;

  /** Turns a ReaderSync, `r`, into an iterator.
   *
   *      let f = Deno.openSync("/etc/passwd");
   *      for (const chunk of Deno.iterSync(reader)) {
   *        console.log(chunk);
   *      }
   *      f.close();
   *
   * Second argument can be used to tune size of a buffer.
   * Default size of the buffer is 32kB.
   *
   *      let f = await Deno.open("/etc/passwd");
   *      const iter = Deno.iterSync(f, {
   *        bufSize: 1024 * 1024
   *      });
   *      for (const chunk of iter) {
   *        console.log(chunk);
   *      }
   *      f.close();
   *
   * Iterator uses an internal buffer of fixed size for efficiency; it returns
   * a view on that buffer on each iteration. It is therefore caller's
   * responsibility to copy contents of the buffer if needed; otherwise the
   * next iteration will overwrite contents of previously returned chunk.
   */
  export function iterSync(
    r: ReaderSync,
    options?: {
      bufSize?: number;
    }
  ): IterableIterator<Uint8Array>;

  /** Synchronously open a file and return an instance of `Deno.File`.  The
   * file does not need to previously exist if using the `create` or `createNew`
   * open options.  It is the callers responsibility to close the file when finished
   * with it.
   * 
   * @i18n 用同步方式打开一个文件并返回一个 `Deno.File` 实例。如果使用了 `create` 或 `createNew`配置项
   * 文件可以不需要预先存在。调用者应该在完成后关闭文件。
   *
   *
   *       const file = Deno.openSync("/foo/bar.txt", { read: true, write: true });
   *       // Do work with file
   *       Deno.close(file.rid);
   *
   * Requires `allow-read` and/or `allow-write` permissions depending on options.
   * 
   * @i18n 根据不同的配置需要相应的 `allow-read` 及 `allow-write` 权限。
   */
  export function openSync(path: string, options?: OpenOptions): File;

  /** Open a file and resolve to an instance of `Deno.File`.  The
   * file does not need to previously exist if using the `create` or `createNew`
   * open options.  It is the callers responsibility to close the file when finished
   * with it.
   * 
   * @i18n 打开一个文件并异步返回一个 `Deno.File` 实例。如果使用了 `create` 或 `createNew`配置项
   * 文件可以不需要预先存在。调用者应该在完成后关闭文件。
   *
   *       const file = await Deno.open("/foo/bar.txt", { read: true, write: true });
   *       // Do work with file
   *       Deno.close(file.rid);
   *
   * Requires `allow-read` and/or `allow-write` permissions depending on options.
   * @i18n 根据不同的配置需要相应的 `allow-read` 及 `allow-write` 权限。
   */
  export function open(path: string, options?: OpenOptions): Promise<File>;

  /** Creates a file if none exists or truncates an existing file and returns
   *  an instance of `Deno.File`.
   * 
   * @i18n 创建文件并返回一个 `Deno.File` 实例，如果文件已存在则进行覆盖。
   *
   *       const file = Deno.createSync("/foo/bar.txt");
   *
   * Requires `allow-read` and `allow-write` permissions.
   * @i18n 需要 `allow-read` 和 `allow-write` 权限。
   */
  export function createSync(path: string): File;

  /** Creates a file if none exists or truncates an existing file and resolves to
   *  an instance of `Deno.File`.
   * 
   * @i18n 创建文件并异步返回一个 `Deno.File` 实例，如果文件已存在则进行覆盖。
   *
   *       const file = await Deno.create("/foo/bar.txt");
   *
   * Requires `allow-read` and `allow-write` permissions.
   * @i18n 需要 `allow-read` 和 `allow-write` 权限。
   */
  export function create(path: string): Promise<File>;

  /** Synchronously read from a resource ID (`rid`) into an array buffer (`buffer`).
   * 
   * @i18n 同步的从资源ID (`rid`) 读取内容并写入到数组缓冲区(`buffer`)
   *
   * Returns either the number of bytes read during the operation or EOF
   * (`null`) if there was nothing more to read.
   * 
   * @i18n 返回操作期间读取的字节数，如果当没有内容读取时返回 EOF(null) 
   *
   * It is possible for a read to successfully return with `0` bytes. This does
   * not indicate EOF.
   * 
   * @i18n 读取成功返回 0 字节是可能的， 这并不表明 EOF
   *
   *      // if "/foo/bar.txt" contains the text "hello world":
   *      const file = Deno.openSync("/foo/bar.txt");
   *      const buf = new Uint8Array(100);
   *      const numberOfBytesRead = Deno.readSync(file.rid, buf); // 11 bytes
   *      const text = new TextDecoder().decode(buf);  // "hello world"
   *      Deno.close(file.rid);
   */
  export function readSync(rid: number, buffer: Uint8Array): number | null;

  /** Read from a resource ID (`rid`) into an array buffer (`buffer`).
   *
   * Resolves to either the number of bytes read during the operation or EOF
   * (`null`) if there was nothing more to read.
   *
   * It is possible for a read to successfully return with `0` bytes. This does
   * not indicate EOF.
   *
   *      // if "/foo/bar.txt" contains the text "hello world":
   *      const file = await Deno.open("/foo/bar.txt");
   *      const buf = new Uint8Array(100);
   *      const numberOfBytesRead = await Deno.read(file.rid, buf); // 11 bytes
   *      const text = new TextDecoder().decode(buf);  // "hello world"
   *      Deno.close(file.rid);
   */
  export function read(rid: number, buffer: Uint8Array): Promise<number | null>;

  /** Synchronously write to the resource ID (`rid`) the contents of the array
   * buffer (`data`).
   * 
   * @i18n 同步地将数组缓冲区（`data`）的内容写入资源ID（`rid`）
   *
   * Returns the number of bytes written.
   *
   * @i18n 返回写入的字节数
   * 
   *       const encoder = new TextEncoder();
   *       const data = encoder.encode("Hello world");
   *       const file = Deno.openSync("/foo/bar.txt");
   *       const bytesWritten = Deno.writeSync(file.rid, data); // 11
   *       Deno.close(file.rid);
   */
  export function writeSync(rid: number, data: Uint8Array): number;

  /** Write to the resource ID (`rid`) the contents of the array buffer (`data`).
   *
   * Resolves to the number of bytes written.
   *
   *      const encoder = new TextEncoder();
   *      const data = encoder.encode("Hello world");
   *      const file = await Deno.open("/foo/bar.txt");
   *      const bytesWritten = await Deno.write(file.rid, data); // 11
   *      Deno.close(file.rid);
   */
  export function write(rid: number, data: Uint8Array): Promise<number>;

  /** Synchronously seek a resource ID (`rid`) to the given `offset` under mode
   * given by `whence`.  The new position within the resource (bytes from the
   * start) is returned.
   * 
   * @i18n 在给定查询模式 `whence` 和偏移量 `offset` 的情况下，同步地查找指定资源ID（`rid`）。返回资源中新的位置（从头开始的字节数）
   *
   *        const file = Deno.openSync('hello.txt', {read: true, write: true, truncate: true, create: true});
   *        Deno.writeSync(file.rid, new TextEncoder().encode("Hello world"));
   *        // advance cursor 6 bytes
   *        const cursorPosition = Deno.seekSync(file.rid, 6, Deno.SeekMode.Start);
   *        console.log(cursorPosition);  // 6
   *        const buf = new Uint8Array(100);
   *        file.readSync(buf);
   *        console.log(new TextDecoder().decode(buf)); // "world"
   *
   * The seek modes work as follows:
   * 
   * @i18n seek modes 的工作方式如下
   *
   *        // Given file.rid pointing to file with "Hello world", which is 11 bytes long:
   *        // Seek 6 bytes from the start of the file
   *        console.log(Deno.seekSync(file.rid, 6, Deno.SeekMode.Start)); // "6"
   *        // Seek 2 more bytes from the current position
   *        console.log(Deno.seekSync(file.rid, 2, Deno.SeekMode.Current)); // "8"
   *        // Seek backwards 2 bytes from the end of the file
   *        console.log(Deno.seekSync(file.rid, -2, Deno.SeekMode.End)); // "9" (e.g. 11-2)
   */
  export function seekSync(
    rid: number,
    offset: number,
    whence: SeekMode
  ): number;

  /** Seek a resource ID (`rid`) to the given `offset` under mode given by `whence`.
   * The call resolves to the new position within the resource (bytes from the start).
   *
   *        const file = await Deno.open('hello.txt', {read: true, write: true, truncate: true, create: true});
   *        await Deno.write(file.rid, new TextEncoder().encode("Hello world"));
   *        // advance cursor 6 bytes
   *        const cursorPosition = await Deno.seek(file.rid, 6, Deno.SeekMode.Start);
   *        console.log(cursorPosition);  // 6
   *        const buf = new Uint8Array(100);
   *        await file.read(buf);
   *        console.log(new TextDecoder().decode(buf)); // "world"
   *
   * The seek modes work as follows:
   *
   *        // Given file.rid pointing to file with "Hello world", which is 11 bytes long:
   *        // Seek 6 bytes from the start of the file
   *        console.log(await Deno.seek(file.rid, 6, Deno.SeekMode.Start)); // "6"
   *        // Seek 2 more bytes from the current position
   *        console.log(await Deno.seek(file.rid, 2, Deno.SeekMode.Current)); // "8"
   *        // Seek backwards 2 bytes from the end of the file
   *        console.log(await Deno.seek(file.rid, -2, Deno.SeekMode.End)); // "9" (e.g. 11-2)
   */
  export function seek(
    rid: number,
    offset: number,
    whence: SeekMode
  ): Promise<number>;

  /** Close the given resource ID (rid) which has been previously opened, such
   * as via opening or creating a file.  Closing a file when you are finished
   * with it is important to avoid leaking resources.
   * 
   * @i18n 使用给定的资源 ID (rid) 来关闭先前创建或打开的文件。
   * 为避免资源泄露，事关重大，文件应当用完即关。
   *
   *      const file = await Deno.open("my_file.txt");
   *      // do work with "file" object
   *      Deno.close(file.rid);
   */
  export function close(rid: number): void;

  /** The Deno abstraction for reading and writing files. */
  export class File
    implements
      Reader,
      ReaderSync,
      Writer,
      WriterSync,
      Seeker,
      SeekerSync,
      Closer {
    readonly rid: number;
    constructor(rid: number);
    write(p: Uint8Array): Promise<number>;
    writeSync(p: Uint8Array): number;
    read(p: Uint8Array): Promise<number | null>;
    readSync(p: Uint8Array): number | null;
    seek(offset: number, whence: SeekMode): Promise<number>;
    seekSync(offset: number, whence: SeekMode): number;
    close(): void;
  }

  /** A handle for `stdin`. */
  export const stdin: Reader & ReaderSync & Closer & { rid: number };
  /** A handle for `stdout`. */
  export const stdout: Writer & WriterSync & Closer & { rid: number };
  /** A handle for `stderr`. */
  export const stderr: Writer & WriterSync & Closer & { rid: number };

  export interface OpenOptions {
    /** Sets the option for read access. This option, when `true`, means that the
     * file should be read-able if opened.
     *  @i18n 设置读取访问权限的选项。
     * 当为 `true` 时，表示该文件在打开后即处于可读状态
     * */
    read?: boolean;
    /** Sets the option for write access. This option, when `true`, means that
     * the file should be write-able if opened. If the file already exists,
     * any write calls on it will overwrite its contents, by default without
     * truncating it. 
     * 
     * @i18n 设置写访问权限的选项。
     * 当为 `true` 时，表示该文件在打开时即处于可写状态。
     * 如果该文件已存在，则默认情况下，对该文件的任何写调用都将覆盖其内容，而不会截断该文件。
     * */
    write?: boolean;
    /**Sets the option for the append mode. This option, when `true`, means that
     * writes will append to a file instead of overwriting previous contents.
     * Note that setting `{ write: true, append: true }` has the same effect as
     * setting only `{ append: true }`. 
     * 
     * @i18n 设置追加模式的选项。
     * 当为 `true` 时，表示写入将追加到文件中，而不是覆盖先前的内容。
     * 请注意，设置 `{ write: true, append: true }` 与仅设置 `{ append: true }` 具有相同的效果。
     * 
     * */
    append?: boolean;
    /** Sets the option for truncating a previous file. If a file is
     * successfully opened with this option set it will truncate the file to `0`
     * size if it already exists. The file must be opened with write access
     * for truncate to work. 
     * 
     *  @i18n 设置截断上一个文件的选项。
     * 如果使用此选项后成功打开了文件，则文件的长度将被截断为 `0`（如果已存在）。
     * 该文件必须具有写访问权限才能打开，才能进行截断。
     * */
    truncate?: boolean;
    /** Sets the option to allow creating a new file, if one doesn't already
     * exist at the specified path. Requires write or append access to be
     * used.
     * 
     * @i18n 设置选项以允许创建新文件（如果指定路径尚不存在）。
     * 需要使用写权限或追加权限。
     * 
     *  */
    create?: boolean;
    /** Defaults to `false`. If set to `true`, no file, directory, or symlink is
     * allowed to exist at the target location. Requires write or append
     * access to be used. When createNew is set to `true`, create and truncate
     * are ignored. 
     * 
     * @i18n 默认为 `false`。
     * 如果设置为 `true`，则在目标位置不允许存在文件、目录或符号链接。
     * 需要使用写权限或追加权限。
     * 当 createNew 设置为 `true` 时，create 和 truncate 被忽略。
     * 
     * */
    createNew?: boolean;
    /** Permissions to use if creating the file (defaults to `0o666`, before
     * the process's umask).
     * Ignored on Windows.
     * 
     * @i18n 创建文件时使用的权限（在进程调用 `umask` 之前默认为 `0o666`）。
     * 在 Windows 上此选项被忽略。
     *  */
    mode?: number;
  }

  /**
   *
   *  Check if a given resource id (`rid`) is a TTY.
   * 
   * @i18n 检查指定的资源 id (`rid`) 是否为 TTY（终端）
   *
   *       // This example is system and context specific
   *       const nonTTYRid = Deno.openSync("my_file.txt").rid;
   *       const ttyRid = Deno.openSync("/dev/tty6").rid;
   *       console.log(Deno.isatty(nonTTYRid)); // false
   *       console.log(Deno.isatty(ttyRid)); // true
   *       Deno.close(nonTTYRid);
   *       Deno.close(ttyRid);
   */
  export function isatty(rid: number): boolean;

  /** A variable-sized buffer of bytes with `read()` and `write()` methods.
   * 
   * @i18n 一个具有 `read()` 和 `write()` 方法大小可变的字节缓冲区。
   *
   * Deno.Buffer is almost always used with some I/O like files and sockets. It
   * allows one to buffer up a download from a socket. Buffer grows and shrinks
   * as necessary.
   * 
   * @i18n Deno.Buffer 几乎总是用于一些 I/O 操作，比如 文件 与 sockets.
   *  它允许从socket下载到一个缓冲区，缓冲区会根据需要增长和缩小
   *
   * Deno.Buffer is NOT the same thing as Node's Buffer. Node's Buffer was
   * created in 2009 before JavaScript had the concept of ArrayBuffers. It's
   * simply a non-standard ArrayBuffer.
   * 
   * @i18n Deno.Buffer 不同于 Node 的 Buffer. Node 的 Buffer 在2009年创建，这时 JavaScript 还没有 ArrayBuffers 的概念， 它是只是一个非标准的 ArrayBuffer
   *
   * ArrayBuffer is a fixed memory allocation. Deno.Buffer is implemented on top
   * of ArrayBuffer.
   * 
   * @i18n ArrayBuffer是固定的内存分配。 Deno.Buffer在ArrayBuffer的顶层实现。
   *
   * Based on [Go Buffer](https://golang.org/pkg/bytes/#Buffer). */
  export class Buffer implements Reader, ReaderSync, Writer, WriterSync {
    constructor(ab?: ArrayBuffer);
    /** Returns a slice holding the unread portion of the buffer.
     * 
     * @i18n 返回一个缓冲区未读部分的片段。
     *
     * The slice is valid for use only until the next buffer modification (that
     * is, only until the next call to a method like `read()`, `write()`,
     * `reset()`, or `truncate()`). The slice aliases the buffer content at
     * least until the next buffer modification, so immediate changes to the
     * slice will affect the result of future reads.
     * 
     *  @i18n 该片段只在下一次缓冲区修改之前有效 (即, 只有在下一次调用像 `read()`, `write()`,
     * `reset()`, 或者 `truncate()` 这样的方法)。
     * 该片段会在下一次修改缓冲区内容之前将缓冲区内容进行别名处理 ,  所以立刻改变片段会影响未来读取的结果。
     *  */
    bytes(): Uint8Array;
    /** Returns whether the unread portion of the buffer is empty.
     * 
     * @i18n 返回缓冲区的未读部分是否为空。
     * 
     */
    empty(): boolean;
    /** A read only number of bytes of the unread portion of the buffer.
     * 
     * @i18n 只读, 缓冲区未读部分的字节数。
     * 
     */
    readonly length: number;
    /** The read only capacity of the buffer's underlying byte slice, that is,
     * the total space allocated for the buffer's data.
     * 
     * @i18n 缓冲区底层字节片段的容量，即为缓冲区数据分配的总空间。
     * 
     *  */
    readonly capacity: number;
    /** Discards all but the first `n` unread bytes from the buffer but
     * continues to use the same allocated storage. It throws if `n` is
     * negative or greater than the length of the buffer. 
     * 
     * @i18n 除了缓冲器中开头 `n` 个未读字节之外，其他的所有字节都丢弃，但是继续使用相同分配的存储空间。
     * 当 `n` 为负数或者大于缓冲区的长度, 则会抛出异常。
     * 
     * */
    truncate(n: number): void;
    /** Resets the buffer to be empty, but it retains the underlying storage for
     * use by future writes. `.reset()` is the same as `.truncate(0)`.
     * 
     * @i18n 将缓冲区重置为空，但它保留了底层存储供未来写入时使用，`.reset()` 与 `.truncate(0)` 相同。
     *  */
    reset(): void;
    /** Reads the next `p.length` bytes from the buffer or until the buffer is
     * drained. Returns the number of bytes read. If the buffer has no data to
     * return, the return is EOF (`null`).
     * 
     * @i18n 在缓冲区中读取下一个 `p.length` 字节，或直到缓冲区用完为止。
     * 返回读取的字节数。当缓冲区没有数据返回，则返回值为 `EOF(null)`。
     * 
     *  */
    readSync(p: Uint8Array): number | null;
    /** Reads the next `p.length` bytes from the buffer or until the buffer is
     * drained. Resolves to the number of bytes read. If the buffer has no
     * data to return, resolves to EOF (`null`).
     *
     * NOTE: This methods reads bytes sychronously; it's provided for
     * compatibility with `Reader` interfaces.
     * 
     * @i18n 注意：这个读字节方法是同步的；它是为与“Reader”接口兼容而提供的。
     */
    read(p: Uint8Array): Promise<number | null>;
    writeSync(p: Uint8Array): number;
    /** NOTE: This methods writes bytes sychronously; it's provided for
     * compatibility with `Writer` interface. 
     * 
     * @i18n 注意：这是一个同步的写入字节方法；它是为与 `Writer` 接口兼容而提供的
     * 
     * */
    write(p: Uint8Array): Promise<number>;
    /** Grows the buffer's capacity, if necessary, to guarantee space for
     * another `n` bytes. After `.grow(n)`, at least `n` bytes can be written to
     * the buffer without another allocation. If `n` is negative, `.grow()` will
     * throw. If the buffer can't grow it will throw an error.
     * 
     * @i18n 增加缓冲区的容量，必要时保证另一个 `n` 字节的空间。
     * 在 `.grow(n)` 之后，至少可以将 `n` 个字节写到缓冲区中而不需要另外分配。
     * 若 `n` 为负数，`.grow()` 将抛出异常。
     * 当缓冲区不能增加的时候会抛出错误。
     *
     * Based on Go Lang's
     * [Buffer.Grow](https://golang.org/pkg/bytes/#Buffer.Grow). */
    grow(n: number): void;
    /** Reads data from `r` until EOF (`null`) and appends it to the buffer,
     * growing the buffer as needed. It resolves to the number of bytes read.
     * If the buffer becomes too large, `.readFrom()` will reject with an error.
     * 
     * @i18n 从 `r` 读取数据直到 `EOF`，并将其附加到缓冲区，根据需要扩展缓冲区。
     * 解析读取的字节数。 如果缓冲区过大，`.readFrom()` 将会 reject 一个错误。
     *
     * Based on Go Lang's
     * [Buffer.ReadFrom](https://golang.org/pkg/bytes/#Buffer.ReadFrom). */
    readFrom(r: Reader): Promise<number>;
    /** Reads data from `r` until EOF (`null`) and appends it to the buffer,
     * growing the buffer as needed. It returns the number of bytes read. If the
     * buffer becomes too large, `.readFromSync()` will throw an error.
     * 
     * @i18n 从 `r` 读取数据直到 `EOF`，并将其附加到缓冲区，根据需要扩展缓冲区。
     * 解析读取的字节数。 如果缓冲区过大，`.readFromSync()` 将会 reject 一个错误。
     *
     * Based on Go Lang's
     * [Buffer.ReadFrom](https://golang.org/pkg/bytes/#Buffer.ReadFrom). */
    readFromSync(r: ReaderSync): number;
  }

  /** Read Reader `r` until EOF (`null`) and resolve to the content as
   * Uint8Array`.
   * 
   * @i18n 读取 Reader `r` 直到文件的末尾 (`EOF`)，返回`Uint8Array` 格式的文件内容。
   *
   *       // Example from stdin
   *       const stdinContent = await Deno.readAll(Deno.stdin);
   *
   *       // Example from file
   *       const file = await Deno.open("my_file.txt", {read: true});
   *       const myFileContent = await Deno.readAll(file);
   *       Deno.close(file.rid);
   *
   *       // Example from buffer
   *       const myData = new Uint8Array(100);
   *       // ... fill myData array with data
   *       const reader = new Deno.Buffer(myData.buffer as ArrayBuffer);
   *       const bufferContent = await Deno.readAll(reader);
   */
  export function readAll(r: Reader): Promise<Uint8Array>;

  /** Synchronously reads Reader `r` until EOF (`null`) and returns the content
   * as `Uint8Array`.
   *
   *       // Example from stdin
   *       const stdinContent = Deno.readAllSync(Deno.stdin);
   *
   *       // Example from file
   *       const file = Deno.openSync("my_file.txt", {read: true});
   *       const myFileContent = Deno.readAllSync(file);
   *       Deno.close(file.rid);
   *
   *       // Example from buffer
   *       const myData = new Uint8Array(100);
   *       // ... fill myData array with data
   *       const reader = new Deno.Buffer(myData.buffer as ArrayBuffer);
   *       const bufferContent = Deno.readAllSync(reader);
   */
  export function readAllSync(r: ReaderSync): Uint8Array;

  /** Write all the content of the array buffer (`arr`) to the writer (`w`).
   * 
   * @i18n 将所有 Array Buffer （`arr`）中的的内容写入到对象 （`w`） 中。
   *
   *       // Example writing to stdout
   *       const contentBytes = new TextEncoder().encode("Hello World");
   *       await Deno.writeAll(Deno.stdout, contentBytes);
   *
   *       // Example writing to file
   *       const contentBytes = new TextEncoder().encode("Hello World");
   *       const file = await Deno.open('test.file', {write: true});
   *       await Deno.writeAll(file, contentBytes);
   *       Deno.close(file.rid);
   *
   *       // Example writing to buffer
   *       const contentBytes = new TextEncoder().encode("Hello World");
   *       const writer = new Deno.Buffer();
   *       await Deno.writeAll(writer, contentBytes);
   *       console.log(writer.bytes().length);  // 11
   */
  export function writeAll(w: Writer, arr: Uint8Array): Promise<void>;

  /** Synchronously write all the content of the array buffer (`arr`) to the
   * writer (`w`).
   *
   *       // Example writing to stdout
   *       const contentBytes = new TextEncoder().encode("Hello World");
   *       Deno.writeAllSync(Deno.stdout, contentBytes);
   *
   *       // Example writing to file
   *       const contentBytes = new TextEncoder().encode("Hello World");
   *       const file = Deno.openSync('test.file', {write: true});
   *       Deno.writeAllSync(file, contentBytes);
   *       Deno.close(file.rid);
   *
   *       // Example writing to buffer
   *       const contentBytes = new TextEncoder().encode("Hello World");
   *       const writer = new Deno.Buffer();
   *       Deno.writeAllSync(writer, contentBytes);
   *       console.log(writer.bytes().length);  // 11
   */
  export function writeAllSync(w: WriterSync, arr: Uint8Array): void;

  export interface MkdirOptions {
    /** Defaults to `false`. If set to `true`, means that any intermediate
     * directories will also be created (as with the shell command `mkdir -p`).
     * Intermediate directories are created with the same permissions.
     * When recursive is set to `true`, succeeds silently (without changing any
     * permissions) if a directory already exists at the path, or if the path
     * is a symlink to an existing directory.
     * 
     * @i18n 默认为 false。 如果设置为 true，则意味着还将创建所有中间目录（如 shell 命令 mkdir -p 那样）。
     * 使用相同的权限创建中间目录。
     * 当设置为 true 时，如果路径中已经存在目录，或者该路径是到现有目录的符号链接，则会静默地操作成功（不更改任何权限）。
     *  */
    recursive?: boolean;
    /** Permissions to use when creating the directory (defaults to `0o777`,
     * before the process's umask).
     * Ignored on Windows. 
     * 
     * @i18n 创建目录时使用的权限(在进程的unmask前，默认 `0o777`, )
     * 
     * */
    mode?: number;
  }

  /** Synchronously creates a new directory with the specified path.
   * 
   * @i18n 同步的创建指定路径的新目录
   *
   *       Deno.mkdirSync("new_dir");
   *       Deno.mkdirSync("nested/directories", { recursive: true });
   *       Deno.mkdirSync("restricted_access_dir", { mode: 0o700 });
   *
   * Defaults to throwing error if the directory already exists.
   * 
   * @i18n 当文件夹已经存在，默认抛出错误
   *
   * Requires `allow-write` permission.
   * 
   * @i18n 需要 `allow-write` 权限
   *  */
  export function mkdirSync(path: string, options?: MkdirOptions): void;

  /** Creates a new directory with the specified path.
   * 
   * @i18n 用指定的路径创建一个新目录。
   *
   *       await Deno.mkdir("new_dir");
   *       await Deno.mkdir("nested/directories", { recursive: true });
   *       await Deno.mkdir("restricted_access_dir", { mode: 0o700 });
   *
   * Defaults to throwing error if the directory already exists.
   * 
   * Requires `allow-write` permission. */
  export function mkdir(path: string, options?: MkdirOptions): Promise<void>;

  export interface MakeTempOptions {
    /** Directory where the temporary directory should be created (defaults to
     * the env variable TMPDIR, or the system's default, usually /tmp).
     * 
     * @i18n 应该在其中创建临时目录的目录(默认使用环境变量 TMPDIR, 或者系统默认目录，通常是 /tmp)
     * 
     *  */
    dir?: string;
    /** String that should precede the random portion of the temporary
     * directory's name.
     * 
     * @i18n 在临时目录名称的随机部分之前的字符串。
     * 
     *  */
    prefix?: string;
    /** String that should follow the random portion of the temporary
     * directory's name. 
     * 
     * @i18n 在临时目录随机名称之后的字符
     * */
    suffix?: string;
  }

  /** Synchronously creates a new temporary directory in the default directory
   * for temporary files (see also `Deno.dir("temp")`), unless `dir` is specified.
   * Other optional options include prefixing and suffixing the directory name
   * with `prefix` and `suffix` respectively.
   * 
   * @i18n 在默认文件夹（另见 `Deno.dir("temp")`）中创建一个临时文件夹,
   * 如果指定了 `dir` ， 则在指定的 `dir` 中创建。
   * 其他可选的参数包括分别给文件夹名添加前缀的 `prefix` 和给文件夹名添加后缀的 `sufix`。
   *
   * The full path to the newly created directory is returned.
   * 
   * @i18n 返回新创建目录的完整路径。
   *
   * Multiple programs calling this function simultaneously will create different
   * directories. It is the caller's responsibility to remove the directory when
   * no longer needed.
   * 
   * @i18n 多个同时调用此函数的程序将创建不同的目录。 不再需要该目录时，调用方有责任删除它。
   *
   *       const tempDirName0 = Deno.makeTempDirSync();  // e.g. /tmp/2894ea76
   *       const tempDirName1 = Deno.makeTempDirSync({ prefix: 'my_temp' });  // e.g. /tmp/my_temp339c944d
   *
   * Requires `allow-write` permission. */
  // TODO(ry) Doesn't check permissions.
  export function makeTempDirSync(options?: MakeTempOptions): string;

  /** Creates a new temporary directory in the default directory for temporary
   * files (see also `Deno.dir("temp")`), unless `dir` is specified.  Other
   * optional options include prefixing and suffixing the directory name with
   * `prefix` and `suffix` respectively.
   *
   * This call resolves to the full path to the newly created directory.
   *
   * Multiple programs calling this function simultaneously will create different
   * directories. It is the caller's responsibility to remove the directory when
   * no longer needed.
   *
   *       const tempDirName0 = await Deno.makeTempDir();  // e.g. /tmp/2894ea76
   *       const tempDirName1 = await Deno.makeTempDir({ prefix: 'my_temp' }); // e.g. /tmp/my_temp339c944d
   *
   * Requires `allow-write` permission. */
  // TODO(ry) Doesn't check permissions.
  export function makeTempDir(options?: MakeTempOptions): Promise<string>;

  /** Synchronously creates a new temporary file in the default directory for
   * temporary files (see also `Deno.dir("temp")`), unless `dir` is specified.
   * Other optional options include prefixing and suffixing the directory name
   * with `prefix` and `suffix` respectively.
   *
   * The full path to the newly created file is returned.
   *
   * Multiple programs calling this function simultaneously will create different
   * files. It is the caller's responsibility to remove the file when no longer
   * needed.
   *
   *       const tempFileName0 = Deno.makeTempFileSync(); // e.g. /tmp/419e0bf2
   *       const tempFileName1 = Deno.makeTempFileSync({ prefix: 'my_temp' });  // e.g. /tmp/my_temp754d3098
   *
   * Requires `allow-write` permission. */
  export function makeTempFileSync(options?: MakeTempOptions): string;

  /** Creates a new temporary file in the default directory for temporary
   * files (see also `Deno.dir("temp")`), unless `dir` is specified.  Other
   * optional options include prefixing and suffixing the directory name with
   * `prefix` and `suffix` respectively.
   *
   * This call resolves to the full path to the newly created file.
   *
   * Multiple programs calling this function simultaneously will create different
   * files. It is the caller's responsibility to remove the file when no longer
   * needed.
   *
   *       const tmpFileName0 = await Deno.makeTempFile();  // e.g. /tmp/419e0bf2
   *       const tmpFileName1 = await Deno.makeTempFile({ prefix: 'my_temp' });  // e.g. /tmp/my_temp754d3098
   *
   * Requires `allow-write` permission. */
  export function makeTempFile(options?: MakeTempOptions): Promise<string>;

  /** Synchronously changes the permission of a specific file/directory of
   * specified path.  Ignores the process's umask.
   * 
   * @i18n 同步地更改指定路径下特定的文件/目录的权限。忽略进程的 umask。
   *
   *       Deno.chmodSync("/path/to/file", 0o666);
   *
   * For a full description, see [chmod](#chmod)
   * 
   * @i18n 相关完整说明，参考 [chmod](#chmod)
   *
   * NOTE: This API currently throws on Windows
   * @i18n 注意：该 API 当前在 Windows 上使用会抛出异常。
   *
   * Requires `allow-write` permission. */
  export function chmodSync(path: string, mode: number): void;

  /** Changes the permission of a specific file/directory of specified path.
   * Ignores the process's umask.
   *
   *       await Deno.chmod("/path/to/file", 0o666);
   *
   * The mode is a sequence of 3 octal numbers.  The first/left-most number
   * specifies the permissions for the owner.  The second number specifies the
   * permissions for the group. The last/right-most number specifies the
   * permissions for others.  For example, with a mode of 0o764, the owner (7) can
   * read/write/execute, the group (6) can read/write and everyone else (4) can
   * read only.
   *
   * | Number | Description |
   * | ------ | ----------- |
   * | 7      | read, write, and execute |
   * | 6      | read and write |
   * | 5      | read and execute |
   * | 4      | read only |
   * | 3      | write and execute |
   * | 2      | write only |
   * | 1      | execute only |
   * | 0      | no permission |
   *
   * NOTE: This API currently throws on Windows
   *
   * Requires `allow-write` permission. */
  export function chmod(path: string, mode: number): Promise<void>;

  /** Synchronously change owner of a regular file or directory. This functionality
   * is not available on Windows.
   *
   *      Deno.chownSync("myFile.txt", 1000, 1002);
   *
   * Requires `allow-write` permission.
   *
   * Throws Error (not implemented) if executed on Windows
   *
   * @param path path to the file
   * @param uid user id (UID) of the new owner
   * @param gid group id (GID) of the new owner
   */
  export function chownSync(path: string, uid: number, gid: number): void;

  /** Change owner of a regular file or directory. This functionality
   * is not available on Windows.
   * @i18n 更改常规文件或目录的所有者。该功能在 Windows 上不可用。
   *      await Deno.chown("myFile.txt", 1000, 1002);
   *
   * Requires `allow-write` permission.
   *
   * Throws Error (not implemented) if executed on Windows
   *
   * @param path path to the file
   * @param uid user id (UID) of the new owner
   * @param gid group id (GID) of the new owner
   */
  export function chown(path: string, uid: number, gid: number): Promise<void>;

  export interface RemoveOptions {
    /** Defaults to `false`. If set to `true`, path will be removed even if
     * it's a non-empty directory.
     * 
     * @i18n — 默认为 false。如果设置为 true，则即使路径为非空目录也会被删除。
     *  */
    recursive?: boolean;
  }

  /** Synchronously removes the named file or directory.
   * 
   * @i18n 同步删除指定的文件或目录。
   *
   *       Deno.removeSync("/path/to/empty_dir/or/file");
   *       Deno.removeSync("/path/to/populated_dir/or/file", { recursive: true });
   *
   * Throws error if permission denied, path not found, or path is a non-empty
   * directory and the `recursive` option isn't set to `true`.
   * 
   * @i18n 当权限被拒绝、路径找不到或者为非空目录且 `recursive` 未设置为 `true`，则抛出异常。
   *
   * Requires `allow-write` permission. */
  export function removeSync(path: string, options?: RemoveOptions): void;

  /** Removes the named file or directory.
   *
   *       await Deno.remove("/path/to/empty_dir/or/file");
   *       await Deno.remove("/path/to/populated_dir/or/file", { recursive: true });
   *
   * Throws error if permission denied, path not found, or path is a non-empty
   * directory and the `recursive` option isn't set to `true`.
   *
   * Requires `allow-write` permission. */
  export function remove(path: string, options?: RemoveOptions): Promise<void>;

  /** Synchronously renames (moves) `oldpath` to `newpath`. Paths may be files or
   * directories.  If `newpath` already exists and is not a directory,
   * `renameSync()` replaces it. OS-specific restrictions may apply when
   * `oldpath` and `newpath` are in different directories.
   * 
   * @i18n 同步方式将 `oldpath` 重命名（或移动）为 `newpath`。路径可以是文件或目录。
   * 如果 `newpath` 已经存在且不是目录，那么 `rename()` 将替换它。
   * 当 `oldpath` 和 `newpath` 位于不同的目录中时，可能会受到操作系统的限制。
   *
   *       Deno.renameSync("old/path", "new/path");
   *
   * On Unix, this operation does not follow symlinks at either path.
   * @i18n 在 Unix 系统上，此操作不会修改符号链接所指向的内容。
   *
   * It varies between platforms when the operation throws errors, and if so what
   * they are. It's always an error to rename anything to a non-empty directory.
   * @i18n 当操作引发错误时，平台之间会有所不同。
   * 如果 `newpath` 是非空目录则始终会报错。
   *
   * Requires `allow-read` and `allow-write` permissions. */
  export function renameSync(oldpath: string, newpath: string): void;

  /** Renames (moves) `oldpath` to `newpath`.  Paths may be files or directories.
   * If `newpath` already exists and is not a directory, `rename()` replaces it.
   * OS-specific restrictions may apply when `oldpath` and `newpath` are in
   * different directories.
   *
   *       await Deno.rename("old/path", "new/path");
   *
   * On Unix, this operation does not follow symlinks at either path.
   *
   * It varies between platforms when the operation throws errors, and if so what
   * they are. It's always an error to rename anything to a non-empty directory.
   *
   * Requires `allow-read` and `allow-write` permission. */
  export function rename(oldpath: string, newpath: string): Promise<void>;

  /** Synchronously reads and returns the entire contents of a file as utf8 encoded string
   *  encoded string. Reading a directory returns an empty string.
   * 
   * @i18n 同步地读取并将文件的全部内容解析为 utf8 编码字符。
   * 读取目录返回一个空的数据数组。
   *
   *       const data = Deno.readTextFileSync("hello.txt");
   *       console.log(data);
   *
   * Requires `allow-read` permission. */
  export function readTextFileSync(path: string): string;

  /** Asynchronously reads and returns the entire contents of a file as a utf8
   *  encoded string. Reading a directory returns an empty data array.
   *
   *       const data = await Deno.readTextFile("hello.txt");
   *       console.log(data);
   *
   * Requires `allow-read` permission. */
  export function readTextFile(path: string): Promise<string>;

  /** Synchronously reads and returns the entire contents of a file as an array
   * of bytes. `TextDecoder` can be used to transform the bytes to string if
   * required.  Reading a directory returns an empty data array.
   * 
   * @i18n 同步地读取并将文件的全部内容解析为字节数组。
   * `TextDecoder` 可以在需要的情况下可以将字节转换成字符串。
   * 读取目录返回一个空的数据数组。
   *
   *       const decoder = new TextDecoder("utf-8");
   *       const data = Deno.readFileSync("hello.txt");
   *       console.log(decoder.decode(data));
   *
   * Requires `allow-read` permission. */
  export function readFileSync(path: string): Uint8Array;

  /** Reads and resolves to the entire contents of a file as an array of bytes.
   * `TextDecoder` can be used to transform the bytes to string if required.
   * Reading a directory returns an empty data array.
   *
   *       const decoder = new TextDecoder("utf-8");
   *       const data = await Deno.readFile("hello.txt");
   *       console.log(decoder.decode(data));
   *
   * Requires `allow-read` permission. */
  export function readFile(path: string): Promise<Uint8Array>;

  /** A FileInfo describes a file and is returned by `stat`, `lstat`,
   * `statSync`, `lstatSync`.
   * 
   * @i18n FileInfo 用于描述 `stat`, `lstat`,
   * `statSync`, `lstatSync` 函数返回的文件信息。而 `readdir`,
   * `readdirSync` 返回的信息则用 FileInfo 列表来描述。
   *  */
  export interface FileInfo {
    /** True if this is info for a regular file. Mutually exclusive to
     * `FileInfo.isDirectory` and `FileInfo.isSymlink`.
     * 
     * @i18n 判断文件是否为一个常规文件。该结果与 `FileInfo.isDirectory` 和 `FileInfo.isSymlink` 互斥。
     *  */
    isFile: boolean;
    /** True if this is info for a regular directory. Mutually exclusive to
     * `FileInfo.isFile` and `FileInfo.isSymlink`.
     * 
     * @i18n 判断文件是否为一个常规目录。该结果与 `FileInfo.isFile` 和 `FileInfo.isSymlink` 互斥。
     *  */
    isDirectory: boolean;
    /** True if this is info for a symlink. Mutually exclusive to
     * `FileInfo.isFile` and `FileInfo.isDirectory`.
     * 
     * @i18n 判断文件是否为一个符号链接。该结果与 `FileInfo.isDirectory` 和 `FileInfo.isDirectory` 互斥。
     *  */
    isSymlink: boolean;
    /** The size of the file, in bytes.
     * 
     * @i18n 文件的大小，单位 byte。
     */
    size: number;
    /** The last modification time of the file. This corresponds to the `mtime`
     * field from `stat` on Linux/Mac OS and `ftLastWriteTime` on Windows. This
     * may not be available on all platforms.
     * 
     * @i18n 最后一次修改时间，这对应于Linux / Mac OS上的stat中的mtime字段，以及Windows上的ftLastWriteTime。 并非在所有平台上都可用。
     * 
     *  */
    mtime: Date | null;
    /** The last access time of the file. This corresponds to the `atime`
     * field from `stat` on Unix and `ftLastAccessTime` on Windows. This may not
     * be available on all platforms.
     * 
     * @i18n 文件最后访问时间。
     * 在 Linux/Mac 系统这个值是 `atime`，在 Windows 系统这个值是 `ftLastAccessTime`。
     * 在某些系统中这个属性可能不存在。
     *  */
    atime: Date | null;
    /** The creation time of the file. This corresponds to the `birthtime`
     * field from `stat` on Mac/BSD and `ftCreationTime` on Windows. This may
     * not be available on all platforms.
     * 
     * @i18n 文件的创建时间。
     * 在 Mac/BSD 系统这个值是 `birthtime`，在 Windows 系统这个值是 `ftCreationTime`。
     * 在某些系统中这个属性可能不存在。
     * 
     *  */
    birthtime: Date | null;
    /** ID of the device containing the file.
     * @i18n 包含此文件的设备的 ID。
     * _Linux/Mac OS only._ */
    dev: number | null;
    /** Inode number.
     *
     * _Linux/Mac OS only._ */
    ino: number | null;
    /** **UNSTABLE**: Match behavior with Go on Windows for `mode`.
     * 
     * @i18n **不稳定**: 将此属性的行为与 Windows 上的 Go 相匹配。
     * 
     * The underlying raw `st_mode` bits that contain the standard Unix
     * permissions for this file/directory.
     * 
     * @i18n 该文件或目录的权限位，返回标准的 Unix 底层 `st_mode` 位。
     *  */
    mode: number | null;
    /** Number of hard links pointing to this file.
     * @i18n 文件的硬链接数。
     * _Linux/Mac OS only._ */
    nlink: number | null;
    /** User ID of the owner of this file.
     *@i18n 拥有该文件的用户的 uid。
     * _Linux/Mac OS only._ */
    uid: number | null;
    /** Group ID of the owner of this file.
     * @i18n 拥有该文件的用户组的 gid。
     * _Linux/Mac OS only._ */
    gid: number | null;
    /** Device ID of this file.
     * @i18n 文件设备标识符 ID。
     * _Linux/Mac OS only._ */
    rdev: number | null;
    /** Blocksize for filesystem I/O.
     * @i18n 用于 I/O 操作的文件系统块的大小
     * _Linux/Mac OS only._ */
    blksize: number | null;
    /** Number of blocks allocated to the file, in 512-byte units.
     *
     * @i18n 为此文件分配的块数，此值是一个 512 字节单位。
     * _Linux/Mac OS only._ */
    blocks: number | null;
  }

  /** Returns absolute normalized path, with symbolic links resolved.
   * 
   * @i18n 返回被解析后的符号链接绝对路径。
   *
   *       // e.g. given /home/alice/file.txt and current directory /home/alice
   *       Deno.symlinkSync("file.txt", "symlink_file.txt");
   *       const realPath = Deno.realPathSync("./file.txt");
   *       const realSymLinkPath = Deno.realPathSync("./symlink_file.txt");
   *       console.log(realPath);  // outputs "/home/alice/file.txt"
   *       console.log(realSymLinkPath);  // outputs "/home/alice/file.txt"
   *
   * Requires `allow-read` permission. */
  export function realPathSync(path: string): string;

  /** Resolves to the absolute normalized path, with symbolic links resolved.
   *
   *       // e.g. given /home/alice/file.txt and current directory /home/alice
   *       await Deno.symlink("file.txt", "symlink_file.txt");
   *       const realPath = await Deno.realPath("./file.txt");
   *       const realSymLinkPath = await Deno.realPath("./symlink_file.txt");
   *       console.log(realPath);  // outputs "/home/alice/file.txt"
   *       console.log(realSymLinkPath);  // outputs "/home/alice/file.txt"
   *
   * Requires `allow-read` permission. */
  export function realPath(path: string): Promise<string>;

  export interface DirEntry {
    name: string;
    isFile: boolean;
    isDirectory: boolean;
    isSymlink: boolean;
  }

  /** Synchronously reads the directory given by `path` and returns an iterable
   * of `Deno.DirEntry`.
   * 
   * @i18n 同步读取 `path` 文件目录，并返回 `Deno.DirEntry` 迭代器。
   *
   *       for (const dirEntry of Deno.readDirSync("/")) {
   *         console.log(dirEntry.name);
   *       }
   *
   * Throws error if `path` is not a directory.
   *
   * Requires `allow-read` permission. */
  export function readDirSync(path: string): Iterable<DirEntry>;

  /** Reads the directory given by `path` and returns an async iterable of
   * `Deno.DirEntry`.
   *
   *       for await (const dirEntry of Deno.readDir("/")) {
   *         console.log(dirEntry.name);
   *       }
   *
   * Throws error if `path` is not a directory.
   *
   * Requires `allow-read` permission. */
  export function readDir(path: string): AsyncIterable<DirEntry>;

  /** Synchronously copies the contents and permissions of one file to another
   * specified path, by default creating a new file if needed, else overwriting.
   * Fails if target path is a directory or is unwritable.
   * 
   * @i18n 采用同步方式将一个文件的内容和权限复制到另一个指定的路径，默认情况下根据需要
   * 创建新文件或者覆盖原文件。 如果目标路径是目录或不可写，则失败。
   *
   *       Deno.copyFileSync("from.txt", "to.txt");
   *
   * Requires `allow-read` permission on fromPath.
   * Requires `allow-write` permission on toPath. */
  export function copyFileSync(fromPath: string, toPath: string): void;

  /** Copies the contents and permissions of one file to another specified path,
   * by default creating a new file if needed, else overwriting. Fails if target
   * path is a directory or is unwritable.
   *
   *       await Deno.copyFile("from.txt", "to.txt");
   *
   * Requires `allow-read` permission on fromPath.
   * Requires `allow-write` permission on toPath. */
  export function copyFile(fromPath: string, toPath: string): Promise<void>;

  /** Returns the full path destination of the named symbolic link.
   * 
   * @i18n 同步方式解析并返回符号链接对目标文件的绝对路径。
   *
   *       Deno.symlinkSync("./test.txt", "./test_link.txt");
   *       const target = Deno.readLinkSync("./test_link.txt"); // full path of ./test.txt
   *
   * Throws TypeError if called with a hard link
   * @i18n 如果使用硬链接调用，则会抛出 `TypeError`。
   *
   * Requires `allow-read` permission. */
  export function readLinkSync(path: string): string;

  /** Resolves to the full path destination of the named symbolic link.
   *
   *       await Deno.symlink("./test.txt", "./test_link.txt");
   *       const target = await Deno.readLink("./test_link.txt"); // full path of ./test.txt
   *
   * Throws TypeError if called with a hard link
   *
   * Requires `allow-read` permission. */
  export function readLink(path: string): Promise<string>;

  /** Resolves to a `Deno.FileInfo` for the specified `path`. If `path` is a
   * symlink, information for the symlink will be returned instead of what it
   * points to.
   * 
   * @i18n 解析给定的 `path`，并返回 `Deno.FileInfo`。如果 `path` 是一个
   * 符号链接，则将返回符号链接的信息，而不是该符号链接引用的文件信息。
   *
   *       const fileInfo = await Deno.lstat("hello.txt");
   *       assert(fileInfo.isFile);
   *
   * Requires `allow-read` permission. */
  export function lstat(path: string): Promise<FileInfo>;

  /** Synchronously returns a `Deno.FileInfo` for the specified `path`. If
   * `path` is a symlink, information for the symlink will be returned instead of
   * what it points to..
   *
   *       const fileInfo = Deno.lstatSync("hello.txt");
   *       assert(fileInfo.isFile);
   *
   * Requires `allow-read` permission. */
  export function lstatSync(path: string): FileInfo;

  /** Resolves to a `Deno.FileInfo` for the specified `path`. Will always
   * follow symlinks.
   * 
   * @i18n 解析给定 `path`，返回 `Deno.FileInfo`。如果 `path` 为符号链接，则返回符号链接指向的文件。
   *
   *       const fileInfo = await Deno.stat("hello.txt");
   *       assert(fileInfo.isFile);
   *
   * Requires `allow-read` permission. */
  export function stat(path: string): Promise<FileInfo>;

  /** Synchronously returns a `Deno.FileInfo` for the specified `path`. Will
   * always follow symlinks.
   *
   *       const fileInfo = Deno.statSync("hello.txt");
   *       assert(fileInfo.isFile);
   *
   * Requires `allow-read` permission. */
  export function statSync(path: string): FileInfo;

  /** Options for writing to a file. */
  export interface WriteFileOptions {
    /** Defaults to `false`. If set to `true`, will append to a file instead of
     * overwriting previous contents.
     * 
     * @i18n 默认为 `false`。如果设置为 `true`，则将追加到文件中，而不是覆盖之前的内容。
     * 
     *  */
    append?: boolean;
    /** Sets the option to allow creating a new file, if one doesn't already
     * exist at the specified path (defaults to `true`).
     * @i18n 默认为 `true`。如果指定路径不存在文件，是否允许创建新文件的选项。*/
    create?: boolean;
    /** Permissions always applied to file.
     * @i18n 文件的权限
     */
    mode?: number;
  }

  /** Synchronously write `data` to the given `path`, by default creating a new
   * file if needed, else overwriting.
   * 
   * @i18n 同步方式将 `data` 写入给定的 `path`，并且根据需要创建新文件或者覆盖原文件。
   * 
   *       const encoder = new TextEncoder();
   *       const data = encoder.encode("Hello world\n");
   *       Deno.writeFileSync("hello1.txt", data);  // overwrite "hello1.txt" or create it
   *       Deno.writeFileSync("hello2.txt", data, {create: false});  // only works if "hello2.txt" exists
   *       Deno.writeFileSync("hello3.txt", data, {mode: 0o777});  // set permissions on new file
   *       Deno.writeFileSync("hello4.txt", data, {append: true});  // add data to the end of the file
   *
   * Requires `allow-write` permission, and `allow-read` if `options.create` is
   * `false`.
   */
  export function writeFileSync(
    path: string,
    data: Uint8Array,
    options?: WriteFileOptions
  ): void;

  /** Write `data` to the given `path`, by default creating a new file if needed,
   * else overwriting.
   *
   *       const encoder = new TextEncoder();
   *       const data = encoder.encode("Hello world\n");
   *       await Deno.writeFile("hello1.txt", data);  // overwrite "hello1.txt" or create it
   *       await Deno.writeFile("hello2.txt", data, {create: false});  // only works if "hello2.txt" exists
   *       await Deno.writeFile("hello3.txt", data, {mode: 0o777});  // set permissions on new file
   *       await Deno.writeFile("hello4.txt", data, {append: true});  // add data to the end of the file
   *
   * Requires `allow-write` permission, and `allow-read` if `options.create` is `false`.
   */
  export function writeFile(
    path: string,
    data: Uint8Array,
    options?: WriteFileOptions
  ): Promise<void>;

  /** Synchronously write string `data` to the given `path`, by default creating a new file if needed,
   * else overwriting.
   * 
   * @i18n 同步的将字符串类型 `data` 写入指定 `path` 路径，如果需要默认创建新文件或覆盖原文件
   *
   *       await Deno.writeTextFileSync("hello1.txt", "Hello world\n");  // overwrite "hello1.txt" or create it
   *
   * Requires `allow-write` permission, and `allow-read` if `options.create` is `false`.
   */
  export function writeTextFileSync(path: string, data: string): void;

  /** Asynchronously write string `data` to the given `path`, by default creating a new file if needed,
   * else overwriting.
   *
   *       await Deno.writeTextFile("hello1.txt", "Hello world\n");  // overwrite "hello1.txt" or create it
   *
   * Requires `allow-write` permission, and `allow-read` if `options.create` is `false`.
   */
  export function writeTextFile(path: string, data: string): Promise<void>;

  /** Synchronously truncates or extends the specified file, to reach the
   * specified `len`.  If `len` is not specified then the entire file contents
   * are truncated.
   *
   *       // truncate the entire file
   *       Deno.truncateSync("my_file.txt");
   *
   *       // truncate part of the file
   *       const file = Deno.makeTempFileSync();
   *       Deno.writeFileSync(file, new TextEncoder().encode("Hello World"));
   *       Deno.truncateSync(file, 7);
   *       const data = Deno.readFileSync(file);
   *       console.log(new TextDecoder().decode(data));
   *
   * Requires `allow-write` permission. */
  export function truncateSync(name: string, len?: number): void;

  /** Truncates or extends the specified file, to reach the specified `len`. If
   * `len` is not specified then the entire file contents are truncated.
   *
   * @i18n 通过指定的 `len` ，截取或者扩展指定的文件内容。如果未指定 `len` ，则整个文件内容将被截取。
   * 
   *       // truncate the entire file
   *       await Deno.truncate("my_file.txt");
   *
   *       // truncate part of the file
   *       const file = await Deno.makeTempFile();
   *       await Deno.writeFile(file, new TextEncoder().encode("Hello World"));
   *       await Deno.truncate(file, 7);
   *       const data = await Deno.readFile(file);
   *       console.log(new TextDecoder().decode(data));  // "Hello W"
   *
   * Requires `allow-write` permission. */
  export function truncate(name: string, len?: number): Promise<void>;

  export interface NetAddr {
    transport: "tcp" | "udp";
    hostname: string;
    port: number;
  }

  export interface UnixAddr {
    transport: "unix" | "unixpacket";
    path: string;
  }

  export type Addr = NetAddr | UnixAddr;

  /** A generic network listener for stream-oriented protocols.
   * 
   * @i18n — 面向流协议的通用网络监听器。 
   */
  export interface Listener extends AsyncIterable<Conn> {
    /** Waits for and resolves to the next connection to the `Listener`.
     * @i18n 等待并解析 (resolve) 到与 `Listener` 的下一个连接。*/
    accept(): Promise<Conn>;
    /** Close closes the listener. Any pending accept promises will be rejected
     * with errors.
     * @i18n 关闭监听器。任何待处理的接收应答都将被拒绝 (rejected)，并返回错误。*/
    close(): void;
    /** Return the address of the `Listener`. 
     *  @i18n 返回 `Listener` 的地址
    */
    readonly addr: Addr;

    [Symbol.asyncIterator](): AsyncIterableIterator<Conn>;
  }

  export interface Conn extends Reader, Writer, Closer {
    /** The local address of the connection.
     *  @i18n 连接的本地地址。
     */
    readonly localAddr: Addr;
    /** The remote address of the connection. 
     * @i18n 连接的远程地址。
    */
    readonly remoteAddr: Addr;
    /** The resource ID of the connection. 
     * @i18n 连接的资源 ID
    */
    readonly rid: number;
    /** Shuts down (`shutdown(2)`) the writing side of the TCP connection. Most
     * callers should just use `close()`.
     * @i18n 关闭 (`shutdown(2)`) TCP 连接的写入端。大多数调用者应该只使用 `close()`。
     *
     * **Unstable** because of lack of testing and because Deno.shutdown is also
     * unstable.
     * */
    closeWrite(): void;
  }

  export interface ListenOptions {
    /** The port to listen on.
     *  @i18n 要监听的端口号
     */
    port: number;
    /** A literal IP address or host name that can be resolved to an IP address.
     * If not specified, defaults to `0.0.0.0`.
     *  @i18n 一个 IP 地址或者可以被解析为 IP 地址的主机名。
     * 如果没有指定，默认值为 `0.0.0.0`
     *  */
    hostname?: string;
  }

  /** Listen announces on the local transport address.
   * @i18n 在本地监听网络连接
   *      const listener1 = Deno.listen({ port: 80 })
   *      const listener2 = Deno.listen({ hostname: "192.0.2.1", port: 80 })
   *      const listener3 = Deno.listen({ hostname: "[2001:db8::1]", port: 80 });
   *      const listener4 = Deno.listen({ hostname: "golang.org", port: 80, transport: "tcp" });
   *
   * Requires `allow-net` permission. */
  export function listen(
    options: ListenOptions & { transport?: "tcp" }
  ): Listener;

  export interface ListenTlsOptions extends ListenOptions {
    /** Server certificate file.
     * @i18n 服务器证书文件
     */
    certFile: string;
    /** Server public key file.
     * @i18n 服务器公钥文件
     */
    keyFile: string;

    transport?: "tcp";
  }

  /** Listen announces on the local transport address over TLS (transport layer
   * security).
   * @i18n 通过TLS(传输层安全)在本地传输地址上监听公告
   *
   *      const lstnr = Deno.listenTls({ port: 443, certFile: "./server.crt", keyFile: "./server.key" });
   *
   * Requires `allow-net` permission. */
  export function listenTls(options: ListenTlsOptions): Listener;

  export interface ConnectOptions {
    /** The port to connect to.
     * @i18n — 要连接的端口号
     */
    port: number;
    /** A literal IP address or host name that can be resolved to an IP address.
     * If not specified, defaults to `127.0.0.1`.
     * 一个 IP 地址或者可以被解析为 IP 地址的主机名。 如果没有指定，默认值为 127.0.0.1。
     *  */
    hostname?: string;
    transport?: "tcp";
  }

  /**
   * Connects to the hostname (default is "127.0.0.1") and port on the named
   * transport (default is "tcp"), and resolves to the connection (`Conn`).
   * 
   * @i18n 连接到主机名(默认为 "127.0.0.1")和指定的传输工具上的端口(默认为 "tcp")，并解析到连接(`Conn`)。
   *
   *     const conn1 = await Deno.connect({ port: 80 });
   *     const conn2 = await Deno.connect({ hostname: "192.0.2.1", port: 80 });
   *     const conn3 = await Deno.connect({ hostname: "[2001:db8::1]", port: 80 });
   *     const conn4 = await Deno.connect({ hostname: "golang.org", port: 80, transport: "tcp" });
   *     const conn5 = await Deno.connect({ path: "/foo/bar.sock", transport: "unix" });
   *
   * Requires `allow-net` permission for "tcp" and `allow-read` for unix. */
  export function connect(options: ConnectOptions): Promise<Conn>;

  export interface ConnectTlsOptions {
    /** The port to connect to. */
    port: number;
    /** A literal IP address or host name that can be resolved to an IP address.
     * If not specified, defaults to `127.0.0.1`. */
    hostname?: string;
    /** Server certificate file. */
    certFile?: string;
  }

  /** Establishes a secure connection over TLS (transport layer security) using
   * an optional cert file, hostname (default is "127.0.0.1") and port.  The
   * cert file is optional and if not included Mozilla's root certificates will
   * be used (see also https://github.com/ctz/webpki-roots for specifics)
   * 
   * @i18n 通过使用可选的证书文件，主机名（默认为 "127.0.0.1"）和端口 在TLS（传输层安全）上建立安全连接。
   * 该证书文件是可选的，如果不包括，则会使用Mozilla的根证书 (详情请参见https://github.com/ctz/webpki-roots)
   *
   *     const conn1 = await Deno.connectTls({ port: 80 });
   *     const conn2 = await Deno.connectTls({ certFile: "./certs/my_custom_root_CA.pem", hostname: "192.0.2.1", port: 80 });
   *     const conn3 = await Deno.connectTls({ hostname: "[2001:db8::1]", port: 80 });
   *     const conn4 = await Deno.connectTls({ certFile: "./certs/my_custom_root_CA.pem", hostname: "golang.org", port: 80});
   *
   * Requires `allow-net` permission.
   */
  export function connectTls(options: ConnectTlsOptions): Promise<Conn>;

  export interface Metrics {
    opsDispatched: number;
    opsDispatchedSync: number;
    opsDispatchedAsync: number;
    opsDispatchedAsyncUnref: number;
    opsCompleted: number;
    opsCompletedSync: number;
    opsCompletedAsync: number;
    opsCompletedAsyncUnref: number;
    bytesSentControl: number;
    bytesSentData: number;
    bytesReceived: number;
  }

  /** Receive metrics from the privileged side of Deno.  This is primarily used
   * in the development of Deno. 'Ops', also called 'bindings', are the go-between
   * between Deno Javascript and Deno Rust.
   @i18n 从 Deno 的特权方接收指标。这主要用于 Deno 的开发中。
   * 'Ops'（也称为 'bindings'）是 Deno Javascript 和 Deno Rust 之间的沟通桥梁。
   *      > console.table(Deno.metrics())
   *      ┌─────────────────────────┬────────┐
   *      │         (index)         │ Values │
   *      ├─────────────────────────┼────────┤
   *      │      opsDispatched      │   3    │
   *      │    opsDispatchedSync    │   2    │
   *      │   opsDispatchedAsync    │   1    │
   *      │ opsDispatchedAsyncUnref │   0    │
   *      │      opsCompleted       │   3    │
   *      │    opsCompletedSync     │   2    │
   *      │    opsCompletedAsync    │   1    │
   *      │ opsCompletedAsyncUnref  │   0    │
   *      │    bytesSentControl     │   73   │
   *      │      bytesSentData      │   0    │
   *      │      bytesReceived      │  375   │
   *      └─────────────────────────┴────────┘
   */
  export function metrics(): Metrics;

  interface ResourceMap {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [rid: number]: any;
  }

  /** Returns a map of open resource ids (rid) along with their string
   * representations. This is an internal API and as such resource
   * representation has `any` type; that means it can change any time.
   * @i18n 返回一个开放的资源id(rid)和它们的字符串表示方法。
   * 这是一个内部的API，因此资源表示具有`any`类型；这意味着它可以随时改变。
   *
   *       console.log(Deno.resources());
   *       // { 0: "stdin", 1: "stdout", 2: "stderr" }
   *       Deno.openSync('../test.file');
   *       console.log(Deno.resources());
   *       // { 0: "stdin", 1: "stdout", 2: "stderr", 3: "fsFile" }
   */
  export function resources(): ResourceMap;

  export interface FsEvent {
    kind: "any" | "access" | "create" | "modify" | "remove";
    paths: string[];
  }

  /** Watch for file system events against one or more `paths`, which can be files
   * or directories.  These paths must exist already.  One user action (e.g.
   * `touch test.file`) can  generate multiple file system events.  Likewise,
   * one user action can result in multiple file paths in one event (e.g. `mv
   * old_name.txt new_name.txt`).  Recursive option is `true` by default and,
   * for directories, will watch the specified directory and all sub directories.
   * Note that the exact ordering of the events can vary between operating systems.
   * 
   * @i18n 监视针对一个或多个“路径”的文件系统事件，该路径可以是文件或目录
   * 这些路径必须已经存在. 一个用户动作（例如`touch test.file`）可以生成多个文件系统事件。
   *  同样，一项用户操作会在一个事件中导致多个文件路径（例如`mv old_name.txt new_name.txt`）。
   *  递归选项默认为“ true”，对于目录，它将监视指定的目录和所有子目录。 请注意，事件的确切顺序在操作系统之间可能会有所不同。
   *
   *       const watcher = Deno.watchFs("/");
   *       for await (const event of watcher) {
   *          console.log(">>>> event", event);
   *          // { kind: "create", paths: [ "/foo.txt" ] }
   *       }
   *
   * Requires `allow-read` permission.
   */
  export function watchFs(
    paths: string | string[],
    options?: { recursive: boolean }
  ): AsyncIterableIterator<FsEvent>;

  export class Process {
    readonly rid: number;
    readonly pid: number;
    readonly stdin?: Writer & Closer;
    readonly stdout?: Reader & Closer;
    readonly stderr?: Reader & Closer;
    /** Resolves to the current status of the process.
     * @i18n 解析进程当前的状态。*/
    status(): Promise<ProcessStatus>;
    /** Buffer the stdout until EOF and return it as `Uint8Array`.
     *
     *  @i18n 缓冲区中的 stdout，会在 `EOF` 之后以 `Uint8Array` 的形式返回。
     * You must set stdout to `"piped"` when creating the process.
     * @i18n 在创建进程时，你必须将 stdout 设置为 `"piped"`。
     * This calls `close()` on stdout after its done. 
     * @i18n 会在 stdout 完成后调用 `close()`。
     * */
    output(): Promise<Uint8Array>;
    /** Buffer the stderr until EOF and return it as `Uint8Array`.
     *  @i18n 缓冲区中的 stderr， 会在 `EOF` 之后以 `Uint8Array` 的形式返回。
     * You must set stderr to `"piped"` when creating the process.
     *  @i18n 在创建进程时，你必须将 stderr 设置为 `"piped"`。
     * This calls `close()` on stderr after its done.
     * @i18n 会在 stderr 完成后调用 `close()`。
     *  */
    stderrOutput(): Promise<Uint8Array>;
    close(): void;

    /** **UNSTABLE**: The `signo` argument may change to require the Deno.Signal
     * enum.
     *
     * Send a signal to process. This functionality currently only works on
     * Linux and Mac OS.
     */
    kill(signo: number): void;
  }

  export type ProcessStatus =
    | {
        success: true;
        code: 0;
        signal?: undefined;
      }
    | {
        success: false;
        code: number;
        signal?: number;
      };

  export interface RunOptions {
    /** Arguments to pass. Note, the first element needs to be a path to the
     * binary 
     * @i18n 需要传递的参数。注意，第一个元素必须是二进制文件的路径
     * */
    cmd: string[];
    cwd?: string;
    env?: {
      [key: string]: string;
    };
    stdout?: "inherit" | "piped" | "null" | number;
    stderr?: "inherit" | "piped" | "null" | number;
    stdin?: "inherit" | "piped" | "null" | number;
  }

  /** Spawns new subprocess.  RunOptions must contain at a minimum the `opt.cmd`,
   * an array of program arguments, the first of which is the binary.
   *
   *  @i18n 派生新的子进程。 RunOptions 必须包含 `opt.cmd`，即程序参数数组，其中第一个参数是二进制文件路径。
   *       const p = Deno.run({
   *         cmd: ["echo", "hello"],
   *       });
   *
   * Subprocess uses same working directory as parent process unless `opt.cwd`
   * is specified.
   * 
   *  @i18n 子进程使用与父进程相同的工作目录，除非指定了 `opt.cwd`。
   *
   * Environmental variables for subprocess can be specified using `opt.env`
   * mapping.
   * 
   * @i18n 子进程的环境变量可以使用 `opt.env` 来设置。
   *
   * By default subprocess inherits stdio of parent process. To change that
   * `opt.stdout`, `opt.stderr` and `opt.stdin` can be specified independently -
   * they can be set to either an rid of open file or set to "inherit" "piped"
   * or "null":
   * 
   * @i18n 默认情况下，子进程继承父进程的 stdio。要更改这些值，可以分别指定`opt.stdout`、`opt.stderr`、`opt.stdin`
   * - 可以将其设置为打开文件的 `rid` 或者 `inherit` `piped` `null`
   *
   * `"inherit"` The default if unspecified. The child inherits from the
   * corresponding parent descriptor.
   *
   * @i18n `"inherit"` 未指定时的默认值，子级从相应的父级描述符继承
   * 
   * `"piped"` A new pipe should be arranged to connect the parent and child
   * sub-processes.
   * 
   * @i18n `"piped"` 应该安排一个新管道来连接父子流程
   *
   * `"null"` This stream will be ignored. This is the equivalent of attaching
   * the stream to `/dev/null`.
   * 
   * @i18n `"null"` 此流将被忽略。 这相当于将流附加到 `/dev/null`。
   *
   * Details of the spawned process are returned.
   * 
   * @i18n 返回生成过程的详细信息
   *
   * Requires `allow-run` permission. */
  export function run(opt: RunOptions): Process;

  interface InspectOptions {
    depth?: number;
  }

  /** Converts the input into a string that has the same format as printed by
   * `console.log()`.
   * 
   * @i18n 将输入转换为与 `console.log()` 打印格式相同的字符串。
   *
   *      const obj = {};
   *      obj.propA = 10;
   *      obj.propB = "hello"
   *      const objAsString = Deno.inspect(obj); // { propA: 10, propB: "hello" }
   *      console.log(obj);  // prints same value as objAsString, e.g. { propA: 10, propB: "hello" }
   *
   * You can also register custom inspect functions, via the `customInspect` Deno
   * symbol on objects, to control and customize the output.
   * 
   * @i18n 你还可以通过对象上的 `Deno.symbols.customInspect` 函数
   * 注册自定义的 inspect function，以控制和自定义输出。
   *
   *      class A {
   *        x = 10;
   *        y = "hello";
   *        [Deno.customInspect](): string {
   *          return "x=" + this.x + ", y=" + this.y;
   *        }
   *      }
   *
   *      const inStringFormat = Deno.inspect(new A()); // "x=10, y=hello"
   *      console.log(inStringFormat);  // prints "x=10, y=hello"
   *
   * Finally, a number of output options are also available.
   * 
   * @i18n 同时还提供了一些输出选项。
   *
   *      const out = Deno.inspect(obj, {showHidden: true, depth: 4, colors: true, indentLevel: 2});
   *
   */
  export function inspect(value: unknown, options?: InspectOptions): string;

  /** Build related information.
   * 
   * @i18n 构建的相关信息。
   */
  export const build: {
    /** The LLVM target triple
     * @i18n LLVM 三合一目标
     */
    target: string;
    /** Instruction set architecture
     * 
     * @i18n 指令集架构
     */
    arch: "x86_64";
    /** Operating system 
     * 
     * @i18n 操作系统
    */
    os: "darwin" | "linux" | "windows";
    /** Computer vendor
     * @i18n 电脑厂商
     */
    vendor: string;
    /** Optional environment 
     * @i18n 可选环境
    */
    env?: string;
  };

  interface Version {
    deno: string;
    v8: string;
    typescript: string;
  }
  /** Version related information.
   * @i18n deno 版本信息
   */
  export const version: Version;

  /** Returns the script arguments to the program. If for example we run a
   * program:
   * 
   * @i18n 将脚本参数返回给程序。例如我们运行下方的程序
   *
   *      deno run --allow-read https://deno.land/std/examples/cat.ts /etc/passwd
   *
   * Then `Deno.args` will contain:
   * @i18n 此时 `Deno.args` 将包含:
   *
   *      [ "/etc/passwd" ]
   */
  export const args: string[];

  /** A symbol which can be used as a key for a custom method which will be
   * called when `Deno.inspect()` is called, or when the object is logged to
   * the console. 
   * @i18n 这个 Symbol 可以作为 key 来定义一个方法，当 `Deno.inspect()` 被调用或者调用了
     * console 的日志方法时，这个自定义函数被调用。
   * */
  export const customInspect: unique symbol;
}

// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, no-var */

/// <reference no-default-lib="true" />
/// <reference lib="esnext" />

// This follows the WebIDL at: https://webassembly.github.io/spec/js-api/
// and: https://webassembly.github.io/spec/web-api/
declare namespace WebAssembly {
  interface WebAssemblyInstantiatedSource {
    module: Module;
    instance: Instance;
  }

  /** Compiles a `WebAssembly.Module` from WebAssembly binary code.  This
   * function is useful if it is necessary to a compile a module before it can
   * be instantiated (otherwise, the `WebAssembly.instantiate()` function
   * should be used). */
  function compile(bufferSource: BufferSource): Promise<Module>;

  /** Compiles a `WebAssembly.Module` directly from a streamed underlying
   * source. This function is useful if it is necessary to a compile a module
   * before it can be instantiated (otherwise, the
   * `WebAssembly.instantiateStreaming()` function should be used). */
  function compileStreaming(source: Promise<Response>): Promise<Module>;

  /** Takes the WebAssembly binary code, in the form of a typed array or
   * `ArrayBuffer`, and performs both compilation and instantiation in one step.
   * The returned `Promise` resolves to both a compiled `WebAssembly.Module` and
   * its first `WebAssembly.Instance`. */
  function instantiate(
    bufferSource: BufferSource,
    importObject?: object
  ): Promise<WebAssemblyInstantiatedSource>;

  /** Takes an already-compiled `WebAssembly.Module` and returns a `Promise`
   * that resolves to an `Instance` of that `Module`. This overload is useful if
   * the `Module` has already been compiled. */
  function instantiate(
    module: Module,
    importObject?: object
  ): Promise<Instance>;

  /** Compiles and instantiates a WebAssembly module directly from a streamed
   * underlying source. This is the most efficient, optimized way to load wasm
   * code. */
  function instantiateStreaming(
    source: Promise<Response>,
    importObject?: object
  ): Promise<WebAssemblyInstantiatedSource>;

  /** Validates a given typed array of WebAssembly binary code, returning
   * whether the bytes form a valid wasm module (`true`) or not (`false`). */
  function validate(bufferSource: BufferSource): boolean;

  type ImportExportKind = "function" | "table" | "memory" | "global";

  interface ModuleExportDescriptor {
    name: string;
    kind: ImportExportKind;
  }
  interface ModuleImportDescriptor {
    module: string;
    name: string;
    kind: ImportExportKind;
  }

  class Module {
    constructor(bufferSource: BufferSource);

    /** Given a `Module` and string, returns a copy of the contents of all
     * custom sections in the module with the given string name. */
    static customSections(
      moduleObject: Module,
      sectionName: string
    ): ArrayBuffer;

    /** Given a `Module`, returns an array containing descriptions of all the
     * declared exports. */
    static exports(moduleObject: Module): ModuleExportDescriptor[];

    /** Given a `Module`, returns an array containing descriptions of all the
     * declared imports. */
    static imports(moduleObject: Module): ModuleImportDescriptor[];
  }

  class Instance<T extends object = { [key: string]: any }> {
    constructor(module: Module, importObject?: object);

    /** An object containing as its members all the functions exported from the
     * WebAssembly module instance, to allow them to be accessed and used by
     * JavaScript. */
    readonly exports: T;
  }

  interface MemoryDescriptor {
    initial: number;
    maximum?: number;
  }

  class Memory {
    constructor(descriptor: MemoryDescriptor);

    /** An accessor property that returns the buffer contained in the memory. */
    readonly buffer: ArrayBuffer;

    /** Increases the size of the memory instance by a specified number of
     * WebAssembly pages (each one is 64KB in size). */
    grow(delta: number): number;
  }

  type TableKind = "anyfunc";

  interface TableDescriptor {
    element: TableKind;
    initial: number;
    maximum?: number;
  }

  class Table {
    constructor(descriptor: TableDescriptor);

    /** Returns the length of the table, i.e. the number of elements. */
    readonly length: number;

    /** Accessor function — gets the element stored at a given index. */
    get(index: number): (...args: any[]) => any;

    /** Increases the size of the Table instance by a specified number of
     * elements. */
    grow(delta: number): number;

    /** Sets an element stored at a given index to a given value. */
    set(index: number, value: (...args: any[]) => any): void;
  }

  type ValueType = "i32" | "i64" | "f32" | "f64";

  interface GlobalDescriptor {
    value: ValueType;
    mutable?: boolean;
  }

  /** Represents a global variable instance, accessible from both JavaScript and
   * importable/exportable across one or more `WebAssembly.Module` instances.
   * This allows dynamic linking of multiple modules. */
  class Global {
    constructor(descriptor: GlobalDescriptor, value?: any);

    /** Old-style method that returns the value contained inside the global
     * variable. */
    valueOf(): any;

    /** The value contained inside the global variable — this can be used to
     * directly set and get the global's value. */
    value: any;
  }

  /** Indicates an error during WebAssembly decoding or validation */
  class CompileError extends Error {
    constructor(message: string, fileName?: string, lineNumber?: string);
  }

  /** Indicates an error during module instantiation (besides traps from the
   * start function). */
  class LinkError extends Error {
    constructor(message: string, fileName?: string, lineNumber?: string);
  }

  /** Is thrown whenever WebAssembly specifies a trap. */
  class RuntimeError extends Error {
    constructor(message: string, fileName?: string, lineNumber?: string);
  }
}

/** Sets a timer which executes a function once after the timer expires. */
declare function setTimeout(
  cb: (...args: unknown[]) => void,
  delay?: number,
  ...args: unknown[]
): number;

/** Repeatedly calls a function , with a fixed time delay between each call. */
declare function setInterval(
  cb: (...args: unknown[]) => void,
  delay?: number,
  ...args: unknown[]
): number;
declare function clearTimeout(id?: number): void;
declare function clearInterval(id?: number): void;
declare function queueMicrotask(func: Function): void;

declare var console: Console;
declare var crypto: Crypto;

declare function addEventListener(
  type: string,
  callback: EventListenerOrEventListenerObject | null,
  options?: boolean | AddEventListenerOptions | undefined
): void;

declare function dispatchEvent(event: Event): boolean;

declare function removeEventListener(
  type: string,
  callback: EventListenerOrEventListenerObject | null,
  options?: boolean | EventListenerOptions | undefined
): void;

declare interface ImportMeta {
  url: string;
  main: boolean;
}

interface DomIterable<K, V> {
  keys(): IterableIterator<K>;
  values(): IterableIterator<V>;
  entries(): IterableIterator<[K, V]>;
  [Symbol.iterator](): IterableIterator<[K, V]>;
  forEach(
    callback: (value: V, key: K, parent: this) => void,
    thisArg?: any
  ): void;
}

interface ReadableStreamReadDoneResult<T> {
  done: true;
  value?: T;
}

interface ReadableStreamReadValueResult<T> {
  done: false;
  value: T;
}

type ReadableStreamReadResult<T> =
  | ReadableStreamReadValueResult<T>
  | ReadableStreamReadDoneResult<T>;

interface ReadableStreamDefaultReader<R = any> {
  readonly closed: Promise<void>;
  cancel(reason?: any): Promise<void>;
  read(): Promise<ReadableStreamReadResult<R>>;
  releaseLock(): void;
}

interface ReadableStreamReader<R = any> {
  cancel(): Promise<void>;
  read(): Promise<ReadableStreamReadResult<R>>;
  releaseLock(): void;
}

interface ReadableByteStreamControllerCallback {
  (controller: ReadableByteStreamController): void | PromiseLike<void>;
}

interface UnderlyingByteSource {
  autoAllocateChunkSize?: number;
  cancel?: ReadableStreamErrorCallback;
  pull?: ReadableByteStreamControllerCallback;
  start?: ReadableByteStreamControllerCallback;
  type: "bytes";
}

interface UnderlyingSource<R = any> {
  cancel?: ReadableStreamErrorCallback;
  pull?: ReadableStreamDefaultControllerCallback<R>;
  start?: ReadableStreamDefaultControllerCallback<R>;
  type?: undefined;
}

interface ReadableStreamErrorCallback {
  (reason: any): void | PromiseLike<void>;
}

interface ReadableStreamDefaultControllerCallback<R> {
  (controller: ReadableStreamDefaultController<R>): void | PromiseLike<void>;
}

interface ReadableStreamDefaultController<R = any> {
  readonly desiredSize: number | null;
  close(): void;
  enqueue(chunk: R): void;
  error(error?: any): void;
}

interface ReadableByteStreamController {
  readonly byobRequest: undefined;
  readonly desiredSize: number | null;
  close(): void;
  enqueue(chunk: ArrayBufferView): void;
  error(error?: any): void;
}

interface PipeOptions {
  preventAbort?: boolean;
  preventCancel?: boolean;
  preventClose?: boolean;
  signal?: AbortSignal;
}

interface QueuingStrategySizeCallback<T = any> {
  (chunk: T): number;
}

interface QueuingStrategy<T = any> {
  highWaterMark?: number;
  size?: QueuingStrategySizeCallback<T>;
}

/** This Streams API interface provides a built-in byte length queuing strategy
 * that can be used when constructing streams. */
declare class CountQueuingStrategy implements QueuingStrategy {
  constructor(options: { highWaterMark: number });
  highWaterMark: number;
  size(chunk: any): 1;
}

declare class ByteLengthQueuingStrategy
  implements QueuingStrategy<ArrayBufferView> {
  constructor(options: { highWaterMark: number });
  highWaterMark: number;
  size(chunk: ArrayBufferView): number;
}

/** This Streams API interface represents a readable stream of byte data. The
 * Fetch API offers a concrete instance of a ReadableStream through the body
 * property of a Response object. */
interface ReadableStream<R = any> {
  readonly locked: boolean;
  cancel(reason?: any): Promise<void>;
  getIterator(options?: { preventCancel?: boolean }): AsyncIterableIterator<R>;
  // getReader(options: { mode: "byob" }): ReadableStreamBYOBReader;
  getReader(): ReadableStreamDefaultReader<R>;
  pipeThrough<T>(
    {
      writable,
      readable,
    }: {
      writable: WritableStream<R>;
      readable: ReadableStream<T>;
    },
    options?: PipeOptions
  ): ReadableStream<T>;
  pipeTo(dest: WritableStream<R>, options?: PipeOptions): Promise<void>;
  tee(): [ReadableStream<R>, ReadableStream<R>];
  [Symbol.asyncIterator](options?: {
    preventCancel?: boolean;
  }): AsyncIterableIterator<R>;
}

declare var ReadableStream: {
  prototype: ReadableStream;
  new (
    underlyingSource: UnderlyingByteSource,
    strategy?: { highWaterMark?: number; size?: undefined }
  ): ReadableStream<Uint8Array>;
  new <R = any>(
    underlyingSource?: UnderlyingSource<R>,
    strategy?: QueuingStrategy<R>
  ): ReadableStream<R>;
};

interface WritableStreamDefaultControllerCloseCallback {
  (): void | PromiseLike<void>;
}

interface WritableStreamDefaultControllerStartCallback {
  (controller: WritableStreamDefaultController): void | PromiseLike<void>;
}

interface WritableStreamDefaultControllerWriteCallback<W> {
  (chunk: W, controller: WritableStreamDefaultController): void | PromiseLike<
    void
  >;
}

interface WritableStreamErrorCallback {
  (reason: any): void | PromiseLike<void>;
}

interface UnderlyingSink<W = any> {
  abort?: WritableStreamErrorCallback;
  close?: WritableStreamDefaultControllerCloseCallback;
  start?: WritableStreamDefaultControllerStartCallback;
  type?: undefined;
  write?: WritableStreamDefaultControllerWriteCallback<W>;
}

/** This Streams API interface provides a standard abstraction for writing
 * streaming data to a destination, known as a sink. This object comes with
 * built-in backpressure and queuing. */
declare class WritableStream<W = any> {
  constructor(
    underlyingSink?: UnderlyingSink<W>,
    strategy?: QueuingStrategy<W>
  );
  readonly locked: boolean;
  abort(reason?: any): Promise<void>;
  close(): Promise<void>;
  getWriter(): WritableStreamDefaultWriter<W>;
}

/** This Streams API interface represents a controller allowing control of a
 * WritableStream's state. When constructing a WritableStream, the underlying
 * sink is given a corresponding WritableStreamDefaultController instance to
 * manipulate. */
interface WritableStreamDefaultController {
  error(error?: any): void;
}

/** This Streams API interface is the object returned by
 * WritableStream.getWriter() and once created locks the < writer to the
 * WritableStream ensuring that no other streams can write to the underlying
 * sink. */
interface WritableStreamDefaultWriter<W = any> {
  readonly closed: Promise<void>;
  readonly desiredSize: number | null;
  readonly ready: Promise<void>;
  abort(reason?: any): Promise<void>;
  close(): Promise<void>;
  releaseLock(): void;
  write(chunk: W): Promise<void>;
}

declare class TransformStream<I = any, O = any> {
  constructor(
    transformer?: Transformer<I, O>,
    writableStrategy?: QueuingStrategy<I>,
    readableStrategy?: QueuingStrategy<O>
  );
  readonly readable: ReadableStream<O>;
  readonly writable: WritableStream<I>;
}

interface TransformStreamDefaultController<O = any> {
  readonly desiredSize: number | null;
  enqueue(chunk: O): void;
  error(reason?: any): void;
  terminate(): void;
}

interface Transformer<I = any, O = any> {
  flush?: TransformStreamDefaultControllerCallback<O>;
  readableType?: undefined;
  start?: TransformStreamDefaultControllerCallback<O>;
  transform?: TransformStreamDefaultControllerTransformCallback<I, O>;
  writableType?: undefined;
}

interface TransformStreamDefaultControllerCallback<O> {
  (controller: TransformStreamDefaultController<O>): void | PromiseLike<void>;
}

interface TransformStreamDefaultControllerTransformCallback<I, O> {
  (
    chunk: I,
    controller: TransformStreamDefaultController<O>
  ): void | PromiseLike<void>;
}

interface DOMStringList {
  /** Returns the number of strings in strings. */
  readonly length: number;
  /** Returns true if strings contains string, and false otherwise. */
  contains(string: string): boolean;
  /** Returns the string with index index from strings. */
  item(index: number): string | null;
  [index: number]: string;
}

declare class DOMException extends Error {
  constructor(message?: string, name?: string);
  readonly name: string;
  readonly message: string;
}

type BufferSource = ArrayBufferView | ArrayBuffer;
type BlobPart = BufferSource | Blob | string;

interface BlobPropertyBag {
  type?: string;
  ending?: "transparent" | "native";
}

/** A file-like object of immutable, raw data. Blobs represent data that isn't necessarily in a JavaScript-native format. The File interface is based on Blob, inheriting blob functionality and expanding it to support files on the user's system. */
interface Blob {
  readonly size: number;
  readonly type: string;
  arrayBuffer(): Promise<ArrayBuffer>;
  slice(start?: number, end?: number, contentType?: string): Blob;
  stream(): ReadableStream;
  text(): Promise<string>;
}

declare const Blob: {
  prototype: Blob;
  new (blobParts?: BlobPart[], options?: BlobPropertyBag): Blob;
};

interface FilePropertyBag extends BlobPropertyBag {
  lastModified?: number;
}

/** Provides information about files and allows JavaScript in a web page to
 * access their content. */
interface File extends Blob {
  readonly lastModified: number;
  readonly name: string;
}

declare const File: {
  prototype: File;
  new (fileBits: BlobPart[], fileName: string, options?: FilePropertyBag): File;
};

declare const isConsoleInstance: unique symbol;

declare class Console {
  indentLevel: number;
  [isConsoleInstance]: boolean;
  /** Writes the arguments to stdout */
  log: (...args: unknown[]) => void;
  /** Writes the arguments to stdout */
  debug: (...args: unknown[]) => void;
  /** Writes the arguments to stdout */
  info: (...args: unknown[]) => void;
  /** Writes the properties of the supplied `obj` to stdout */
  dir: (
    obj: unknown,
    options?: Partial<{
      depth: number;
      indentLevel: number;
    }>
  ) => void;

  /** From MDN:
   * Displays an interactive tree of the descendant elements of
   * the specified XML/HTML element. If it is not possible to display
   * as an element the JavaScript Object view is shown instead.
   * The output is presented as a hierarchical listing of expandable
   * nodes that let you see the contents of child nodes.
   *
   * Since we write to stdout, we can't display anything interactive
   * we just fall back to `console.dir`.
   */
  dirxml: (
    obj: unknown,
    options?: Partial<{
      showHidden: boolean;
      depth: number;
      colors: boolean;
      indentLevel: number;
    }>
  ) => void;

  /** Writes the arguments to stdout */
  warn: (...args: unknown[]) => void;
  /** Writes the arguments to stdout */
  error: (...args: unknown[]) => void;
  /** Writes an error message to stdout if the assertion is `false`. If the
   * assertion is `true`, nothing happens.
   *
   * ref: https://console.spec.whatwg.org/#assert
   */
  assert: (condition?: boolean, ...args: unknown[]) => void;
  count: (label?: string) => void;
  countReset: (label?: string) => void;
  table: (data: unknown, properties?: string[] | undefined) => void;
  time: (label?: string) => void;
  timeLog: (label?: string, ...args: unknown[]) => void;
  timeEnd: (label?: string) => void;
  group: (...label: unknown[]) => void;
  groupCollapsed: (...label: unknown[]) => void;
  groupEnd: () => void;
  clear: () => void;
  trace: (...args: unknown[]) => void;
  static [Symbol.hasInstance](instance: Console): boolean;
}

declare interface Crypto {
  readonly subtle: null;
  getRandomValues<
    T extends
      | Int8Array
      | Int16Array
      | Int32Array
      | Uint8Array
      | Uint16Array
      | Uint32Array
      | Uint8ClampedArray
      | Float32Array
      | Float64Array
      | DataView
      | null
  >(
    array: T
  ): T;
}

type FormDataEntryValue = File | string;

/** Provides a way to easily construct a set of key/value pairs representing
 * form fields and their values, which can then be easily sent using the
 * XMLHttpRequest.send() method. It uses the same format a form would use if the
 * encoding type were set to "multipart/form-data". */
interface FormData extends DomIterable<string, FormDataEntryValue> {
  append(name: string, value: string | Blob, fileName?: string): void;
  delete(name: string): void;
  get(name: string): FormDataEntryValue | null;
  getAll(name: string): FormDataEntryValue[];
  has(name: string): boolean;
  set(name: string, value: string | Blob, fileName?: string): void;
}

declare const FormData: {
  prototype: FormData;
  // TODO(ry) FormData constructor is non-standard.
  // new(form?: HTMLFormElement): FormData;
  new (): FormData;
};

interface Body {
  /** A simple getter used to expose a `ReadableStream` of the body contents. */
  readonly body: ReadableStream<Uint8Array> | null;
  /** Stores a `Boolean` that declares whether the body has been used in a
   * response yet.
   */
  readonly bodyUsed: boolean;
  /** Takes a `Response` stream and reads it to completion. It returns a promise
   * that resolves with an `ArrayBuffer`.
   */
  arrayBuffer(): Promise<ArrayBuffer>;
  /** Takes a `Response` stream and reads it to completion. It returns a promise
   * that resolves with a `Blob`.
   */
  blob(): Promise<Blob>;
  /** Takes a `Response` stream and reads it to completion. It returns a promise
   * that resolves with a `FormData` object.
   */
  formData(): Promise<FormData>;
  /** Takes a `Response` stream and reads it to completion. It returns a promise
   * that resolves with the result of parsing the body text as JSON.
   */
  json(): Promise<any>;
  /** Takes a `Response` stream and reads it to completion. It returns a promise
   * that resolves with a `USVString` (text).
   */
  text(): Promise<string>;
}

type HeadersInit = Headers | string[][] | Record<string, string>;

/** This Fetch API interface allows you to perform various actions on HTTP
 * request and response headers. These actions include retrieving, setting,
 * adding to, and removing. A Headers object has an associated header list,
 * which is initially empty and consists of zero or more name and value pairs.
 *  You can add to this using methods like append() (see Examples.) In all
 * methods of this interface, header names are matched by case-insensitive byte
 * sequence. */
interface Headers {
  append(name: string, value: string): void;
  delete(name: string): void;
  get(name: string): string | null;
  has(name: string): boolean;
  set(name: string, value: string): void;
  forEach(
    callbackfn: (value: string, key: string, parent: Headers) => void,
    thisArg?: any
  ): void;
}

interface Headers extends DomIterable<string, string> {
  /** Appends a new value onto an existing header inside a `Headers` object, or
   * adds the header if it does not already exist.
   */
  append(name: string, value: string): void;
  /** Deletes a header from a `Headers` object. */
  delete(name: string): void;
  /** Returns an iterator allowing to go through all key/value pairs
   * contained in this Headers object. The both the key and value of each pairs
   * are ByteString objects.
   */
  entries(): IterableIterator<[string, string]>;
  /** Returns a `ByteString` sequence of all the values of a header within a
   * `Headers` object with a given name.
   */
  get(name: string): string | null;
  /** Returns a boolean stating whether a `Headers` object contains a certain
   * header.
   */
  has(name: string): boolean;
  /** Returns an iterator allowing to go through all keys contained in
   * this Headers object. The keys are ByteString objects.
   */
  keys(): IterableIterator<string>;
  /** Sets a new value for an existing header inside a Headers object, or adds
   * the header if it does not already exist.
   */
  set(name: string, value: string): void;
  /** Returns an iterator allowing to go through all values contained in
   * this Headers object. The values are ByteString objects.
   */
  values(): IterableIterator<string>;
  forEach(
    callbackfn: (value: string, key: string, parent: this) => void,
    thisArg?: any
  ): void;
  /** The Symbol.iterator well-known symbol specifies the default
   * iterator for this Headers object
   */
  [Symbol.iterator](): IterableIterator<[string, string]>;
}

declare const Headers: {
  prototype: Headers;
  new (init?: HeadersInit): Headers;
};

type RequestInfo = Request | string;
type RequestCache =
  | "default"
  | "force-cache"
  | "no-cache"
  | "no-store"
  | "only-if-cached"
  | "reload";
type RequestCredentials = "include" | "omit" | "same-origin";
type RequestMode = "cors" | "navigate" | "no-cors" | "same-origin";
type RequestRedirect = "error" | "follow" | "manual";
type ReferrerPolicy =
  | ""
  | "no-referrer"
  | "no-referrer-when-downgrade"
  | "origin"
  | "origin-when-cross-origin"
  | "same-origin"
  | "strict-origin"
  | "strict-origin-when-cross-origin"
  | "unsafe-url";
type BodyInit =
  | Blob
  | BufferSource
  | FormData
  | URLSearchParams
  | ReadableStream<Uint8Array>
  | string;
type RequestDestination =
  | ""
  | "audio"
  | "audioworklet"
  | "document"
  | "embed"
  | "font"
  | "image"
  | "manifest"
  | "object"
  | "paintworklet"
  | "report"
  | "script"
  | "sharedworker"
  | "style"
  | "track"
  | "video"
  | "worker"
  | "xslt";

interface RequestInit {
  /**
   * A BodyInit object or null to set request's body.
   */
  body?: BodyInit | null;
  /**
   * A string indicating how the request will interact with the browser's cache
   * to set request's cache.
   */
  cache?: RequestCache;
  /**
   * A string indicating whether credentials will be sent with the request
   * always, never, or only when sent to a same-origin URL. Sets request's
   * credentials.
   */
  credentials?: RequestCredentials;
  /**
   * A Headers object, an object literal, or an array of two-item arrays to set
   * request's headers.
   */
  headers?: HeadersInit;
  /**
   * A cryptographic hash of the resource to be fetched by request. Sets
   * request's integrity.
   */
  integrity?: string;
  /**
   * A boolean to set request's keepalive.
   */
  keepalive?: boolean;
  /**
   * A string to set request's method.
   */
  method?: string;
  /**
   * A string to indicate whether the request will use CORS, or will be
   * restricted to same-origin URLs. Sets request's mode.
   */
  mode?: RequestMode;
  /**
   * A string indicating whether request follows redirects, results in an error
   * upon encountering a redirect, or returns the redirect (in an opaque
   * fashion). Sets request's redirect.
   */
  redirect?: RequestRedirect;
  /**
   * A string whose value is a same-origin URL, "about:client", or the empty
   * string, to set request's referrer.
   */
  referrer?: string;
  /**
   * A referrer policy to set request's referrerPolicy.
   */
  referrerPolicy?: ReferrerPolicy;
  /**
   * An AbortSignal to set request's signal.
   */
  signal?: AbortSignal | null;
  /**
   * Can only be null. Used to disassociate request from any Window.
   */
  window?: any;
}

/** This Fetch API interface represents a resource request. */
interface Request extends Body {
  /**
   * Returns the cache mode associated with request, which is a string
   * indicating how the request will interact with the browser's cache when
   * fetching.
   */
  readonly cache: RequestCache;
  /**
   * Returns the credentials mode associated with request, which is a string
   * indicating whether credentials will be sent with the request always, never,
   * or only when sent to a same-origin URL.
   */
  readonly credentials: RequestCredentials;
  /**
   * Returns the kind of resource requested by request, e.g., "document" or "script".
   */
  readonly destination: RequestDestination;
  /**
   * Returns a Headers object consisting of the headers associated with request.
   * Note that headers added in the network layer by the user agent will not be
   * accounted for in this object, e.g., the "Host" header.
   */
  readonly headers: Headers;
  /**
   * Returns request's subresource integrity metadata, which is a cryptographic
   * hash of the resource being fetched. Its value consists of multiple hashes
   * separated by whitespace. [SRI]
   */
  readonly integrity: string;
  /**
   * Returns a boolean indicating whether or not request is for a history
   * navigation (a.k.a. back-foward navigation).
   */
  readonly isHistoryNavigation: boolean;
  /**
   * Returns a boolean indicating whether or not request is for a reload
   * navigation.
   */
  readonly isReloadNavigation: boolean;
  /**
   * Returns a boolean indicating whether or not request can outlive the global
   * in which it was created.
   */
  readonly keepalive: boolean;
  /**
   * Returns request's HTTP method, which is "GET" by default.
   */
  readonly method: string;
  /**
   * Returns the mode associated with request, which is a string indicating
   * whether the request will use CORS, or will be restricted to same-origin
   * URLs.
   */
  readonly mode: RequestMode;
  /**
   * Returns the redirect mode associated with request, which is a string
   * indicating how redirects for the request will be handled during fetching. A
   * request will follow redirects by default.
   */
  readonly redirect: RequestRedirect;
  /**
   * Returns the referrer of request. Its value can be a same-origin URL if
   * explicitly set in init, the empty string to indicate no referrer, and
   * "about:client" when defaulting to the global's default. This is used during
   * fetching to determine the value of the `Referer` header of the request
   * being made.
   */
  readonly referrer: string;
  /**
   * Returns the referrer policy associated with request. This is used during
   * fetching to compute the value of the request's referrer.
   */
  readonly referrerPolicy: ReferrerPolicy;
  /**
   * Returns the signal associated with request, which is an AbortSignal object
   * indicating whether or not request has been aborted, and its abort event
   * handler.
   */
  readonly signal: AbortSignal;
  /**
   * Returns the URL of request as a string.
   */
  readonly url: string;
  clone(): Request;
}

declare const Request: {
  prototype: Request;
  new (input: RequestInfo, init?: RequestInit): Request;
};

type ResponseType =
  | "basic"
  | "cors"
  | "default"
  | "error"
  | "opaque"
  | "opaqueredirect";

/** This Fetch API interface represents the response to a request. */
interface Response extends Body {
  readonly headers: Headers;
  readonly ok: boolean;
  readonly redirected: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly trailer: Promise<Headers>;
  readonly type: ResponseType;
  readonly url: string;
  clone(): Response;
}

declare const Response: {
  prototype: Response;

  // TODO(#4667) Response constructor is non-standard.
  // new(body?: BodyInit | null, init?: ResponseInit): Response;
  new (
    url: string,
    status: number,
    statusText: string,
    headersList: Array<[string, string]>,
    rid: number,
    redirected_: boolean,
    type_?: null | ResponseType,
    body_?: null | Body
  ): Response;

  error(): Response;
  redirect(url: string, status?: number): Response;
};

/** Fetch a resource from the network. */
declare function fetch(
  input: Request | URL | string,
  init?: RequestInit
): Promise<Response>;

declare function atob(s: string): string;

/** Creates a base-64 ASCII string from the input string. */
declare function btoa(s: string): string;

declare class TextDecoder {
  /** Returns encoding's name, lowercased. */
  readonly encoding: string;
  /** Returns `true` if error mode is "fatal", and `false` otherwise. */
  readonly fatal: boolean;
  /** Returns `true` if ignore BOM flag is set, and `false` otherwise. */
  readonly ignoreBOM = false;
  constructor(
    label?: string,
    options?: { fatal?: boolean; ignoreBOM?: boolean }
  );
  /** Returns the result of running encoding's decoder. */
  decode(input?: BufferSource, options?: { stream?: false }): string;
  readonly [Symbol.toStringTag]: string;
}

declare class TextEncoder {
  /** Returns "utf-8". */
  readonly encoding = "utf-8";
  /** Returns the result of running UTF-8's encoder. */
  encode(input?: string): Uint8Array;
  encodeInto(
    input: string,
    dest: Uint8Array
  ): { read: number; written: number };
  readonly [Symbol.toStringTag]: string;
}

interface URLSearchParams {
  /** Appends a specified key/value pair as a new search parameter.
   *
   *       let searchParams = new URLSearchParams();
   *       searchParams.append('name', 'first');
   *       searchParams.append('name', 'second');
   */
  append(name: string, value: string): void;

  /** Deletes the given search parameter and its associated value,
   * from the list of all search parameters.
   *
   *       let searchParams = new URLSearchParams([['name', 'value']]);
   *       searchParams.delete('name');
   */
  delete(name: string): void;

  /** Returns all the values associated with a given search parameter
   * as an array.
   *
   *       searchParams.getAll('name');
   */
  getAll(name: string): string[];

  /** Returns the first value associated to the given search parameter.
   *
   *       searchParams.get('name');
   */
  get(name: string): string | null;

  /** Returns a Boolean that indicates whether a parameter with the
   * specified name exists.
   *
   *       searchParams.has('name');
   */
  has(name: string): boolean;

  /** Sets the value associated with a given search parameter to the
   * given value. If there were several matching values, this method
   * deletes the others. If the search parameter doesn't exist, this
   * method creates it.
   *
   *       searchParams.set('name', 'value');
   */
  set(name: string, value: string): void;

  /** Sort all key/value pairs contained in this object in place and
   * return undefined. The sort order is according to Unicode code
   * points of the keys.
   *
   *       searchParams.sort();
   */
  sort(): void;

  /** Calls a function for each element contained in this object in
   * place and return undefined. Optionally accepts an object to use
   * as this when executing callback as second argument.
   *
   *       const params = new URLSearchParams([["a", "b"], ["c", "d"]]);
   *       params.forEach((value, key, parent) => {
   *         console.log(value, key, parent);
   *       });
   *
   */
  forEach(
    callbackfn: (value: string, key: string, parent: this) => void,
    thisArg?: any
  ): void;

  /** Returns an iterator allowing to go through all keys contained
   * in this object.
   *
   *       const params = new URLSearchParams([["a", "b"], ["c", "d"]]);
   *       for (const key of params.keys()) {
   *         console.log(key);
   *       }
   */
  keys(): IterableIterator<string>;

  /** Returns an iterator allowing to go through all values contained
   * in this object.
   *
   *       const params = new URLSearchParams([["a", "b"], ["c", "d"]]);
   *       for (const value of params.values()) {
   *         console.log(value);
   *       }
   */
  values(): IterableIterator<string>;

  /** Returns an iterator allowing to go through all key/value
   * pairs contained in this object.
   *
   *       const params = new URLSearchParams([["a", "b"], ["c", "d"]]);
   *       for (const [key, value] of params.entries()) {
   *         console.log(key, value);
   *       }
   */
  entries(): IterableIterator<[string, string]>;

  /** Returns an iterator allowing to go through all key/value
   * pairs contained in this object.
   *
   *       const params = new URLSearchParams([["a", "b"], ["c", "d"]]);
   *       for (const [key, value] of params) {
   *         console.log(key, value);
   *       }
   */
  [Symbol.iterator](): IterableIterator<[string, string]>;

  /** Returns a query string suitable for use in a URL.
   *
   *        searchParams.toString();
   */
  toString(): string;
}

declare const URLSearchParams: {
  prototype: URLSearchParams;
  new (
    init?: string[][] | Record<string, string> | string | URLSearchParams
  ): URLSearchParams;
  toString(): string;
};

/** The URL interface represents an object providing static methods used for creating object URLs. */
interface URL {
  hash: string;
  host: string;
  hostname: string;
  href: string;
  toString(): string;
  readonly origin: string;
  password: string;
  pathname: string;
  port: string;
  protocol: string;
  search: string;
  readonly searchParams: URLSearchParams;
  username: string;
  toJSON(): string;
}

declare const URL: {
  prototype: URL;
  new (url: string | URL, base?: string | URL): URL;
  createObjectURL(object: any): string;
  revokeObjectURL(url: string): void;
};

interface MessageEventInit extends EventInit {
  data?: any;
  origin?: string;
  lastEventId?: string;
}

declare class MessageEvent extends Event {
  readonly data: any;
  readonly origin: string;
  readonly lastEventId: string;
  constructor(type: string, eventInitDict?: MessageEventInit);
}

interface ErrorEventInit extends EventInit {
  message?: string;
  filename?: string;
  lineno?: number;
  colno?: number;
  error?: any;
}

declare class ErrorEvent extends Event {
  readonly message: string;
  readonly filename: string;
  readonly lineno: number;
  readonly colno: number;
  readonly error: any;
  constructor(type: string, eventInitDict?: ErrorEventInit);
}

interface PostMessageOptions {
  transfer?: any[];
}

declare class Worker extends EventTarget {
  onerror?: (e: ErrorEvent) => void;
  onmessage?: (e: MessageEvent) => void;
  onmessageerror?: (e: MessageEvent) => void;
  constructor(
    specifier: string,
    options?: {
      type?: "classic" | "module";
      name?: string;
      /** UNSTABLE: New API. Expect many changes; most likely this
       * field will be made into an object for more granular
       * configuration of worker thread (permissions, import map, etc.).
       *
       * Set to `true` to make `Deno` namespace and all of its methods
       * available to worker thread.
       *
       * Currently worker inherits permissions from main thread (permissions
       * given using `--allow-*` flags).
       * Configurable permissions are on the roadmap to be implemented.
       *
       * Example:
       *    // mod.ts
       *    const worker = new Worker("./deno_worker.ts", { type: "module", deno: true });
       *    worker.postMessage({ cmd: "readFile", fileName: "./log.txt" });
       *
       *    // deno_worker.ts
       *
       *
       *    self.onmessage = async function (e) {
       *        const { cmd, fileName } = e.data;
       *        if (cmd !== "readFile") {
       *            throw new Error("Invalid command");
       *        }
       *        const buf = await Deno.readFile(fileName);
       *        const fileContents = new TextDecoder().decode(buf);
       *        console.log(fileContents);
       *    }
       *
       *    // log.txt
       *    hello world
       *    hello world 2
       *
       *    // run program
       *    $ deno run --allow-read mod.ts
       *    hello world
       *    hello world2
       *
       */
      deno?: boolean;
    }
  );
  postMessage(message: any, transfer: ArrayBuffer[]): void;
  postMessage(message: any, options?: PostMessageOptions): void;
  terminate(): void;
}

declare namespace performance {
  /** Returns a current time from Deno's start in milliseconds.
   *
   * Use the flag --allow-hrtime return a precise value.
   *
   *       const t = performance.now();
   *       console.log(`${t} ms since start!`);
   */
  export function now(): number;
}

interface EventInit {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
}

/** An event which takes place in the DOM. */
declare class Event {
  constructor(type: string, eventInitDict?: EventInit);
  /** Returns true or false depending on how event was initialized. True if
   * event goes through its target's ancestors in reverse tree order, and
   * false otherwise. */
  readonly bubbles: boolean;
  cancelBubble: boolean;
  /** Returns true or false depending on how event was initialized. Its return
   * value does not always carry meaning, but true can indicate that part of the
   * operation during which event was dispatched, can be canceled by invoking
   * the preventDefault() method. */
  readonly cancelable: boolean;
  /** Returns true or false depending on how event was initialized. True if
   * event invokes listeners past a ShadowRoot node that is the root of its
   * target, and false otherwise. */
  readonly composed: boolean;
  /** Returns the object whose event listener's callback is currently being
   * invoked. */
  readonly currentTarget: EventTarget | null;
  /** Returns true if preventDefault() was invoked successfully to indicate
   * cancellation, and false otherwise. */
  readonly defaultPrevented: boolean;
  /** Returns the event's phase, which is one of NONE, CAPTURING_PHASE,
   * AT_TARGET, and BUBBLING_PHASE. */
  readonly eventPhase: number;
  /** Returns true if event was dispatched by the user agent, and false
   * otherwise. */
  readonly isTrusted: boolean;
  /** Returns the object to which event is dispatched (its target). */
  readonly target: EventTarget | null;
  /** Returns the event's timestamp as the number of milliseconds measured
   * relative to the time origin. */
  readonly timeStamp: number;
  /** Returns the type of event, e.g. "click", "hashchange", or "submit". */
  readonly type: string;
  /** Returns the invocation target objects of event's path (objects on which
   * listeners will be invoked), except for any nodes in shadow trees of which
   * the shadow root's mode is "closed" that are not reachable from event's
   * currentTarget. */
  composedPath(): EventTarget[];
  /** If invoked when the cancelable attribute value is true, and while
   * executing a listener for the event with passive set to false, signals to
   * the operation that caused event to be dispatched that it needs to be
   * canceled. */
  preventDefault(): void;
  /** Invoking this method prevents event from reaching any registered event
   * listeners after the current one finishes running and, when dispatched in a
   * tree, also prevents event from reaching any other objects. */
  stopImmediatePropagation(): void;
  /** When dispatched in a tree, invoking this method prevents event from
   * reaching any objects other than the current object. */
  stopPropagation(): void;
  readonly AT_TARGET: number;
  readonly BUBBLING_PHASE: number;
  readonly CAPTURING_PHASE: number;
  readonly NONE: number;
  static readonly AT_TARGET: number;
  static readonly BUBBLING_PHASE: number;
  static readonly CAPTURING_PHASE: number;
  static readonly NONE: number;
}

/**
 * EventTarget is a DOM interface implemented by objects that can receive events
 * and may have listeners for them.
 */
declare class EventTarget {
  /** Appends an event listener for events whose type attribute value is type.
   * The callback argument sets the callback that will be invoked when the event
   * is dispatched.
   *
   * The options argument sets listener-specific options. For compatibility this
   * can be a boolean, in which case the method behaves exactly as if the value
   * was specified as options's capture.
   *
   * When set to true, options's capture prevents callback from being invoked
   * when the event's eventPhase attribute value is BUBBLING_PHASE. When false
   * (or not present), callback will not be invoked when event's eventPhase
   * attribute value is CAPTURING_PHASE. Either way, callback will be invoked if
   * event's eventPhase attribute value is AT_TARGET.
   *
   * When set to true, options's passive indicates that the callback will not
   * cancel the event by invoking preventDefault(). This is used to enable
   * performance optimizations described in § 2.8 Observing event listeners.
   *
   * When set to true, options's once indicates that the callback will only be
   * invoked once after which the event listener will be removed.
   *
   * The event listener is appended to target's event listener list and is not
   * appended if it has the same type, callback, and capture. */
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject | null,
    options?: boolean | AddEventListenerOptions
  ): void;
  /** Dispatches a synthetic event event to target and returns true if either
   * event's cancelable attribute value is false or its preventDefault() method
   * was not invoked, and false otherwise. */
  dispatchEvent(event: Event): boolean;
  /** Removes the event listener in target's event listener list with the same
   * type, callback, and options. */
  removeEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject | null,
    options?: EventListenerOptions | boolean
  ): void;
  [Symbol.toStringTag]: string;
}

interface EventListener {
  (evt: Event): void | Promise<void>;
}

interface EventListenerObject {
  handleEvent(evt: Event): void | Promise<void>;
}

declare type EventListenerOrEventListenerObject =
  | EventListener
  | EventListenerObject;

interface AddEventListenerOptions extends EventListenerOptions {
  once?: boolean;
  passive?: boolean;
}

interface EventListenerOptions {
  capture?: boolean;
}

/** Events measuring progress of an underlying process, like an HTTP request
 * (for an XMLHttpRequest, or the loading of the underlying resource of an
 * <img>, <audio>, <video>, <style> or <link>). */
interface ProgressEvent<T extends EventTarget = EventTarget> extends Event {
  readonly lengthComputable: boolean;
  readonly loaded: number;
  readonly target: T | null;
  readonly total: number;
}

interface CustomEventInit<T = any> extends EventInit {
  detail?: T;
}

declare class CustomEvent<T = any> extends Event {
  constructor(typeArg: string, eventInitDict?: CustomEventInit<T>);
  /** Returns any custom data event was created with. Typically used for
   * synthetic events. */
  readonly detail: T;
}

/** A controller object that allows you to abort one or more DOM requests as and
 * when desired. */
declare class AbortController {
  /** Returns the AbortSignal object associated with this object. */
  readonly signal: AbortSignal;
  /** Invoking this method will set this object's AbortSignal's aborted flag and
   * signal to any observers that the associated activity is to be aborted. */
  abort(): void;
}

interface AbortSignalEventMap {
  abort: Event;
}

/** A signal object that allows you to communicate with a DOM request (such as a
 * Fetch) and abort it if required via an AbortController object. */
interface AbortSignal extends EventTarget {
  /** Returns true if this AbortSignal's AbortController has signaled to abort,
   * and false otherwise. */
  readonly aborted: boolean;
  onabort: ((this: AbortSignal, ev: Event) => any) | null;
  addEventListener<K extends keyof AbortSignalEventMap>(
    type: K,
    listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void;
  removeEventListener<K extends keyof AbortSignalEventMap>(
    type: K,
    listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void;
}

declare const AbortSignal: {
  prototype: AbortSignal;
  new (): AbortSignal;
};

// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.

/* eslint-disable @typescript-eslint/no-explicit-any */

/// <reference no-default-lib="true" />
/// <reference lib="deno.ns" />
/// <reference lib="deno.shared_globals" />
/// <reference lib="esnext" />

declare interface Window extends EventTarget {
  readonly window: Window & typeof globalThis;
  readonly self: Window & typeof globalThis;
  onload: ((this: Window, ev: Event) => any) | null;
  onunload: ((this: Window, ev: Event) => any) | null;
  close: () => void;
  readonly closed: boolean;
  Deno: typeof Deno;
}

declare const window: Window & typeof globalThis;
declare const self: Window & typeof globalThis;
declare const onload: ((this: Window, ev: Event) => any) | null;
declare const onunload: ((this: Window, ev: Event) => any) | null;

/* eslint-enable @typescript-eslint/no-explicit-any */
