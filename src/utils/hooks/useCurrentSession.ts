import { useSessionContext } from '@/components/auth/AuthProvider/SessionContext'

const useCurrentSession = () => {
    const { session, loading, refreshSession, clearSession } =
        useSessionContext()

    return {
        session,
        loading,
        refreshSession,
        clearSession,
    }
}

export default useCurrentSession
