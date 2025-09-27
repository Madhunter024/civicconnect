export type IssueStatus = 'Reported' | 'In Progress' | 'Resolved' | 'Rejected';
export type IssueCategory = 'Pothole' | 'Broken Streetlight' | 'Graffiti' | 'Trash Overflow' | 'Other';

export interface Issue {
  id: string;
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
    avatarUrl: string;
  };
}
