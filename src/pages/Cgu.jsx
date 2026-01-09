export default function Cgu() {
  return (
    <section className="min-h-screen text-slate-200 px-6 pt-20">
      <div className="max-w-4xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold text-white text-center">
          Terms and Conditions of Use
        </h1>

        <p className="text-sm text-slate-400 text-center">
          Last update: {new Date().toLocaleDateString()}
        </p>

        <p>
          The <strong>AniVerse</strong> website is an informational platform dedicated to anime.
          It allows users to discover anime, view detailed information, and follow current trends.
          AniVerse is an informational website with no user accounts and no payment system.
        </p>

        <h2 className="text-xl font-semibold text-white">1. Access to the website</h2>
        <p>
          Access to the AniVerse website is free and available to any user with an internet connection.
          The publisher strives to ensure continuous accessibility, but interruptions may occur for
          maintenance or technical reasons.
        </p>

        <h2 className="text-xl font-semibold text-white">2. Personal data</h2>
        <p>
          AniVerse does not collect any personal data. The contact form is only used to send a message
          by email, without storing or processing the information through the website.
          <strong>
            {" "}However, the content of the form is stored in the recipient’s email inbox
            in order to process your request.
          </strong>
        </p>

        <h2 className="text-xl font-semibold text-white">3. Cookies</h2>
        <p>
          The AniVerse website does not use any tracking, analytics, or advertising cookies.
        </p>

        <h2 className="text-xl font-semibold text-white">4. Data sources</h2>
        <p>
          Information related to anime is provided by the public <strong>Jikan</strong> API.
          AniVerse is not affiliated with MyAnimeList or Jikan. The data is provided for informational
          purposes only and may be incomplete or subject to change.
        </p>

        <h2 className="text-xl font-semibold text-white">5. Intellectual property</h2>
        <p>
          The website content (structure, design, code) is protected by intellectual property laws.
          Images and information belong to their respective rights holders. Any reproduction is
          prohibited without authorization.
        </p>

        <h2 className="text-xl font-semibold text-white">6. Liability</h2>
        <p>
          AniVerse is an informational website. The publisher cannot be held responsible for errors,
          unavailability, or the use of information by users.
        </p>

        <h2 className="text-xl font-semibold text-white">7. External links</h2>
        <p>
          The website may contain links to external websites. AniVerse has no control over these
          websites and declines any responsibility for their content.
        </p>

        <h2 className="text-xl font-semibold text-white">8. Changes to the Terms</h2>
        <p>
          These Terms and Conditions may be modified at any time to adapt to changes in the website
          or legislation. Users are encouraged to review them regularly.
        </p>

        <h2 className="text-xl font-semibold text-white">9. Applicable law</h2>
        <p>
          These Terms and Conditions are governed by the applicable laws in force. In the event of a
          dispute, an amicable solution will be sought before any legal action.
        </p>
      </div>
    </section>
  );
}
