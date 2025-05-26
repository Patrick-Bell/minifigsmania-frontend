import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { Field, Label, Switch } from '@headlessui/react'
import Navbar from '../front_page/Navbar'
import Footer from '../front_page/Footer'
import { createMessage } from '../routes/MessageRoutes'
import { toast } from 'sonner'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    issue: 'general',
    feedback: '',
  })

  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required.'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.'
    }
    if (!formData.issue.trim()) newErrors.issue = 'Please select an issue type.'
    if (!formData.feedback.trim()) newErrors.feedback = 'Message cannot be empty.'
    return newErrors
  }

  const handleSubmit = async () => {
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setTimeout(() => {
        setErrors({})
      }, 3000);
      return
    }

    try {
      await createMessage(formData)
      toast.success('Message sent successfully.', {
        description: 'Thank you for reaching out! We will get back to you soon.',
      })
      setFormData({ name: '', email: '', issue: 'general', feedback: '' })
      setErrors({})
    } catch (e) {
      console.log(e)
      toast.error('Failed to send message.')
    }
  }

  return (
    <>
      <Navbar />
      <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8 max-w-7xl mx-auto">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-1/2 -z-10 aspect-1155/678 w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          />
        </div>

        <div className="mx-auto max-w-2xl text-center">
          <p className="font-bold text-indigo-600 text-xs sm:text-sm tracking-widest mb-2 sm:mb-3">GET IN TOUCH</p>
          <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">Contact Us</h2>
        </div>

        <div className="mx-auto mt-16 max-w-xl sm:mt-20">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="name" className="block text-sm/6 font-semibold text-gray-900">
                Name
              </label>
              <div className="mt-2.5">
                <input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  name="name"
                  type="text"
                  autoComplete="name"
                  className={`block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 ${
                    errors.name ? 'border border-red-500' : ''
                  }`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Issue</label>
              <select
                className={`w-full rounded-md border py-2 px-3 text-sm ${
                  errors.issue ? 'border-red-500' : 'border-gray-300'
                }`}
                value={formData.issue}
                onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
              >
                <option value="general">General Feedback</option>
                <option value="usability">Website Usability</option>
                <option value="performance">Website Performance</option>
                <option value="feature">Feature Request</option>
                <option value="bug">Bug Report</option>
                <option value="refund">Refund/Return</option>
              </select>
              {errors.issue && <p className="text-red-500 text-xs mt-1">{errors.issue}</p>}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm/6 font-semibold text-gray-900">
                Email
              </label>
              <div className="mt-2.5">
                <input
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={`block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 ${
                    errors.email ? 'border border-red-500' : ''
                  }`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="feedback" className="block text-sm/6 font-semibold text-gray-900">
                Message
              </label>
              <div className="mt-2.5">
                <textarea
                  id="feedback"
                  name="feedback"
                  value={formData.feedback}
                  onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                  rows={4}
                  className={`block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 ${
                    errors.feedback ? 'border border-red-500' : ''
                  }`}
                  placeholder="Your message here..."
                />
                {errors.feedback && <p className="text-red-500 text-xs mt-1">{errors.feedback}</p>}
              </div>
            </div>
          </div>

          <div className="mt-10">
            <button
              type="submit"
              onClick={handleSubmit}
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
            >
              Let's talk
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Contact
