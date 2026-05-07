// Local mock product database — avoids DummyJSON rate limiting
let nextId = 100;

let PRODUCTS = [
  { id: 1, title: 'iPhone 15 Pro', description: 'Apple iPhone 15 Pro with titanium design and A17 Pro chip.', price: 999, rating: 4.8, stock: 42, brand: 'Apple', category: 'smartphones', thumbnail: 'https://cdn.dummyjson.com/products/images/smartphones/iPhone%2015%20Pro/thumbnail.png', images: ['https://cdn.dummyjson.com/products/images/smartphones/iPhone%2015%20Pro/1.png'], discountPercentage: 5, sku: 'IP15-PRO' },
  { id: 2, title: 'Samsung Galaxy S24', description: 'Samsung flagship with Snapdragon 8 Gen 3 and AI features.', price: 849, rating: 4.7, stock: 38, brand: 'Samsung', category: 'smartphones', thumbnail: 'https://cdn.dummyjson.com/products/images/smartphones/Samsung%20Galaxy%20S24/thumbnail.png', images: ['https://cdn.dummyjson.com/products/images/smartphones/Samsung%20Galaxy%20S24/1.png'], discountPercentage: 8, sku: 'SGS24' },
  { id: 3, title: 'MacBook Pro 14"', description: 'Apple MacBook Pro with M3 chip, Liquid Retina XDR display.', price: 1999, rating: 4.9, stock: 15, brand: 'Apple', category: 'laptops', thumbnail: 'https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014%20Inch%20Space%20Grey/thumbnail.png', images: ['https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014%20Inch%20Space%20Grey/1.png'], discountPercentage: 0, sku: 'MBP14-M3' },
  { id: 4, title: 'Dell XPS 15', description: 'Dell XPS 15 with Intel Core i9, OLED display, and NVIDIA RTX.', price: 1799, rating: 4.6, stock: 20, brand: 'Dell', category: 'laptops', thumbnail: 'https://cdn.dummyjson.com/products/images/laptops/Huawei%20Matebook%20X%20Pro/thumbnail.png', images: ['https://cdn.dummyjson.com/products/images/laptops/Huawei%20Matebook%20X%20Pro/1.png'], discountPercentage: 10, sku: 'DXPS15' },
  { id: 5, title: 'Sony WH-1000XM5', description: 'Industry-leading noise cancelling wireless headphones.', price: 349, rating: 4.8, stock: 60, brand: 'Sony', category: 'audio', thumbnail: 'https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20AirPods%20Max%20Silver/thumbnail.png', images: ['https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20AirPods%20Max%20Silver/1.png'], discountPercentage: 12, sku: 'SWXM5' },
  { id: 6, title: 'iPad Pro 12.9"', description: 'Apple iPad Pro with M2 chip and Ultra Retina XDR display.', price: 1099, rating: 4.7, stock: 25, brand: 'Apple', category: 'tablets', thumbnail: 'https://cdn.dummyjson.com/products/images/tablets/Apple%20iPad%209/thumbnail.png', images: ['https://cdn.dummyjson.com/products/images/tablets/Apple%20iPad%209/1.png'], discountPercentage: 5, sku: 'IPD-PRO-129' },
  { id: 7, title: 'Nike Air Max 270', description: 'Iconic Nike Air Max with 270-degree Air unit for maximum comfort.', price: 150, rating: 4.5, stock: 120, brand: 'Nike', category: 'footwear', thumbnail: 'https://cdn.dummyjson.com/products/images/mens-shoes/Nike%20Air%20Jordan%201%20Low/thumbnail.png', images: ['https://cdn.dummyjson.com/products/images/mens-shoes/Nike%20Air%20Jordan%201%20Low/1.png'], discountPercentage: 15, sku: 'NAM270' },
  { id: 8, title: 'Adidas Ultraboost 22', description: 'Responsive running shoes with BOOST midsole technology.', price: 180, rating: 4.6, stock: 95, brand: 'Adidas', category: 'footwear', thumbnail: 'https://cdn.dummyjson.com/products/images/mens-shoes/Adidas%20AdiZero%20Adios%20Pro%203/thumbnail.png', images: ['https://cdn.dummyjson.com/products/images/mens-shoes/Adidas%20AdiZero%20Adios%20Pro%203/1.png'], discountPercentage: 10, sku: 'AUB22' },
  { id: 9, title: 'Canon EOS R6', description: 'Full-frame mirrorless camera with 4K video and in-body stabilization.', price: 2499, rating: 4.8, stock: 10, brand: 'Canon', category: 'cameras', thumbnail: 'https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20Watch%20Magnetic%20Fast%20Charger%20to%20USB-C%20Cable%20(1%20m)/thumbnail.png', images: ['https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20Watch%20Magnetic%20Fast%20Charger%20to%20USB-C%20Cable%20(1%20m)/1.png'], discountPercentage: 0, sku: 'CEOSR6' },
  { id: 10, title: 'IKEA KALLAX Shelf', description: 'Versatile shelf unit, perfect for books, boxes and baskets.', price: 79, rating: 4.4, stock: 200, brand: 'IKEA', category: 'furniture', thumbnail: 'https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/thumbnail.png', images: ['https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/1.png'], discountPercentage: 0, sku: 'IKK-001' },
  { id: 11, title: 'Google Pixel 8 Pro', description: 'Google Pixel 8 Pro with Tensor G3 chip and 50MP camera.', price: 799, rating: 4.6, stock: 33, brand: 'Google', category: 'smartphones', thumbnail: 'https://cdn.dummyjson.com/products/images/smartphones/Huawei%20P50%20Pro/thumbnail.png', images: ['https://cdn.dummyjson.com/products/images/smartphones/Huawei%20P50%20Pro/1.png'], discountPercentage: 7, sku: 'GP8PRO' },
  { id: 12, title: 'LG OLED C3 65"', description: '65-inch OLED TV with α9 AI Processor and Dolby Vision IQ.', price: 1799, rating: 4.9, stock: 8, brand: 'LG', category: 'televisions', thumbnail: 'https://cdn.dummyjson.com/products/images/furniture/Wooden%20Bathroom%20Sink%20With%20Mirror/thumbnail.png', images: ['https://cdn.dummyjson.com/products/images/furniture/Wooden%20Bathroom%20Sink%20With%20Mirror/1.png'], discountPercentage: 15, sku: 'LGOLED65' },
  { id: 13, title: 'Dyson V15 Detect', description: 'Cordless vacuum with laser dust detection and intelligent suction.', price: 699, rating: 4.7, stock: 45, brand: 'Dyson', category: 'appliances', thumbnail: 'https://cdn.dummyjson.com/products/images/furniture/Bedside%20Table%20African%20Cherry/thumbnail.png', images: ['https://cdn.dummyjson.com/products/images/furniture/Bedside%20Table%20African%20Cherry/1.png'], discountPercentage: 5, sku: 'DV15D' },
  { id: 14, title: 'Nintendo Switch OLED', description: 'Nintendo Switch with vibrant 7-inch OLED screen.', price: 349, rating: 4.7, stock: 75, brand: 'Nintendo', category: 'gaming', thumbnail: 'https://cdn.dummyjson.com/products/images/tablets/Kindle%20Paperwhite%205th%20Generation/thumbnail.png', images: ['https://cdn.dummyjson.com/products/images/tablets/Kindle%20Paperwhite%205th%20Generation/1.png'], discountPercentage: 0, sku: 'NSW-OLED' },
  { id: 15, title: 'PS5 DualSense Controller', description: 'Wireless controller with haptic feedback and adaptive triggers.', price: 69, rating: 4.8, stock: 150, brand: 'Sony', category: 'gaming', thumbnail: 'https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20MagSafe%20Battery%20Pack/thumbnail.png', images: ['https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20MagSafe%20Battery%20Pack/1.png'], discountPercentage: 0, sku: 'DS-CTRL' },
  { id: 16, title: 'Kindle Paperwhite', description: 'Thinnest, lightest Kindle with adjustable warm light.', price: 139, rating: 4.6, stock: 88, brand: 'Amazon', category: 'tablets', thumbnail: 'https://cdn.dummyjson.com/products/images/tablets/Kindle%20Paperwhite%205th%20Generation/thumbnail.png', images: ['https://cdn.dummyjson.com/products/images/tablets/Kindle%20Paperwhite%205th%20Generation/1.png'], discountPercentage: 8, sku: 'KND-PW' },
  { id: 17, title: 'Beats Studio Pro', description: 'Wireless headphones with personalized spatial audio.', price: 349, rating: 4.5, stock: 55, brand: 'Beats', category: 'audio', thumbnail: 'https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20AirPods%20Pro/thumbnail.png', images: ['https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20AirPods%20Pro/1.png'], discountPercentage: 10, sku: 'BST-PRO' },
  { id: 18, title: 'OnePlus 12', description: 'OnePlus flagship with Snapdragon 8 Gen 3 and 100W charging.', price: 699, rating: 4.5, stock: 40, brand: 'OnePlus', category: 'smartphones', thumbnail: 'https://cdn.dummyjson.com/products/images/smartphones/OnePlus%2012R/thumbnail.png', images: ['https://cdn.dummyjson.com/products/images/smartphones/OnePlus%2012R/1.png'], discountPercentage: 5, sku: 'OP12' },
  { id: 19, title: 'Herman Miller Aeron', description: 'Ergonomic office chair designed for optimal posture and comfort.', price: 1395, rating: 4.9, stock: 12, brand: 'Herman Miller', category: 'furniture', thumbnail: 'https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Sofa/thumbnail.png', images: ['https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Sofa/1.png'], discountPercentage: 0, sku: 'HM-AER' },
  { id: 20, title: 'Nespresso Vertuo Pop', description: 'Compact coffee machine with Centrifusion™ extraction technology.', price: 99, rating: 4.6, stock: 67, brand: 'Nespresso', category: 'appliances', thumbnail: 'https://cdn.dummyjson.com/products/images/furniture/Wooden%20Bathroom%20Sink%20With%20Mirror/thumbnail.png', images: ['https://cdn.dummyjson.com/products/images/furniture/Wooden%20Bathroom%20Sink%20With%20Mirror/1.png'], discountPercentage: 12, sku: 'NSP-VPP' },
  { id: 21, title: 'Logitech MX Master 3S', description: 'Advanced wireless mouse with 8K DPI and quiet clicks.', price: 99, rating: 4.8, stock: 110, brand: 'Logitech', category: 'accessories', thumbnail: 'https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20Watch%20Magnetic%20Fast%20Charger%20to%20USB-C%20Cable%20(1%20m)/thumbnail.png', images: ['https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20Watch%20Magnetic%20Fast%20Charger%20to%20USB-C%20Cable%20(1%20m)/1.png'], discountPercentage: 5, sku: 'LMX3S' },
  { id: 22, title: 'Keychron Q1 Pro', description: 'Wireless mechanical keyboard with QMK/VIA support.', price: 199, rating: 4.7, stock: 30, brand: 'Keychron', category: 'accessories', thumbnail: 'https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20MagSafe%20Battery%20Pack/thumbnail.png', images: ['https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20MagSafe%20Battery%20Pack/1.png'], discountPercentage: 0, sku: 'KQ1P' },
  { id: 23, title: 'ASUS ROG Zephyrus G14', description: 'Gaming laptop with AMD Ryzen 9 and NVIDIA RTX 4060.', price: 1599, rating: 4.7, stock: 18, brand: 'ASUS', category: 'laptops', thumbnail: 'https://cdn.dummyjson.com/products/images/laptops/Lenovo%20IdeaPad%20Slim%205i/thumbnail.png', images: ['https://cdn.dummyjson.com/products/images/laptops/Lenovo%20IdeaPad%20Slim%205i/1.png'], discountPercentage: 8, sku: 'ROGZG14' },
  { id: 24, title: 'Xiaomi 14 Ultra', description: 'Xiaomi flagship co-engineered with Leica quad cameras.', price: 1099, rating: 4.6, stock: 22, brand: 'Xiaomi', category: 'smartphones', thumbnail: 'https://cdn.dummyjson.com/products/images/smartphones/Xiaomi%20Mi%2011/thumbnail.png', images: ['https://cdn.dummyjson.com/products/images/smartphones/Xiaomi%20Mi%2011/1.png'], discountPercentage: 6, sku: 'XM14U' },
  { id: 25, title: 'Samsung 970 EVO Plus 1TB', description: 'NVMe M.2 SSD with sequential read speeds up to 3,500MB/s.', price: 79, rating: 4.8, stock: 200, brand: 'Samsung', category: 'storage', thumbnail: 'https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20MagSafe%20Battery%20Pack/thumbnail.png', images: ['https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20MagSafe%20Battery%20Pack/1.png'], discountPercentage: 15, sku: 'S970EP1T' },
];

