import './search.css';

export const Search = ({ setSearchQuery }) => {
  return (
    <input
      type="text"
      className="search__input"
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Поиск по сайту"
    />
  );
};
