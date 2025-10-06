const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    trim: true
  },
  instructor: {
    type: String,
    required: [true, 'El instructor es obligatorio'],
    trim: true
  },
  duration: {
    type: Number,
    required: [true, 'La duración es obligatoria'],
    min: [1, 'La duración debe ser al menos 1 hora']
  },
  level: {
    type: String,
    enum: ['Principiante', 'Intermedio', 'Avanzado'],
    required: [true, 'El nivel es obligatorio']
  },
  price: {
    type: Number,
    required: [true, 'El precio es obligatorio'],
    min: [0, 'El precio no puede ser negativo']
  },
  topics: [{
    type: String,
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  enrolledStudents: {
    type: Number,
    default: 0,
    min: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);
