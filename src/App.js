import "./styles.css";
import { v4 as uuidv4 } from "uuid"; // npm install uuid
import LibraryManager from "./components/LibraryManager";

const bookstore = [
  {
    id: uuidv4(),
    title: "Lord of the Rings",
    author: "J. R. R. Tolkien",
    description:
      "About a quest to destroy a powerful, evil artifact called the One Ring",
    pages: 700,
    quantity: 25,
    imageURL:
      "https://m.media-amazon.com/images/S/pv-target-images/6371c93d1bc13c04f6db4cff153a4c5b8da969b204254cbad3cd6140b6e3713c._SX1080_FMjpg_.jpg",
  },
  {
    id: uuidv4(),
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J. K. Rowling",
    description:
      "A young wizard discovers his magical heritage and attends Hogwarts",
    pages: 309,
    quantity: 10,
    imageURL:
      "https://www.universalstudioshollywood.com/tridiondata/ush/en/us/files/images/ush-wwohp-golden-snitch-b.jpg",
  },
  {
    id: uuidv4(),
    title: "The Hobbit",
    author: "J. R. R. Tolkien",
    description: "Bilbo Baggins goes on an unexpected adventure with dwarves",
    pages: 310,
    quantity: 3,
    imageURL: "https://cdn.europosters.eu/image/1300/104630.jpg",
  },
];

export default function App() {
  return (
    <div className="app">
      <LibraryManager data={bookstore} />
    </div>
  );
}
