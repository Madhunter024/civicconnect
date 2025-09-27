export type IssueStatus = 'Reported' | 'In Progress' | 'Resolved' | 'Rejected';
export type IssueCategory = 'Pothole' | 'Broken Streetlight' | 'Graffiti' | 'Trash Overflow' | 'Other';
export type UserRole = 'citizen' | 'admin' | 'official';

export interface User {
    id: string;
    username: string;
    email: string;
    role: UserRole;
}

export interface Department {
  name: string;
}

export interface Issue {
  id:string;
  title: string;
  description: string;
  category: IssueCategory;
  status: IssueStatus;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  imageUrl: string;
  imageHint: string;
  reportedAt: string;
  updatedAt: string;
  reporter: {
    name: string;
    avatarUrl?: string | undefined;
    username?: string;
};
}
