
/**
 * Client
**/

import * as runtime from '@prisma/client/runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model JournalEntry
 * 
 */
export type JournalEntry = $Result.DefaultSelection<Prisma.$JournalEntryPayload>
/**
 * Model BreathingSession
 * 
 */
export type BreathingSession = $Result.DefaultSelection<Prisma.$BreathingSessionPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.journalEntry`: Exposes CRUD operations for the **JournalEntry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more JournalEntries
    * const journalEntries = await prisma.journalEntry.findMany()
    * ```
    */
  get journalEntry(): Prisma.JournalEntryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.breathingSession`: Exposes CRUD operations for the **BreathingSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BreathingSessions
    * const breathingSessions = await prisma.breathingSession.findMany()
    * ```
    */
  get breathingSession(): Prisma.BreathingSessionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.13.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    JournalEntry: 'JournalEntry',
    BreathingSession: 'BreathingSession'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "journalEntry" | "breathingSession"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      JournalEntry: {
        payload: Prisma.$JournalEntryPayload<ExtArgs>
        fields: Prisma.JournalEntryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JournalEntryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JournalEntryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JournalEntryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JournalEntryPayload>
          }
          findFirst: {
            args: Prisma.JournalEntryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JournalEntryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JournalEntryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JournalEntryPayload>
          }
          findMany: {
            args: Prisma.JournalEntryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JournalEntryPayload>[]
          }
          create: {
            args: Prisma.JournalEntryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JournalEntryPayload>
          }
          createMany: {
            args: Prisma.JournalEntryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JournalEntryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JournalEntryPayload>[]
          }
          delete: {
            args: Prisma.JournalEntryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JournalEntryPayload>
          }
          update: {
            args: Prisma.JournalEntryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JournalEntryPayload>
          }
          deleteMany: {
            args: Prisma.JournalEntryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JournalEntryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.JournalEntryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JournalEntryPayload>
          }
          aggregate: {
            args: Prisma.JournalEntryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJournalEntry>
          }
          groupBy: {
            args: Prisma.JournalEntryGroupByArgs<ExtArgs>
            result: $Utils.Optional<JournalEntryGroupByOutputType>[]
          }
          count: {
            args: Prisma.JournalEntryCountArgs<ExtArgs>
            result: $Utils.Optional<JournalEntryCountAggregateOutputType> | number
          }
        }
      }
      BreathingSession: {
        payload: Prisma.$BreathingSessionPayload<ExtArgs>
        fields: Prisma.BreathingSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BreathingSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BreathingSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BreathingSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BreathingSessionPayload>
          }
          findFirst: {
            args: Prisma.BreathingSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BreathingSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BreathingSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BreathingSessionPayload>
          }
          findMany: {
            args: Prisma.BreathingSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BreathingSessionPayload>[]
          }
          create: {
            args: Prisma.BreathingSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BreathingSessionPayload>
          }
          createMany: {
            args: Prisma.BreathingSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BreathingSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BreathingSessionPayload>[]
          }
          delete: {
            args: Prisma.BreathingSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BreathingSessionPayload>
          }
          update: {
            args: Prisma.BreathingSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BreathingSessionPayload>
          }
          deleteMany: {
            args: Prisma.BreathingSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BreathingSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BreathingSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BreathingSessionPayload>
          }
          aggregate: {
            args: Prisma.BreathingSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBreathingSession>
          }
          groupBy: {
            args: Prisma.BreathingSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<BreathingSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.BreathingSessionCountArgs<ExtArgs>
            result: $Utils.Optional<BreathingSessionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    journalEntry?: JournalEntryOmit
    breathingSession?: BreathingSessionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    journalEntries: number
    breathingSessions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    journalEntries?: boolean | UserCountOutputTypeCountJournalEntriesArgs
    breathingSessions?: boolean | UserCountOutputTypeCountBreathingSessionsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountJournalEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JournalEntryWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBreathingSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BreathingSessionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    firstName: string | null
    lastName: string | null
    role: string | null
    bio: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    firstName: string | null
    lastName: string | null
    role: string | null
    bio: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    firstName: number
    lastName: number
    role: number
    bio: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    role?: true
    bio?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    role?: true
    bio?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    role?: true
    bio?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    firstName: string
    lastName: string
    role: string
    bio: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    role?: boolean
    bio?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    journalEntries?: boolean | User$journalEntriesArgs<ExtArgs>
    breathingSessions?: boolean | User$breathingSessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    role?: boolean
    bio?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>


  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    role?: boolean
    bio?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "firstName" | "lastName" | "role" | "bio" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    journalEntries?: boolean | User$journalEntriesArgs<ExtArgs>
    breathingSessions?: boolean | User$breathingSessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      journalEntries: Prisma.$JournalEntryPayload<ExtArgs>[]
      breathingSessions: Prisma.$BreathingSessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      firstName: string
      lastName: string
      role: string
      bio: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    journalEntries<T extends User$journalEntriesArgs<ExtArgs> = {}>(args?: Subset<T, User$journalEntriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JournalEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    breathingSessions<T extends User$breathingSessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$breathingSessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BreathingSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly bio: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.journalEntries
   */
  export type User$journalEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JournalEntry
     */
    select?: JournalEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the JournalEntry
     */
    omit?: JournalEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalEntryInclude<ExtArgs> | null
    where?: JournalEntryWhereInput
    orderBy?: JournalEntryOrderByWithRelationInput | JournalEntryOrderByWithRelationInput[]
    cursor?: JournalEntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JournalEntryScalarFieldEnum | JournalEntryScalarFieldEnum[]
  }

  /**
   * User.breathingSessions
   */
  export type User$breathingSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BreathingSession
     */
    select?: BreathingSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BreathingSession
     */
    omit?: BreathingSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BreathingSessionInclude<ExtArgs> | null
    where?: BreathingSessionWhereInput
    orderBy?: BreathingSessionOrderByWithRelationInput | BreathingSessionOrderByWithRelationInput[]
    cursor?: BreathingSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BreathingSessionScalarFieldEnum | BreathingSessionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model JournalEntry
   */

  export type AggregateJournalEntry = {
    _count: JournalEntryCountAggregateOutputType | null
    _min: JournalEntryMinAggregateOutputType | null
    _max: JournalEntryMaxAggregateOutputType | null
  }

  export type JournalEntryMinAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    mood: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type JournalEntryMaxAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    mood: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type JournalEntryCountAggregateOutputType = {
    id: number
    title: number
    content: number
    mood: number
    tags: number
    createdAt: number
    updatedAt: number
    userId: number
    _all: number
  }


  export type JournalEntryMinAggregateInputType = {
    id?: true
    title?: true
    content?: true
    mood?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type JournalEntryMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    mood?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type JournalEntryCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    mood?: true
    tags?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    _all?: true
  }

  export type JournalEntryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JournalEntry to aggregate.
     */
    where?: JournalEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JournalEntries to fetch.
     */
    orderBy?: JournalEntryOrderByWithRelationInput | JournalEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JournalEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JournalEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JournalEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned JournalEntries
    **/
    _count?: true | JournalEntryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JournalEntryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JournalEntryMaxAggregateInputType
  }

  export type GetJournalEntryAggregateType<T extends JournalEntryAggregateArgs> = {
        [P in keyof T & keyof AggregateJournalEntry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJournalEntry[P]>
      : GetScalarType<T[P], AggregateJournalEntry[P]>
  }




  export type JournalEntryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JournalEntryWhereInput
    orderBy?: JournalEntryOrderByWithAggregationInput | JournalEntryOrderByWithAggregationInput[]
    by: JournalEntryScalarFieldEnum[] | JournalEntryScalarFieldEnum
    having?: JournalEntryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JournalEntryCountAggregateInputType | true
    _min?: JournalEntryMinAggregateInputType
    _max?: JournalEntryMaxAggregateInputType
  }

  export type JournalEntryGroupByOutputType = {
    id: string
    title: string
    content: string
    mood: string | null
    tags: string[]
    createdAt: Date
    updatedAt: Date
    userId: string
    _count: JournalEntryCountAggregateOutputType | null
    _min: JournalEntryMinAggregateOutputType | null
    _max: JournalEntryMaxAggregateOutputType | null
  }

  type GetJournalEntryGroupByPayload<T extends JournalEntryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JournalEntryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JournalEntryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JournalEntryGroupByOutputType[P]>
            : GetScalarType<T[P], JournalEntryGroupByOutputType[P]>
        }
      >
    >


  export type JournalEntrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    mood?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["journalEntry"]>

  export type JournalEntrySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    mood?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["journalEntry"]>


  export type JournalEntrySelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    mood?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
  }

  export type JournalEntryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "content" | "mood" | "tags" | "createdAt" | "updatedAt" | "userId", ExtArgs["result"]["journalEntry"]>
  export type JournalEntryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type JournalEntryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $JournalEntryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "JournalEntry"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      content: string
      mood: string | null
      tags: string[]
      createdAt: Date
      updatedAt: Date
      userId: string
    }, ExtArgs["result"]["journalEntry"]>
    composites: {}
  }

  type JournalEntryGetPayload<S extends boolean | null | undefined | JournalEntryDefaultArgs> = $Result.GetResult<Prisma.$JournalEntryPayload, S>

  type JournalEntryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<JournalEntryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JournalEntryCountAggregateInputType | true
    }

  export interface JournalEntryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['JournalEntry'], meta: { name: 'JournalEntry' } }
    /**
     * Find zero or one JournalEntry that matches the filter.
     * @param {JournalEntryFindUniqueArgs} args - Arguments to find a JournalEntry
     * @example
     * // Get one JournalEntry
     * const journalEntry = await prisma.journalEntry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JournalEntryFindUniqueArgs>(args: SelectSubset<T, JournalEntryFindUniqueArgs<ExtArgs>>): Prisma__JournalEntryClient<$Result.GetResult<Prisma.$JournalEntryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one JournalEntry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {JournalEntryFindUniqueOrThrowArgs} args - Arguments to find a JournalEntry
     * @example
     * // Get one JournalEntry
     * const journalEntry = await prisma.journalEntry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JournalEntryFindUniqueOrThrowArgs>(args: SelectSubset<T, JournalEntryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JournalEntryClient<$Result.GetResult<Prisma.$JournalEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JournalEntry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JournalEntryFindFirstArgs} args - Arguments to find a JournalEntry
     * @example
     * // Get one JournalEntry
     * const journalEntry = await prisma.journalEntry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JournalEntryFindFirstArgs>(args?: SelectSubset<T, JournalEntryFindFirstArgs<ExtArgs>>): Prisma__JournalEntryClient<$Result.GetResult<Prisma.$JournalEntryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first JournalEntry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JournalEntryFindFirstOrThrowArgs} args - Arguments to find a JournalEntry
     * @example
     * // Get one JournalEntry
     * const journalEntry = await prisma.journalEntry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JournalEntryFindFirstOrThrowArgs>(args?: SelectSubset<T, JournalEntryFindFirstOrThrowArgs<ExtArgs>>): Prisma__JournalEntryClient<$Result.GetResult<Prisma.$JournalEntryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more JournalEntries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JournalEntryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all JournalEntries
     * const journalEntries = await prisma.journalEntry.findMany()
     * 
     * // Get first 10 JournalEntries
     * const journalEntries = await prisma.journalEntry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const journalEntryWithIdOnly = await prisma.journalEntry.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JournalEntryFindManyArgs>(args?: SelectSubset<T, JournalEntryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JournalEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a JournalEntry.
     * @param {JournalEntryCreateArgs} args - Arguments to create a JournalEntry.
     * @example
     * // Create one JournalEntry
     * const JournalEntry = await prisma.journalEntry.create({
     *   data: {
     *     // ... data to create a JournalEntry
     *   }
     * })
     * 
     */
    create<T extends JournalEntryCreateArgs>(args: SelectSubset<T, JournalEntryCreateArgs<ExtArgs>>): Prisma__JournalEntryClient<$Result.GetResult<Prisma.$JournalEntryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many JournalEntries.
     * @param {JournalEntryCreateManyArgs} args - Arguments to create many JournalEntries.
     * @example
     * // Create many JournalEntries
     * const journalEntry = await prisma.journalEntry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JournalEntryCreateManyArgs>(args?: SelectSubset<T, JournalEntryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many JournalEntries and returns the data saved in the database.
     * @param {JournalEntryCreateManyAndReturnArgs} args - Arguments to create many JournalEntries.
     * @example
     * // Create many JournalEntries
     * const journalEntry = await prisma.journalEntry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many JournalEntries and only return the `id`
     * const journalEntryWithIdOnly = await prisma.journalEntry.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JournalEntryCreateManyAndReturnArgs>(args?: SelectSubset<T, JournalEntryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JournalEntryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a JournalEntry.
     * @param {JournalEntryDeleteArgs} args - Arguments to delete one JournalEntry.
     * @example
     * // Delete one JournalEntry
     * const JournalEntry = await prisma.journalEntry.delete({
     *   where: {
     *     // ... filter to delete one JournalEntry
     *   }
     * })
     * 
     */
    delete<T extends JournalEntryDeleteArgs>(args: SelectSubset<T, JournalEntryDeleteArgs<ExtArgs>>): Prisma__JournalEntryClient<$Result.GetResult<Prisma.$JournalEntryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one JournalEntry.
     * @param {JournalEntryUpdateArgs} args - Arguments to update one JournalEntry.
     * @example
     * // Update one JournalEntry
     * const journalEntry = await prisma.journalEntry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JournalEntryUpdateArgs>(args: SelectSubset<T, JournalEntryUpdateArgs<ExtArgs>>): Prisma__JournalEntryClient<$Result.GetResult<Prisma.$JournalEntryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more JournalEntries.
     * @param {JournalEntryDeleteManyArgs} args - Arguments to filter JournalEntries to delete.
     * @example
     * // Delete a few JournalEntries
     * const { count } = await prisma.journalEntry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JournalEntryDeleteManyArgs>(args?: SelectSubset<T, JournalEntryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JournalEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JournalEntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many JournalEntries
     * const journalEntry = await prisma.journalEntry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JournalEntryUpdateManyArgs>(args: SelectSubset<T, JournalEntryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one JournalEntry.
     * @param {JournalEntryUpsertArgs} args - Arguments to update or create a JournalEntry.
     * @example
     * // Update or create a JournalEntry
     * const journalEntry = await prisma.journalEntry.upsert({
     *   create: {
     *     // ... data to create a JournalEntry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the JournalEntry we want to update
     *   }
     * })
     */
    upsert<T extends JournalEntryUpsertArgs>(args: SelectSubset<T, JournalEntryUpsertArgs<ExtArgs>>): Prisma__JournalEntryClient<$Result.GetResult<Prisma.$JournalEntryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of JournalEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JournalEntryCountArgs} args - Arguments to filter JournalEntries to count.
     * @example
     * // Count the number of JournalEntries
     * const count = await prisma.journalEntry.count({
     *   where: {
     *     // ... the filter for the JournalEntries we want to count
     *   }
     * })
    **/
    count<T extends JournalEntryCountArgs>(
      args?: Subset<T, JournalEntryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JournalEntryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a JournalEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JournalEntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends JournalEntryAggregateArgs>(args: Subset<T, JournalEntryAggregateArgs>): Prisma.PrismaPromise<GetJournalEntryAggregateType<T>>

    /**
     * Group by JournalEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JournalEntryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends JournalEntryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JournalEntryGroupByArgs['orderBy'] }
        : { orderBy?: JournalEntryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, JournalEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJournalEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the JournalEntry model
   */
  readonly fields: JournalEntryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for JournalEntry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JournalEntryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the JournalEntry model
   */
  interface JournalEntryFieldRefs {
    readonly id: FieldRef<"JournalEntry", 'String'>
    readonly title: FieldRef<"JournalEntry", 'String'>
    readonly content: FieldRef<"JournalEntry", 'String'>
    readonly mood: FieldRef<"JournalEntry", 'String'>
    readonly tags: FieldRef<"JournalEntry", 'String[]'>
    readonly createdAt: FieldRef<"JournalEntry", 'DateTime'>
    readonly updatedAt: FieldRef<"JournalEntry", 'DateTime'>
    readonly userId: FieldRef<"JournalEntry", 'String'>
  }
    

  // Custom InputTypes
  /**
   * JournalEntry findUnique
   */
  export type JournalEntryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JournalEntry
     */
    select?: JournalEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the JournalEntry
     */
    omit?: JournalEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalEntryInclude<ExtArgs> | null
    /**
     * Filter, which JournalEntry to fetch.
     */
    where: JournalEntryWhereUniqueInput
  }

  /**
   * JournalEntry findUniqueOrThrow
   */
  export type JournalEntryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JournalEntry
     */
    select?: JournalEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the JournalEntry
     */
    omit?: JournalEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalEntryInclude<ExtArgs> | null
    /**
     * Filter, which JournalEntry to fetch.
     */
    where: JournalEntryWhereUniqueInput
  }

  /**
   * JournalEntry findFirst
   */
  export type JournalEntryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JournalEntry
     */
    select?: JournalEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the JournalEntry
     */
    omit?: JournalEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalEntryInclude<ExtArgs> | null
    /**
     * Filter, which JournalEntry to fetch.
     */
    where?: JournalEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JournalEntries to fetch.
     */
    orderBy?: JournalEntryOrderByWithRelationInput | JournalEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JournalEntries.
     */
    cursor?: JournalEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JournalEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JournalEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JournalEntries.
     */
    distinct?: JournalEntryScalarFieldEnum | JournalEntryScalarFieldEnum[]
  }

  /**
   * JournalEntry findFirstOrThrow
   */
  export type JournalEntryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JournalEntry
     */
    select?: JournalEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the JournalEntry
     */
    omit?: JournalEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalEntryInclude<ExtArgs> | null
    /**
     * Filter, which JournalEntry to fetch.
     */
    where?: JournalEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JournalEntries to fetch.
     */
    orderBy?: JournalEntryOrderByWithRelationInput | JournalEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JournalEntries.
     */
    cursor?: JournalEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JournalEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JournalEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JournalEntries.
     */
    distinct?: JournalEntryScalarFieldEnum | JournalEntryScalarFieldEnum[]
  }

  /**
   * JournalEntry findMany
   */
  export type JournalEntryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JournalEntry
     */
    select?: JournalEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the JournalEntry
     */
    omit?: JournalEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalEntryInclude<ExtArgs> | null
    /**
     * Filter, which JournalEntries to fetch.
     */
    where?: JournalEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JournalEntries to fetch.
     */
    orderBy?: JournalEntryOrderByWithRelationInput | JournalEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing JournalEntries.
     */
    cursor?: JournalEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JournalEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JournalEntries.
     */
    skip?: number
    distinct?: JournalEntryScalarFieldEnum | JournalEntryScalarFieldEnum[]
  }

  /**
   * JournalEntry create
   */
  export type JournalEntryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JournalEntry
     */
    select?: JournalEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the JournalEntry
     */
    omit?: JournalEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalEntryInclude<ExtArgs> | null
    /**
     * The data needed to create a JournalEntry.
     */
    data: XOR<JournalEntryCreateInput, JournalEntryUncheckedCreateInput>
  }

  /**
   * JournalEntry createMany
   */
  export type JournalEntryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many JournalEntries.
     */
    data: JournalEntryCreateManyInput | JournalEntryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JournalEntry createManyAndReturn
   */
  export type JournalEntryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JournalEntry
     */
    select?: JournalEntrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the JournalEntry
     */
    omit?: JournalEntryOmit<ExtArgs> | null
    /**
     * The data used to create many JournalEntries.
     */
    data: JournalEntryCreateManyInput | JournalEntryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalEntryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * JournalEntry update
   */
  export type JournalEntryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JournalEntry
     */
    select?: JournalEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the JournalEntry
     */
    omit?: JournalEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalEntryInclude<ExtArgs> | null
    /**
     * The data needed to update a JournalEntry.
     */
    data: XOR<JournalEntryUpdateInput, JournalEntryUncheckedUpdateInput>
    /**
     * Choose, which JournalEntry to update.
     */
    where: JournalEntryWhereUniqueInput
  }

  /**
   * JournalEntry updateMany
   */
  export type JournalEntryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update JournalEntries.
     */
    data: XOR<JournalEntryUpdateManyMutationInput, JournalEntryUncheckedUpdateManyInput>
    /**
     * Filter which JournalEntries to update
     */
    where?: JournalEntryWhereInput
  }

  /**
   * JournalEntry upsert
   */
  export type JournalEntryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JournalEntry
     */
    select?: JournalEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the JournalEntry
     */
    omit?: JournalEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalEntryInclude<ExtArgs> | null
    /**
     * The filter to search for the JournalEntry to update in case it exists.
     */
    where: JournalEntryWhereUniqueInput
    /**
     * In case the JournalEntry found by the `where` argument doesn't exist, create a new JournalEntry with this data.
     */
    create: XOR<JournalEntryCreateInput, JournalEntryUncheckedCreateInput>
    /**
     * In case the JournalEntry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JournalEntryUpdateInput, JournalEntryUncheckedUpdateInput>
  }

  /**
   * JournalEntry delete
   */
  export type JournalEntryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JournalEntry
     */
    select?: JournalEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the JournalEntry
     */
    omit?: JournalEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalEntryInclude<ExtArgs> | null
    /**
     * Filter which JournalEntry to delete.
     */
    where: JournalEntryWhereUniqueInput
  }

  /**
   * JournalEntry deleteMany
   */
  export type JournalEntryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JournalEntries to delete
     */
    where?: JournalEntryWhereInput
  }

  /**
   * JournalEntry without action
   */
  export type JournalEntryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JournalEntry
     */
    select?: JournalEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the JournalEntry
     */
    omit?: JournalEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JournalEntryInclude<ExtArgs> | null
  }


  /**
   * Model BreathingSession
   */

  export type AggregateBreathingSession = {
    _count: BreathingSessionCountAggregateOutputType | null
    _avg: BreathingSessionAvgAggregateOutputType | null
    _sum: BreathingSessionSumAggregateOutputType | null
    _min: BreathingSessionMinAggregateOutputType | null
    _max: BreathingSessionMaxAggregateOutputType | null
  }

  export type BreathingSessionAvgAggregateOutputType = {
    duration: number | null
  }

  export type BreathingSessionSumAggregateOutputType = {
    duration: number | null
  }

  export type BreathingSessionMinAggregateOutputType = {
    id: string | null
    type: string | null
    duration: number | null
    completed: boolean | null
    createdAt: Date | null
    userId: string | null
  }

  export type BreathingSessionMaxAggregateOutputType = {
    id: string | null
    type: string | null
    duration: number | null
    completed: boolean | null
    createdAt: Date | null
    userId: string | null
  }

  export type BreathingSessionCountAggregateOutputType = {
    id: number
    type: number
    duration: number
    completed: number
    createdAt: number
    userId: number
    _all: number
  }


  export type BreathingSessionAvgAggregateInputType = {
    duration?: true
  }

  export type BreathingSessionSumAggregateInputType = {
    duration?: true
  }

  export type BreathingSessionMinAggregateInputType = {
    id?: true
    type?: true
    duration?: true
    completed?: true
    createdAt?: true
    userId?: true
  }

  export type BreathingSessionMaxAggregateInputType = {
    id?: true
    type?: true
    duration?: true
    completed?: true
    createdAt?: true
    userId?: true
  }

  export type BreathingSessionCountAggregateInputType = {
    id?: true
    type?: true
    duration?: true
    completed?: true
    createdAt?: true
    userId?: true
    _all?: true
  }

  export type BreathingSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BreathingSession to aggregate.
     */
    where?: BreathingSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BreathingSessions to fetch.
     */
    orderBy?: BreathingSessionOrderByWithRelationInput | BreathingSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BreathingSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BreathingSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BreathingSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BreathingSessions
    **/
    _count?: true | BreathingSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BreathingSessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BreathingSessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BreathingSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BreathingSessionMaxAggregateInputType
  }

  export type GetBreathingSessionAggregateType<T extends BreathingSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateBreathingSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBreathingSession[P]>
      : GetScalarType<T[P], AggregateBreathingSession[P]>
  }




  export type BreathingSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BreathingSessionWhereInput
    orderBy?: BreathingSessionOrderByWithAggregationInput | BreathingSessionOrderByWithAggregationInput[]
    by: BreathingSessionScalarFieldEnum[] | BreathingSessionScalarFieldEnum
    having?: BreathingSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BreathingSessionCountAggregateInputType | true
    _avg?: BreathingSessionAvgAggregateInputType
    _sum?: BreathingSessionSumAggregateInputType
    _min?: BreathingSessionMinAggregateInputType
    _max?: BreathingSessionMaxAggregateInputType
  }

  export type BreathingSessionGroupByOutputType = {
    id: string
    type: string
    duration: number
    completed: boolean
    createdAt: Date
    userId: string
    _count: BreathingSessionCountAggregateOutputType | null
    _avg: BreathingSessionAvgAggregateOutputType | null
    _sum: BreathingSessionSumAggregateOutputType | null
    _min: BreathingSessionMinAggregateOutputType | null
    _max: BreathingSessionMaxAggregateOutputType | null
  }

  type GetBreathingSessionGroupByPayload<T extends BreathingSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BreathingSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BreathingSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BreathingSessionGroupByOutputType[P]>
            : GetScalarType<T[P], BreathingSessionGroupByOutputType[P]>
        }
      >
    >


  export type BreathingSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    duration?: boolean
    completed?: boolean
    createdAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["breathingSession"]>

  export type BreathingSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    duration?: boolean
    completed?: boolean
    createdAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["breathingSession"]>


  export type BreathingSessionSelectScalar = {
    id?: boolean
    type?: boolean
    duration?: boolean
    completed?: boolean
    createdAt?: boolean
    userId?: boolean
  }

  export type BreathingSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "duration" | "completed" | "createdAt" | "userId", ExtArgs["result"]["breathingSession"]>
  export type BreathingSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type BreathingSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $BreathingSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BreathingSession"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: string
      duration: number
      completed: boolean
      createdAt: Date
      userId: string
    }, ExtArgs["result"]["breathingSession"]>
    composites: {}
  }

  type BreathingSessionGetPayload<S extends boolean | null | undefined | BreathingSessionDefaultArgs> = $Result.GetResult<Prisma.$BreathingSessionPayload, S>

  type BreathingSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BreathingSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BreathingSessionCountAggregateInputType | true
    }

  export interface BreathingSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BreathingSession'], meta: { name: 'BreathingSession' } }
    /**
     * Find zero or one BreathingSession that matches the filter.
     * @param {BreathingSessionFindUniqueArgs} args - Arguments to find a BreathingSession
     * @example
     * // Get one BreathingSession
     * const breathingSession = await prisma.breathingSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BreathingSessionFindUniqueArgs>(args: SelectSubset<T, BreathingSessionFindUniqueArgs<ExtArgs>>): Prisma__BreathingSessionClient<$Result.GetResult<Prisma.$BreathingSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BreathingSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BreathingSessionFindUniqueOrThrowArgs} args - Arguments to find a BreathingSession
     * @example
     * // Get one BreathingSession
     * const breathingSession = await prisma.breathingSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BreathingSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, BreathingSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BreathingSessionClient<$Result.GetResult<Prisma.$BreathingSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BreathingSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BreathingSessionFindFirstArgs} args - Arguments to find a BreathingSession
     * @example
     * // Get one BreathingSession
     * const breathingSession = await prisma.breathingSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BreathingSessionFindFirstArgs>(args?: SelectSubset<T, BreathingSessionFindFirstArgs<ExtArgs>>): Prisma__BreathingSessionClient<$Result.GetResult<Prisma.$BreathingSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BreathingSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BreathingSessionFindFirstOrThrowArgs} args - Arguments to find a BreathingSession
     * @example
     * // Get one BreathingSession
     * const breathingSession = await prisma.breathingSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BreathingSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, BreathingSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__BreathingSessionClient<$Result.GetResult<Prisma.$BreathingSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BreathingSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BreathingSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BreathingSessions
     * const breathingSessions = await prisma.breathingSession.findMany()
     * 
     * // Get first 10 BreathingSessions
     * const breathingSessions = await prisma.breathingSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const breathingSessionWithIdOnly = await prisma.breathingSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BreathingSessionFindManyArgs>(args?: SelectSubset<T, BreathingSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BreathingSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BreathingSession.
     * @param {BreathingSessionCreateArgs} args - Arguments to create a BreathingSession.
     * @example
     * // Create one BreathingSession
     * const BreathingSession = await prisma.breathingSession.create({
     *   data: {
     *     // ... data to create a BreathingSession
     *   }
     * })
     * 
     */
    create<T extends BreathingSessionCreateArgs>(args: SelectSubset<T, BreathingSessionCreateArgs<ExtArgs>>): Prisma__BreathingSessionClient<$Result.GetResult<Prisma.$BreathingSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BreathingSessions.
     * @param {BreathingSessionCreateManyArgs} args - Arguments to create many BreathingSessions.
     * @example
     * // Create many BreathingSessions
     * const breathingSession = await prisma.breathingSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BreathingSessionCreateManyArgs>(args?: SelectSubset<T, BreathingSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BreathingSessions and returns the data saved in the database.
     * @param {BreathingSessionCreateManyAndReturnArgs} args - Arguments to create many BreathingSessions.
     * @example
     * // Create many BreathingSessions
     * const breathingSession = await prisma.breathingSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BreathingSessions and only return the `id`
     * const breathingSessionWithIdOnly = await prisma.breathingSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BreathingSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, BreathingSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BreathingSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BreathingSession.
     * @param {BreathingSessionDeleteArgs} args - Arguments to delete one BreathingSession.
     * @example
     * // Delete one BreathingSession
     * const BreathingSession = await prisma.breathingSession.delete({
     *   where: {
     *     // ... filter to delete one BreathingSession
     *   }
     * })
     * 
     */
    delete<T extends BreathingSessionDeleteArgs>(args: SelectSubset<T, BreathingSessionDeleteArgs<ExtArgs>>): Prisma__BreathingSessionClient<$Result.GetResult<Prisma.$BreathingSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BreathingSession.
     * @param {BreathingSessionUpdateArgs} args - Arguments to update one BreathingSession.
     * @example
     * // Update one BreathingSession
     * const breathingSession = await prisma.breathingSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BreathingSessionUpdateArgs>(args: SelectSubset<T, BreathingSessionUpdateArgs<ExtArgs>>): Prisma__BreathingSessionClient<$Result.GetResult<Prisma.$BreathingSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BreathingSessions.
     * @param {BreathingSessionDeleteManyArgs} args - Arguments to filter BreathingSessions to delete.
     * @example
     * // Delete a few BreathingSessions
     * const { count } = await prisma.breathingSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BreathingSessionDeleteManyArgs>(args?: SelectSubset<T, BreathingSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BreathingSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BreathingSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BreathingSessions
     * const breathingSession = await prisma.breathingSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BreathingSessionUpdateManyArgs>(args: SelectSubset<T, BreathingSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BreathingSession.
     * @param {BreathingSessionUpsertArgs} args - Arguments to update or create a BreathingSession.
     * @example
     * // Update or create a BreathingSession
     * const breathingSession = await prisma.breathingSession.upsert({
     *   create: {
     *     // ... data to create a BreathingSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BreathingSession we want to update
     *   }
     * })
     */
    upsert<T extends BreathingSessionUpsertArgs>(args: SelectSubset<T, BreathingSessionUpsertArgs<ExtArgs>>): Prisma__BreathingSessionClient<$Result.GetResult<Prisma.$BreathingSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BreathingSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BreathingSessionCountArgs} args - Arguments to filter BreathingSessions to count.
     * @example
     * // Count the number of BreathingSessions
     * const count = await prisma.breathingSession.count({
     *   where: {
     *     // ... the filter for the BreathingSessions we want to count
     *   }
     * })
    **/
    count<T extends BreathingSessionCountArgs>(
      args?: Subset<T, BreathingSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BreathingSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BreathingSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BreathingSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BreathingSessionAggregateArgs>(args: Subset<T, BreathingSessionAggregateArgs>): Prisma.PrismaPromise<GetBreathingSessionAggregateType<T>>

    /**
     * Group by BreathingSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BreathingSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BreathingSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BreathingSessionGroupByArgs['orderBy'] }
        : { orderBy?: BreathingSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BreathingSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBreathingSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BreathingSession model
   */
  readonly fields: BreathingSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BreathingSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BreathingSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BreathingSession model
   */
  interface BreathingSessionFieldRefs {
    readonly id: FieldRef<"BreathingSession", 'String'>
    readonly type: FieldRef<"BreathingSession", 'String'>
    readonly duration: FieldRef<"BreathingSession", 'Int'>
    readonly completed: FieldRef<"BreathingSession", 'Boolean'>
    readonly createdAt: FieldRef<"BreathingSession", 'DateTime'>
    readonly userId: FieldRef<"BreathingSession", 'String'>
  }
    

  // Custom InputTypes
  /**
   * BreathingSession findUnique
   */
  export type BreathingSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BreathingSession
     */
    select?: BreathingSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BreathingSession
     */
    omit?: BreathingSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BreathingSessionInclude<ExtArgs> | null
    /**
     * Filter, which BreathingSession to fetch.
     */
    where: BreathingSessionWhereUniqueInput
  }

  /**
   * BreathingSession findUniqueOrThrow
   */
  export type BreathingSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BreathingSession
     */
    select?: BreathingSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BreathingSession
     */
    omit?: BreathingSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BreathingSessionInclude<ExtArgs> | null
    /**
     * Filter, which BreathingSession to fetch.
     */
    where: BreathingSessionWhereUniqueInput
  }

  /**
   * BreathingSession findFirst
   */
  export type BreathingSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BreathingSession
     */
    select?: BreathingSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BreathingSession
     */
    omit?: BreathingSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BreathingSessionInclude<ExtArgs> | null
    /**
     * Filter, which BreathingSession to fetch.
     */
    where?: BreathingSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BreathingSessions to fetch.
     */
    orderBy?: BreathingSessionOrderByWithRelationInput | BreathingSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BreathingSessions.
     */
    cursor?: BreathingSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BreathingSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BreathingSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BreathingSessions.
     */
    distinct?: BreathingSessionScalarFieldEnum | BreathingSessionScalarFieldEnum[]
  }

  /**
   * BreathingSession findFirstOrThrow
   */
  export type BreathingSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BreathingSession
     */
    select?: BreathingSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BreathingSession
     */
    omit?: BreathingSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BreathingSessionInclude<ExtArgs> | null
    /**
     * Filter, which BreathingSession to fetch.
     */
    where?: BreathingSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BreathingSessions to fetch.
     */
    orderBy?: BreathingSessionOrderByWithRelationInput | BreathingSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BreathingSessions.
     */
    cursor?: BreathingSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BreathingSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BreathingSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BreathingSessions.
     */
    distinct?: BreathingSessionScalarFieldEnum | BreathingSessionScalarFieldEnum[]
  }

  /**
   * BreathingSession findMany
   */
  export type BreathingSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BreathingSession
     */
    select?: BreathingSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BreathingSession
     */
    omit?: BreathingSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BreathingSessionInclude<ExtArgs> | null
    /**
     * Filter, which BreathingSessions to fetch.
     */
    where?: BreathingSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BreathingSessions to fetch.
     */
    orderBy?: BreathingSessionOrderByWithRelationInput | BreathingSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BreathingSessions.
     */
    cursor?: BreathingSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BreathingSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BreathingSessions.
     */
    skip?: number
    distinct?: BreathingSessionScalarFieldEnum | BreathingSessionScalarFieldEnum[]
  }

  /**
   * BreathingSession create
   */
  export type BreathingSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BreathingSession
     */
    select?: BreathingSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BreathingSession
     */
    omit?: BreathingSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BreathingSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a BreathingSession.
     */
    data: XOR<BreathingSessionCreateInput, BreathingSessionUncheckedCreateInput>
  }

  /**
   * BreathingSession createMany
   */
  export type BreathingSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BreathingSessions.
     */
    data: BreathingSessionCreateManyInput | BreathingSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BreathingSession createManyAndReturn
   */
  export type BreathingSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BreathingSession
     */
    select?: BreathingSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BreathingSession
     */
    omit?: BreathingSessionOmit<ExtArgs> | null
    /**
     * The data used to create many BreathingSessions.
     */
    data: BreathingSessionCreateManyInput | BreathingSessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BreathingSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BreathingSession update
   */
  export type BreathingSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BreathingSession
     */
    select?: BreathingSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BreathingSession
     */
    omit?: BreathingSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BreathingSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a BreathingSession.
     */
    data: XOR<BreathingSessionUpdateInput, BreathingSessionUncheckedUpdateInput>
    /**
     * Choose, which BreathingSession to update.
     */
    where: BreathingSessionWhereUniqueInput
  }

  /**
   * BreathingSession updateMany
   */
  export type BreathingSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BreathingSessions.
     */
    data: XOR<BreathingSessionUpdateManyMutationInput, BreathingSessionUncheckedUpdateManyInput>
    /**
     * Filter which BreathingSessions to update
     */
    where?: BreathingSessionWhereInput
  }

  /**
   * BreathingSession upsert
   */
  export type BreathingSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BreathingSession
     */
    select?: BreathingSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BreathingSession
     */
    omit?: BreathingSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BreathingSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the BreathingSession to update in case it exists.
     */
    where: BreathingSessionWhereUniqueInput
    /**
     * In case the BreathingSession found by the `where` argument doesn't exist, create a new BreathingSession with this data.
     */
    create: XOR<BreathingSessionCreateInput, BreathingSessionUncheckedCreateInput>
    /**
     * In case the BreathingSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BreathingSessionUpdateInput, BreathingSessionUncheckedUpdateInput>
  }

  /**
   * BreathingSession delete
   */
  export type BreathingSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BreathingSession
     */
    select?: BreathingSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BreathingSession
     */
    omit?: BreathingSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BreathingSessionInclude<ExtArgs> | null
    /**
     * Filter which BreathingSession to delete.
     */
    where: BreathingSessionWhereUniqueInput
  }

  /**
   * BreathingSession deleteMany
   */
  export type BreathingSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BreathingSessions to delete
     */
    where?: BreathingSessionWhereInput
  }

  /**
   * BreathingSession without action
   */
  export type BreathingSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BreathingSession
     */
    select?: BreathingSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BreathingSession
     */
    omit?: BreathingSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BreathingSessionInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    firstName: 'firstName',
    lastName: 'lastName',
    role: 'role',
    bio: 'bio',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const JournalEntryScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    mood: 'mood',
    tags: 'tags',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId'
  };

  export type JournalEntryScalarFieldEnum = (typeof JournalEntryScalarFieldEnum)[keyof typeof JournalEntryScalarFieldEnum]


  export const BreathingSessionScalarFieldEnum: {
    id: 'id',
    type: 'type',
    duration: 'duration',
    completed: 'completed',
    createdAt: 'createdAt',
    userId: 'userId'
  };

  export type BreathingSessionScalarFieldEnum = (typeof BreathingSessionScalarFieldEnum)[keyof typeof BreathingSessionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    bio?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    journalEntries?: JournalEntryListRelationFilter
    breathingSessions?: BreathingSessionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    role?: SortOrder
    bio?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    journalEntries?: JournalEntryOrderByRelationAggregateInput
    breathingSessions?: BreathingSessionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    bio?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    journalEntries?: JournalEntryListRelationFilter
    breathingSessions?: BreathingSessionListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    role?: SortOrder
    bio?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    firstName?: StringWithAggregatesFilter<"User"> | string
    lastName?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    bio?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type JournalEntryWhereInput = {
    AND?: JournalEntryWhereInput | JournalEntryWhereInput[]
    OR?: JournalEntryWhereInput[]
    NOT?: JournalEntryWhereInput | JournalEntryWhereInput[]
    id?: StringFilter<"JournalEntry"> | string
    title?: StringFilter<"JournalEntry"> | string
    content?: StringFilter<"JournalEntry"> | string
    mood?: StringNullableFilter<"JournalEntry"> | string | null
    tags?: StringNullableListFilter<"JournalEntry">
    createdAt?: DateTimeFilter<"JournalEntry"> | Date | string
    updatedAt?: DateTimeFilter<"JournalEntry"> | Date | string
    userId?: StringFilter<"JournalEntry"> | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type JournalEntryOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    mood?: SortOrderInput | SortOrder
    tags?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type JournalEntryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: JournalEntryWhereInput | JournalEntryWhereInput[]
    OR?: JournalEntryWhereInput[]
    NOT?: JournalEntryWhereInput | JournalEntryWhereInput[]
    title?: StringFilter<"JournalEntry"> | string
    content?: StringFilter<"JournalEntry"> | string
    mood?: StringNullableFilter<"JournalEntry"> | string | null
    tags?: StringNullableListFilter<"JournalEntry">
    createdAt?: DateTimeFilter<"JournalEntry"> | Date | string
    updatedAt?: DateTimeFilter<"JournalEntry"> | Date | string
    userId?: StringFilter<"JournalEntry"> | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type JournalEntryOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    mood?: SortOrderInput | SortOrder
    tags?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    _count?: JournalEntryCountOrderByAggregateInput
    _max?: JournalEntryMaxOrderByAggregateInput
    _min?: JournalEntryMinOrderByAggregateInput
  }

  export type JournalEntryScalarWhereWithAggregatesInput = {
    AND?: JournalEntryScalarWhereWithAggregatesInput | JournalEntryScalarWhereWithAggregatesInput[]
    OR?: JournalEntryScalarWhereWithAggregatesInput[]
    NOT?: JournalEntryScalarWhereWithAggregatesInput | JournalEntryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"JournalEntry"> | string
    title?: StringWithAggregatesFilter<"JournalEntry"> | string
    content?: StringWithAggregatesFilter<"JournalEntry"> | string
    mood?: StringNullableWithAggregatesFilter<"JournalEntry"> | string | null
    tags?: StringNullableListFilter<"JournalEntry">
    createdAt?: DateTimeWithAggregatesFilter<"JournalEntry"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"JournalEntry"> | Date | string
    userId?: StringWithAggregatesFilter<"JournalEntry"> | string
  }

  export type BreathingSessionWhereInput = {
    AND?: BreathingSessionWhereInput | BreathingSessionWhereInput[]
    OR?: BreathingSessionWhereInput[]
    NOT?: BreathingSessionWhereInput | BreathingSessionWhereInput[]
    id?: StringFilter<"BreathingSession"> | string
    type?: StringFilter<"BreathingSession"> | string
    duration?: IntFilter<"BreathingSession"> | number
    completed?: BoolFilter<"BreathingSession"> | boolean
    createdAt?: DateTimeFilter<"BreathingSession"> | Date | string
    userId?: StringFilter<"BreathingSession"> | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type BreathingSessionOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    duration?: SortOrder
    completed?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type BreathingSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BreathingSessionWhereInput | BreathingSessionWhereInput[]
    OR?: BreathingSessionWhereInput[]
    NOT?: BreathingSessionWhereInput | BreathingSessionWhereInput[]
    type?: StringFilter<"BreathingSession"> | string
    duration?: IntFilter<"BreathingSession"> | number
    completed?: BoolFilter<"BreathingSession"> | boolean
    createdAt?: DateTimeFilter<"BreathingSession"> | Date | string
    userId?: StringFilter<"BreathingSession"> | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type BreathingSessionOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    duration?: SortOrder
    completed?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    _count?: BreathingSessionCountOrderByAggregateInput
    _avg?: BreathingSessionAvgOrderByAggregateInput
    _max?: BreathingSessionMaxOrderByAggregateInput
    _min?: BreathingSessionMinOrderByAggregateInput
    _sum?: BreathingSessionSumOrderByAggregateInput
  }

  export type BreathingSessionScalarWhereWithAggregatesInput = {
    AND?: BreathingSessionScalarWhereWithAggregatesInput | BreathingSessionScalarWhereWithAggregatesInput[]
    OR?: BreathingSessionScalarWhereWithAggregatesInput[]
    NOT?: BreathingSessionScalarWhereWithAggregatesInput | BreathingSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BreathingSession"> | string
    type?: StringWithAggregatesFilter<"BreathingSession"> | string
    duration?: IntWithAggregatesFilter<"BreathingSession"> | number
    completed?: BoolWithAggregatesFilter<"BreathingSession"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"BreathingSession"> | Date | string
    userId?: StringWithAggregatesFilter<"BreathingSession"> | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    role?: string
    bio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    journalEntries?: JournalEntryCreateNestedManyWithoutUserInput
    breathingSessions?: BreathingSessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    role?: string
    bio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    journalEntries?: JournalEntryUncheckedCreateNestedManyWithoutUserInput
    breathingSessions?: BreathingSessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    journalEntries?: JournalEntryUpdateManyWithoutUserNestedInput
    breathingSessions?: BreathingSessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    journalEntries?: JournalEntryUncheckedUpdateManyWithoutUserNestedInput
    breathingSessions?: BreathingSessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    role?: string
    bio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JournalEntryCreateInput = {
    id?: string
    title: string
    content: string
    mood?: string | null
    tags?: JournalEntryCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutJournalEntriesInput
  }

  export type JournalEntryUncheckedCreateInput = {
    id?: string
    title: string
    content: string
    mood?: string | null
    tags?: JournalEntryCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type JournalEntryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    mood?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: JournalEntryUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutJournalEntriesNestedInput
  }

  export type JournalEntryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    mood?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: JournalEntryUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type JournalEntryCreateManyInput = {
    id?: string
    title: string
    content: string
    mood?: string | null
    tags?: JournalEntryCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type JournalEntryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    mood?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: JournalEntryUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JournalEntryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    mood?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: JournalEntryUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type BreathingSessionCreateInput = {
    id?: string
    type: string
    duration: number
    completed?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutBreathingSessionsInput
  }

  export type BreathingSessionUncheckedCreateInput = {
    id?: string
    type: string
    duration: number
    completed?: boolean
    createdAt?: Date | string
    userId: string
  }

  export type BreathingSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBreathingSessionsNestedInput
  }

  export type BreathingSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type BreathingSessionCreateManyInput = {
    id?: string
    type: string
    duration: number
    completed?: boolean
    createdAt?: Date | string
    userId: string
  }

  export type BreathingSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BreathingSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type JournalEntryListRelationFilter = {
    every?: JournalEntryWhereInput
    some?: JournalEntryWhereInput
    none?: JournalEntryWhereInput
  }

  export type BreathingSessionListRelationFilter = {
    every?: BreathingSessionWhereInput
    some?: BreathingSessionWhereInput
    none?: BreathingSessionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type JournalEntryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BreathingSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    role?: SortOrder
    bio?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    role?: SortOrder
    bio?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    role?: SortOrder
    bio?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type JournalEntryCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    mood?: SortOrder
    tags?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type JournalEntryMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    mood?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type JournalEntryMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    mood?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type BreathingSessionCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    duration?: SortOrder
    completed?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type BreathingSessionAvgOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type BreathingSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    duration?: SortOrder
    completed?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type BreathingSessionMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    duration?: SortOrder
    completed?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type BreathingSessionSumOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type JournalEntryCreateNestedManyWithoutUserInput = {
    create?: XOR<JournalEntryCreateWithoutUserInput, JournalEntryUncheckedCreateWithoutUserInput> | JournalEntryCreateWithoutUserInput[] | JournalEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: JournalEntryCreateOrConnectWithoutUserInput | JournalEntryCreateOrConnectWithoutUserInput[]
    createMany?: JournalEntryCreateManyUserInputEnvelope
    connect?: JournalEntryWhereUniqueInput | JournalEntryWhereUniqueInput[]
  }

  export type BreathingSessionCreateNestedManyWithoutUserInput = {
    create?: XOR<BreathingSessionCreateWithoutUserInput, BreathingSessionUncheckedCreateWithoutUserInput> | BreathingSessionCreateWithoutUserInput[] | BreathingSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BreathingSessionCreateOrConnectWithoutUserInput | BreathingSessionCreateOrConnectWithoutUserInput[]
    createMany?: BreathingSessionCreateManyUserInputEnvelope
    connect?: BreathingSessionWhereUniqueInput | BreathingSessionWhereUniqueInput[]
  }

  export type JournalEntryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<JournalEntryCreateWithoutUserInput, JournalEntryUncheckedCreateWithoutUserInput> | JournalEntryCreateWithoutUserInput[] | JournalEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: JournalEntryCreateOrConnectWithoutUserInput | JournalEntryCreateOrConnectWithoutUserInput[]
    createMany?: JournalEntryCreateManyUserInputEnvelope
    connect?: JournalEntryWhereUniqueInput | JournalEntryWhereUniqueInput[]
  }

  export type BreathingSessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<BreathingSessionCreateWithoutUserInput, BreathingSessionUncheckedCreateWithoutUserInput> | BreathingSessionCreateWithoutUserInput[] | BreathingSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BreathingSessionCreateOrConnectWithoutUserInput | BreathingSessionCreateOrConnectWithoutUserInput[]
    createMany?: BreathingSessionCreateManyUserInputEnvelope
    connect?: BreathingSessionWhereUniqueInput | BreathingSessionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type JournalEntryUpdateManyWithoutUserNestedInput = {
    create?: XOR<JournalEntryCreateWithoutUserInput, JournalEntryUncheckedCreateWithoutUserInput> | JournalEntryCreateWithoutUserInput[] | JournalEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: JournalEntryCreateOrConnectWithoutUserInput | JournalEntryCreateOrConnectWithoutUserInput[]
    upsert?: JournalEntryUpsertWithWhereUniqueWithoutUserInput | JournalEntryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: JournalEntryCreateManyUserInputEnvelope
    set?: JournalEntryWhereUniqueInput | JournalEntryWhereUniqueInput[]
    disconnect?: JournalEntryWhereUniqueInput | JournalEntryWhereUniqueInput[]
    delete?: JournalEntryWhereUniqueInput | JournalEntryWhereUniqueInput[]
    connect?: JournalEntryWhereUniqueInput | JournalEntryWhereUniqueInput[]
    update?: JournalEntryUpdateWithWhereUniqueWithoutUserInput | JournalEntryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: JournalEntryUpdateManyWithWhereWithoutUserInput | JournalEntryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: JournalEntryScalarWhereInput | JournalEntryScalarWhereInput[]
  }

  export type BreathingSessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<BreathingSessionCreateWithoutUserInput, BreathingSessionUncheckedCreateWithoutUserInput> | BreathingSessionCreateWithoutUserInput[] | BreathingSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BreathingSessionCreateOrConnectWithoutUserInput | BreathingSessionCreateOrConnectWithoutUserInput[]
    upsert?: BreathingSessionUpsertWithWhereUniqueWithoutUserInput | BreathingSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BreathingSessionCreateManyUserInputEnvelope
    set?: BreathingSessionWhereUniqueInput | BreathingSessionWhereUniqueInput[]
    disconnect?: BreathingSessionWhereUniqueInput | BreathingSessionWhereUniqueInput[]
    delete?: BreathingSessionWhereUniqueInput | BreathingSessionWhereUniqueInput[]
    connect?: BreathingSessionWhereUniqueInput | BreathingSessionWhereUniqueInput[]
    update?: BreathingSessionUpdateWithWhereUniqueWithoutUserInput | BreathingSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BreathingSessionUpdateManyWithWhereWithoutUserInput | BreathingSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BreathingSessionScalarWhereInput | BreathingSessionScalarWhereInput[]
  }

  export type JournalEntryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<JournalEntryCreateWithoutUserInput, JournalEntryUncheckedCreateWithoutUserInput> | JournalEntryCreateWithoutUserInput[] | JournalEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: JournalEntryCreateOrConnectWithoutUserInput | JournalEntryCreateOrConnectWithoutUserInput[]
    upsert?: JournalEntryUpsertWithWhereUniqueWithoutUserInput | JournalEntryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: JournalEntryCreateManyUserInputEnvelope
    set?: JournalEntryWhereUniqueInput | JournalEntryWhereUniqueInput[]
    disconnect?: JournalEntryWhereUniqueInput | JournalEntryWhereUniqueInput[]
    delete?: JournalEntryWhereUniqueInput | JournalEntryWhereUniqueInput[]
    connect?: JournalEntryWhereUniqueInput | JournalEntryWhereUniqueInput[]
    update?: JournalEntryUpdateWithWhereUniqueWithoutUserInput | JournalEntryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: JournalEntryUpdateManyWithWhereWithoutUserInput | JournalEntryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: JournalEntryScalarWhereInput | JournalEntryScalarWhereInput[]
  }

  export type BreathingSessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<BreathingSessionCreateWithoutUserInput, BreathingSessionUncheckedCreateWithoutUserInput> | BreathingSessionCreateWithoutUserInput[] | BreathingSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BreathingSessionCreateOrConnectWithoutUserInput | BreathingSessionCreateOrConnectWithoutUserInput[]
    upsert?: BreathingSessionUpsertWithWhereUniqueWithoutUserInput | BreathingSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BreathingSessionCreateManyUserInputEnvelope
    set?: BreathingSessionWhereUniqueInput | BreathingSessionWhereUniqueInput[]
    disconnect?: BreathingSessionWhereUniqueInput | BreathingSessionWhereUniqueInput[]
    delete?: BreathingSessionWhereUniqueInput | BreathingSessionWhereUniqueInput[]
    connect?: BreathingSessionWhereUniqueInput | BreathingSessionWhereUniqueInput[]
    update?: BreathingSessionUpdateWithWhereUniqueWithoutUserInput | BreathingSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BreathingSessionUpdateManyWithWhereWithoutUserInput | BreathingSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BreathingSessionScalarWhereInput | BreathingSessionScalarWhereInput[]
  }

  export type JournalEntryCreatetagsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutJournalEntriesInput = {
    create?: XOR<UserCreateWithoutJournalEntriesInput, UserUncheckedCreateWithoutJournalEntriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutJournalEntriesInput
    connect?: UserWhereUniqueInput
  }

  export type JournalEntryUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneRequiredWithoutJournalEntriesNestedInput = {
    create?: XOR<UserCreateWithoutJournalEntriesInput, UserUncheckedCreateWithoutJournalEntriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutJournalEntriesInput
    upsert?: UserUpsertWithoutJournalEntriesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutJournalEntriesInput, UserUpdateWithoutJournalEntriesInput>, UserUncheckedUpdateWithoutJournalEntriesInput>
  }

  export type UserCreateNestedOneWithoutBreathingSessionsInput = {
    create?: XOR<UserCreateWithoutBreathingSessionsInput, UserUncheckedCreateWithoutBreathingSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBreathingSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutBreathingSessionsNestedInput = {
    create?: XOR<UserCreateWithoutBreathingSessionsInput, UserUncheckedCreateWithoutBreathingSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBreathingSessionsInput
    upsert?: UserUpsertWithoutBreathingSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBreathingSessionsInput, UserUpdateWithoutBreathingSessionsInput>, UserUncheckedUpdateWithoutBreathingSessionsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type JournalEntryCreateWithoutUserInput = {
    id?: string
    title: string
    content: string
    mood?: string | null
    tags?: JournalEntryCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JournalEntryUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    content: string
    mood?: string | null
    tags?: JournalEntryCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JournalEntryCreateOrConnectWithoutUserInput = {
    where: JournalEntryWhereUniqueInput
    create: XOR<JournalEntryCreateWithoutUserInput, JournalEntryUncheckedCreateWithoutUserInput>
  }

  export type JournalEntryCreateManyUserInputEnvelope = {
    data: JournalEntryCreateManyUserInput | JournalEntryCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type BreathingSessionCreateWithoutUserInput = {
    id?: string
    type: string
    duration: number
    completed?: boolean
    createdAt?: Date | string
  }

  export type BreathingSessionUncheckedCreateWithoutUserInput = {
    id?: string
    type: string
    duration: number
    completed?: boolean
    createdAt?: Date | string
  }

  export type BreathingSessionCreateOrConnectWithoutUserInput = {
    where: BreathingSessionWhereUniqueInput
    create: XOR<BreathingSessionCreateWithoutUserInput, BreathingSessionUncheckedCreateWithoutUserInput>
  }

  export type BreathingSessionCreateManyUserInputEnvelope = {
    data: BreathingSessionCreateManyUserInput | BreathingSessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type JournalEntryUpsertWithWhereUniqueWithoutUserInput = {
    where: JournalEntryWhereUniqueInput
    update: XOR<JournalEntryUpdateWithoutUserInput, JournalEntryUncheckedUpdateWithoutUserInput>
    create: XOR<JournalEntryCreateWithoutUserInput, JournalEntryUncheckedCreateWithoutUserInput>
  }

  export type JournalEntryUpdateWithWhereUniqueWithoutUserInput = {
    where: JournalEntryWhereUniqueInput
    data: XOR<JournalEntryUpdateWithoutUserInput, JournalEntryUncheckedUpdateWithoutUserInput>
  }

  export type JournalEntryUpdateManyWithWhereWithoutUserInput = {
    where: JournalEntryScalarWhereInput
    data: XOR<JournalEntryUpdateManyMutationInput, JournalEntryUncheckedUpdateManyWithoutUserInput>
  }

  export type JournalEntryScalarWhereInput = {
    AND?: JournalEntryScalarWhereInput | JournalEntryScalarWhereInput[]
    OR?: JournalEntryScalarWhereInput[]
    NOT?: JournalEntryScalarWhereInput | JournalEntryScalarWhereInput[]
    id?: StringFilter<"JournalEntry"> | string
    title?: StringFilter<"JournalEntry"> | string
    content?: StringFilter<"JournalEntry"> | string
    mood?: StringNullableFilter<"JournalEntry"> | string | null
    tags?: StringNullableListFilter<"JournalEntry">
    createdAt?: DateTimeFilter<"JournalEntry"> | Date | string
    updatedAt?: DateTimeFilter<"JournalEntry"> | Date | string
    userId?: StringFilter<"JournalEntry"> | string
  }

  export type BreathingSessionUpsertWithWhereUniqueWithoutUserInput = {
    where: BreathingSessionWhereUniqueInput
    update: XOR<BreathingSessionUpdateWithoutUserInput, BreathingSessionUncheckedUpdateWithoutUserInput>
    create: XOR<BreathingSessionCreateWithoutUserInput, BreathingSessionUncheckedCreateWithoutUserInput>
  }

  export type BreathingSessionUpdateWithWhereUniqueWithoutUserInput = {
    where: BreathingSessionWhereUniqueInput
    data: XOR<BreathingSessionUpdateWithoutUserInput, BreathingSessionUncheckedUpdateWithoutUserInput>
  }

  export type BreathingSessionUpdateManyWithWhereWithoutUserInput = {
    where: BreathingSessionScalarWhereInput
    data: XOR<BreathingSessionUpdateManyMutationInput, BreathingSessionUncheckedUpdateManyWithoutUserInput>
  }

  export type BreathingSessionScalarWhereInput = {
    AND?: BreathingSessionScalarWhereInput | BreathingSessionScalarWhereInput[]
    OR?: BreathingSessionScalarWhereInput[]
    NOT?: BreathingSessionScalarWhereInput | BreathingSessionScalarWhereInput[]
    id?: StringFilter<"BreathingSession"> | string
    type?: StringFilter<"BreathingSession"> | string
    duration?: IntFilter<"BreathingSession"> | number
    completed?: BoolFilter<"BreathingSession"> | boolean
    createdAt?: DateTimeFilter<"BreathingSession"> | Date | string
    userId?: StringFilter<"BreathingSession"> | string
  }

  export type UserCreateWithoutJournalEntriesInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    role?: string
    bio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    breathingSessions?: BreathingSessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutJournalEntriesInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    role?: string
    bio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    breathingSessions?: BreathingSessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutJournalEntriesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutJournalEntriesInput, UserUncheckedCreateWithoutJournalEntriesInput>
  }

  export type UserUpsertWithoutJournalEntriesInput = {
    update: XOR<UserUpdateWithoutJournalEntriesInput, UserUncheckedUpdateWithoutJournalEntriesInput>
    create: XOR<UserCreateWithoutJournalEntriesInput, UserUncheckedCreateWithoutJournalEntriesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutJournalEntriesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutJournalEntriesInput, UserUncheckedUpdateWithoutJournalEntriesInput>
  }

  export type UserUpdateWithoutJournalEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    breathingSessions?: BreathingSessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutJournalEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    breathingSessions?: BreathingSessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutBreathingSessionsInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    role?: string
    bio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    journalEntries?: JournalEntryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBreathingSessionsInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    role?: string
    bio?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    journalEntries?: JournalEntryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBreathingSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBreathingSessionsInput, UserUncheckedCreateWithoutBreathingSessionsInput>
  }

  export type UserUpsertWithoutBreathingSessionsInput = {
    update: XOR<UserUpdateWithoutBreathingSessionsInput, UserUncheckedUpdateWithoutBreathingSessionsInput>
    create: XOR<UserCreateWithoutBreathingSessionsInput, UserUncheckedCreateWithoutBreathingSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBreathingSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBreathingSessionsInput, UserUncheckedUpdateWithoutBreathingSessionsInput>
  }

  export type UserUpdateWithoutBreathingSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    journalEntries?: JournalEntryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBreathingSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    journalEntries?: JournalEntryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type JournalEntryCreateManyUserInput = {
    id?: string
    title: string
    content: string
    mood?: string | null
    tags?: JournalEntryCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BreathingSessionCreateManyUserInput = {
    id?: string
    type: string
    duration: number
    completed?: boolean
    createdAt?: Date | string
  }

  export type JournalEntryUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    mood?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: JournalEntryUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JournalEntryUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    mood?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: JournalEntryUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JournalEntryUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    mood?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: JournalEntryUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BreathingSessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BreathingSessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BreathingSessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}