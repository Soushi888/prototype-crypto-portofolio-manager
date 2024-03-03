import CoinGeckoApiService from '@services/api-services/CoinGeckoApiService';
import type { PageLoad } from './$types';
import { coinDataLocalStorageStore, coinsListLocalStorageStore } from '@stores/coins.store';
import { get } from 'svelte/store';

export const load: PageLoad = async ({ params, fetch }) => {};