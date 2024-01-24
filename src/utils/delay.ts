export const delay = (ms: number) => {
    return new Promise((res) => {
        const timer = setTimeout(() => {
            res(1)
            clearTimeout(timer)
        }, ms)
    })
}