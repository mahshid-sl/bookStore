import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import GridLayout from "../components/GridLayout";

// slug to title converter
const slugToTitle = (slug) => {
  if (!slug) return "";
  return slug.replace(/-/g, " ");
};

function CategoryPage() {
  const { bookType, categorySlug, subcategorySlug } = useParams();
  const [baseUrl, setBaseUrl] = useState("");
  const [pageTitle, setPageTitle] = useState("");
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    // dynamic API URL construction
    let url = `${import.meta.env.VITE_API_URL}/books?`;
    if (bookType === "audiobooks") {
      url += "isAudiobook=true";
    } else if (bookType === "ebooks") {
      url += "isAudiobook=false";
    }
    if (categorySlug) {
      url += `&category=${slugToTitle(categorySlug)}`;
    }
    if (subcategorySlug) {
      url += `&subcategory=${slugToTitle(subcategorySlug)}`;
    }
    setBaseUrl(url);

    // create dynamic title and breadcrumbs
    const bookTypeName =
      bookType === "audiobooks" ? "کتاب صوتی" : "کتاب الکترونیک";
    const categoryTitle = slugToTitle(categorySlug);
    const subcategoryTitle = slugToTitle(subcategorySlug);

    const path = [{ name: "خانه", path: "/" }];
    path.push({ name: bookTypeName, path: `/${bookType}` });

    let title = bookTypeName;

    if (categorySlug) {
      title = categoryTitle;
      path.push({ name: categoryTitle, path: `/${bookType}/${categorySlug}` });
    }
    if (subcategorySlug) {
      title = subcategoryTitle;
      path.push({
        name: subcategoryTitle,
        path: `/${bookType}/${categorySlug}/${subcategorySlug}`,
      });
    }

    // ensure at least one item exists after "home"
    if (path.length > 1) {
      // set the last item's path to null
      path[path.length - 1].path = null;
    }

    setPageTitle(title);
    setBreadcrumbs(path);
  }, [bookType, categorySlug, subcategorySlug]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* dynamic breadcrumbs */}
      <nav className="flex text-sm text-gray-500 mb-8 items-center flex-wrap">
        {breadcrumbs.map((crumb, index) => (
          <div key={index} className="flex items-center">
            {/* dynamic breadcrumb links */}
            {crumb.path ? (
              <Link to={crumb.path} className="hover:text-amber-500">
                {crumb.name}
              </Link>
            ) : (
              <span className="font-semibold text-gray-700">{crumb.name}</span>
            )}

            {index < breadcrumbs.length - 1 && (
              <ChevronLeft size={20} className="mx-1" />
            )}
          </div>
        ))}
      </nav>

      <h1 className="text-3xl font-extrabold text-right mb-8 border-r-4 border-amber-500 pr-4">
        {pageTitle}
      </h1>

      {baseUrl && <GridLayout baseUrl={baseUrl} />}
    </section>
  );
}

export default CategoryPage;
