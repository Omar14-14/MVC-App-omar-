const pool = require('./db');

exports.saveFormData = async (data) => {
    const {
        p_nombre,
        p_apellido_paterno,
        p_apellido_materno,
        p_telefono,
        p_correo,
        p_direccion,
        p_carrera,
        p_comprobante_pago,
        p_fecha_registro
    } = data;

    try {
        await pool.query(
            'CALL insertar_registro_carrera(?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [p_nombre, p_apellido_paterno, p_apellido_materno, p_telefono, p_correo, p_direccion, p_carrera, p_comprobante_pago, p_fecha_registro]
        );
    } catch (error) {
        console.error('Error al guardar los datos del formulario:', error);
        throw error;
    }
};
