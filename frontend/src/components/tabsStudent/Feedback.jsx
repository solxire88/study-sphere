"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Star, MessageSquare, Send } from "lucide-react";
import { ACCESS_TOKEN } from "../../constants";

export default function Feedback({ classId }) {
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem(ACCESS_TOKEN);

  // On mount, try to fetch existing rating + feedback
  useEffect(() => {
    if (!classId) return;

    const fetchExisting = async () => {
      try {
        const [rateRes, fbRes] = await Promise.all([
          axios.get(
            `${import.meta.env.VITE_API_URL}/stats/rate/me/${classId}/`,
            { headers: { Authorization: `Bearer ${token}` } }
          ),
          axios.get(
            `${import.meta.env.VITE_API_URL}/stats/feedback/me/${classId}/`,
            { headers: { Authorization: `Bearer ${token}` } }
          )
        ]);
        console.log("rateRes", rateRes);
        console.log("fbRes", fbRes);

        setRating(rateRes.data.rating);
        setFeedbackText(fbRes.data.text);
        setIsSubmitted(true);
      } catch (err) {
        // 404 means “not found” → no prior feedback → ignore
        if (err.response?.status !== 404) {
          console.error("Error loading existing feedback:", err);
        }
      }
    };

    fetchExisting();
  }, [classId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (rating === 0) {
      setError("Please select a star rating.");
      return;
    }

    try {
      // 1) Create or overwrite Rating
      await axios.post(
        `${import.meta.env.VITE_API_URL}/stats/rate/`,
        { class_obj: classId, rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // 2) Create or overwrite Feedback
      await axios.post(
        `${import.meta.env.VITE_API_URL}/stats/feedback/`,
        { class_obj: classId, text: feedbackText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      

      setIsSubmitted(true);
    } catch (err) {
      console.error("Submit failed:", err);
      setError(
        err.response?.data?.detail ||
        "An error occurred. Please try again."
      );
    }
  };

  // Thank you view
  if (isSubmitted) {
    return (
      <div className="flex justify-center w-full px-4">
        <div
          className="rounded-lg p-8 w-full backdrop-blur-md bg-opacity-20 bg-gradient-to-br from-[#04091C] to-[#0A0F24] border border-[#1E90FF]/30 shadow-lg"
          style={{ maxWidth: "700px" }}
        >
          <h3 className="text-2xl font-semibold text-white mb-4">
            Thank you for your feedback!
          </h3>
          <p className="text-lg text-white mb-2">
            Your rating: {rating} / 5
          </p>
          {feedbackText && (
            <p className="mt-2 text-white">
              Your comments: “{feedbackText}”
            </p>
          )}
        </div>
      </div>
    );
  }

  // Form view
  return (
    <div className="flex justify-center w-full px-4">
      <div
        className="rounded-lg p-8 w-full backdrop-blur-md bg-opacity-20 bg-gradient-to-br from-[#04091C] to-[#0A0F24] border border-[#1E90FF]/30 shadow-lg"
        style={{ maxWidth: "700px" }}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <p className="text-center text-red-400 text-sm">{error}</p>
          )}

          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-4">
              Rate this course
            </h3>
            <div className="flex justify-center space-x-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`p-2 ${
                    rating >= star ? "text-yellow-400" : "text-gray-400"
                  }`}
                >
                  <Star className="w-8 h-8 fill-current" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="feedback"
              className="flex items-center text-white text-lg"
            >
              <MessageSquare className="w-5 h-5 mr-2 text-[#1E90FF]" />
              Your Feedback
            </label>
            <textarea
              id="feedback"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              className="w-full p-4 rounded-lg bg-[#0A0F24]/70 border border-[#1E90FF]/30 text-white focus:outline-none focus:ring-2 focus:ring-[#1E90FF]"
              rows="5"
              placeholder="What did you like? How can we improve?"
            />
          </div>

          <button
            type="submit"
            className="flex items-center justify-center w-full sm:w-auto mx-auto px-6 py-3 bg-gradient-to-r from-[#1E90FF] to-[#00BFFF] text-white rounded-lg hover:from-[#00BFFF] hover:to-[#1E90FF]"
          >
            <Send className="w-5 h-5 mr-2" /> Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}
