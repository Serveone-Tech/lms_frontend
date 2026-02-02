import { useSessionContext } from '@/components/auth/AuthProvider/SessionContext'
import { useContext } from 'react'


const useCurrentSession = () => {
    const context = useContext(useSessionContext)

    return {
        session: context || {
            expires: '',
            user: {},
        },
    }
}

export default useCurrentSession
