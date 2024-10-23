import Hero from '../components/Hero';

export default function Error() {
  const errorData = {
    title: "404 - Not found",
    content: "The page you are looking for cannot be found",
    destination: "/",
    buttonLabel: "Back home"
  };

  return (
    <Hero data={errorData} />
  );
}