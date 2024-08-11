const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const formModel = require('../models/formModel');

// Configuración de almacenamiento de archivos con multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../public/Archivos');
        // Asegurarse de que el directorio exista
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});


const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB límite
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /pdf|jpg|jpeg|png|gif/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Tipo de archivo no permitido.'));
        }
    }
});

// Rutas
router.get('/form', (req, res) => {
    res.render('form');
});

router.post('/form', upload.single('p_comprobante_pago'), async (req, res) => {
    const { 
        p_nombre,
        p_apellido_paterno,
        p_apellido_materno,
        p_telefono,
        p_correo,
        p_direccion,
        p_carrera,
        p_fecha_registro 
    } = req.body;
    
    const p_comprobante_pago = req.file ? req.file.filename : null;

    console.log(`Nombre: ${p_nombre}, Apellido Paterno: ${p_apellido_paterno}, Apellido Materno: ${p_apellido_materno}, Teléfono: ${p_telefono}, Correo: ${p_correo}, Dirección: ${p_direccion}, Carrera: ${p_carrera}, Fecha de Registro: ${p_fecha_registro}, Comprobante de Pago: ${p_comprobante_pago}`);

    try {
        await formModel.saveFormData({
            p_nombre,
            p_apellido_paterno,
            p_apellido_materno,
            p_telefono,
            p_correo,
            p_direccion,
            p_carrera,
            p_comprobante_pago,
            p_fecha_registro
        });

        res.status(200).json({ success: true, message: 'Registro a la carrera exitoso' });
    } catch (error) {
        console.error('Error al guardar los datos:', error);
        res.status(500).json({ success: false, message: 'Error al registrar la carrera' });
    }
});

module.exports = router;
