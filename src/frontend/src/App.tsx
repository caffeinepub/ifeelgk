import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Instagram,
  Loader2,
  Menu,
  Music2,
  X,
  Youtube,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { SiInstagram, SiSpotify, SiYoutube } from "react-icons/si";
import { useActor } from "./hooks/useActor";

// ---- Intersection Observer hook for fade-in animations ----
function useFadeInOnScroll() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // Stagger children with fade-in-up class
            const children = Array.from(el.querySelectorAll(".fade-in-up"));
            children.forEach((child, i) => {
              setTimeout(() => {
                child.classList.add("is-visible");
              }, i * 100);
            });
            el.classList.add("is-visible");
            observer.unobserve(el);
          }
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

// ---- Navigation ----
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Music", href: "#music" },
    { label: "Videos", href: "#videos" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = useCallback((href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <nav
      data-ocid="nav.panel"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            type="button"
            className="font-display text-2xl tracking-widest text-primary text-neon-glow-sm hover:text-primary transition-colors bg-transparent border-none cursor-pointer p-0"
            data-ocid="nav.link"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            IFEELGK
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                data-ocid={`nav.link.${i + 1}`}
                className="font-condensed text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden text-foreground p-2"
            data-ocid="nav.toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-md border-b border-border">
          <div className="px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                data-ocid={`nav.mobile.link.${i + 1}`}
                className="font-condensed text-base tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors py-2"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

// ---- Hero Section ----
function HeroSection() {
  return (
    <section
      id="home"
      data-ocid="hero.section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-banner.dim_1400x600.jpg')",
        }}
      />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background" />
      {/* Radial glow behind title */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[600px] h-[300px] rounded-full blur-3xl opacity-20"
          style={{ background: "oklch(0.82 0.18 85)" }}
        />
      </div>

      {/* Hero content */}
      <div className="relative z-10 text-center px-4 flex flex-col items-center gap-6">
        {/* Debut badge */}
        <div className="font-condensed text-xs tracking-[0.4em] uppercase text-primary/70 border border-primary/30 px-4 py-1 inline-block">
          Est. 2019 · Debut: Ujjain Ka Rap
        </div>

        {/* Main title */}
        <h1
          className="font-display text-primary animate-pulse-glow leading-none"
          style={{
            fontSize: "clamp(5rem, 18vw, 11rem)",
            letterSpacing: "0.05em",
          }}
        >
          IFEELGK
        </h1>

        {/* Subtitle */}
        <p className="font-condensed text-sm md:text-base tracking-[0.5em] uppercase text-foreground/80">
          Underground Hip-Hop &nbsp;|&nbsp; Ujjain, India
        </p>

        {/* Streams stat */}
        <div className="flex items-center gap-3">
          <div
            className="font-condensed font-bold tracking-widest text-primary-foreground bg-primary px-5 py-2 text-sm uppercase"
            style={{
              clipPath:
                "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
            }}
          >
            45M+ Streams Worldwide
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <a
            href="https://open.spotify.com/artist/3nSwwTWRy5nuUb3HIjGUz5?si=L9ik9mJ4RKe3SYnVu5aHLA"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="hero.primary_button"
            className="font-condensed font-bold tracking-widest uppercase text-sm text-primary-foreground bg-primary px-8 py-3 hover:bg-primary/90 transition-colors duration-200 flex items-center gap-2 justify-center neon-border"
          >
            <Music2 size={16} />
            Listen Now
          </a>
          <a
            href="https://www.youtube.com/channel/UCJH9sT22BpOZWKJ2vYdoFxA"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="hero.secondary_button"
            className="font-condensed font-bold tracking-widest uppercase text-sm text-primary border border-primary px-8 py-3 hover:bg-primary/10 transition-colors duration-200 flex items-center gap-2 justify-center"
          >
            <Youtube size={16} />
            Watch Videos
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-8 flex flex-col items-center gap-2 text-muted-foreground">
          <span className="font-condensed text-xs tracking-widest uppercase">
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-primary/60 to-transparent" />
        </div>
      </div>
    </section>
  );
}

// ---- About Section ----
function AboutSection() {
  const ref = useFadeInOnScroll();

  return (
    <section
      id="about"
      data-ocid="about.section"
      className="relative py-24 md:py-32 section-scroll-margin"
      ref={ref}
    >
      {/* Background accent */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at right, oklch(0.82 0.18 85), transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <div className="fade-in-up mb-12 flex items-center gap-4">
          <div className="w-12 h-px bg-primary" />
          <span className="font-condensed text-xs tracking-[0.4em] uppercase text-primary">
            Artist
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Portrait */}
          <div className="fade-in-up order-2 md:order-1">
            <div className="relative">
              {/* Neon glow frame */}
              <div
                className="absolute -inset-1 opacity-60 blur-sm"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.82 0.18 85), transparent, oklch(0.82 0.18 85 / 0.3))",
                }}
              />
              <div className="relative border border-primary/40 overflow-hidden aspect-square max-w-md mx-auto">
                <img
                  src="/assets/uploads/WhatsApp-Image-2026-03-09-at-2.01.23-PM-1.jpeg"
                  alt="IFEELGK - Underground Hip-Hop Artist from Ujjain"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary" />
              </div>
              {/* Name tag */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-6 py-1">
                <span className="font-condensed text-xs tracking-[0.3em] uppercase font-bold">
                  Gourav Sheel
                </span>
              </div>
            </div>
          </div>

          {/* Bio text */}
          <div className="fade-in-up fade-in-up-delay-2 order-1 md:order-2 space-y-6">
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-foreground leading-none">
              About The{" "}
              <span className="text-primary text-neon-glow-sm">Artist</span>
            </h2>

            <div className="w-16 h-0.5 bg-primary" />

            <p className="font-body text-foreground/80 text-base leading-relaxed">
              IFEELGK is an underground hip-hop artist hailing from the ancient
              city of Ujjain, India. Born as{" "}
              <strong className="text-foreground">Gourav Sheel</strong>, he has
              carved a unique space in the Indian hip-hop scene with his raw
              lyricism and authentic storytelling.
            </p>
            <p className="font-body text-foreground/80 text-base leading-relaxed">
              Inspired by the legendary{" "}
              <strong className="text-primary">Emiway Bantai</strong>, IFEELGK
              picked up the mic in 2019 and never looked back. His debut track{" "}
              <em className="text-foreground">'Ujjain Ka Rap'</em> introduced
              the world to his city's untold story — and fans took notice.
            </p>
            <p className="font-body text-foreground/80 text-base leading-relaxed">
              With over{" "}
              <strong className="text-primary">
                45 million streams worldwide
              </strong>
              , IFEELGK has proven that underground artists can build massive
              reach through pure talent and passion. His music blends Hindi,
              street flavor, and honest verses that connect deeply.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { value: "45M+", label: "Streams" },
                { value: "2019", label: "Debut Year" },
                { value: "Ujjain", label: "Hometown" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className={`fade-in-up fade-in-up-delay-${i + 3} text-center border border-border p-3`}
                >
                  <div className="font-display text-2xl text-primary">
                    {stat.value}
                  </div>
                  <div className="font-condensed text-xs tracking-widest uppercase text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Music Section ----
function MusicSection() {
  const ref = useFadeInOnScroll();

  return (
    <section
      id="music"
      data-ocid="music.section"
      className="relative py-24 md:py-32 section-scroll-margin bg-card"
      ref={ref}
    >
      {/* Diagonal top edge */}
      <div className="absolute top-0 left-0 right-0 h-16 overflow-hidden -mt-1">
        <div
          className="absolute inset-0 bg-background"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 0)" }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="fade-in-up mb-12 flex flex-col items-center text-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-8 h-px bg-primary" />
            <span className="font-condensed text-xs tracking-[0.4em] uppercase text-primary">
              Stream
            </span>
            <div className="w-8 h-px bg-primary" />
          </div>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-foreground leading-none">
            <span className="text-primary text-neon-glow-sm">Music</span>
          </h2>
          <p className="font-condensed text-sm tracking-widest uppercase text-muted-foreground">
            Stream IFEELGK on Spotify
          </p>
        </div>

        {/* Spotify embed */}
        <div className="fade-in-up fade-in-up-delay-2 border border-border overflow-hidden">
          <iframe
            src="https://open.spotify.com/embed/artist/3nSwwTWRy5nuUb3HIjGUz5?utm_source=generator&theme=0"
            width="100%"
            height="380"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
            title="IFEELGK on Spotify"
            style={{ borderRadius: 0 }}
          />
        </div>

        {/* CTA */}
        <div className="fade-in-up fade-in-up-delay-3 mt-8 flex justify-center">
          <a
            href="https://open.spotify.com/artist/3nSwwTWRy5nuUb3HIjGUz5?si=L9ik9mJ4RKe3SYnVu5aHLA"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="music.primary_button"
            className="font-condensed font-bold tracking-widest uppercase text-sm flex items-center gap-3 bg-primary text-primary-foreground px-8 py-3 hover:bg-primary/90 transition-colors neon-border"
          >
            <SiSpotify size={18} />
            Listen on Spotify
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

// ---- Videos Section ----
function VideosSection() {
  const ref = useFadeInOnScroll();

  return (
    <section
      id="videos"
      data-ocid="videos.section"
      className="relative py-24 md:py-32 section-scroll-margin"
      ref={ref}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="fade-in-up mb-12 flex flex-col items-center text-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-8 h-px bg-primary" />
            <span className="font-condensed text-xs tracking-[0.4em] uppercase text-primary">
              Watch
            </span>
            <div className="w-8 h-px bg-primary" />
          </div>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-foreground leading-none">
            <span className="text-primary text-neon-glow-sm">Videos</span>
          </h2>
          <p className="font-condensed text-sm tracking-widest uppercase text-muted-foreground">
            Watch latest videos on YouTube
          </p>
        </div>

        {/* YouTube embed */}
        <div className="fade-in-up fade-in-up-delay-2 border border-border overflow-hidden relative">
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/i9TfO6VIQCU?si=vFKjyqsXmhdl9gPN"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              title="IFEELGK YouTube Video"
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>

        {/* CTA */}
        <div className="fade-in-up fade-in-up-delay-3 mt-8 flex justify-center">
          <a
            href="https://www.youtube.com/channel/UCJH9sT22BpOZWKJ2vYdoFxA"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="videos.primary_button"
            className="font-condensed font-bold tracking-widest uppercase text-sm flex items-center gap-3 border border-primary text-primary px-8 py-3 hover:bg-primary/10 transition-colors"
          >
            <SiYoutube size={18} />
            Subscribe on YouTube
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

// ---- Social Section ----
function SocialSection() {
  const ref = useFadeInOnScroll();

  const socials = [
    {
      label: "Instagram",
      handle: "@ifeelgk_",
      href: "https://www.instagram.com/ifeelgk_",
      icon: <SiInstagram size={32} />,
      ocid: "social.item.1",
    },
    {
      label: "Spotify",
      handle: "IFEELGK",
      href: "https://open.spotify.com/artist/3nSwwTWRy5nuUb3HIjGUz5?si=L9ik9mJ4RKe3SYnVu5aHLA",
      icon: <SiSpotify size={32} />,
      ocid: "social.item.2",
    },
    {
      label: "YouTube",
      handle: "IFEELGK Channel",
      href: "https://www.youtube.com/channel/UCJH9sT22BpOZWKJ2vYdoFxA",
      icon: <SiYoutube size={32} />,
      ocid: "social.item.3",
    },
  ];

  return (
    <section
      id="connect"
      data-ocid="social.section"
      className="relative py-24 md:py-32 section-scroll-margin bg-card"
      ref={ref}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="fade-in-up mb-12 flex flex-col items-center text-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-8 h-px bg-primary" />
            <span className="font-condensed text-xs tracking-[0.4em] uppercase text-primary">
              Social
            </span>
            <div className="w-8 h-px bg-primary" />
          </div>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-foreground leading-none">
            <span className="text-primary text-neon-glow-sm">Connect</span>
          </h2>
          <p className="font-condensed text-sm tracking-widest uppercase text-muted-foreground">
            Follow IFEELGK on all platforms
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {socials.map((social, i) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid={social.ocid}
              className={`fade-in-up fade-in-up-delay-${i + 2} group flex flex-col items-center gap-4 p-8 bg-background border border-border neon-border-hover cursor-pointer`}
            >
              <div className="text-primary group-hover:scale-110 transition-transform duration-300">
                {social.icon}
              </div>
              <div className="text-center">
                <div className="font-condensed font-bold tracking-widest uppercase text-sm text-foreground group-hover:text-primary transition-colors">
                  {social.label}
                </div>
                <div className="font-body text-xs text-muted-foreground mt-1">
                  {social.handle}
                </div>
              </div>
              <ExternalLink
                size={14}
                className="text-muted-foreground group-hover:text-primary transition-colors"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Contact Section ----
type FormStatus = "idle" | "loading" | "success" | "error";

function ContactSection() {
  const ref = useFadeInOnScroll();
  const { actor } = useActor();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      await actor.submitContactRequest(name, email, message, true);
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (_err) {
      setStatus("error");
      setErrorMsg(
        "Something went wrong. Please try again or reach out on Instagram.",
      );
    }
  };

  return (
    <section
      id="contact"
      data-ocid="contact.section"
      className="relative py-24 md:py-32 section-scroll-margin"
      ref={ref}
    >
      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: "oklch(0.82 0.18 85)" }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="fade-in-up mb-12 flex flex-col items-center text-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-8 h-px bg-primary" />
            <span className="font-condensed text-xs tracking-[0.4em] uppercase text-primary">
              Reach Out
            </span>
            <div className="w-8 h-px bg-primary" />
          </div>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-foreground leading-none text-center">
            Collabs &{" "}
            <span className="text-primary text-neon-glow-sm">Bookings</span>
          </h2>
          <p className="font-body text-muted-foreground text-base max-w-lg text-center">
            For collaborations and live concerts, please contact via Instagram.
          </p>
        </div>

        {/* Instagram DM CTA */}
        <div className="fade-in-up fade-in-up-delay-2 flex justify-center mb-12">
          <a
            href="https://www.instagram.com/ifeelgk_"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="contact.primary_button"
            className="font-condensed font-bold tracking-widest uppercase text-base flex items-center gap-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-400 text-white px-10 py-4 hover:opacity-90 transition-opacity"
          >
            <Instagram size={20} />
            DM on Instagram
            <ExternalLink size={16} />
          </a>
        </div>

        {/* Divider */}
        <div className="fade-in-up fade-in-up-delay-2 flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-border" />
          <span className="font-condensed text-xs tracking-widest uppercase text-muted-foreground">
            Or send a message
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Contact form */}
        <form
          onSubmit={handleSubmit}
          className="fade-in-up fade-in-up-delay-3 space-y-4 bg-card border border-border p-6 md:p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                htmlFor="contact-name"
                className="font-condensed text-xs tracking-widest uppercase text-muted-foreground"
              >
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                data-ocid="contact.input"
                className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors font-body"
              />
            </div>
            <div className="space-y-1.5">
              <label
                htmlFor="contact-email"
                className="font-condensed text-xs tracking-widest uppercase text-muted-foreground"
              >
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                data-ocid="contact.input"
                className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors font-body"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label
              htmlFor="contact-message"
              className="font-condensed text-xs tracking-widest uppercase text-muted-foreground"
            >
              Message
            </label>
            <textarea
              id="contact-message"
              placeholder="Tell IFEELGK about your project, event, or collab idea..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={5}
              data-ocid="contact.textarea"
              className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none font-body"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={status === "loading" || !actor}
            data-ocid="contact.submit_button"
            className="w-full font-condensed font-bold tracking-widest uppercase text-sm flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 px-8 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors neon-border"
          >
            {status === "loading" ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </button>

          {/* State feedback */}
          {status === "loading" && (
            <div
              data-ocid="contact.loading_state"
              className="flex items-center gap-2 text-muted-foreground text-sm font-body"
            >
              <Loader2 size={14} className="animate-spin" />
              Sending your message...
            </div>
          )}
          {status === "success" && (
            <div
              data-ocid="contact.success_state"
              className="flex items-center gap-2 text-sm font-body"
              style={{ color: "oklch(0.75 0.18 140)" }}
            >
              <CheckCircle2 size={16} />
              Message sent! IFEELGK will get back to you soon.
            </div>
          )}
          {status === "error" && (
            <div
              data-ocid="contact.error_state"
              className="flex items-center gap-2 text-sm text-destructive font-body"
            >
              <AlertCircle size={16} />
              {errorMsg}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

// ---- Footer ----
function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    {
      href: "https://www.instagram.com/ifeelgk_",
      icon: <SiInstagram size={16} />,
      label: "Instagram",
    },
    {
      href: "https://open.spotify.com/artist/3nSwwTWRy5nuUb3HIjGUz5?si=L9ik9mJ4RKe3SYnVu5aHLA",
      icon: <SiSpotify size={16} />,
      label: "Spotify",
    },
    {
      href: "https://www.youtube.com/channel/UCJH9sT22BpOZWKJ2vYdoFxA",
      icon: <SiYoutube size={16} />,
      label: "YouTube",
    },
  ];

  return (
    <footer className="relative border-t border-border bg-card py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-6">
        {/* Logo */}
        <div className="font-display text-3xl text-primary text-neon-glow-sm tracking-widest">
          IFEELGK
        </div>

        {/* Tagline */}
        <p className="font-condensed text-xs tracking-widest uppercase text-muted-foreground text-center">
          Underground Hip-Hop from Ujjain, India
        </p>

        {/* Social icons */}
        <div className="flex items-center gap-6">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* Separator */}
        <div className="w-32 h-px bg-border" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-2 text-center">
          <span className="font-body text-xs text-muted-foreground">
            IFEELGK © {year}
          </span>
        </div>
      </div>
    </footer>
  );
}

// ---- App Root ----
export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <MusicSection />
        <VideosSection />
        <SocialSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
