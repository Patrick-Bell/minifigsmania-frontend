import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import Logo from '../assets/logo.png'
import Navbar from '../front_page/Navbar';

const ChangePassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [tokenValid, setTokenValid] = useState(null); // Track token validity
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');

  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/validate-reset-token`, 
            { token }
          );

          if (response.status === 200) {
            setTokenValid(true);
          } else {
            setTokenValid(false);
            toast.error('Invalid or expired token. Please request a new one.');
          }
        } catch (e) {
          console.error(e);
          setTokenValid(false);
          toast.error('Error validating token. Please try again later.');
        }
      } else {
        setTokenValid(false);
        toast.error('No token found. Please check the link.');
      }
    };

    validateToken();
  }, []);

  const validatePassword = () => {
    const errors = {};
    
    if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.uppercase = 'Password must include an uppercase letter';
    }
    
    if (!/[a-z]/.test(password)) {
      errors.lowercase = 'Password must include a lowercase letter';
    }
    
    if (!/[0-9]/.test(password)) {
      errors.number = 'Password must include a number';
    }
    
    if (!/[!@#$%^&*]/.test(password)) {
      errors.special = 'Password must include a special character';
    }
    
    if (password !== confirmPassword) {
      errors.match = 'Passwords do not match';
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const errors = validatePassword();
    setFormErrors(errors);
  
    if (Object.keys(errors).length === 0 && tokenValid) {
      setIsSubmitting(true);
  
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/api/change-password`,
          { password, token },
          { withCredentials: true }
        );
        toast.success('Password reset successfully!');
        setResetSuccess(true);
      } catch (error) {
        console.log(error);
        setResetSuccess(false);
        toast.error(error.response?.data?.error || 'Something went wrong');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      toast.error('Please correct the errors before submitting');
    }
  };

  const strengthIndicator = () => {
    if (!password) return 0;
    
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[!@#$%^&*]/.test(password)) strength += 1;
    
    return strength;
  };

  const getStrengthClass = () => {
    const strength = strengthIndicator();
    if (strength <= 1) return 'bg-red-500';
    if (strength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  if (resetSuccess) {
    return (
        <>
    <Navbar />
      <div className=" flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <svg className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Password Reset Successful</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Your password has been successfully reset. You can now log in with your new password.
          </p>
          <div className="mt-8 flex justify-center">
            <button 
              className="inline-flex items-center px-4 py-1 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => window.location.href = '/'}
            >
              Go to Homepage
            </button>
          </div>
        </div>
      </div>
      </>
    );
  }

  if (!tokenValid) {
    return (
        <>
        <Navbar />
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <svg className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 3v3m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Invalid or Expired Token</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            The token is invalid or has expired. Please request a new password reset link.
          </p>
        </div>
      </div>
      </>
    );
  }

  return (
    <>
    <Navbar />
    <div className= "flex flex-col justify-center py-4">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <svg className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Reset your password</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Create a new secure password for your account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              {password && (
                <div className="mt-2">
                  <div className="flex mt-1 h-2 bg-gray-200 rounded">
                    <div 
                      className={`h-2 rounded ${getStrengthClass()}`} 
                      style={{ width: `${(strengthIndicator() / 5) * 100}%` }}
                    ></div>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Password strength: {['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'][strengthIndicator()-1] || 'Very Weak'}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={isSubmitting || !tokenValid}
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isSubmitting ? 'Submitting...' : 'Reset Password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default ChangePassword;
