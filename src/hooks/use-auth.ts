import { useCallback, useEffect, useState } from 'react';
import {
  useRegularSignUpMutation,
  useRegularLoginMutation,
  useVerifyOtpMutation,
} from 'enterprise_data/AuthApi';
import { auth$, authActions } from 'enterprise_data/Auth';

import { useNavigate } from 'react-router-dom';
import {
  RegularLoginPayload,
  RegularSignUpPayload,
  User,
  VerifyOtpPayload,
} from '../types/auth';
import { Brand } from '../types/brand';
import { AppPaths } from '../types/app-path';

export function useAuth() {
  const navigate = useNavigate();
  const [regularSignUp, regularSignUpState] = useRegularSignUpMutation();
  const [regularLogin, regularLoginState] = useRegularLoginMutation();
  const [verifyOtpFn, verifyOtpState] = useVerifyOtpMutation();
  // Local state for auth
  const [authState, setAuthState] = useState<{
    user: User;
    token: string;
  } | null>(() => {
    let value: { user: User; token: string } | null = null;
    auth$.subscribe((v: any) => (value = v)).unsubscribe();
    return value;
  });

  // Subscribe to auth$ updates
  useEffect(() => {
    const subscription = auth$.subscribe(setAuthState);
    return () => subscription.unsubscribe();
  }, []);

  const signUp = useCallback(
    async (payload: RegularSignUpPayload) => {
      try {
        const result = await regularSignUp(payload).unwrap();
        return result;
      } catch (error) {
        throw error;
      }
    },
    [regularSignUp, navigate],
  );

  const login = useCallback(
    async (payload: RegularLoginPayload) => {
      try {
        const result = await regularLogin(payload).unwrap();
        return result;
      } catch (error) {
        throw error;
      }
    },
    [regularLogin],
  );

  const verifyOtp = useCallback(
    async (payload: VerifyOtpPayload) => {
      try {
        const result = await verifyOtpFn(payload).unwrap();
        authActions.login({ user: result.user, token: result.token });
      } catch (error) {
        throw error;
      }
    },
    [verifyOtpFn],
  );

  const signOut: (brand: Brand) => void = useCallback(
    (brand: Brand) => {
      authActions.logout();

      if (brand?.slug.toLowerCase() === 'default') {
        navigate(AppPaths.LOGIN);
        return;
      }
      const slug = brand?.slug;
      navigate(
        {
          pathname: AppPaths.LOGIN,
          search: slug ? `?slug=${encodeURIComponent(slug)}` : '',
        },
        { state: null },
      );
    },
    [navigate],
  );

  return {
    signUp,
    login,
    verifyOtp,
    signOut,
    authState,
    user: authState?.user as User,
    token: authState?.token,
    isLoadingRegularSignUp: regularSignUpState.isLoading,
    isLoadingRegularLogin: regularLoginState.isLoading,
    isLoadingVerifyOtp: verifyOtpState.isLoading,
  };
}
