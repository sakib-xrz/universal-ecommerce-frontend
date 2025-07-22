import Link from "next/link";

const SectionHeading = ({ title, link, linkText = "See All" }) => {
  return (
    <>
      <div className="flex items-center justify-between pt-2 sm:items-end">
        <h2 className="text-left text-lg font-semibold uppercase text-primary sm:text-center sm:text-2xl">
          {title}
        </h2>
        {link && (
          <Link
            aria-label={linkText}
            href={link}
            className="text-sm font-medium uppercase hover:text-primary hover:underline"
          >
            {linkText}
          </Link>
        )}
      </div>
      <div className="mt-1 h-0.5 flex-1 bg-gray-200">
        <div className="h-0.5 w-48 bg-primary sm:w-64"></div>
      </div>
    </>
  );
};

export default SectionHeading;
