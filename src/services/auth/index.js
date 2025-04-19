import { supabase } from "../../libs/supabase";

export const signUpApi = async (payload) => { 
  const { name, email, password } = payload;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  if (data?.user) {
    const { data: userData, error: userError } = await supabase
      .from("users")
      .insert([{ name, email, user_id: data.user.id }])  // ✅ no password here
      .select()
      .single();

    if (userError) throw new Error(userError.message);
    return userData;
  }
};


export const signInApi = async (payload) => {
  const { email, password } = payload;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  if (data?.user) {
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select()
      .eq("user_id", data.user.id)  // 👈 safer to match by user_id than email
      .single();

    if (userError) throw new Error(userError.message);
    return userData;
  }
};
