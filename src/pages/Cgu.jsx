export default function Cgu() {
    return (
        <section className="min-h-screen text-slate-200 px-6 pt-20">
            <div className="max-w-4xl mx-auto space-y-4">
                <h1 className="text-3xl font-bold text-white text-center">
                    Conditions Générales d’Utilisation
                </h1>

                <p className="text-sm text-slate-400 text-center">
                    Dernière mise à jour : {new Date().toLocaleDateString()}
                </p>

                <p>Le site <strong>AniVerse</strong> est une plateforme d’information dédiée aux animés. Il permet de découvrir des animés, consulter leurs fiches détaillées et suivre les tendances actuelles. AniVerse est un site informatif, sans compte utilisateur et sans système de paiement.</p>


                <h2 className="text-xl font-semibold text-white">1. Accès au site</h2>
                <p>L’accès au site AniVerse est gratuit et ouvert à tout utilisateur disposant d’une connexion internet. L’éditeur s’efforce d’assurer une accessibilité continue, mais des interruptions peuvent survenir pour des raisons de maintenance ou techniques.</p>


                <h2 className="text-xl font-semibold  text-white">2. Données personnelles</h2>
               <p>AniVerse ne collecte aucune donnée personnelle. Le formulaire de contact permet uniquement d’envoyer un message par email, sans stockage ni exploitation des informations par le site. <strong>Cependant, le contenu du formulaire est conservé dans la boîte email du destinataire afin de permettre le traitement de votre demande.</strong></p>


                <h2 className="text-xl font-semibold  text-white">3. Cookies</h2>
                <p>Le site AniVerse n’utilise aucun cookie de suivi, d’analyse ou de publicité.</p>


                <h2 className="text-xl font-semibold text-white">4. Sources des données</h2>
                <p>Les informations relatives aux animés proviennent de l’API publique <strong>Jikan</strong>. AniVerse n’est pas affilié à MyAnimeList ou Jikan. Les données sont fournies à titre informatif et peuvent être incomplètes ou modifiées.</p>

        
                <h2 className="text-xl font-semibold text-white">5. Propriété intellectuelle</h2>
                <p>Les contenus du site (structure, design, code) sont protégés par le droit de la propriété intellectuelle. Les images et informations appartiennent à leurs ayants droit respectifs. Toute reproduction est interdite sans autorisation.</p>


                <h2 className="text-xl font-semibold text-white">6. Responsabilité</h2>
                <p>AniVerse est un site d’information. L’éditeur ne saurait être tenu responsable d’éventuelles erreurs, indisponibilités ou de l’usage des informations par l’utilisateur.</p>


                <h2 className="text-xl font-semibold text-white">7. Liens externes</h2>
                <p>Le site peut contenir des liens vers des sites externes. AniVerse n’exerce aucun contrôle sur ces sites et décline toute responsabilité.</p>


                <h2 className="text-xl font-semibold text-white">8. Modification des CGU</h2>
                <p>Les présentes CGU peuvent être modifiées à tout moment afin de s’adapter à l’évolution du site ou de la législation. Les utilisateurs sont invités à les consulter régulièrement.</p>


                <h2 className="text-xl font-semibold text-white">9. Droit applicable</h2>
                <p>Ces CGU sont soumises au droit applicable en vigueur. En cas de litige, une solution amiable sera privilégiée avant toute action judiciaire.</p>

            </div>
        </section>
    );
}
