//quiero una funcion que dependiendo la cateria me muestre una descripcion que yo coloque
export function getCategoryDescription(category) {
    const descriptions = {
      Panadería: "Aromas cálidos, cortezas doradas y migas suaves te esperan. Descubre panes recién horneados que enamoran a cada bocado.",
      Repostería: "Capas, cremas y dulzura en cada detalle. Nuestra repostería artesanal transforma antojos en momentos inolvidables",
      Galletería: "Crocantes, suaves, dulces o con chispas: cada galleta es un momento de felicidad. Descubre tu favorita entre nuestras delicias horneadas.",
      bebidas: "Refrescos, cafés y tés para acompañar tus comidas.",
      snacks: "Pequeños bocados ideales para cualquier hora del día.",
      default: "Explora nuestra variedad de productos y encuentra lo que necesitas.",
    };
  
    return descriptions[category] || descriptions.default;
  }
  
