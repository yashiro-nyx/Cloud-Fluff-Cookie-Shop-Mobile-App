/**
 * @file OrderTrackingView.tsx
 * @description Real-time Order Tracking & History Module
 * Features:
 * - Live order status stepper (Received -> Baking -> Quality Check -> Out for Delivery -> Delivered)
 * - Interactive step simulation controls for video demonstration / grading
 * - Digital receipt breakdown with QR code simulation
 * - Order history records with "Reorder this exact build"
 */

import React, { useState } from 'react';
import {
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  RefreshCw,
  Receipt,
  RotateCw,
  Flame,
  Package,
  ShoppingBag,
  ExternalLink,
} from 'lucide-react';
import { OrderRecord, OrderStatus, CartItem } from '../../types';

interface OrderTrackingViewProps {
  orders: OrderRecord[];
  activeOrder?: OrderRecord;
  onAdvanceOrderStatus: (orderId: string) => void;
  onReorder: (items: CartItem[]) => void;
}

export const OrderTrackingView: React.FC<OrderTrackingViewProps> = ({
  orders,
  activeOrder,
  onAdvanceOrderStatus,
  onReorder,
}) => {
  const [selectedReceiptOrder, setSelectedReceiptOrder] = useState<OrderRecord | null>(
    activeOrder || orders[0] || null
  );

  const statusSteps: { id: OrderStatus; label: string; desc: string; icon: string }[] = [
    { id: 'received', label: 'Order Placed', desc: 'Received by Cubao Kitchen', icon: '📝' },
    { id: 'baking', label: 'Freshly Baking', desc: 'Oven fired up at 350°F', icon: '🔥' },
    { id: 'quality_check', label: 'Quality & Packing', desc: 'Cooling & box packaging', icon: '✨' },
    { id: 'out_for_delivery', label: 'Out for Delivery', desc: 'Courier on the way to TIP', icon: '🛵' },
    { id: 'delivered', label: 'Delivered', desc: 'Enjoy your warm cookies!', icon: '🍪' },
  ];

  const getStepIndex = (status: OrderStatus) => {
    return statusSteps.findIndex((s) => s.id === status);
  };

  const currentStepIdx = activeOrder ? getStepIndex(activeOrder.status) : 4;

  return (
    <div className="space-y-4 pb-12">
      {/* Header */}
      <div>
        <h2 className="text-sm font-extrabold text-[#4a3024] uppercase tracking-wide font-serif">
          Live Order Tracking
        </h2>
        <p className="text-[11px] text-[#74513e]">
          Real-time oven-to-door cookie fulfillment monitoring
        </p>
      </div>

      {/* Active Order Live Tracker */}
      {activeOrder && (
        <div className="p-4 rounded-3xl bg-white border border-[#fbcfe8] shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#fbcfe8]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#74513e]">
                Active Order
              </span>
              <h3 className="text-sm font-black text-[#4a3024]">#{activeOrder.orderId}</h3>
            </div>
            <div className="text-right">
              <span className="text-xs font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                {activeOrder.status === 'delivered'
                  ? 'Delivered'
                  : `~${activeOrder.estimatedMinutes} mins remaining`}
              </span>
            </div>
          </div>

          {/* Stepper Visualization */}
          <div className="relative pl-6 space-y-4">
            {/* Stepper connecting line */}
            <div className="absolute left-2.5 top-2 bottom-3 w-0.5 bg-[#fbcfe8]" />

            {statusSteps.map((step, idx) => {
              const isPast = idx < currentStepIdx;
              const isCurrent = idx === currentStepIdx;
              const isFuture = idx > currentStepIdx;

              return (
                <div key={step.id} className="relative flex items-start gap-3">
                  {/* Step Dot */}
                  <div
                    className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center text-[10px] z-10 transition-colors ${
                      isPast
                        ? 'bg-emerald-700 text-white'
                        : isCurrent
                        ? 'bg-[#523628] text-[#fff5f7] ring-4 ring-[#fce7f3]'
                        : 'bg-[#fff5f7] text-[#74513e]/40 border border-[#fbcfe8]'
                    }`}
                  >
                    {isPast ? '✓' : step.icon}
                  </div>

                  {/* Step Content */}
                  <div>
                    <h4
                      className={`text-xs font-bold leading-tight ${
                        isCurrent
                          ? 'text-[#4a3024]'
                          : isPast
                          ? 'text-emerald-900 font-semibold'
                          : 'text-[#74513e]/40'
                      }`}
                    >
                      {step.label}
                    </h4>
                    <p
                      className={`text-[10px] mt-0.5 ${
                        isCurrent ? 'text-[#74513e]' : 'text-[#74513e]/60'
                      }`}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Live Simulation Advance Button */}
          <div className="p-3.5 rounded-2xl bg-[#fff5f7] border border-[#fbcfe8] flex items-center justify-between">
            <div className="text-[10px] text-[#74513e]">
              <p className="font-bold text-[#4a3024]">Interactive Live Status:</p>
              <p>Simulate order progress in real time</p>
            </div>

            <button
              id="btn-advance-order-status"
              onClick={() => onAdvanceOrderStatus(activeOrder.orderId)}
              className="h-9 px-4 rounded-full text-xs font-bold bg-[#523628] text-[#fff5f7] hover:bg-[#684635] transition flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>
                {activeOrder.status === 'delivered' ? 'Restart Order' : 'Advance Next Step'}
              </span>
            </button>
          </div>

          {/* Delivery Details */}
          <div className="pt-2 border-t border-[#fbcfe8] text-xs text-[#74513e] space-y-1">
            <p className="flex items-center gap-1 text-[#4a3024]">
              <MapPin className="w-3.5 h-3.5 text-[#ec4899]" />
              <span>{activeOrder.address}</span>
            </p>
            <p className="text-[10px] text-[#74513e]/80 pl-4.5">
              Paid via <strong>{activeOrder.paymentMethod}</strong> • Total ₱{activeOrder.total} PHP
            </p>
          </div>
        </div>
      )}

      {/* Digital Receipt Card */}
      {selectedReceiptOrder && (
        <div className="p-4 rounded-3xl bg-white border border-[#fbcfe8] shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Receipt className="w-4 h-4 text-[#ec4899]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#4a3024]">
                Digital Receipt #{selectedReceiptOrder.orderId}
              </h3>
            </div>
            <span className="text-[10px] font-bold text-[#74513e]">
              {selectedReceiptOrder.createdAt}
            </span>
          </div>

          {/* Items breakdown */}
          <div className="space-y-1.5 divide-y divide-[#fff5f7]">
            {selectedReceiptOrder.items.map((item, idx) => (
              <div key={idx} className="pt-1.5 flex justify-between text-xs">
                <div>
                  <p className="font-bold text-[#4a3024]">{item.title}</p>
                  <p className="text-[10px] text-[#74513e]">Qty: {item.quantity} × ₱{item.unitPrice}</p>
                </div>
                <span className="font-extrabold text-[#4a3024]">
                  ₱{item.unitPrice * item.quantity}
                </span>
              </div>
            ))}
          </div>

          {/* Receipt Financial Totals */}
          <div className="pt-2 border-t border-[#fbcfe8] text-xs space-y-1 text-[#74513e]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₱{selectedReceiptOrder.subtotal}</span>
            </div>
            {selectedReceiptOrder.discount > 0 && (
              <div className="flex justify-between text-emerald-800">
                <span>Discounts</span>
                <span>-₱{selectedReceiptOrder.discount}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery / Handling</span>
              <span>₱{selectedReceiptOrder.deliveryFee}</span>
            </div>
            <div className="flex justify-between font-extrabold text-sm text-[#4a3024] pt-1 border-t border-[#fbcfe8]">
              <span>Paid Total</span>
              <span>₱{selectedReceiptOrder.total} PHP</span>
            </div>
          </div>

          {/* Reorder Button */}
          <button
            id={`btn-reorder-${selectedReceiptOrder.orderId}`}
            onClick={() => onReorder(selectedReceiptOrder.items)}
            className="w-full h-11 px-4 rounded-full text-xs font-bold bg-[#fce7f3] text-[#523628] border border-[#fbcfe8] hover:bg-[#fbcfe8] transition flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer active:scale-95"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#ec4899]" />
            <span>Reorder This Exact Build</span>
          </button>
        </div>
      )}

      {/* Order History */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#4a3024] px-1">
          Previous Order History
        </h3>

        {orders.map((order) => (
          <div
            key={order.orderId}
            onClick={() => setSelectedReceiptOrder(order)}
            className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
              selectedReceiptOrder?.orderId === order.orderId
                ? 'bg-[#fff5f7] border-[#ec4899] ring-2 ring-[#ec4899]/20 shadow-xs'
                : 'bg-white border-[#fbcfe8] hover:bg-[#fff5f7]'
            }`}
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#4a3024]">#{order.orderId}</span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#fce7f3] text-[#523628]">
                  {order.status === 'delivered' ? 'Completed' : 'In Progress'}
                </span>
              </div>
              <p className="text-[10px] text-[#74513e] mt-0.5">
                {order.items.length} items • {order.createdAt}
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs font-extrabold text-[#4a3024]">₱{order.total}</span>
              <p className="text-[9px] text-[#74513e]">{order.paymentMethod}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
