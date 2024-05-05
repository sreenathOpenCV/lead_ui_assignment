import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";

const options = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials: Record<"username" | "password", string> | undefined) => {
        if (credentials?.username === 'admin' && credentials?.password === 'admin123') {
          return Promise.resolve({ id: '1', name: 'Admin' });
        } else {
          return Promise.resolve(null);
        }
      },      
    }),
  ],
};

export default NextAuth(options);
