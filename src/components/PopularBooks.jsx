import BookSlider from "./BookSlider";

function PopularBooks({ ref }) {
  return (
    <BookSlider
      ref={ref}
      title="پرطرفدارترین کتاب ها"
      viewAllLink="/popularbook"
      fetchUrl="http://localhost:3001/books?_sort=rating&_order=desc&_limit=10"
    />
  );
}

export default PopularBooks;
