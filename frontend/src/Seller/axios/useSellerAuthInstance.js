import axios from 'axios';
import { useMemo } from 'react';

export default function useSellerAuthInstance() {
    const sellerAuthInstance = useMemo(
        () =>
            axios.create({
                baseURL: import.meta.env.VITE_SERVER + 'seller/auth/',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        []
    );

    return [sellerAuthInstance];
}
