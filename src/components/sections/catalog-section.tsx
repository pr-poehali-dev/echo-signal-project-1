import { useState } from "react"
import { useReveal } from "@/hooks/use-reveal"
import { MagneticButton } from "@/components/magnetic-button"

const CATEGORIES = ["Все", "Молочная промышленность", "Мясная промышленность", "Рыбная промышленность"]

const PRODUCTS = [
  { id: 1, name: "Комплект для детской молочной кухни ИПКС-0114", capacity: "800 л/сутки", price: 2774388, category: "Молочная промышленность" },
  { id: 2, name: "Комплект для восстановленного молока ИПКС-0110", capacity: "200–1000 л/смену", price: 1165425, category: "Молочная промышленность" },
  { id: 3, name: "Комплект для восстановленного молока ИПКС-0111", capacity: "400–2000 л/смену", price: 1692205, category: "Молочная промышленность" },
  { id: 4, name: "Комплект приёмки и обработки молока ИПКС-0107", capacity: "500–2000 л/сутки", price: 1678142, category: "Молочная промышленность" },
  { id: 5, name: "Комплект приёмки и обработки молока ИПКС-0108", capacity: "500–6000 л/сутки", price: 3303660, category: "Молочная промышленность" },
  { id: 6, name: "Комплект приёмки и обработки молока ИПКС-0109", capacity: "500–10000 л/сутки", price: 4940782, category: "Молочная промышленность" },
  { id: 7, name: "Комплект для производства йогуртов ИПКС-0112", capacity: "2000 л/сутки", price: 5184978, category: "Молочная промышленность" },
  { id: 8, name: "Комплект для производства йогуртов ИПКС-0113", capacity: "4000 л/сутки", price: 8242762, category: "Молочная промышленность" },
  { id: 9, name: "Сыроварня мягких и твёрдых сыров ИПКС-0116", capacity: "2000 л/сутки", price: 8067912, category: "Молочная промышленность" },
  { id: 10, name: "Сыроварня мягких сыров ИПКС-0124 (Сулугуни, Косичка, Моцарелла)", capacity: "400 л/сутки", price: 1019371, category: "Молочная промышленность" },
  { id: 11, name: "Сыроварня Адыгейского сыра ИПКС-0125", capacity: "600 л/сутки", price: 1019371, category: "Молочная промышленность" },
  { id: 12, name: "Комплект для колбасного плавленого сыра ИПКС-0119", capacity: "2000 кг/смену", price: 2249396, category: "Молочная промышленность" },
  { id: 13, name: "Комплект для плавленого сыра ИПКС-0120", capacity: "2000 кг/смену", price: 2760469, category: "Молочная промышленность" },
  { id: 14, name: "Комплект для сыра «Домашний» зернистого ИПКС-0117", capacity: "2000 л/сутки", price: 5286651, category: "Молочная промышленность" },
  { id: 15, name: "Комплект для сыра «Домашний» зернистого ИПКС-0118", capacity: "2000 л/сутки", price: 7747323, category: "Молочная промышленность" },
  { id: 16, name: "Сыроварня твёрдых сыров ИПКС-0123", capacity: "300 л/сутки", price: 1223993, category: "Молочная промышленность" },
  { id: 17, name: "Минизавод «Фермер» ИПКС-0100", capacity: "500 л/сутки", price: 3705912, category: "Молочная промышленность" },
  { id: 18, name: "Минизавод «Фермер-Профи» ИПКС-0100", capacity: "500 л/сутки", price: 5032310, category: "Молочная промышленность" },
  { id: 19, name: "Минизавод переработки молока ИПКС-0101", capacity: "1000 л/сутки", price: 7595765, category: "Молочная промышленность" },
  { id: 20, name: "Минизавод переработки молока ИПКС-0102", capacity: "2000 л/сутки", price: 9870822, category: "Молочная промышленность" },
  { id: 21, name: "Минизавод переработки молока ИПКС-0103", capacity: "3000 л/сутки", price: 10045764, category: "Молочная промышленность" },
  { id: 22, name: "Минизавод переработки молока ИПКС-0104", capacity: "6000 л/сутки", price: 17333756, category: "Молочная промышленность" },
  { id: 23, name: "Минизавод переработки молока ИПКС-0105", capacity: "10000 л/сутки", price: 20891380, category: "Молочная промышленность" },
  { id: 24, name: "Минизавод переработки молока ИПКС-0106", capacity: "10000 л/сутки", price: 37860025, category: "Молочная промышленность" },

  { id: 25, name: "Комплект для замороженных блинчиков ИПКС-0209", capacity: "500 кг/сутки", price: 2059791, category: "Мясная промышленность" },
  { id: 26, name: "Комплект для котлет и тефтелей ИПКС-0205", capacity: "1300 кг/сутки", price: 3262926, category: "Мясная промышленность" },
  { id: 27, name: "Комплект для котлет и тефтелей ИПКС-0206", capacity: "2600 кг/сутки", price: 5379651, category: "Мясная промышленность" },
  { id: 28, name: "Комплект для мясных паштетов ИПКС-0204", capacity: "800 кг/смену", price: 4463294, category: "Мясная промышленность" },
  { id: 29, name: "Комплект для панированных котлет ИПКС-0212", capacity: "1500 кг/смену", price: 1444477, category: "Мясная промышленность" },
  { id: 30, name: "Комплект для панированных котлет ИПКС-0213", capacity: "1500 кг/смену", price: 983974, category: "Мясная промышленность" },
  { id: 31, name: "Комплект фасовки и стерилизации тушёнки ИПКС-0210", capacity: "600 банок/ч", price: 3297767, category: "Мясная промышленность" },
  { id: 32, name: "Комплект фасовки и стерилизации тушёнки ИПКС-0211", capacity: "600 банок/ч", price: 3211537, category: "Мясная промышленность" },
  { id: 33, name: "Минизавод переработки мяса ИПКС-0201", capacity: "600 кг/смену", price: 4101931, category: "Мясная промышленность" },
  { id: 34, name: "Минизавод переработки мяса ИПКС-0202", capacity: "1500 кг/смену", price: 6756556, category: "Мясная промышленность" },
  { id: 35, name: "Минизавод переработки мяса ИПКС-0203", capacity: "3000 кг/смену", price: 11696649, category: "Мясная промышленность" },
  { id: 36, name: "Минизавод для пельменей ИПКС-0207", capacity: "700 кг/смену", price: 3444538, category: "Мясная промышленность" },
  { id: 37, name: "Минизавод для пельменей ИПКС-0208", capacity: "1000 кг/смену", price: 7615866, category: "Мясная промышленность" },

  { id: 38, name: "Комплект для консервирования рыбы ИПКС-0801", capacity: "600 банок/ч", price: 5075627, category: "Рыбная промышленность" },
  { id: 39, name: "Комплект нарезки и фасовки рыбных пресервов ИПКС-074", capacity: "1000 банок/ч", price: 2018039, category: "Рыбная промышленность" },
]

function formatPrice(price: number) {
  return price.toLocaleString("ru-RU") + " ₽"
}

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
          className={`mb-6 flex flex-col gap-4 transition-all duration-700 md:mb-8 md:flex-row md:items-end md:justify-between ${
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
                style={{ transitionDelay: `${Math.min(i * 30, 400)}ms` }}
              >
                <div className="flex items-baseline gap-3 md:gap-6 min-w-0">
                  <span className="hidden font-mono text-xs text-foreground/25 md:block shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-light text-foreground transition-colors group-hover:text-foreground/90 md:text-base">
                      {product.name}
                    </p>
                    <p className="font-mono text-xs text-foreground/50">{product.capacity}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-4 md:gap-6">
                  <span className="font-mono text-xs text-foreground/80 md:text-sm whitespace-nowrap">
                    {formatPrice(product.price)}
                  </span>
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
          <p className="font-mono text-xs text-foreground/50">Цены указаны без НДС. Уточняйте актуальную стоимость.</p>
          <MagneticButton variant="primary" onClick={() => scrollToSection?.(5)}>
            Запросить КП
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
