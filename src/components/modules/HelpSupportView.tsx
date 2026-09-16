/**
 * @file HelpSupportView.tsx
 * @description Help Center, FAQs, and Customer Care Support for Cookie Fluffs
 */

import React, { useState } from 'react';
import {
  HelpCircle,
  Search,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  ChevronDown,
  ChevronUp,
  Truck,
  Sparkles,
  ShieldCheck,
  MapPin,
} from 'lucide-react';

export const HelpSupportView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How fresh are Cookie Fluffs when delivered?',
      a: 'All our cookies are small-batch artisan bakes made fresh every morning. When you order, our kitchen warms and seals your box in insulated pink packaging so they arrive with that gooey, soft-baked molten texture.',
    },
    {
      q: 'Can I design my own custom cookie?',
      a: 'Yes! Tap "Custom Cookie Studio" from the bottom tabs or side menu. You can select your dough base, mix-ins (chocolate chunks, marshmallows, pecans), fillings, and artisanal toppings, plus choose your custom box sleeve.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept GCash, Maya, Visa & Mastercard credit/debit cards, and Cash on Delivery (COD) across Metro Manila with zero processing fees.',
    },
    {
      q: 'How do Fluff Crumbs & Loyalty Rewards work?',
      a: 'Every ₱100 spent earns you 10 Fluff Crumbs. You can redeem crumbs for free cookies, limited-edition bakery tote bags, and custom box upgrades in our Rewards tab.',
    },
    {
      q: 'What are your delivery hours and coverage?',
      a: 'We deliver daily from 8:00 AM to 10:00 PM across Quezon City, Pasig, Mandaluyong, San Juan, Makati, and Taguig. Standard delivery takes 25–45 minutes.',
    },
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4 pb-12">
      {/* Header Banner */}
      <div className="p-4 rounded-3xl bg-gradient-to-br from-[#fff5f7] via-[#fce7f3] to-[#fff5f7] border border-[#fbcfe8] shadow-2xs space-y-1">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#be185d] flex items-center gap-1">
          <HelpCircle className="w-3.5 h-3.5 text-[#ec4899]" />
          <span>Customer Care & Bakery Help</span>
        </span>
        <h2 className="text-xl font-serif font-bold text-[#4a3024]">
          How can we sweeten your day?
        </h2>
        <p className="text-[11px] text-[#74513e]">
          Find instant answers to common questions or reach out directly to our kitchen team.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#74513e]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search baking, delivery, payments, builder..."
          className="w-full h-11 pl-10 pr-4 rounded-full bg-white border border-[#fbcfe8] text-xs text-[#4a3024] focus:outline-none focus:ring-2 focus:ring-[#ec4899]/30 shadow-2xs"
        />
      </div>

      {/* Quick Contact Action Cards */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="p-3.5 rounded-2xl bg-white border border-[#fbcfe8] space-y-1 shadow-2xs">
          <div className="w-8 h-8 rounded-xl bg-[#fce7f3] text-[#523628] flex items-center justify-center">
            <Phone className="w-4 h-4 text-[#ec4899]" />
          </div>
          <p className="text-xs font-bold text-[#4a3024]">Bakery Hotline</p>
          <p className="text-[10px] text-[#74513e] font-mono">(02) 8911-FLUFF</p>
          <span className="text-[9px] text-emerald-700 font-bold block pt-0.5">
            ● Available 8am-10pm
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-[#fbcfe8] space-y-1 shadow-2xs">
          <div className="w-8 h-8 rounded-xl bg-[#fce7f3] text-[#523628] flex items-center justify-center">
            <Mail className="w-4 h-4 text-[#ec4899]" />
          </div>
          <p className="text-xs font-bold text-[#4a3024]">Email Concierge</p>
          <p className="text-[10px] text-[#74513e] font-mono">support@cookiefluffs.ph</p>
          <span className="text-[9px] text-[#be185d] font-bold block pt-0.5">
            Avg reply &lt; 15 mins
          </span>
        </div>
      </div>

      {/* FAQs List */}
      <div className="space-y-2">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#4a3024] px-1">
          Frequently Asked Questions
        </h3>

        {filteredFaqs.map((faq, idx) => {
          const isExpanded = expandedFaq === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl bg-white border border-[#fbcfe8] overflow-hidden transition-all shadow-2xs"
            >
              <button
                onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                className="w-full p-3.5 text-left flex items-center justify-between gap-2 hover:bg-[#fff5f7] transition cursor-pointer"
              >
                <span className="text-xs font-bold text-[#4a3024]">{faq.q}</span>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-[#74513e]/60 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#74513e]/60 shrink-0" />
                )}
              </button>

              {isExpanded && (
                <div className="px-3.5 pb-3.5 pt-1 text-xs text-[#74513e] leading-relaxed border-t border-[#fbcfe8]/50 bg-[#fff5f7]/50">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bakery Location Card */}
      <div className="p-3.5 rounded-3xl bg-white border border-[#fbcfe8] space-y-1.5 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold text-[#4a3024]">
          <MapPin className="w-4 h-4 text-[#ec4899]" />
          <span>Flagship Bakery & Pickup Hub</span>
        </div>
        <p className="text-xs text-[#74513e] leading-relaxed">
          Ground Floor, Aurora Boulevard corner 20th Avenue, Cubao, Quezon City.
        </p>
        <p className="text-[11px] text-[#be185d] font-semibold">
          Curbside pick-up available at the pink door!
        </p>
      </div>
    </div>
  );
};
