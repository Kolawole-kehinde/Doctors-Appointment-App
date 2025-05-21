// utils/passwordStrength.js

export const getPasswordStrength = (password) => {
    if (!password) return "";
  
    const strong = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&+*]{8,}$");
    const medium = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*\\d))|((?=.*[A-Z])(?=.*\\d)))[A-Za-z\\d]{6,}$");
  
    if (strong.test(password)) return "Strong";
    if (medium.test(password)) return "Medium";
    return "Weak";
  };
  