// ─── Helpers ───────────────────────────────────────────────────────────────

function filterAndPaginate(query, limit, skip) {
  const q = query.toLowerCase().trim();
  const filtered = q
    ? PRODUCTS.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      )
    : PRODUCTS;
  return {
    products: filtered.slice(skip, skip + limit),
    total: filtered.length,
    skip,
    limit,
  };
}

// ─── Mock service ───────────────────────────────────────────────────────────

export const mockProductService = {
  getAll({ limit = 10, skip = 0, search = '' } = {}) {
    return Promise.resolve(filterAndPaginate(search, limit, skip));
  },

  getById(id) {
    const product = PRODUCTS.find((p) => p.id === Number(id));
    if (!product) return Promise.reject(new Error('Product not found'));
    return Promise.resolve(product);
  },

  create(payload) {
    const newProduct = {
      ...payload,
      id: ++nextId,
      rating: 0,
      stock: 0,
      images: [],
      thumbnail: `https://ui-avatars.com/api/?name=${encodeURIComponent(payload.title)}&background=6366f1&color=fff&size=128`,
      discountPercentage: 0,
      sku: `USR-${nextId}`,
    };
    PRODUCTS = [newProduct, ...PRODUCTS];
    return Promise.resolve(newProduct);
  },

  update(id, payload) {
    const index = PRODUCTS.findIndex((p) => p.id === Number(id));
    if (index === -1) return Promise.reject(new Error('Product not found'));
    PRODUCTS[index] = { ...PRODUCTS[index], ...payload };
    return Promise.resolve(PRODUCTS[index]);
  },

  remove(id) {
    const index = PRODUCTS.findIndex((p) => p.id === Number(id));
    if (index === -1) return Promise.reject(new Error('Product not found'));
    const [deleted] = PRODUCTS.splice(index, 1);
    return Promise.resolve({ ...deleted, isDeleted: true });
  },
};
