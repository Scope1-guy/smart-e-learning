import { createContext, useState } from "react";
import { users } from "../data/users";
import enrollmentsData from "../data/enrollment";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  // These start as copies of the fake data files, but live in state so that
  // a new signup can add to them in memory (the original files never change,
  // only what this running session of the app knows about).
  const [allUsers, setAllUsers] = useState(users);
  const [enrollments, setEnrollments] = useState(enrollmentsData);

  const login = (email, password) => {
    const foundUser = allUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      setError("");
      return true;
    } else {
      setError("invalid email or password");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  // Creates a brand-new user (in memory) plus one enrollment line per program
  // they picked on the signup screen, then logs them straight in.
  const signup = (formData, selectedProgramIds) => {
    const emailTaken = allUsers.some((u) => u.email === formData.email);
    if (emailTaken) {
      setError("An account with this email already exists");
      return false;
    }

    if (selectedProgramIds.length === 0) {
      setError("Please pick at least one program to continue");
      return false;
    }

    const newUserId = Math.max(...allUsers.map((u) => u.id)) + 1;

    const newUser = {
      id: newUserId,
      name: formData.name,
      email: formData.email,
      password: formData.password,
      dob: "",
      phoneNumber: "",
    };

    const newEnrollments = selectedProgramIds.map((programId) => ({
      userId: newUserId,
      programId,
    }));

    setAllUsers([...allUsers, newUser]);
    setEnrollments([...enrollments, ...newEnrollments]);
    setUser(newUser);
    setError("");
    return true;
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, error, signup, enrollments }}
    >
      {children}
    </AuthContext.Provider>
  );
}
