// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../../lib/mongodb"; // Hamari banayi hui wire

const authOptions = {
  // Yeh adapter automatically user ka data MongoDB mein save kar dega!
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt", // Fast loading ke liye
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };