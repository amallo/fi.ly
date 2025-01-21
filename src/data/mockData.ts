import { User, Video } from '../types';

export const currentUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
};

export const users: User[] = [
  currentUser,
  {
    id: '2',
    name: 'Alice Smith',
    email: 'alice@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
  }
];

export const videos: Video[] = [
  {
    id: '1',
    title: 'Q4 Sales Strategy',
    description: 'Confidential sales strategy presentation for Q4 2024',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=450&fit=crop',
    duration: '15:30',
    uploadedAt: '2024-03-15T10:00:00Z',
    uploadedBy: currentUser,
    views: 24,
    sharedWith: users.slice(1),
    analytics: [
      {
        userId: '2',
        userName: 'Alice Smith',
        watchedAt: '2024-03-15T14:30:00Z',
        duration: '15:30',
        completed: true
      },
      {
        userId: '3',
        userName: 'Bob Johnson',
        watchedAt: '2024-03-15T16:45:00Z',
        duration: '10:15',
        completed: false
      }
    ]
  },
  {
    id: '2',
    title: 'New Product Launch Guidelines',
    description: 'Internal training video for the upcoming product launch',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop',
    duration: '22:15',
    uploadedAt: '2024-03-14T15:30:00Z',
    uploadedBy: currentUser,
    views: 15,
    sharedWith: [users[1]],
    analytics: [
      {
        userId: '2',
        userName: 'Alice Smith',
        watchedAt: '2024-03-14T17:20:00Z',
        duration: '22:15',
        completed: true
      }
    ]
  }
];