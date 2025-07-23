import "react-quill/dist/quill.snow.css";
import Container from "@/components/shared/container";
import { getStaticPage } from "@/api/static-page";

export default async function Privacy() {
  const staticPage = await getStaticPage("PRIVACY_POLICY");

  return (
    <Container>
      <div className="mb-10 lg:mb-20">
        <h1 className="text-2xl font-bold">Privacy Policy</h1>

        <div
          className="prose ql-editor !px-0"
          dangerouslySetInnerHTML={{ __html: staticPage?.data?.content }}
        />
      </div>
    </Container>
  );
}
