// Backend types
export type UserBE = {
  userId: number;
  username: string;
  displayPic: string;
  stories: StoryBE[];
};

export type StoryBE = {
  id: number;
  url: string;
  duration: number;
  altText: string;
};

// Frontend types
export type StoryFE = {
  id: number;
  url: string;
  duration: number;
  altText: string;
  viewed: boolean;
};

export type UserFE = {
  userId: number;
  username: string;
  displayPic: string;
  stories: StoryFE[];
};
