
type Nullable<V> = V | null | undefined;

// 获取map的value类型
type MapValueType<M> = M extends Map<any, infer V> ? V : never;