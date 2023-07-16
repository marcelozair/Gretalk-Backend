export default interface Post {
  id: string;
  title: string;
  description: string;
  banner: string;
  likes: number;
  publicationDate: string;

  // comments: [],
  written: Written;
  sections: [],
  tags: Tag[],
  relatedPosts: RelatedPost[];
}

interface Written {
  username: string;
  picture: string;
  id: string;
}

interface Tag {
  id: string;
  name: string;
}

interface RelatedPost {
  id: string;
  title: string;
  description: string;
  banner: string;
  likes: number;
  written: Written;
  publicationDate: string;
}