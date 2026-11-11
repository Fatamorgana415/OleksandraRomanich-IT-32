import RequestForm from "./components/RequestForm";

export default function Home() {
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Запис на консультацію</h1>
      <p style={{ color: "#666", marginBottom: "1.5rem" }}>
        Заповніть форму нижче, щоб записатися на консультацію до викладача. Усі поля є обов'язковими.
      </p>
      
      <RequestForm />
    </main>
  );
}