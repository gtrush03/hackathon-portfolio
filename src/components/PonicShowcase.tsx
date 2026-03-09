import {
  Cpu,
  TrendingUp,
  Droplets,
  ShoppingBag,
  Printer,
  Globe,
} from 'lucide-react';
import SpatialProductShowcase, {
  type ProductData,
} from './ui/spatial-product-showcase';

const PONIC_PRODUCTS: ProductData[] = [
  {
    id: 'system',
    label: 'Hardware',
    title: 'Ponic System',
    description:
      'Modular hydroponics powered by custom 3D-printed hardware. Every component is designed, printed, and assembled in-house for maximum growth efficiency and minimal water waste.',
    image: '/screenshots/ponic.jpg',
    colors: {
      gradient: 'from-[#928466] to-[#5a5040]',
      glow: 'bg-[#928466]',
      ring: 'border-l-[#928466]/50',
      bar: 'bg-[#928466]',
    },
    statusLabel: 'Active',
    statusValue: 'Modular Hydroponics',
    features: [
      { label: 'Custom Parts', value: '24+', icon: Cpu },
      { label: 'Growth Rate', value: '3x', icon: TrendingUp },
      { label: 'Water Saved', value: '90%', icon: Droplets },
    ],
  },
  {
    id: 'store',
    label: 'E-Commerce',
    title: 'Ponic Store',
    description:
      "Czech Republic's first dedicated hydroponics e-commerce platform. Combining 3D-printed custom parts with IoT monitoring to bring precision agriculture to every home.",
    image: '/screenshots/ponic.jpg',
    colors: {
      gradient: 'from-[#928466] to-[#3d3a30]',
      glow: 'bg-[#928466]',
      ring: 'border-r-[#928466]/50',
      bar: 'bg-[#928466]',
    },
    statusLabel: 'Live',
    statusValue: 'ponic.cz',
    features: [
      { label: 'Products', value: '50+', icon: ShoppingBag },
      { label: 'Tech', value: '3D Print + IoT', icon: Printer },
      { label: 'Market', value: 'Czech Republic', icon: Globe },
    ],
  },
];

export default function PonicShowcase() {
  return (
    <section id="ponic-showcase">
      <SpatialProductShowcase
        products={PONIC_PRODUCTS}
        className="bg-[#050505]"
      />
    </section>
  );
}
