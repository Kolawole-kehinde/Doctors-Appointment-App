import { supabase } from "../../libs/supabase";

export const signUpApi = async (payload) => { 
    const { name, email, password } = payload; // Extract correct fields

    // First, sign up the user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) throw new Error(error.message);

    // If user is successfully created, insert details into the 'users' table
    if (data?.user) { 
        const { data: userData, error: userError } = await supabase
            .from("users")
            .insert([{ name, email, password }]) // Correct field names
            .select()
            .single();

        if (userError) throw new Error(userError.message);
        return userData; 
    }
};



export const signInApi = async (payload) => {
    const { email, password } = payload;
  
    // Step 1: Authenticate user with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
  
    if (error) throw new Error(error.message);
  
    // Step 2: Retrieve user details from users table
    if (data?.user) {
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select()
        .eq("email", data.user.email)
        .single();
  
      if (userError) throw new Error(userError.message);
  
      return userData; // Return user details
    }
  };
  