import Image from "next/image";

const GITHUB = "https://github.com/LightLLM/FamilyFlow-AI";
const ALEXA =
  "https://developer.amazon.com/alexa/console/ask/build/custom/amzn1.ask.skill.ffe35052-4f43-45e1-96b1-836ac69ff352/development/en_US/dashboard";

export default function LandingPage() {
  return (
    <main>
      {/* Hero — one composition: brand, headline, support, CTAs, full-bleed image */}
      <section className="relative min-h-[100dvh] overflow-hidden bg-forest-950 text-forest-50">
        <div className="absolute inset-0">
          <Image
            src="/hero.jpg"
            alt="Family gathered in a living room watching adventures together on the TV"
            fill
            priority
            sizes="100vw"
            className="ff-ken object-cover object-[center_35%] opacity-90"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-forest-950/92 via-forest-950/72 to-forest-950/35"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-forest-950/40"
            aria-hidden
          />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-6xl flex-col justify-end px-6 pb-16 pt-10 sm:px-10 sm:pb-20 lg:justify-center lg:pb-24">
          <p className="ff-rise ff-brand-line font-display text-4xl tracking-tight text-lantern-200 sm:text-5xl md:text-6xl lg:text-7xl">
            FamilyFlow
          </p>
          <h1 className="ff-rise-delay mt-6 max-w-xl font-display text-3xl leading-[1.12] text-white sm:text-4xl md:text-5xl">
            Less scrolling. More living together.
          </h1>
          <p className="ff-rise-delay-2 mt-5 max-w-md text-base leading-relaxed text-forest-100/90 sm:text-lg">
            Kids pick age-banded adventures on the living-room screen or Alexa.
            Parents approve every sensitive step—quietly, in one place.
          </p>
          <div className="ff-rise-delay-2 mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-full bg-lantern-400 px-6 py-3 text-sm font-semibold text-forest-950 transition hover:bg-lantern-300 focus-visible:outline-offset-4"
            >
              See how it works
            </a>
            <a
              href={GITHUB}
              className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-3xl px-6 py-20 sm:px-10 sm:py-28">
        <h2 className="text-3xl sm:text-4xl">One calm loop for the whole household</h2>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          FamilyFlow turns screen time into shared adventures—without letting voice or TV
          skip a parent&apos;s say-so.
        </p>
        <ol className="mt-12 space-y-10 border-l border-forest-300/80 pl-6 sm:pl-8">
          {[
            {
              title: "Browse together",
              body: "Age-banded missions appear on Fire TV or by asking Alexa: “Alexa, open family flow.”",
            },
            {
              title: "Request, then wait",
              body: "Kids send a request. Nothing activates until a parent decides—spoken names never authenticate.",
            },
            {
              title: "Approve in one dashboard",
              body: "Parents review, approve or decline, then verify completion. Points unlock only once, for non-purchasable family rewards.",
            },
          ].map((step, i) => (
            <li key={step.title} className="relative">
              <span
                className="absolute -left-[1.9rem] top-1 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-forest-700 text-xs font-semibold text-lantern-100 sm:-left-[2.15rem]"
                aria-hidden
              >
                {i + 1}
              </span>
              <h3 className="text-xl sm:text-2xl">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-forest-200/80 bg-forest-900 px-6 py-20 text-forest-50 sm:px-10 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl text-lantern-100 sm:text-4xl">Privacy, on purpose</h2>
          <p className="mt-5 text-lg leading-relaxed text-forest-100/90">
            Parents see <strong className="font-semibold text-white">FamilyFlow activity only</strong>
            —not unrelated Alexa chats, Amazon purchases, or other Fire TV apps. Age bands
            instead of birthdays. No ads, no data sales, no stranger chat.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20 sm:px-10 sm:py-28">
        <h2 className="max-w-2xl text-3xl sm:text-4xl">Built for the rooms you already share</h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
          One backend across living-room TV, voice, and the parent web—so approvals stay
          consistent wherever the request starts.
        </p>
        <ul className="mt-14 grid gap-12 sm:grid-cols-3 sm:gap-10">
          {[
            {
              title: "Living room",
              body: "Fire TV / Vega path with device pairing codes—never parent passwords on the TV.",
            },
            {
              title: "Voice",
              body: "Alexa skill “family flow” for suggest, request, and status—with account linking to the household.",
            },
            {
              title: "Parent web",
              body: "Approvals, planner, children, rewards, and activity in one calm dashboard.",
            },
          ].map((item) => (
            <li key={item.title}>
              <h3 className="text-xl">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-24 text-center sm:px-10 sm:pb-32">
        <h2 className="text-3xl sm:text-4xl">Ready to try the flow</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
          Explore the open-source project, or open the Alexa skill in your Amazon
          Developer Console while we finish Appstore packaging for Fire TV.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href={GITHUB}
            className="inline-flex rounded-full bg-forest-800 px-6 py-3 text-sm font-semibold text-lantern-100 transition hover:bg-forest-700"
          >
            GitHub repository
          </a>
          <a
            href={ALEXA}
            className="inline-flex rounded-full border border-forest-400/60 px-6 py-3 text-sm font-semibold text-forest-800 transition hover:border-forest-600 hover:bg-forest-100/50"
          >
            Alexa skill console
          </a>
        </div>
      </section>

      <footer className="border-t border-forest-200/70 px-6 py-10 text-center text-sm text-ink-soft sm:px-10">
        <p className="font-display text-lg text-forest-800">FamilyFlow</p>
        <p className="mt-2">Less scrolling. More living together.</p>
        <p className="mt-4">
          <a href={GITHUB} className="underline decoration-forest-300 underline-offset-4 hover:text-forest-800">
            LightLLM/FamilyFlow-AI
          </a>
          {" · "}
          MIT License
        </p>
      </footer>
    </main>
  );
}
