import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase-config';

export const AuthContext = React.createContext({ status: 'pending' })

export const AuthProvider = ({ children }) => {
	const navigate = useNavigate();
	const [authState, setAuthState] = useState({ status: 'pending' });

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user !== null) {
				setAuthState({ status: 'fetched' })
			} else {
				await auth.signOut();
				navigate('/login');
			}
		})

		return () => unsubscribe();
	}, [navigate])

	return (
		<AuthContext.Provider value={authState}>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuthState() {
	return useContext(AuthContext);
}
