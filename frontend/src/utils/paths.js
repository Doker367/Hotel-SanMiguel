// Base path for deployment with nginx reverse proxy
export const basePath = '/hotel-sanmiguel';

// Helper function to create full paths
export const createPath = (path) => {
  if (path === '/') return `${basePath}/`;
  return `${basePath}${path}`;
};