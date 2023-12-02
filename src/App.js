import { useEffect, useRef, useState } from 'react';
import './scss/style.scss';

function App() {
  const [active, setActive] = useState(null);
  const [inputSearchTerm, setInputSearchTerm] = useState('');
  const [value, setValue] = useState('');
  const [data, setData] = useState([
    { title: "Note 1", description: "Officiis quisquam officia exercitationem iusto tenetur rem ea inventore cupiditate" },
    { title: "Note 2", description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque consequuntur tenetur at corrupti distinctio? Officiis quisquam officia exercitationem iusto tenetur rem ea inventore cupiditate, ratione sint perspiciatis vitae repellendus ex." },
    { title: "Note 3", description: "Atque consequuntur tenetur at corrupti distinctio? Officiis quisquam officia exercitationem iusto tenetur rem ea inventore cupiditate, ratione sint perspiciatis vitae repellendus ex" },
    { title: "Note 4", description: "Officiis quisquam officia exercitationem iusto tenetur rem ea inventore cupiditate" }
  ]);

  const [filtered, setFiltered] = useState(data);

  const textareaRef = useRef();

  const handleInputSearch = (searchTerm) => {
    setInputSearchTerm(searchTerm);

    const newFiltered = data.filter((item) =>
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFiltered(newFiltered);
    setActive(null);
  };


  useEffect(() => {
    if (active && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [active]);

  const handleClick = (title, description) => {
    setActive(title);
    setInputSearchTerm('');
    setValue(description || '');
  };

  const handleDelete = () => {
    if (active) {
      const updatedData = data.filter(item => item.title !== active);
      setData(updatedData);
      setFiltered(updatedData); // Update filtered data after deleting an item
      setActive(null);
      setValue('');
    }
  };

  const handleAdd = () => {
    if (value.trim() !== '') {
      const newItem = {
        title: `Note ${data.length + 1}`,
        description: '',
      };

      setData([...data, newItem]);
      setFiltered([...data, newItem]); // Update filtered data after adding a new item
      setActive(newItem.title);
      setValue('');
    }
  };

  const handleTextareaChange = (e) => {
    const updatedValue = e.target.value;
    setValue(updatedValue);

    if (active) {
      setFiltered((prevData) =>
        prevData.map((item) =>
          item.title === active ? { ...item, description: updatedValue.trim() } : item
        )
      );
      setData((prevData) =>
        prevData.map((item) =>
          item.title === active ? { ...item, description: updatedValue.trim() } : item
        )
      );
    }
  };

  const handleSearchChange = (e, searchHandler) => {
    searchHandler(e.target.value);
  };

  return (
    <div className="container">
      <div className="notes">
        <div className="header">
          <div className="action">
            <div className="ball red"></div>
            <div className="ball yellow"></div>
            <div className="ball green"></div>
          </div>
          <div>
            <button className="delete" onClick={handleDelete}>
              <i className="fa-regular fa-trash-can"></i>
            </button>
            <button className="add" onClick={handleAdd}>
              <i className="fa-regular fa-pen-to-square"></i>
            </button>
            <button className="search">
              <i className="icon fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder="Search"
                value={inputSearchTerm}
                onChange={(e) => handleSearchChange(e, handleInputSearch)}
              />
            </button>
          </div>
        </div>
        <div className="content">
          <div className="left">
            {filtered?.map((item) => (
              <div
                key={item?.title}
                className={`item ${active === item?.title ? 'active' : ''}`}
                onClick={() => handleClick(item?.title, item?.description)}
              >
                <p className="item-title">{item.title ? item.title.slice(0, 36) : ''}</p>
                <p className="item-body">{item.description ? (item.description.length > 36 ? item.description.slice(0, 36) + "..." : item.description) : ''}</p>
              </div>
            ))}
          </div>
          <div className="main">
            {active && (
              <textarea
                ref={textareaRef}
                value={value}
                onChange={handleTextareaChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.shiftKey) {
                    handleAdd();
                  }
                }}
              ></textarea>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
