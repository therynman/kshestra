import React from 'react';

interface KshestraLogoProps {
  className?: string;
  size?: number | string;
  color?: string;
  variant?: 'solid' | 'gold' | 'terracotta' | 'white';
}

export const KshestraLogo: React.FC<KshestraLogoProps> = ({
  className = 'w-8 h-8',
  size,
  color,
  variant = 'terracotta'
}) => {
  // Determine fill color based on variant if explicit color is not provided
  let fillColor = color;
  if (!fillColor) {
    switch (variant) {
      case 'gold':
        fillColor = '#C98E3A';
        break;
      case 'white':
        fillColor = '#FAF7F2';
        break;
      case 'solid':
        fillColor = '#161413';
        break;
      case 'terracotta':
      default:
        fillColor = '#4A181C';
        break;
    }
  }

  const style = size ? { width: size, height: size } : undefined;

  return (
    <svg
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 transition-transform ${className}`}
      style={style}
      aria-label="Kshestra Logo"
    >
      <g fill={fillColor}>
        {/* Left vertical trunk & Bankura horse head/chest */}
        {/* Horse Head, Ear, Neck arch, Base pillar */}
        <path
          d="M148 125 L165 142 L225 142 C236 142 245 151 245 162 C245 180 238 210 215 235 C190 262 185 272 185 290 L185 375 L235 375 L235 310 C235 295 240 280 248 268 L248 375 L148 375 L148 245 C148 220 162 195 178 182 C189 173 192 165 190 158 C188 152 182 148 175 148 L160 148 L160 170 L148 170 Z"
          fillRule="evenodd"
          style={{ display: 'none' }}
        />
        
        {/* Precise High-Fidelity Silhouette of the Kshestra Bankura Stallion Monogram */}
        <path
          d="M 148 141
             L 133 141
             L 148 168
             L 148 186
             C 148 195 152 205 163 205
             C 169 205 170 198 170 188
             C 170 176 179 174 188 175
             C 190 193 180 216 160 236
             C 148 248 148 266 148 285
             L 148 375
             L 233 375
             L 233 313
             C 233 313 234 313 235 313
             L 235 375
             L 148 375
             Z"
          style={{ display: 'none' }}
        />

        {/* Unified Geometry Matching the Bankura Horse 'K' Motif */}
        {/* Left Column + Head + Chest */}
        <path
          d="M 148 141 
             L 132 141 
             L 148 168 
             L 148 185 
             C 148 196 153 205 169 205 
             C 170 195 170 186 170 176 
             C 170 163 177 154 189 153 
             C 192 173 182 200 164 220 
             C 148 238 148 265 148 288 
             L 148 375 
             L 233 375 
             L 233 255 
             C 220 255 195 240 185 220
             C 195 200 220 180 233 170
             L 233 141 
             C 215 141 190 141 160 141 
             Z"
             style={{ display: 'none' }}
        />

        {/* Exact Direct Silhouette from Logo Asset */}
        <path
          d="M 148 141
             L 132 141
             L 148 168
             L 148 186
             C 148 200 155 206 170 206
             C 171 194 171 185 171 176
             C 171 160 180 152 190 152
             C 192 176 182 205 162 225
             C 148 240 148 262 148 285
             L 148 375
             L 233 375
             L 233 255
             L 245 255
             L 245 375
             L 368 375
             C 368 350 365 330 355 315
             C 340 290 305 280 280 280
             C 260 280 248 285 245 290
             L 245 255
             L 270 255
             L 368 141
             L 345 141
             L 293 255
             L 270 255
             L 322 141
             L 299 141
             L 247 255
             L 233 255
             L 270 141
             L 220 141
             C 200 141 170 141 148 141 Z"
             style={{ display: 'none' }}
        />

        {/* MASTER VECTOR DEFINITION: Pristine Bankura Stallion 'K' Monogram */}
        <g id="kshestra-monogram">
          {/* Main horse torso, base, and junction */}
          <path
            d="M 148 141 
               L 132 141 
               L 144 168 
               L 148 168 
               L 148 186 
               C 148 198 153 206 169 206 
               C 171 195 171 187 171 178 
               C 171 160 180 152 190 152 
               C 192 176 181 206 162 226 
               C 148 242 148 265 148 288 
               L 148 375 
               L 233 375 
               L 233 255 
               L 242 255 
               L 242 312 
               C 255 355 305 375 368 375 
               L 368 276 
               C 350 280 340 282 320 282 
               C 272 282 245 255 242 255 
               L 242 255 
               L 233 255 
               L 233 141 
               C 205 141 180 141 148 141 Z"
          />
          
          {/* Eye of the Bankura Stallion */}
          <circle cx="158" cy="186" r="4.5" fill={variant === 'white' ? '#161413' : '#FAF7F2'} />

          {/* 3 Feathers / Wings Slanted Upward Right */}
          {/* Feather 1 (Inner) */}
          <polygon points="270,141 245,255 264,255 289,141" />
          
          {/* Feather 2 (Middle) */}
          <polygon points="314,141 273,255 292,255 333,141" />
          
          {/* Feather 3 (Outer Top Right) */}
          <polygon points="368,141 321,270 341,270 368,200" />
        </g>
      </g>
    </svg>
  );
};
