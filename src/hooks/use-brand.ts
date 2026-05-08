import { useCallback, useEffect, useState } from 'react';

import { brand$, getCurrentBrand, setBrand } from 'enterprise_data/Brand';
import {
  useLazyGetBrandByIdQuery,
  useLazyGetBrandBySlugQuery,
} from 'enterprise_data/BrandApi';

import { Brand } from '../types/brand';
import { useAuth } from './use-auth';
import { resolveBrandSlugFromUrl } from '../utils/resolveBrandSlugFromUrl';

export const useBrand = () => {
  const { user } = useAuth();

  const [fetchBrandByTenantId] = useLazyGetBrandByIdQuery();
  const [fetchBrandBySlug] = useLazyGetBrandBySlugQuery();

  const [brand, setBrandState] = useState<Brand | null>(() =>
    getCurrentBrand(),
  );

  useEffect(() => {
    const subscription = brand$.subscribe((nextBrand: Brand | null) => {
      setBrandState(nextBrand);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const previewBrand = useCallback((modifiedBrand: Brand) => {
    setBrand(modifiedBrand);
  }, []);

  const refreshBrand = useCallback(async () => {
    try {
      if (user?.tenantId) {
        const response = await fetchBrandByTenantId(user.tenantId).unwrap();

        const brandData = 'data' in response ? response.data : response;

        setBrand(brandData);

        return brandData;
      }

      const slug = resolveBrandSlugFromUrl() || 'default';

      const response = await fetchBrandBySlug(slug).unwrap();

      const brandData = 'data' in response ? response.data : response;

      setBrand(brandData);

      return brandData;
    } catch (error) {
      console.error('Error fetching brand config:', error);
      return null;
    }
  }, [fetchBrandByTenantId, fetchBrandBySlug, user?.tenantId]);

  return {
    brand,
    previewBrand,
    refreshBrand,
  };
};
