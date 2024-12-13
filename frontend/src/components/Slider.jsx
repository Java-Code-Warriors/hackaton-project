import React, { useEffect, useState, useRef, useCallback } from 'react';
import '../css/slider.css'
const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const giftListRef = useRef(null);
  const giftItemsRef = useRef([]);
  const [totalItems, setTotalItems] = useState(0);

  // Функция для обновления карусели
  const updateCarousel = useCallback(() => {
    giftItemsRef.current.forEach((item, index) => {
      item.classList.remove('active');
    });

    giftItemsRef.current[currentIndex].classList.add('active');
    giftListRef.current.style.transform = `translateX(-${currentIndex * (100 / totalItems)}%)`;
  }, [currentIndex, totalItems]);

  // Функция для перехода к следующему слайду
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
  }, [totalItems]);

  // Инициализация карусели
  useEffect(() => {
    if (giftItemsRef.current.length === 0) {
      giftItemsRef.current = Array.from(document.querySelectorAll('.gift-item'));
      setTotalItems(giftItemsRef.current.length - 1);
    }

    updateCarousel();
    let carouselInterval = setInterval(nextSlide, 2000);

    return () => clearInterval(carouselInterval);
  }, [nextSlide, updateCarousel]); // Добавлены зависимости

  // Обработчик клика по индикаторам
  const handleIndicatorClick = (index) => {
    setCurrentIndex(index);
    updateCarousel();
  };

  return (
    <main>
      <section className="popular-gifts">
        <h2>🎄 Популярные новогодние подарки 2024 🎁</h2>
        <div className="gift-carousel">
          <div className="gift-list" ref={giftListRef}>
            <div className="gift-item">
              <div className="gift-info">
              <img  src="https://c.dns-shop.ru/thumb/st4/fit/500/500/bcfe98ec04d91e53f23522b65e173cdd/bcfa0c6762d7ceab95f86329a3218371484b5862a90953adb2eb4f170730ab30.jpg" alt="product main image"/>
              </div>
              <p>Наушники Apple AirPods Max</p>
              <button>Подробнее</button>
            </div>
            <div className="gift-item">
              <div className="gift-info">
              <img  alt="product main image" src="https://c.dns-shop.ru/thumb/st1/fit/500/500/af9ffe8f6900a8f46e7c970de83fdc64/88110a7cc2d96c0627f8dc46d40862414daa1013e0683c4412a4a0c75e5b6b13.jpg"/>
              </div>
              <p>Смарт-часы Apple Watch SE</p>
              <button>Подробнее</button>
            </div>
            <div className="gift-item">
              <div className="gift-info">
              <img  alt="product main image" src="https://c.dns-shop.ru/thumb/st1/fit/500/500/e853c72719633e353b65193e301cc9e9/8517b5d57caefeef97194196729bd221e1606cafc9a005f423b21eb56314ba96.jpg"/>
              </div>
              <p>Смартфон Apple iPhone 15 Pro</p>
              <button>Подробнее</button>
            </div>
            <div className="gift-item">
              <div className="gift-info">
              <img src="https://c.dns-shop.ru/thumb/st4/fit/500/500/73f35aca6132bfedaef89f343dc07c57/4cb2d35f16534d31d4b63cfe2b2ab7a4ea8c54790f67fa5121ea56cb7dab6a02.jpg" />
              </div>
              <p>Кофемашина автоматическая DeLonghi</p>
              <button>Подробнее</button>
            </div>
            <div className="gift-item">
              <div className="gift-info">
              <img src="https://c.dns-shop.ru/thumb/st4/fit/500/500/e453d84ba4a96993d9abbc82b5c226ed/471816071116edaa8cf04e5d168b93ceb350290f4c52bbcf47c3bcbd01bfb5b8.jpg"/>
              </div>
              <p>Ноутбук ASUS ROG Strix SCAR 18</p>
              <button>Подробнее</button>
            </div>
            <div className="gift-item">
              <div className="gift-info">
              <img src="https://c.dns-shop.ru/thumb/st1/fit/500/500/823fb44cacf2d5969511d8ceecac5310/8db84c9a680bbc135d80653a4cd74f8baae43ac12b9cbbc64ec547700e297cd6.jpg"/>
              </div>
              <p>Мультистайлер Dyson Airwrap HS05 Complete Long</p>
              <button>Подробнее</button>
            </div>
            <div className="gift-item clone">
              <div className="gift-info">
              <img src="https://c.dns-shop.ru/thumb/st4/fit/500/500/34db974dde0e5f503ac8da40a23c0e44/cfb0ea5fc6b43e1e55467ef80f8464ff034d86c8d5f6824a8fd7b6db19511dfe.jpg"/>
              </div>
              <p>Игровая консоль PlayStation 5</p>
              <button>Подробнее</button>
            </div>
          </div>
          <div className="carousel-indicators">
            {Array.from({ length: totalItems + 1 }).map((_, index) => (
              <span
                key={index}
                data-index={index}
                className={index === currentIndex ? 'active' : ''}
                onClick={() => handleIndicatorClick(index)}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Slider;