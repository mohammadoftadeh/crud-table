const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Generate mock data
const categories = [
  "Electronics",
  "Clothing",
  "Books",
  "Home",
  "Sports",
  "Toys",
  "Food",
  "Health",
  "Beauty",
  "Automotive",
];
const mockDescriptions = [
  "High-quality product with excellent features",
  "Affordable option for everyday use",
  "Premium selection for discerning customers",
  "Eco-friendly and sustainable choice",
  "Innovative design with cutting-edge technology",
];

const items = [];
for (let i = 1; i <= 10000; i++) {
  const category = categories[Math.floor(Math.random() * categories.length)];
  const price = parseFloat((Math.random() * 500 + 5).toFixed(2));
  const rating = Math.floor(Math.random() * 5) + 1;
  const stock = Math.floor(Math.random() * 1000);

  // Generate random date within the last 5 years
  const randomDays = Math.floor(Math.random() * 365 * 5);
  const date = new Date();
  date.setDate(date.getDate() - randomDays);

  items.push({
    id: i,
    title: `${category} Item ${i}`,
    category,
    date: date.toISOString().split("T")[0],
    price,
    description:
      mockDescriptions[Math.floor(Math.random() * mockDescriptions.length)],
    stock,
    rating,
  });
}

// Helper function for filtering
function applyFilters(items, filters) {
  return items.filter((item) => {
    if (filters.category && item.category !== filters.category) return false;
    if (filters.minPrice && item.price < filters.minPrice) return false;
    if (filters.maxPrice && item.price > filters.maxPrice) return false;
    if (filters.startDate && item.date < filters.startDate) return false;
    if (filters.endDate && item.date > filters.endDate) return false;
    if (filters.minRating && item.rating < filters.minRating) return false;
    if (filters.minStock && item.stock < filters.minStock) return false;
    return true;
  });
}

// Helper function for sorting
function applySort(items, sortField, sortOrder) {
  if (!sortField) return items;

  return [...items].sort((a, b) => {
    let comparison = 0;

    if (a[sortField] > b[sortField]) {
      comparison = 1;
    } else if (a[sortField] < b[sortField]) {
      comparison = -1;
    }

    return sortOrder === "desc" ? comparison * -1 : comparison;
  });
}

// Helper function for searching
function applySearch(items, searchTerm) {
  if (!searchTerm) return items;

  const term = searchTerm.toLowerCase();
  return items.filter(
    (item) =>
      item.title.toLowerCase().includes(term) ||
      item.description.toLowerCase().includes(term)
  );
}

// GET all items with filtering, sorting, search, and pagination
app.get("/api/items", (req, res) => {
  const {
    page = 1,
    limit = 10,
    search,
    category,
    minPrice,
    maxPrice,
    startDate,
    endDate,
    minRating,
    minStock,
    sortBy,
    sortOrder = "asc",
  } = req.query;

  // Apply search first
  let results = applySearch(items, search);

  // Apply filters
  results = applyFilters(results, {
    category,
    minPrice: minPrice ? parseFloat(minPrice) : null,
    maxPrice: maxPrice ? parseFloat(maxPrice) : null,
    startDate,
    endDate,
    minRating: minRating ? parseInt(minRating) : null,
    minStock: minStock ? parseInt(minStock) : null,
  });

  // Apply sorting
  results = applySort(results, sortBy, sortOrder);

  // Apply pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedResults = results.slice(startIndex, endIndex);

  res.json({
    totalItems: results.length,
    totalPages: Math.ceil(results.length / limit),
    currentPage: parseInt(page),
    items: paginatedResults,
  });
});

// GET single item by ID
app.get("/api/items/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ message: "Item not found" });
  res.json(item);
});

// POST create new item
app.post("/api/items", (req, res) => {
  const newItem = {
    id: items.length + 1,
    title: req.body.title,
    category: req.body.category,
    date: req.body.date || new Date().toISOString().split("T")[0],
    price: req.body.price,
    description: req.body.description,
    stock: req.body.stock,
    rating: req.body.rating || 1,
  };

  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT update existing item
app.put("/api/items/:id", (req, res) => {
  const index = items.findIndex((i) => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Item not found" });

  const updatedItem = {
    ...items[index],
    title: req.body.title || items[index].title,
    category: req.body.category || items[index].category,
    date: req.body.date || items[index].date,
    price: req.body.price || items[index].price,
    description: req.body.description || items[index].description,
    stock: req.body.stock || items[index].stock,
    rating: req.body.rating || items[index].rating,
  };

  items[index] = updatedItem;
  res.json(updatedItem);
});

// DELETE item
app.delete("/api/items/:id", (req, res) => {
  const index = items.findIndex((i) => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Item not found" });

  items.splice(index, 1);
  res.json({ message: "Item deleted successfully" });
});

// GET all available categories
app.get("/api/categories", (req, res) => {
  const uniqueCategories = [...new Set(items.map((item) => item.category))];
  res.json(uniqueCategories);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
