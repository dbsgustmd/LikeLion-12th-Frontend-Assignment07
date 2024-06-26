import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import jsonData from "./JMT.json";
import Input from "./components/Input";
import { useNavigate } from "react-router-dom";
import useInput from "./components/UseInput";

// restaurants는 JMT.json의 배열 값이라 []로 초기값 설정, search는 그냥 변수라 ''로 초기값 설정. 각각 set~ 함수로 값이 변함
function App() {
  const [restaurants, setRestaurants] = useState([]);
  const searchInput = useInput("");
  const navigate = useNavigate();

  // 첫 실행에만 jsonData 쭉 보여주게 함
  useEffect(() => {
    setRestaurants(jsonData);
  }, []);

  // filter 메서드를 사용하여 검색한 키워드 중에 restaurant의 name에 포함되는 것이 있는지 확인, includes 메서드는 일치하는 키워드가 있으면 true, 없으면 false
  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.includes(searchInput.value)
  );

  // 기존 코드는 navigate 함수 호출 시, state를 전달하지 않았기 때문에 useEffect에서 location.state가 정의되지 않았음.
  const handleDetailClick = (id) => {
    const restaurant = restaurants.find((r) => r.id === id);
    navigate(`/${id}`, { state: { liked: restaurant.liked } });
  };

  // liked id의 상태가 true 또는 false로 바뀌는 것을 업데이트 해주는 함수
  const handleLikeClick = (id) => {
    setRestaurants((prevRestaurants) =>
      prevRestaurants.map((restaurant) =>
        restaurant.id === id
          ? { ...restaurant, liked: !restaurant.liked }
          : restaurant
      )
    );
  };

  return (
    // Input 스타일 컴포넌트 사용,  사용자가 입력(e.target.value는 사용자가 입력한 값) => onChange 발생 => setSearch() 호출되면서 search의 값이 e.target.value로 바뀜
    <div className="App">
      <Input type="text" {...searchInput} placeholder="입력하세요" />
      {/* map()함수로 필터링된 음식점 키워드 들을 쭉 훑으면서 일치하는 음식점의 배열로 싹 새롭게 갈아줌 */}
      <div className="cards">
        {filteredRestaurants.map((restaurant) => (
          <Card
            key={restaurant.id}
            id={restaurant.id}
            name={restaurant.name}
            address={restaurant.address}
            imageUrl={restaurant.imageUrl}
            liked={restaurant.liked}
            onLikeClick={handleLikeClick}
            onDetailsClick={() => handleDetailClick(restaurant.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
