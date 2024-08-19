const createContext = (defaultValue) => {
    // 上下文对象
    const context = {
        // 提供
        Provider: ({ value, children }) => {
            context._value = value
            return children
        },
        Consumer: ({ children }) => {
            return children(context._value)
        }
        // 读取
    }
    return context
}