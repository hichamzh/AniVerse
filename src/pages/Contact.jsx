import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

export default function Contact() {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(false);

    emailjs
      .sendForm(
        "service_d6e6mvi",
        "template_2xynlas",
        form.current,
        "8KAlIKpk3XZqLHOMe"
      )
      .then(() => {
        setSuccess(true);
        form.current.reset();
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <form ref={form}
        onSubmit={sendEmail}
        className="w-full max-w-md bg-slate-900 p-6 rounded-xl space-y-4">
        <h1 className="text-2xl font-bold text-white text-center">Contact</h1>

        <input type="text"
          name="user_name"
          placeholder="Nom"
          required
          className="w-full p-3 rounded bg-slate-800 text-white" />

        <input type="email"
          name="user_email"
          placeholder="Email"
          required
          pattern="^[^\s@]+@[^\s@]+\.[^\s@]{2,}$"
          className="w-full p-3 rounded bg-slate-800 text-white" />

        <textarea name="message"
          placeholder="Message"
          rows="5"
          required
          className="w-full p-3 rounded bg-slate-800 text-white" />

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="cgu"
            name="cgu"
            required
            className="w-4 h-4 cursor-pointer"
          />
          <label htmlFor="cgu" className="text-sm text-white">
            J’accepte les <a href="/cgu" className="underline text-indigo-400">CGU</a>
          </label>
        </div>

        <button type="submit"
          disabled={loading}
          className="w-full py-3 bg-indigo-600 rounded font-bold text-white disabled:opacity-50 cursor-pointer hover:bg-indigo-500 transition">
          {loading ? "Envoi..." : "Envoyer"}
        </button>

        {success && (
          <Alert
            icon={<CheckIcon fontSize="inherit" />}
            severity="success"
            className="mt-4"
          >
            Message envoyé avec succès !
          </Alert>
        )}

        {error && (
          <Alert severity="error"
            className="mt-4">
            Une erreur est survenue. Veuillez réessayer
          </Alert>
        )}
      </form>
    </section>
  );
}