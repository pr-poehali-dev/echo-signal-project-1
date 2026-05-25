import { useState } from "react"
import { useReveal } from "@/hooks/use-reveal"
import { MagneticButton } from "@/components/magnetic-button"

const CATEGORIES = ["Все", "Автоклавы и стерилизаторы", "Комплектующие и аксессуары", "Термодымовые камеры", "Молочная промышленность", "Мясная промышленность", "Рыбная промышленность"]

const PRODUCTS = [
  { id: 1, name: "Автоклав ЗС-24/01 на 250 л, электрический, 45 кВт", capacity: "250 л", category: "Автоклавы и стерилизаторы" },
  { id: 2, name: "Автоклав ЗС-24/01Н на 250 л, электрический, 45 кВт, нержавейка AISI 304", capacity: "250 л", category: "Автоклавы и стерилизаторы" },
  { id: 3, name: "Автоклав ЗС-24/01П паровой на 250 л", capacity: "250 л", category: "Автоклавы и стерилизаторы" },
  { id: 4, name: "Автоклав ЗС-24/01ПН паровой на 250 л", capacity: "250 л", category: "Автоклавы и стерилизаторы" },
  { id: 5, name: "Автоклав ЗС-24/02 на 500 л, электрический, 60 кВт", capacity: "500 л", category: "Автоклавы и стерилизаторы" },
  { id: 6, name: "Автоклав ЗС-24/02Н на 500 л, электрический, 60 кВт", capacity: "500 л", category: "Автоклавы и стерилизаторы" },
  { id: 7, name: "Автоклав ЗС-24/02П паровой на 500 л", capacity: "500 л", category: "Автоклавы и стерилизаторы" },
  { id: 8, name: "Автоклав ЗС-24/02ПН паровой на 500 л", capacity: "500 л", category: "Автоклавы и стерилизаторы" },
  { id: 9, name: "Автоклав ЗС-24/03 на 650 л, электрический, 60 кВт", capacity: "650 л", category: "Автоклавы и стерилизаторы" },
  { id: 10, name: "Автоклав ЗС-24/03Н на 650 л, электрический", capacity: "650 л", category: "Автоклавы и стерилизаторы" },
  { id: 11, name: "Автоклав ЗС-24/03П паровой на 650 л", capacity: "650 л", category: "Автоклавы и стерилизаторы" },
  { id: 12, name: "Автоклав ЗС-24/03ПН паровой на 650 л", capacity: "650 л", category: "Автоклавы и стерилизаторы" },
  { id: 13, name: "Автоклав ЗС-24/04 на 800 л, электрический, 60 кВт", capacity: "800 л", category: "Автоклавы и стерилизаторы" },
  { id: 14, name: "Автоклав ЗС-24/04Н на 800 л, 60 кВт", capacity: "800 л", category: "Автоклавы и стерилизаторы" },
  { id: 15, name: "Автоклав ЗС-24/04 паровой на 800 л", capacity: "800 л", category: "Автоклавы и стерилизаторы" },
  { id: 16, name: "Автоклав ЗС-24/04ПН паровой на 800 л", capacity: "800 л", category: "Автоклавы и стерилизаторы" },
  { id: 17, name: "Автоклав ЗС-24/05 на 950 л, электрический", capacity: "950 л", category: "Автоклавы и стерилизаторы" },
  { id: 18, name: "Автоклав ЗС-24/05Н на 950 л, электрический, 75 кВт", capacity: "950 л", category: "Автоклавы и стерилизаторы" },
  { id: 19, name: "Автоклав ЗС-24/05П паровой на 950 л", capacity: "950 л", category: "Автоклавы и стерилизаторы" },
  { id: 20, name: "Автоклав ЗС-24/05ПН паровой на 950 л", capacity: "950 л", category: "Автоклавы и стерилизаторы" },
  { id: 21, name: "Стерилизатор банок ЗС-24/15", capacity: "", category: "Автоклавы и стерилизаторы" },
  { id: 22, name: "Стерилизатор банок ЗС-24/24", capacity: "", category: "Автоклавы и стерилизаторы" },
  { id: 23, name: "Стерилизатор банок ЗС-24/28", capacity: "", category: "Автоклавы и стерилизаторы" },
  { id: 24, name: "Стерилизатор банок ЗС-24/39", capacity: "", category: "Автоклавы и стерилизаторы" },
  { id: 25, name: "Стерилизатор крышек серии ЗС-24", capacity: "", category: "Автоклавы и стерилизаторы" },
  { id: 26, name: "Вакуум-закаточная машина серии ЗС-24", capacity: "", category: "Автоклавы и стерилизаторы" },
  { id: 27, name: "Вакуум-закаточная машина ЗС-24/1", capacity: "", category: "Автоклавы и стерилизаторы" },

  { id: 28, name: "Корзина для автоклава ЗС-24, 192 л", capacity: "192 л", category: "Комплектующие и аксессуары" },
  { id: 29, name: "Корзина для автоклава ЗС-24/02, 320 л", capacity: "320 л", category: "Комплектующие и аксессуары" },
  { id: 30, name: "Корзина для автоклава ЗС-24/03, 230 л", capacity: "230 л", category: "Комплектующие и аксессуары" },
  { id: 31, name: "Корзина для автоклава ЗС-24/04, 300 л", capacity: "300 л", category: "Комплектующие и аксессуары" },
  { id: 32, name: "Корзина для автоклава ЗС-24/05, 320 л", capacity: "320 л", category: "Комплектующие и аксессуары" },
  { id: 33, name: "Механизм выгрузки корзин автоклава ЗС-24", capacity: "", category: "Комплектующие и аксессуары" },
  { id: 34, name: "Тележка для корзин автоклава", capacity: "", category: "Комплектующие и аксессуары" },
  { id: 35, name: "Прокладки для корзин автоклава", capacity: "", category: "Комплектующие и аксессуары" },
  { id: 36, name: "Прокладки для корзин автоклава из нержавеющей стали", capacity: "", category: "Комплектующие и аксессуары" },
  { id: 37, name: "Резиновое уплотнение для крышки автоклава", capacity: "В наличии", category: "Комплектующие и аксессуары" },

  { id: 38, name: "Камера термодымовая ЗС-24/КТ100", capacity: "Загрузка 100 кг", category: "Термодымовые камеры" },
  { id: 39, name: "Камера термодымовая ЗС-24/КТ200", capacity: "Загрузка 200 кг", category: "Термодымовые камеры" },
  { id: 40, name: "Камера термодымовая ЗС-24/КТ400", capacity: "Загрузка 400 кг", category: "Термодымовые камеры" },
  { id: 41, name: "Камера термодымовая ЗС-24/КТ600", capacity: "Загрузка 600 кг", category: "Термодымовые камеры" },

  { id: 42, name: "Комплект для детской молочной кухни ИПКС-0114", capacity: "800 л/сутки", category: "Молочная промышленность" },
  { id: 43, name: "Комплект для восстановленного молока ИПКС-0110", capacity: "200–1000 л/смену", category: "Молочная промышленность" },
  { id: 44, name: "Комплект для восстановленного молока ИПКС-0111", capacity: "400–2000 л/смену", category: "Молочная промышленность" },
  { id: 45, name: "Комплект приёмки и обработки молока ИПКС-0107", capacity: "500–2000 л/сутки", category: "Молочная промышленность" },
  { id: 46, name: "Комплект приёмки и обработки молока ИПКС-0108", capacity: "500–6000 л/сутки", category: "Молочная промышленность" },
  { id: 47, name: "Комплект приёмки и обработки молока ИПКС-0109", capacity: "500–10000 л/сутки", category: "Молочная промышленность" },
  { id: 48, name: "Комплект для производства йогуртов ИПКС-0112", capacity: "2000 л/сутки", category: "Молочная промышленность" },
  { id: 49, name: "Комплект для производства йогуртов ИПКС-0113", capacity: "4000 л/сутки", category: "Молочная промышленность" },
  { id: 50, name: "Сыроварня мягких и твёрдых сыров ИПКС-0116", capacity: "2000 л/сутки", category: "Молочная промышленность" },
  { id: 51, name: "Сыроварня мягких сыров ИПКС-0124 (Сулугуни, Косичка, Моцарелла)", capacity: "400 л/сутки", category: "Молочная промышленность" },
  { id: 52, name: "Сыроварня Адыгейского сыра ИПКС-0125", capacity: "600 л/сутки", category: "Молочная промышленность" },
  { id: 53, name: "Комплект для колбасного плавленого сыра ИПКС-0119", capacity: "2000 кг/смену", category: "Молочная промышленность" },
  { id: 54, name: "Комплект для плавленого сыра ИПКС-0120", capacity: "2000 кг/смену", category: "Молочная промышленность" },
  { id: 55, name: "Комплект для сыра «Домашний» зернистого ИПКС-0117", capacity: "2000 л/сутки", category: "Молочная промышленность" },
  { id: 56, name: "Комплект для сыра «Домашний» зернистого ИПКС-0118", capacity: "2000 л/сутки", category: "Молочная промышленность" },
  { id: 57, name: "Сыроварня твёрдых сыров ИПКС-0123", capacity: "300 л/сутки", category: "Молочная промышленность" },
  { id: 58, name: "Минизавод «Фермер» ИПКС-0100", capacity: "500 л/сутки", category: "Молочная промышленность" },
  { id: 59, name: "Минизавод «Фермер-Профи» ИПКС-0100", capacity: "500 л/сутки", category: "Молочная промышленность" },
  { id: 60, name: "Минизавод переработки молока ИПКС-0101", capacity: "1000 л/сутки", category: "Молочная промышленность" },
  { id: 61, name: "Минизавод переработки молока ИПКС-0102", capacity: "2000 л/сутки", category: "Молочная промышленность" },
  { id: 62, name: "Минизавод переработки молока ИПКС-0103", capacity: "3000 л/сутки", category: "Молочная промышленность" },
  { id: 63, name: "Минизавод переработки молока ИПКС-0104", capacity: "6000 л/сутки", category: "Молочная промышленность" },
  { id: 64, name: "Минизавод переработки молока ИПКС-0105", capacity: "10000 л/сутки", category: "Молочная промышленность" },
  { id: 65, name: "Минизавод переработки молока ИПКС-0106", capacity: "10000 л/сутки", category: "Молочная промышленность" },

  { id: 66, name: "Комплект для замороженных блинчиков ИПКС-0209", capacity: "500 кг/сутки", category: "Мясная промышленность" },
  { id: 67, name: "Комплект для котлет и тефтелей ИПКС-0205", capacity: "1300 кг/сутки", category: "Мясная промышленность" },
  { id: 68, name: "Комплект для котлет и тефтелей ИПКС-0206", capacity: "2600 кг/сутки", category: "Мясная промышленность" },
  { id: 69, name: "Комплект для мясных паштетов ИПКС-0204", capacity: "800 кг/смену", category: "Мясная промышленность" },
  { id: 70, name: "Комплект для панированных котлет ИПКС-0212", capacity: "1500 кг/смену", category: "Мясная промышленность" },
  { id: 71, name: "Комплект для панированных котлет ИПКС-0213", capacity: "1500 кг/смену", category: "Мясная промышленность" },
  { id: 72, name: "Комплект фасовки и стерилизации тушёнки ИПКС-0210", capacity: "600 банок/ч", category: "Мясная промышленность" },
  { id: 73, name: "Комплект фасовки и стерилизации тушёнки ИПКС-0211", capacity: "600 банок/ч", category: "Мясная промышленность" },
  { id: 74, name: "Минизавод переработки мяса ИПКС-0201", capacity: "600 кг/смену", category: "Мясная промышленность" },
  { id: 75, name: "Минизавод переработки мяса ИПКС-0202", capacity: "1500 кг/смену", category: "Мясная промышленность" },
  { id: 76, name: "Минизавод переработки мяса ИПКС-0203", capacity: "3000 кг/смену", category: "Мясная промышленность" },
  { id: 77, name: "Минизавод для пельменей ИПКС-0207", capacity: "700 кг/смену", category: "Мясная промышленность" },
  { id: 78, name: "Минизавод для пельменей ИПКС-0208", capacity: "1000 кг/смену", category: "Мясная промышленность" },

  { id: 79, name: "Комплект для консервирования рыбы ИПКС-0801", capacity: "600 банок/ч", category: "Рыбная промышленность" },
  { id: 80, name: "Комплект нарезки и фасовки рыбных пресервов ИПКС-074", capacity: "1000 банок/ч", category: "Рыбная промышленность" },
]

