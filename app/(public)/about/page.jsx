import "react-quill/dist/quill.snow.css";
import Container from "@/components/shared/container";
import { getStaticPage } from "@/api/static-page";

export async function generateMetadata() {
  const staticPage = await getStaticPage("ABOUT_US");
  return {
    title: staticPage?.data?.title,
    description: staticPage?.data?.description,
  };
}

export default async function About() {
  const staticPage = await getStaticPage("ABOUT_US");

  return (
    <Container>
      <div className="mb-10 lg:mb-20">
        <h1 className="text-2xl font-bold">About Us</h1>

        <div
          className="prose ql-editor !px-0"
          dangerouslySetInnerHTML={{ __html: staticPage?.data?.content }}
        />
      </div>
    </Container>
  );
}
