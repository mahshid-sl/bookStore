import BookSlider from "./BookSlider";

function NewestBooks() {
  return (
    <BookSlider
      title="جدیدترین کتاب ها"
      viewAllLink="/newbook"
      fetchUrl="http://localhost:3001/books?_sort=publicationYear&_order=desc&_limit=10"
    />
  );
}

export default NewestBooks;
