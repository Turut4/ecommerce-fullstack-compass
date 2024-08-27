export default function NewsLetterForm() {
  return (
    <form className="newsletter-form">
      <input type="email" placeholder="Enter Email Address" required />
      <button type="submit">Subscribe</button>
    </form>
  );
}
