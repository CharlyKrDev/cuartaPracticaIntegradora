import { Router } from "express"
import { renderRoleUsersApiController, managerRoleUsersApiController } from "../../controllers/managerRoleControllers.js"
import { updateUserRole } from "../../services/usersUpdateRole.js"
import uploadDocument from "../../middleware/updateRole.js"

export const managerRoleApi = Router()


managerRoleApi.get('/api/users/premium', renderRoleUsersApiController)
managerRoleApi.post('/api/users/manual/premium/:uid', managerRoleUsersApiController)
managerRoleApi.post('/api/users/premium/:uid', uploadDocument.array('documents', 5), updateUserRole);