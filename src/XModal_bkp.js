import "./XModal.css";
import React, { useState, useRef, useEffect } from 'react';

const XModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    dob: '',
    phone: '',
  });


  const modalRef = useRef(null);

  const handleCloseModal = () => {
    // Reset form data
    setFormData({
      username: '',
      email: '',
      dob: '',
      phone: '',
    });
    // Close the modal
    onClose();
  };

  /*const handleOverlayClick = (e) => {
    //console.log('Click detected outside modal');
    //console.log('e.target:', e.target);
    //console.log('modalRef.current:', modalRef.current);

    // Check if the click is outside the modal content
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      //console.log('Closing modal');
      handleCloseModal();
    }
  };*/

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        //console.log('Closing modal');
        handleCloseModal();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValidEmail = validateEmail(formData.email);

    if(!isValidEmail){
      alert('Invalid email. Please check your email address.');
      return;
    }

    // Check if the date of birth is a future date
    const currentDate = new Date();
    const selectedDate = new Date(formData.dob);

    if (selectedDate > currentDate) {
      alert('Invalid date of birth.Date of birth cannot be in the future.');
      return;
    }

    // Check if the phone number has exactly 10 digits
    if (formData.phone && formData.phone.length !== 10) {
      alert('Invalid phone number. Please enter a 10-digit phone number.');
      return;
    }

    // Your form submission logic here
    console.log('Form submitted:', formData);
    setFormData({
        username: '',
        email: '',
        dob: '',
        phone: '',
      }); // Close the modal after submission
  };

  const validateEmail = (email) => {
    // Implement your email validation logic here
    // For simplicity, I'm using a basic regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`} >
      {/* Modal content */}
      <div className="modal-content" id="modal-content" ref={modalRef}>
        {/* Close button */}
        <button className="close-btn" onClick={handleCloseModal}>
          &times;
        </button>

        <h1>Fill Details</h1>
        <form onSubmit={handleSubmit}>
         
          <label>
            Username:
          </label>
          <div>
            <input type="text" name="username" id="username" value={formData.username} onChange={handleChange} required />
          </div>
          <br />
          <label>
            Email Address:
          </label>
          <div>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <br />
          <label>
            Phone Number:
          </label>
          <div>
            <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
          </div>
          
          <br />
          <label>
            Date of Birth:
          </label>
          <div><input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} required /></div>
          <br />
         
          <button type="submit" className="submit-button button-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default XModal;
