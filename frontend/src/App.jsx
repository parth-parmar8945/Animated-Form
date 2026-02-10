import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    skills: [],
    country: "",
    dob: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        skills: checked
          ? [...prev.skills, value]
          : prev.skills.filter((s) => s !== value)
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      await axios.post("http://localhost:5000/submit-form", formData);
      setLoading(false);
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        setFormData({
          name: "",
          email: "",
          password: "",
          phone: "",
          gender: "",
          skills: [],
          country: "",
          dob: "",
          message: ""
        });
      }, 2000);

    } catch (err) {
      setLoading(false);
      alert("Submission failed");
    }
  };

  return (
    <div className="form-container">
      <h2>Advanced Animated Form</h2>

      <form onSubmit={handleSubmit}>

        <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />

        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />

        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />

        <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />

        {/* 🎯 GENDER */}
        <div className="radio-group">
          <label><input type="radio" name="gender" value="Male" onChange={handleChange} /> Male</label>
          <label><input type="radio" name="gender" value="Female" onChange={handleChange} /> Female</label>
        </div>

        {/* 🎯 SKILLS */}
        <div className="checkbox-group">
          <label><input type="checkbox" value="HTML" onChange={handleChange} /> HTML</label>
          <label><input type="checkbox" value="CSS" onChange={handleChange} /> CSS</label>
          <label><input type="checkbox" value="React" onChange={handleChange} /> React</label>
        </div>

        <select name="country" value={formData.country} onChange={handleChange}>
          <option value="">Select Country</option>
          <option>India</option>
          <option>USA</option>
          <option>UK</option>
        </select>

        <input type="date" name="dob" value={formData.dob} onChange={handleChange} />

        <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange}></textarea>

        <button type="submit" disabled={loading || success}>
          {loading && <span className="spinner"></span>}
          {success && <span className="checkmark"></span>}
          {!loading && !success && "Submit"}
        </button>

      </form>
    </div>
  );
}

export default App;
