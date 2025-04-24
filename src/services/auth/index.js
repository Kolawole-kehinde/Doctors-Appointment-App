import { supabase } from "../../libs/supabase";

// Sign Up API
export const signUpApi = async (payload) => {
  const { name, email, password } = payload;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  const userId = data?.user?.id;

  if (!userId) {
    throw new Error("User ID is undefined. Something went wrong with sign up.");
  }

  const { data: userData, error: userError } = await supabase
    .from("users")
    .insert([{ name, email, user_id: userId }])
    .select()
    .single();

  if (userError) throw new Error(userError.message);

  return userData;
};


// Sign In API
export const signInApi = async (payload) => {
  const { email, password } = payload;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  const user = data?.user;

  // Fetch user info from 'users' table by user_id
  if (user) {
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select()
      .eq("user_id", user.id)
      .single();

    if (userError) throw new Error(userError.message);
    return userData;
  }
};
