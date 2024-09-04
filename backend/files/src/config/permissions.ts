// permissions.ts

export interface Permission {
  path: string;
  method: string | string[];
}

export const rolePermissions: Record<string, Permission[]> = {
  admin: [
    { path: '/admin', method: ['GET', 'PATCH', 'POST', 'PUT'] },
    { path: '/users', method: ['GET', 'PATCH', 'POST', 'PUT'] },
    { path: '/admin', method: 'GET' },
  ],
  editor: [
    { path: '/editor', method: 'GET' },
    { path: '/editor/teste', method: 'GET' },
  ],
};
