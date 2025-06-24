import React from "react"

type AsyncFn<TArgs extends any[], TResult> = (...args: TArgs) => Promise<TResult>

export function useAsync<TArgs extends any[], TResult>(
    fn: AsyncFn<TArgs, TResult>
) {
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState<Error | null>(null)

    const trigger = async (...args: TArgs): Promise<TResult | undefined> => {
        setIsLoading(true)
        setError(null)
        try {
            const result = await fn(...args)
            setIsLoading(false)
            return result
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Unknown error'))
            setIsLoading(false)
        }
    }

    return { trigger, isLoading, error }
}

export function useAsyncLoad<TResult>(fn: () => Promise<TResult>) {
    const { trigger, isLoading, error } = useAsync<[], TResult>(fn)
    React.useEffect(() => {
        trigger()
    }, [])
    return { isLoading, error }
}
