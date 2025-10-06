const Course = require('../models/Course');

// @desc    Obtener todos los cursos
// @route   GET /api/courses
// @access  Private
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener cursos',
      error: error.message
    });
  }
};

// @desc    Obtener un curso por ID
// @route   GET /api/courses/:id
// @access  Private
exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Curso no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener curso',
      error: error.message
    });
  }
};

// @desc    Crear nuevo curso
// @route   POST /api/courses
// @access  Private
exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Curso creado exitosamente',
      data: course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear curso',
      error: error.message
    });
  }
};

// @desc    Actualizar curso
// @route   PUT /api/courses/:id
// @access  Private
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Curso no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Curso actualizado exitosamente',
      data: course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar curso',
      error: error.message
    });
  }
};

// @desc    Eliminar curso
// @route   DELETE /api/courses/:id
// @access  Private
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Curso no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Curso eliminado exitosamente',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar curso',
      error: error.message
    });
  }
};
