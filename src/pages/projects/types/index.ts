export interface Contact {
  name: string;
  email: string;
  phone: string;
  wechat: string;
}

export interface TeamMember {
  name: string;
  role: string;
  avatar: string;
}

export interface Team {
  size: number;
  status: string;
  members: TeamMember[];
  description: string;
}

export interface Project {
  id: number;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  type: string;
  industry: string;
  stage: string;
  tags: string[];
  team: Team;
  location: string;
  progress: number;
  resourceNeeds: string[];
  contact: Contact;
}

export interface User {
  id: number;
  name: string;
  avatar: string;
}

export interface Comment {
  id: number;
  user: User;
  content: string;
  time: string;
  likes: number;
  isLiked?: boolean;
}

export interface FilterOption {
  value: string;
  label: string;
} 