/**
 * @file DevelopersView.tsx
 * @description Developers Section
 * Displays the project team members from the Technological Institute of the Philippines (TIP Cubao)
 * as documented in the Discussion 3.2 submission sheet.
 */

import React, { useState } from 'react';
import {
  Users2,
  Crown,
  Cookie,
  Mail,
  ShieldCheck,
  Camera,
  Upload,
  Check,
  Sparkles,
} from 'lucide-react';
import { DEVELOPERS_DATA } from '../../data/mockData';
import { DeveloperProfile } from '../../types';

interface DevCardProps {
  member: DeveloperProfile;
}

const DevMemberCard: React.FC<DevCardProps> = ({ member }) => {
  const localKey = `cf_dev_photo_${member.id}`;
  const [photoSrc, setPhotoSrc] = useState<string>(() => {
    return localStorage.getItem(localKey) || member.avatarUrl;
  });
  const [hasError, setHasError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Extract initials
  const initials = member.name
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join('');

  // Filename for user reference
  const targetFileName = member.avatarUrl.replace(/^\//, '');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        localStorage.setItem(localKey, dataUrl);
        setPhotoSrc(dataUrl);
        setHasError(false);
      }
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleImageError = () => {
    // If /filename.ext fails, try /developers/filename.ext
    if (!photoSrc.startsWith('data:') && !photoSrc.includes('/developers/')) {
      setPhotoSrc(`/developers/${targetFileName}`);
    } else {
      setHasError(true);
    }
  };

  return (
    <div
      id={`dev-card-${member.id}`}
      className="p-4 rounded-3xl bg-white border border-[#fbcfe8] shadow-2xs space-y-2.5 hover:shadow-xs transition relative"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative group">
            {!hasError ? (
              <img
                src={photoSrc}
                alt={member.name}
                referrerPolicy="no-referrer"
                onError={handleImageError}
                className="w-13 h-13 rounded-2xl object-cover ring-2 ring-[#fbcfe8] bg-[#fff5f7]"
              />
            ) : (
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#fce7f3] to-[#fff5f7] border-2 border-dashed border-[#f472b6] flex flex-col items-center justify-center text-[#be185d]">
                <span className="text-xs font-black tracking-wider">{initials}</span>
                <span className="text-[8px] font-bold text-[#ec4899] mt-0.5">Photo</span>
              </div>
            )}

            {/* Hidden file input for direct upload / replace */}
            <label
              htmlFor={`upload-photo-${member.id}`}
              className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#523628] text-white flex items-center justify-center cursor-pointer shadow-xs hover:bg-[#be185d] transition"
              title={`Upload or update ${targetFileName}`}
            >
              <Camera className="w-2.5 h-2.5" />
            </label>
            <input
              id={`upload-photo-${member.id}`}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />

            {member.isLeader && (
              <span
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#ec4899] text-white flex items-center justify-center shadow-xs"
                title="Team Leader"
              >
                <Crown className="w-3 h-3" />
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="text-xs font-black text-[#4a3024]">{member.name}</h3>
              {member.isLeader && (
                <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-[#fce7f3] text-[#be185d]">
                  Lead
                </span>
              )}
            </div>
            <p className="text-[11px] font-bold text-[#be185d] mt-0.5">{member.role}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="font-mono text-[9px] px-1.5 py-0.2 rounded-md bg-[#fff5f7] border border-[#fbcfe8] text-[#74513e]">
                {targetFileName}
              </span>
              {localStorage.getItem(localKey) && (
                <span className="text-[9px] font-bold text-emerald-600 flex items-center gap-0.5">
                  <Check className="w-2.5 h-2.5" /> Applied
                </span>
              )}
            </div>
          </div>
        </div>

        <a
          href={`mailto:${member.tipEmail}`}
          className="w-8 h-8 rounded-full bg-[#fff5f7] border border-[#fbcfe8] text-[#74513e] hover:bg-[#fce7f3] flex items-center justify-center transition shrink-0"
          title={`Email ${member.name}`}
        >
          <Mail className="w-3.5 h-3.5 text-[#ec4899]" />
        </a>
      </div>

      <p className="text-[11px] text-[#74513e] leading-relaxed pl-1">
        {member.bio}
      </p>

      {/* Technical Skills Badges */}
      <div className="flex flex-wrap gap-1 pt-1">
        {member.skills.map((skill, sIdx) => (
          <span
            key={sIdx}
            className="px-2.5 py-0.5 rounded-full text-[9px] font-semibold bg-[#fff5f7] border border-[#fbcfe8] text-[#523628]"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Favorite Cookie Tag */}
      <div className="pt-2 border-t border-[#fbcfe8] flex items-center justify-between text-[10px] text-[#74513e]">
        <span className="flex items-center gap-1">
          <Cookie className="w-3 h-3 text-[#ec4899]" /> Favorite:
          <strong className="text-[#4a3024]">{member.favoriteCookie}</strong>
        </span>
        <span className="font-mono text-[9px]">{member.tipEmail}</span>
      </div>
    </div>
  );
};

export const DevelopersView: React.FC = () => {
  return (
    <div className="space-y-4 pb-12">
      {/* Team Header */}
      <div className="p-4 rounded-3xl bg-gradient-to-br from-[#fff5f7] via-[#fce7f3] to-[#fff5f7] text-[#4a3024] border border-[#fbcfe8] shadow-2xs flex items-center justify-between">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#be185d]">
            Core Engineering & Design
          </span>
          <h1 className="text-base font-extrabold font-serif text-[#4a3024]">
            Development Team Credits
          </h1>
          <p className="text-[11px] text-[#74513e] mt-0.5">
            Cloud Fluffs Mobile Web Application
          </p>
        </div>

        <div className="w-10 h-10 rounded-2xl bg-[#fce7f3] flex items-center justify-center border border-[#fbcfe8]">
          <Users2 className="w-5 h-5 text-[#ec4899]" />
        </div>
      </div>

      {/* Profile Photo sync indicator */}
      <div className="p-3 rounded-2xl bg-[#fff5f7] border border-[#fbcfe8] text-[11px] text-[#523628] flex items-center gap-2.5">
        <Sparkles className="w-4 h-4 text-[#be185d] shrink-0" />
        <p className="leading-snug">
          <strong>Developer Profiles Linked:</strong> Assigned photos for Aguihap, Romualdo, Galvez, Mansilla, Natal, and Rapacon. Tap the camera icon on any card to update or preview instantly.
        </p>
      </div>

      {/* Team Members List */}
      <div className="space-y-3">
        {DEVELOPERS_DATA.map((member) => (
          <DevMemberCard key={member.id} member={member} />
        ))}
      </div>

      {/* Project Guarantee */}
      <div className="p-3.5 rounded-2xl bg-[#fff5f7] border border-[#fbcfe8] space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#4a3024]">
          <ShieldCheck className="w-4 h-4 text-[#ec4899]" />
          <span>Final Project Capstone Commitment</span>
        </div>
        <p className="text-[11px] text-[#74513e] italic leading-relaxed">
          "Crafted with dedication to deliver an intuitive, sweet, and delightful mobile cookie ordering experience."
        </p>
        <p className="text-[10px] text-[#be185d] font-semibold text-right">
          — Cloud Fluffs Development Team
        </p>
      </div>
    </div>
  );
};
