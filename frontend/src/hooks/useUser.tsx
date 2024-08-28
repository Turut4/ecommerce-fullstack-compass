export interface User {
  id: number;
  name: string;
  email: string;
}

export async function fetchUser(id: string): Promise<User> {
  const user = await fetch(`${import.meta.env.VITE_REACT_API_URL}/users/${id}`);

  if (!user.ok) {
    throw new Error('Failed to fetch user');
  }

  return user.json();
}

export async function whoIam(): Promise<User> {
  const response = await fetch(
    `${import.meta.env.VITE_REACT_API_URL}/users/whoiam`,
    {
      method: 'GET',
      credentials: 'include',
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }

  return response.json();
}
