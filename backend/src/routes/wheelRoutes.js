import express from 'express';

const router = express.Router();

// In-memory storage (replace with database in production)
let wheels = [];
let nextId = 1;

// Get all wheels
router.get('/', (req, res) => {
  res.json(wheels);
});

// Get wheel by ID
router.get('/:id', (req, res) => {
  const wheel = wheels.find(w => w.id === parseInt(req.params.id));
  if (!wheel) {
    return res.status(404).json({ error: 'Wheel not found' });
  }
  res.json(wheel);
});

// Create new wheel
router.post('/', (req, res) => {
  const { name, items, colors, settings } = req.body;
  
  if (!name || !items || items.length === 0) {
    return res.status(400).json({ error: 'Name and items are required' });
  }

  const newWheel = {
    id: nextId++,
    name,
    items,
    colors: colors || [],
    settings: settings || {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  wheels.push(newWheel);
  res.status(201).json(newWheel);
});

// Update wheel
router.put('/:id', (req, res) => {
  const wheelIndex = wheels.findIndex(w => w.id === parseInt(req.params.id));
  
  if (wheelIndex === -1) {
    return res.status(404).json({ error: 'Wheel not found' });
  }

  const { name, items, colors, settings } = req.body;
  
  wheels[wheelIndex] = {
    ...wheels[wheelIndex],
    name: name || wheels[wheelIndex].name,
    items: items || wheels[wheelIndex].items,
    colors: colors || wheels[wheelIndex].colors,
    settings: settings || wheels[wheelIndex].settings,
    updatedAt: new Date().toISOString()
  };

  res.json(wheels[wheelIndex]);
});

// Delete wheel
router.delete('/:id', (req, res) => {
  const wheelIndex = wheels.findIndex(w => w.id === parseInt(req.params.id));
  
  if (wheelIndex === -1) {
    return res.status(404).json({ error: 'Wheel not found' });
  }

  wheels.splice(wheelIndex, 1);
  res.status(204).send();
});

export default router;
