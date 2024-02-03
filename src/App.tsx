import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { data } from "./data";
import "./index.css";

type AnswerStatus = "correct" | "wrong";

function App() {
  const [totalItems, setTotalItems] = useState(
    Array.from(Object.entries(data))
  );
  const [selectedItem, setSelectedItem] = useState<string>();
  const [currentAnswer, setCurrentAnswer] = useState<{
    status: AnswerStatus;
    pair: string[];
  }>();

  const handleClick = (item: string) => {
    if (!selectedItem) {
      setSelectedItem(item);
      return;
    }

    const itemPair = totalItems.find((innerItems) =>
      innerItems.includes(selectedItem)
    );

    if (itemPair?.includes(item)) {
      setTimeout(() => {
        setTotalItems(
          totalItems.filter(
            (innerItems) =>
              !innerItems.includes(selectedItem) && !innerItems.includes(item)
          )
        );
      }, 1000);

      setCurrentAnswer({ status: "correct", pair: [selectedItem, item] });
      setSelectedItem(undefined);
    } else {
      setSelectedItem(undefined);
      setCurrentAnswer({ status: "wrong", pair: [selectedItem, item] });
      setTimeout(() => setCurrentAnswer(undefined), 1000);
    }
  };

  useEffect(() => {
    if (!totalItems.length) {
      alert("You won !");
    }
  }, [totalItems]);

  const totalItemsShuffledFlat = useMemo(
    () => shuffle(totalItems.flat()),
    [totalItems]
  );

  return (
    <div className="container">
      <h1>Match countries with cities</h1>

      <div className="items-container">
        {totalItemsShuffledFlat.map((item) => (
          <button
            key={item}
            style={{
              backgroundColor:
                currentAnswer && currentAnswer.pair.includes(item)
                  ? currentAnswer.status === "correct"
                    ? "green"
                    : "red"
                  : undefined,
              borderColor: selectedItem === item ? "blue" : undefined,
            }}
            onClick={handleClick.bind(null, item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

function shuffle(array: string[]) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export default App;
