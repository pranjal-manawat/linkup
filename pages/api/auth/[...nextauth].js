import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { postData } from "../../../utils/rest";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const payload = {
          email: credentials.email,
          password: credentials.password,
        };
        const url = "http://localhost:5000/login";
        try {
          const { data, success, error } = await postData(url, payload);

          if (success) {
            return data;
          } else if (error) {
            throw error;
          }
        } catch (e) {
          throw new Error(e.message);
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60,
  }
});
