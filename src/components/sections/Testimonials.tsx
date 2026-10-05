import { Container } from "../ui/Container";

const testimonials = [
  {
    name: "Maya Chen",
    role: "Product designer",
    initials: "MC",
    quote:
      "The one-task approach makes starting feel less overwhelming. I like having a clear beginning and a real break.",
    featured: true,
  },
  {
    name: "Alex Morgan",
    role: "University student",
    initials: "AM",
    quote:
      "A short focus session helps me get into my notes without turning the whole day into a study marathon.",
    featured: false,
  },
  {
    name: "Sam Rivera",
    role: "Freelance developer",
    initials: "SR",
    quote:
      "I can plan a session around one piece of work and see what I've finished by the end of the day.",
    featured: false,
  },
];

export function Testimonials() {
  return (
    <section className="testimonial-section">
      <Container>
        <div className="section-heading">
          <div>
            <p className="eyebrow">04 / A LITTLE MORE PRESENT</p>
            <h2>
              Small routines.
              <br />
              <em>Meaningful moments.</em>
            </h2>
          </div>
          <p>
            Illustrative stories for this
            <br />
            fictional product concept.
          </p>
        </div>
        <div className="testimonials-layout">
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              className={`testimonial-quote ${t.featured ? "is-featured" : ""}`}
              style={{ ["--qi" as string]: i }}
            >
              <span className="quote-mark" aria-hidden="true">
                “
              </span>
              <blockquote>{t.quote}</blockquote>
              <figcaption className="testimonial-author">
                <span aria-hidden="true">{t.initials}</span>
                <div>
                  <strong>{t.name}</strong>
                  <small>{t.role}</small>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
