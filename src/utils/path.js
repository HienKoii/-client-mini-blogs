const PATH = {
  // Public routes
  home: "/",
  posts: "/posts",
  write: "/write",
  login: "/login",
  register: "/register",

  // Post related routes
  postDetail: (id) => `/posts/${id}`,
  editPost: (id) => `/posts/${id}/edit`,

  // User related routes
  profile: "/profile",
  profileId: (id) => `/profile/${id}`,
  settings: "/settings",

  // Auth routes
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
};

export default PATH;