export function CatalogSection({ scrollToSection }: { scrollToSection?: (index: number) => void }) {
  const { ref, isVisible } = useReveal(0.15)
  const [activeCategory, setActiveCategory] = useState("Все")

  const filtered = activeCategory === "Все" ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeCategory)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start flex-col px-6 pt-20 pb-8 md:px-12 md:pt-24 lg:px-16"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col h-full">
        <div
          className={`mb-4 flex flex-col gap-3 transition-all duration-700 md:mb-6 md:flex-row md:items-end md:justify-between ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <div>
            <h2 className="mb-1 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Каталог
            </h2>
            <p className="font-mono text-sm text-foreground/60 md:text-base">/ {filtered.length} позиций</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full border px-3 py-1 font-mono text-xs transition-all duration-200 md:px-4 md:text-sm ${
                  activeCategory === cat
                    ? "border-foreground bg-foreground text-background"
                    : "border-foreground/20 bg-foreground/5 text-foreground/70 hover:border-foreground/40 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div
          className="flex-1 overflow-y-auto pr-1"
          style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.15) transparent" }}
        >
          <div className="space-y-0">
            {filtered.map((product, i) => (
              <div
                key={product.id}
                className={`group flex items-center justify-between border-b border-foreground/10 py-3 transition-all duration-500 hover:border-foreground/25 hover:pl-2 md:py-4 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
                style={{ transitionDelay: `${Math.min(i * 25, 400)}ms` }}
              >
                <div className="flex items-baseline gap-3 md:gap-6 min-w-0">
                  <span className="hidden font-mono text-xs text-foreground/25 md:block shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-light text-foreground transition-colors group-hover:text-foreground/90 md:text-base">
                      {product.name}
                    </p>
                    {product.capacity && (
                      <p className="font-mono text-xs text-foreground/50">{product.capacity}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-4 md:gap-6">
                  <span className="font-mono text-xs text-foreground/50 whitespace-nowrap">по запросу</span>
                  <button
                    onClick={() => scrollToSection?.(5)}
                    className="hidden rounded-full border border-foreground/20 px-3 py-1 font-mono text-xs text-foreground/60 opacity-0 transition-all duration-200 group-hover:opacity-100 hover:border-foreground/50 hover:text-foreground md:block"
                  >
                    Запрос
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`mt-4 flex items-center justify-between transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          <p className="font-mono text-xs text-foreground/50">Цены уточняйте у менеджера — изготовление под заказ.</p>
          <MagneticButton variant="primary" onClick={() => scrollToSection?.(5)}>
            Запросить КП
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
