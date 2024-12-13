import { create } from 'zustand';
import { Facility } from '../types';

interface FacilityState {
  facilities: Facility[];
  selectedFacility: Facility | null;
  setSelectedFacility: (facility: Facility | null) => void;
}

export const useFacilityStore = create<FacilityState>((set) => ({
  facilities: [
    {
      id: '1',
      name: 'Soccer Field A',
      type: 'soccer',
      description: 'Professional grade soccer field with natural grass',
      image: 'https://aui.ma/hs-fs/hubfs/New%20website%20photos%20part%203/G.jpg?width=1200&height=799&name=G.jpg',
      available: true,
      capacity: 32,
      openTime: '11:00',
      closeTime: '23:00'
    },
    {
      id: '2',
      name: 'Soccer Field B',
      type: 'soccer',
      description: 'Professional grade soccer field with artificial turf',
      image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&q=80&w=800',
      available: true,
      capacity: 32,
      openTime: '11:00',
      closeTime: '23:00'
    },
    {
      id: '3',
      name: 'Proxy Field',
      type: 'proxy',
      description: 'Compact field for 5-a-side games',
      image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&q=80&w=800',
      available: true,
      capacity: 10,
      openTime: '11:00',
      closeTime: '23:00'
    },
    {
      id: '4',
      name: 'Futsal Court',
      type: 'futsal',
      description: 'Indoor futsal court with professional flooring',
      image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&q=80&w=800',
      available: true,
      capacity: 10,
      openTime: '11:00',
      closeTime: '23:00'
    },
    {
      id: '5',
      name: 'Basketball Court',
      type: 'basketball',
      description: 'Indoor basketball court with professional flooring',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4U3vyJdYu41CItxTmphE0flujG5_gQ4FT_g&s',
      available: true,
      capacity: 12,
      openTime: '11:00',
      closeTime: '23:00'
    },
    {
      id: '6',
      name: 'Swimming Pool',
      type: 'swimming',
      description: 'Olympic-sized swimming pool with 8 lanes',
      image: 'https://aui.ma/hs-fs/hubfs/AUI%20swimming%20pool%20Ifrane%20Morocco.jpg?width=1200&height=1785&name=AUI%20swimming%20pool%20Ifrane%20Morocco.jpg',
      available: true,
      capacity: 8,
      openTime: '11:00',
      closeTime: '23:00'
    },
    {
      id: '7',
      name: 'Padel Court',
      type: 'padel',
      description: 'Professional padel court with glass walls',
      image: 'https://25719561.fs1.hubspotusercontent-eu1.net/hub/25719561/hubfs/Paddle%20court%20-1.jpg?width=380&height=360&name=Paddle%20court%20-1.jpg',
      available: true,
      capacity: 4,
      openTime: '11:00',
      closeTime: '23:00'
    },
  ],
  selectedFacility: null,
  setSelectedFacility: (facility) => set({ selectedFacility: facility }),
}));