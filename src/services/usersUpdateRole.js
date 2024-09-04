import UsersDAO from "../dao/class/users.dao.js";

export const updateUserRole = async (req, res) => {
  try {
    const userId = req.params.uid;
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No se subieron documentos' });
    }

    const uploadedDocuments = req.files.map(file => ({
      name: file.originalname,
      reference: file.path,
    }));

    // Actualizar los documentos del usuario
    await UsersDAO.updateUser(userId, {
      $push: { documents: { $each: uploadedDocuments } },
    });

    // Obtener el usuario actualizado
    const user = await UsersDAO.findUserById(userId);

    // Si el rol es "user" y ha subido documentos, cambiar a "premium"
    if (user.role === 'user' && user.documents.length > 0) {
      await UsersDAO.updateUser(userId, { role: 'premium' });
    }

    res.status(200).json({ message: 'Documentos subidos exitosamente y rol actualizado', user: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al subir los documentos y actualizar el rol' });
  }
};
