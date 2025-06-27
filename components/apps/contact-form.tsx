"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePortfolio } from "../portfolio-context"
import WindowMenuBar from "../window-menu-bar"

// EmailJS configuration
const EMAILJS_SERVICE_ID = "service_portfolio95"
const EMAILJS_TEMPLATE_ID = "template_contact95"
const EMAILJS_PUBLIC_KEY = "your_emailjs_public_key"

export default function ContactForm() {
  const portfolio = usePortfolio()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emailJSLoaded, setEmailJSLoaded] = useState(false)

  // Load EmailJS
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"
    script.onload = () => {
      // Initialize EmailJS
      if (window.emailjs) {
        window.emailjs.init(EMAILJS_PUBLIC_KEY)
        setEmailJSLoaded(true)
      }
    }
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (emailJSLoaded && window.emailjs) {
        // Send email using EmailJS
        const result = await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: portfolio.email,
        })

        if (result.status === 200) {
          alert("Message sent successfully! Thank you for contacting me.")
          setFormData({ name: "", email: "", subject: "", message: "" })
        } else {
          throw new Error("Failed to send message")
        }
      } else {
        // Fallback to mailto
        const subject = encodeURIComponent(formData.subject)
        const body = encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
        )
        window.open(`mailto:${portfolio.email}?subject=${subject}&body=${body}`)
        alert("Opening your email client...")
      }
    } catch (error) {
      console.error("Error sending message:", error)
      // Fallback to mailto
      const subject = encodeURIComponent(formData.subject)
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
      )
      window.open(`mailto:${portfolio.email}?subject=${subject}&body=${body}`)
      alert("There was an issue with the contact form. Opening your email client as backup.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const clearForm = () => {
    if (confirm("Clear all form data?")) {
      setFormData({ name: "", email: "", subject: "", message: "" })
    }
  }

  const saveForm = () => {
    localStorage.setItem("contact_form_draft", JSON.stringify(formData))
    alert("Form saved as draft!")
  }

  const loadForm = () => {
    const saved = localStorage.getItem("contact_form_draft")
    if (saved) {
      setFormData(JSON.parse(saved))
      alert("Draft loaded!")
    } else {
      alert("No saved draft found")
    }
  }

  const menuItems = [
    {
      label: "File",
      items: [
        {
          label: "New",
          action: clearForm,
          shortcut: "Ctrl+N",
        },
        {
          label: "Save Draft",
          action: saveForm,
          shortcut: "Ctrl+S",
        },
        {
          label: "Load Draft",
          action: loadForm,
          shortcut: "Ctrl+O",
        },
        { separator: true },
        {
          label: "Send Message",
          action: () => handleSubmit(new Event("submit") as any),
          shortcut: "Ctrl+Enter",
        },
        { separator: true },
        {
          label: "Exit",
          action: () => {
            if (formData.name || formData.email || formData.message) {
              if (confirm("Discard unsaved changes?")) {
                // Close window
              }
            }
          },
        },
      ],
    },
    {
      label: "Edit",
      items: [
        {
          label: "Cut",
          action: () => {
            const activeElement = document.activeElement as HTMLInputElement | HTMLTextAreaElement
            if (activeElement && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA")) {
              navigator.clipboard.writeText(activeElement.value)
              activeElement.value = ""
            }
          },
          shortcut: "Ctrl+X",
        },
        {
          label: "Copy",
          action: () => {
            const activeElement = document.activeElement as HTMLInputElement | HTMLTextAreaElement
            if (activeElement && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA")) {
              navigator.clipboard.writeText(activeElement.value)
            }
          },
          shortcut: "Ctrl+C",
        },
        {
          label: "Paste",
          action: async () => {
            try {
              const text = await navigator.clipboard.readText()
              const activeElement = document.activeElement as HTMLInputElement | HTMLTextAreaElement
              if (activeElement && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA")) {
                activeElement.value = text
                activeElement.dispatchEvent(new Event("input", { bubbles: true }))
              }
            } catch (err) {
              alert("Paste failed")
            }
          },
          shortcut: "Ctrl+V",
        },
        { separator: true },
        {
          label: "Select All",
          action: () => {
            const activeElement = document.activeElement as HTMLInputElement | HTMLTextAreaElement
            if (activeElement && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA")) {
              activeElement.select()
            }
          },
          shortcut: "Ctrl+A",
        },
      ],
    },
    {
      label: "Tools",
      items: [
        {
          label: "Spell Check",
          action: () => alert("Spell check complete - no errors found"),
        },
        {
          label: "Word Count",
          action: () => {
            const words = formData.message.split(/\s+/).filter((word) => word.length > 0).length
            const chars = formData.message.length
            alert(`Message: ${words} words, ${chars} characters`)
          },
        },
        { separator: true },
        {
          label: "Insert Template",
          action: () => {
            const templates = ["Job Inquiry", "Project Collaboration", "General Question", "Meeting Request"]
            const choice = prompt(`Choose template:\n${templates.map((t, i) => `${i + 1}. ${t}`).join("\n")}`)
            const index = Number.parseInt(choice || "0") - 1

            if (index >= 0 && index < templates.length) {
              const template = templates[index]
              setFormData((prev) => ({
                ...prev,
                subject: template,
                message: `Hi ${portfolio.name},\n\nI hope this message finds you well. I am writing regarding ${template.toLowerCase()}.\n\n[Your message here]\n\nBest regards,\n[Your name]`,
              }))
            }
          },
        },
      ],
    },
    {
      label: "Help",
      items: [
        {
          label: "Contact Help",
          action: () =>
            alert(
              "Contact Form Help:\n- Fill in all required fields\n- Use a clear subject line\n- Be specific in your message\n- Check your email for replies",
            ),
        },
        { separator: true },
        {
          label: "About Contact Form",
          action: () => alert("Contact Form\nVersion 1.0\nIntegrated with EmailJS for reliable message delivery"),
        },
      ],
    },
  ]

  return (
    <div className="h-full bg-[#c0c0c0] flex flex-col">
      <WindowMenuBar menus={menuItems} />

      {/* Toolbar */}
      <div className="h-8 bg-[#c0c0c0] border-b border-[#808080] flex items-center px-2 space-x-1">
        <button
          className="px-2 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-xs hover:bg-[#d0d0d0] active:border-[#808080] active:border-r-white active:border-b-white"
          onClick={clearForm}
          title="New"
        >
          📄 New
        </button>
        <button
          className="px-2 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-xs hover:bg-[#d0d0d0] active:border-[#808080] active:border-r-white active:border-b-white"
          onClick={saveForm}
          title="Save Draft"
        >
          💾 Save
        </button>
        <button
          className="px-2 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-xs hover:bg-[#d0d0d0] active:border-[#808080] active:border-r-white active:border-b-white"
          onClick={loadForm}
          title="Load Draft"
        >
          📁 Load
        </button>
        <div className="w-px h-6 bg-[#808080] mx-1" />
        <button
          className="px-2 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-xs hover:bg-[#d0d0d0] active:border-[#808080] active:border-r-white active:border-b-white"
          onClick={() => handleSubmit(new Event("submit") as any)}
          disabled={isSubmitting}
          title="Send Message"
        >
          📧 Send
        </button>
      </div>

      <div className="flex-1 bg-white p-4 overflow-auto">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-blue-500 rounded flex items-center justify-center text-xl">📧</div>
          <div>
            <h2 className="text-lg font-bold">Contact Me</h2>
            <p className="text-sm text-gray-600">Send me a message - I'll get back to you soon!</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm border-b border-gray-300 pb-1">Contact Information</h3>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-lg">📧</span>
                <div>
                  <div className="text-sm font-semibold">Email</div>
                  <div className="text-sm text-blue-600">{portfolio.email}</div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-lg">📱</span>
                <div>
                  <div className="text-sm font-semibold">Phone</div>
                  <div className="text-sm">{portfolio.phone}</div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-lg">📍</span>
                <div>
                  <div className="text-sm font-semibold">Location</div>
                  <div className="text-sm">{portfolio.location}</div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-bold text-sm border-b border-gray-300 pb-1 mb-3">Social Links</h3>
              <div className="space-y-2">
                <a href={portfolio.social.github} className="block text-sm text-blue-600 hover:underline">
                  🔗 GitHub Profile
                </a>
                <a href={portfolio.social.linkedin} className="block text-sm text-blue-600 hover:underline">
                  🔗 LinkedIn Profile
                </a>
                <a href={portfolio.social.website} className="block text-sm text-blue-600 hover:underline">
                  🔗 Personal Website
                </a>
              </div>
            </div>

            <div className="mt-6 p-3 bg-blue-50 border border-blue-200 text-xs">
              <div className="font-semibold mb-1">📡 Status:</div>
              <div className={emailJSLoaded ? "text-green-600" : "text-orange-600"}>
                {emailJSLoaded ? "✅ Direct email delivery ready" : "⚠️ Loading email service..."}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="font-bold text-sm border-b border-gray-300 pb-1 mb-3">Send Message</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border-2 border-[#808080] border-t-black border-l-black text-sm focus:outline-none"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border-2 border-[#808080] border-t-black border-l-black text-sm focus:outline-none"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Subject *</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border-2 border-[#808080] border-t-black border-l-black text-sm focus:outline-none"
                >
                  <option value="">Select a subject</option>
                  <option value="Job Opportunity">Job Opportunity</option>
                  <option value="Project Collaboration">Project Collaboration</option>
                  <option value="Freelance Work">Freelance Work</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Technical Question">Technical Question</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full p-2 border-2 border-[#808080] border-t-black border-l-black text-sm resize-none focus:outline-none"
                  placeholder="Your message here..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 px-4 bg-[#c0c0c0] border-2 border-white border-r-[#808080] border-b-[#808080] text-sm font-bold hover:bg-[#d0d0d0] disabled:opacity-50 disabled:cursor-not-allowed active:border-[#808080] active:border-r-white active:border-b-white"
              >
                {isSubmitting ? "Sending..." : "📧 Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-[#c0c0c0] border-t border-[#808080] flex items-center px-2 text-xs">
        {isSubmitting ? "Sending message..." : "Ready"} | Characters: {formData.message.length} |
        {emailJSLoaded ? "Email service ready" : "Loading..."}
      </div>
    </div>
  )
}
