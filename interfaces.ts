interface Post {
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
  relatedPosts: RelatedPost[]
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

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  passowrd: string;

  picture: string;
  bio: string;
}

// next step 
// create users
// create auth
// create 
