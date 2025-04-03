// import React, { useState } from "react";

// const UserForm = () => {
//   const [user, setUser] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     password_hash: "",
//     phone_number: "",
//     address: "",
//     is_verified: false,
//     type: "",
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setUser({
//       ...user,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("User Data Submitted:", user);

//     fetch("http://localhost:5000/api/users", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(user),
//     })
//       .then((response) => response.json())
//       .then((data) => console.log("User saved:", data))
//       .catch((error) => console.error("Error:", error));
//   };

//   return (
//     <div>
//       <h2>Add New User</h2>
//       <form onSubmit={handleSubmit} className="user-form">
//         <label>First Name:</label>
//         <input type="text" name="first_name" value={user.first_name} onChange={handleChange} required />

//         <label>Last Name:</label>
//         <input type="text" name="last_name" value={user.last_name} onChange={handleChange} required />

//         <label>Email:</label>
//         <input type="email" name="email" value={user.email} onChange={handleChange} required />

//         <label>Password:</label>
//         <input type="password" name="password_hash" value={user.password_hash} onChange={handleChange} required />

//         <label>Phone Number:</label>
//         <input type="text" name="phone_number" value={user.phone_number} onChange={handleChange} required />

//         <label>Address:</label>
//         <input type="text" name="address" value={user.address} onChange={handleChange} required />

//         <label>Verified:</label>
//         <input type="checkbox" name="is_verified" checked={user.is_verified} onChange={handleChange} />

//         <label>Type:</label>
//         <input type="text" name="type" value={user.type} onChange={handleChange} required />

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default UserForm;
