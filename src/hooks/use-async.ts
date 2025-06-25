import React from 'react'

export function useAsync<TArgs extends any[], TResult>(
    fn: (...args: TArgs) => Promise<TResult>
) {
    const [isLoading, setLoading] = React.useState(false)
    const [error, setError] = React.useState<Error | null>(null)
    const [result, setResult] = React.useState<TResult | null>(null)

    const trigger = React.useCallback(async (...args: TArgs): Promise<TResult> => {
        setLoading(true)
        setResult(null)
        setError(null)
        try {
            const res = await fn(...args)
            setResult(res)
            return res
        } catch (err) {
            const e = err as Error
            setError(e);
            throw e;
        } finally {
            setLoading(false)
        }
    }, [fn])
    return { trigger, isLoading, error, result };
}
