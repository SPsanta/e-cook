/// <reference types="vite/client" />

declare module 'react' {
  export = React;
  export as namespace React;
}

declare module 'react/jsx-runtime' {
  export = React;
  export as namespace React;
}

declare module 'lucide-react' {
  import { FC, SVGProps } from 'react';
  
  export interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
    absoluteStrokeWidth?: boolean;
  }
  
  export const ChefHat: FC<IconProps>;
  export const ArrowRight: FC<IconProps>;
  export const Menu: FC<IconProps>;
  export const ShoppingCart: FC<IconProps>;
  export const Heart: FC<IconProps>;
  export const X: FC<IconProps>;
  export const Info: FC<IconProps>;
  export const Clock: FC<IconProps>;
  export const Star: FC<IconProps>;
  export const ArrowLeft: FC<IconProps>;
  export const Minus: FC<IconProps>;
  export const Plus: FC<IconProps>;
  export const Trash2: FC<IconProps>;
  export const MapPin: FC<IconProps>;
  export const TrendingUp: FC<IconProps>;
  export const User: FC<IconProps>;
  export const Sprout: FC<IconProps>;
  export const Award: FC<IconProps>;
  export const Flame: FC<IconProps>;
  export const Leaf: FC<IconProps>;
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
