"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import OrderSuccessPage from './OrderSuccessPage';
import orderService from '../services/orderService';

const OrderByIdPage = () => {
  const router = useRouter();
  const { orderId } = router.query || {};
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!orderId) return;
    setLoading(true);
    setError(null);

    orderService
      .getOrderById(orderId)
      .then((res) => {
        setOrder(res?.data || res);
      })
      .catch((err) => {
        console.error('Failed to fetch order', err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [orderId]);

  if (!orderId) return <div className="max-w-md mx-auto p-6">Invalid order</div>;
  if (loading) return <div className="max-w-md mx-auto p-6">Loading order...</div>;
  if (error) return <div className="max-w-md mx-auto p-6 text-red-600">Failed to load order</div>;

  return <OrderSuccessPage orderDetails={order} />;
};

export default OrderByIdPage;
